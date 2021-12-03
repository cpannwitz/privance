import { PropsWithChildren } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"

export type CategoryEditFormValues = {
  name: string
  color: string
  icon: string
}

interface CategoryEditFormProps {
  onSubmit: SubmitHandler<CategoryEditFormValues>
}

const CategoryEditForm = ({ onSubmit, children }: PropsWithChildren<CategoryEditFormProps>) => {
  const methods = useForm<CategoryEditFormValues>({
    defaultValues: { name: "", icon: "", color: "" },
  })
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  )
}

export default CategoryEditForm
