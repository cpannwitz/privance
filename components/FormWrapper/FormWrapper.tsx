import { PropsWithChildren } from "react"
import {
  DeepPartial,
  FormProvider,
  SubmitHandler,
  UnpackNestedValue,
  useForm,
} from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"

export type CategoryEditFormValues = {
  name: string
  color: string
  icon: string
}

interface FormWrapperProps<T> {
  onSubmit: SubmitHandler<T>
  defaultValues: UnpackNestedValue<DeepPartial<T>>
  formId?: string
  schema?: any
}

function FormWrapper<T>({
  onSubmit,
  defaultValues,
  children,
  formId,
  schema,
}: PropsWithChildren<FormWrapperProps<T>>) {
  const methods = useForm<T>({
    defaultValues: defaultValues,
    resolver: schema ? yupResolver(schema) : undefined,
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
