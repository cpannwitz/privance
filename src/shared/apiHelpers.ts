import { Method } from 'axios'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

type Middleware = (req: NextApiRequest, res: NextApiResponse) => unknown
export type ApiResponseData<T> = {
  error?: {
    statusCode: number
    message: string
    timestamp: string
    path: string
  }
  data?: T
}

export type NextApiResponseData<T> = NextApiResponse<ApiResponseData<T>>

/**
 * @name withMiddleware
 * @description combine multiple middleware before handling your API endpoint
 * @param middlewares
 */
export function withMiddleware(...middlewares: Middleware[]) {
  return async function withMiddlewareHandler(req: NextApiRequest, res: NextApiResponse) {
    async function evaluateHandler(middleware: Middleware, innerMiddleware?: Middleware) {
      // return early when the request has
      // been ended by a previous middleware
      if (res.headersSent) {
        return
      }

      if (typeof middleware === 'function') {
        const handler = await middleware(req, res)

        if (typeof handler === 'function') {
          if (innerMiddleware) {
            await handler(innerMiddleware)

            const index = middlewares.indexOf(innerMiddleware)

            // remove inner middleware
            if (index >= 0) {
              middlewares.splice(index, 1)
            }
          } else {
            await handler()
          }
        }
      }
    }

    for (let index = 0; index < middlewares.length; index++) {
      const middleware = middlewares[index]
      const nextMiddleware = middlewares[index + 1]

      await evaluateHandler(middleware, nextMiddleware)
    }
  }
}

// ============================

/**
 * @name withMethodsGuard
 * @description guards apifunctions from being called with wrong http method, throws
 * @param method HTTPmethod
 */
export function withMethodsGuard(method: Method) {
  return function (req: NextApiRequest, res: NextApiResponse) {
    return async function (handler: NextApiHandler) {
      if (req.method !== method) {
        throw new WrongMethodException()
      }
      return handler(req, res)
    }
  }
}

// ============================

/**
 * @name ApiException
 * @description Base error class, which is used by specialized error classes in api context
 * @param statusCode number
 * @param message string
 */
export class ApiException extends Error {
  statusCode: number
  message: string
  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    this.message = message
  }
}

// TODO: 401, 403, 201, 400
export class NotFoundException extends ApiException {
  constructor() {
    super(HttpStatusCode.NotFound, `Resource does not exist`)
  }
}
export class WrongMethodException extends ApiException {
  constructor() {
    super(HttpStatusCode.MethodNotAllowed, `Wrong HTTP method`)
  }
}
export class InternalException extends ApiException {
  constructor(errorText: string) {
    super(HttpStatusCode.InternalServerError, `Internal Server Error | ${errorText}`)
  }
}

// ============================

// Error helper functions
function isError(exception: unknown): exception is Error {
  return exception instanceof Error
}
function getExceptionStatus(exception: unknown) {
  return exception instanceof ApiException ? exception.statusCode : 500
}
function getExceptionMessage(exception: unknown) {
  return isError(exception) ? exception.message : `Internal Server Error`
}
function getExceptionStack(exception: unknown) {
  return isError(exception) ? exception.stack : undefined
}

/**
 * @name withExceptionFilter
 * @description handles thrown errors in wrapped api functions
 * @param req NextApiRequest
 * @param res NextApiResponse
 */
export function withExceptionFilter(req: NextApiRequest, res: NextApiResponse) {
  return async function (handler: NextApiHandler) {
    try {
      await handler(req, res)
    } catch (exception) {
      const { url, headers } = req

      const statusCode = getExceptionStatus(exception)
      const message = getExceptionMessage(exception)
      const stack = getExceptionStack(exception)

      // TODO: activate once user management is implemented
      // const user = req.user
      // const userId = user?.uid ?? 'Not Authenticated'

      const referer = headers['referer']
      const userAgent = headers['user-agent']

      // this is the context being logged
      const requestContext = {
        // userId,
        url,
        referer,
        userAgent,
        message,
        stack // TODO: remove after log management is implemented
      }
      console.error(requestContext)

      // TODO: activate once log management is implemented
      // logger.error(requestContext, `An unhandled exception occurred.`)
      // if (stack) {
      //   logger.debug(stack)
      // }

      const timestamp = new Date().toISOString()

      // return just enough information without leaking any data
      const responseBody = {
        error: {
          statusCode,
          message,
          timestamp,
          path: req.url
        }
      }

      return res.status(statusCode).json(responseBody)
    }
  }
}

// TODO: import from axios, once resolved: https://github.com/axios/axios/issues/5126
export enum HttpStatusCode {
  Continue = 100,
  SwitchingProtocols = 101,
  Processing = 102,
  EarlyHints = 103,
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultiStatus = 207,
  AlreadyReported = 208,
  ImUsed = 226,
  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  SeeOther = 303,
  NotModified = 304,
  UseProxy = 305,
  Unused = 306,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  PayloadTooLarge = 413,
  UriTooLong = 414,
  UnsupportedMediaType = 415,
  RangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  ImATeapot = 418,
  MisdirectedRequest = 421,
  UnprocessableEntity = 422,
  Locked = 423,
  FailedDependency = 424,
  TooEarly = 425,
  UpgradeRequired = 426,
  PreconditionRequired = 428,
  TooManyRequests = 429,
  RequestHeaderFieldsTooLarge = 431,
  UnavailableForLegalReasons = 451,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HttpVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
  InsufficientStorage = 507,
  LoopDetected = 508,
  NotExtended = 510,
  NetworkAuthenticationRequired = 511
}
