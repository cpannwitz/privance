import { PropsWithChildren } from 'react'
import {
  type FieldValues,
  type SubmitHandler,
  type DefaultValues,
  FormProvider,
  useForm
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Yup from 'yup'

interface FormWrapperProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>
  defaultValues: DefaultValues<T>
  formId?: string
  schema?: Yup.AnyObjectSchema
}

function FormWrapper<T extends FieldValues>({
  onSubmit,
  defaultValues,
  children,
  formId,
  schema
}: PropsWithChildren<FormWrapperProps<T>>) {
  const methods = useForm<T>({
    defaultValues: defaultValues,
    resolver: schema ? yupResolver(schema) : undefined
  })
  return (
    <FormProvider {...methods}>
      <form id={formId} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}

export default FormWrapper
