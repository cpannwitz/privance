import axios, { AxiosError, AxiosResponse } from 'axios'
import { ApiResponseData } from '../../shared/apiUtils'
import { notify } from '../NotificationSystem/useNotification'

const axiosResponseFulfilled = async (response: AxiosResponse) => {
  return response.data
}
const axiosResponseRejected = async (error: AxiosError<ApiResponseData<unknown>>) => {
  notify(error.response?.data.error || error.message, 'error')
  return error.response?.data.error
}

export const ApiBase = axios.create({
  baseURL: '/api'
})
ApiBase.interceptors.response.use(axiosResponseFulfilled, axiosResponseRejected)

const API_CACHE_KEYS = {
  TRANSACTIONS: 'TRANSACTIONS',
  CATEGORIES: 'CATEGORIES',
  AUTOMATIONRULES: 'AUTOMATIONRULES',
  AGGREGATIONS: 'AGGREGATIONS',
  STATISTICS: 'STATISTICS'
}

export const API_MAP = {
  transactions: {
    getTransactions: {
      keys: () => [API_CACHE_KEYS.TRANSACTIONS],
      url: '/transactions/getTransactions'
    },
    addTransaction: {
      invalidates: () => [
        API_CACHE_KEYS.TRANSACTIONS,
        API_CACHE_KEYS.STATISTICS,
        API_CACHE_KEYS.AGGREGATIONS
      ],
      url: '/transactions/addTransaction'
    },
    deleteTransaction: {
      invalidates: () => [
        API_CACHE_KEYS.TRANSACTIONS,
        API_CACHE_KEYS.STATISTICS,
        API_CACHE_KEYS.AGGREGATIONS
      ],
      url: '/transactions/deleteTransaction'
    },
    deleteTransactions: {
      invalidates: () => [
        API_CACHE_KEYS.TRANSACTIONS,
        API_CACHE_KEYS.STATISTICS,
        API_CACHE_KEYS.AGGREGATIONS
      ],
      url: '/transactions/deleteTransactions'
    },
    updateTransactionCategory: {
      invalidates: () => [
        API_CACHE_KEYS.TRANSACTIONS,
        API_CACHE_KEYS.STATISTICS,
        API_CACHE_KEYS.AGGREGATIONS
      ],
      url: '/transactions/updateTransactionCategory'
    },
    updateTransactionsCategory: {
      invalidates: () => [
        API_CACHE_KEYS.TRANSACTIONS,
        API_CACHE_KEYS.STATISTICS,
        API_CACHE_KEYS.AGGREGATIONS
      ],
      url: '/transactions/updateTransactionsCategory'
    }
  },
  categories: {
    getCategories: {
      keys: () => [API_CACHE_KEYS.CATEGORIES],
      url: '/categories/getCategories'
    },
    getCategoriesStatistics: {
      keys: () => [API_CACHE_KEYS.CATEGORIES, API_CACHE_KEYS.STATISTICS],
      url: '/categories/getCategoriesStatistics'
    },
    getCategoriesTransactions: {
      keys: () => [API_CACHE_KEYS.CATEGORIES, API_CACHE_KEYS.TRANSACTIONS],
      url: '/categories/getCategoriesTransactions'
    },
    // TODO: unused
    getCategoryTransactions: {
      keys: (id: number) => [API_CACHE_KEYS.CATEGORIES, API_CACHE_KEYS.TRANSACTIONS, id],
      url: '/categories/getCategoryTransactions'
    },
    upsertCategory: {
      invalidates: () => [
        API_CACHE_KEYS.CATEGORIES,
        API_CACHE_KEYS.AUTOMATIONRULES,
        API_CACHE_KEYS.AGGREGATIONS
      ],
      url: '/categories/upsertCategory'
    },
    deleteCategory: {
      invalidates: () => [
        API_CACHE_KEYS.CATEGORIES,
        API_CACHE_KEYS.AUTOMATIONRULES,
        API_CACHE_KEYS.AGGREGATIONS
      ],
      url: '/categories/deleteCategory'
    }
  },
  automationRules: {
    getAutomationRules: {
      keys: () => [API_CACHE_KEYS.AUTOMATIONRULES],
      url: '/automationrules/getAutomationRules'
    },
    getAutomationRulesActive: {
      keys: () => [API_CACHE_KEYS.AUTOMATIONRULES, 'active'],
      url: '/automationrules/getAutomationRulesActive'
    },
    getAutomationRulesByCategory: {
      keys: () => [API_CACHE_KEYS.AUTOMATIONRULES, API_CACHE_KEYS.CATEGORIES],
      url: '/automationrules/getAutomationRulesByCategory'
    },
    getAutomationRuleById: {
      keys: (id: number) => [API_CACHE_KEYS.AUTOMATIONRULES, id],
      url: '/automationrules/getAutomationRuleById'
    },
    getAutomationRuleTransactions: {
      keys: (id: number) => [API_CACHE_KEYS.AUTOMATIONRULES, API_CACHE_KEYS.TRANSACTIONS, id],
      url: '/automationrules/getAutomationRuleTransactions'
    },
    upsertAutomationRule: {
      invalidates: () => [API_CACHE_KEYS.AUTOMATIONRULES],
      url: '/automationrules/upsertAutomationRule'
    },
    deleteAutomationRule: {
      invalidates: () => [API_CACHE_KEYS.AUTOMATIONRULES],
      url: '/automationrules/deleteAutomationRule'
    }
  },
  aggregations: {
    getAllTimeAggregations: {
      keys: () => [API_CACHE_KEYS.AGGREGATIONS, 'allTime'],
      url: '/aggregations/getAllTimeAggregations'
    },
    getMonthlyAggregations: {
      keys: () => [API_CACHE_KEYS.AGGREGATIONS, 'monthly'],
      url: '/aggregations/getMonthlyAggregations'
    }
  }
}
