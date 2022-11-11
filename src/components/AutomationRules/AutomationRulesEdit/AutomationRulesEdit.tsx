import { SubmitHandler } from 'react-hook-form'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import FormWrapper from '../../FormWrapper/FormWrapper'
import OpenModal from '../../OpenModal/OpenModal'

import CategoryPicker from './CategoryPicker'
import ValuePicker from './ValuePicker'

import { schema } from './FormUtils'
import { AutomationRuleWithCategory } from '../../../types/types'

interface AutomationEditProps {
  onSave: (automationRule: AutomationRuleWithCategory) => void
  onCancel: () => void
  formValue?: Partial<AutomationRuleWithCategory>
}

const AutomationEdit = ({ onSave, onCancel, formValue }: AutomationEditProps) => {
  const onFormSubmit: SubmitHandler<AutomationRuleWithCategory> = data => {
    // TODO: fragil typing
    onSave({
      ...data,
      id: formValue?.id as number
    })
  }

  const defaultValues = {
    value: formValue?.value ?? undefined,
    category: formValue?.category ?? undefined
  }

  return (
    <OpenModal
      onCancel={onCancel}
      footerChildren={
        <>
          <Button variant="text" sx={{ marginRight: '1rem' }} onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" form="AutomationRulesForm">
            Save
          </Button>
        </>
      }
    >
      <FormWrapper<AutomationRuleWithCategory>
        onSubmit={onFormSubmit}
        defaultValues={defaultValues}
        formId="AutomationRulesForm"
        schema={schema}
      >
        <Stack spacing={5}>
          <Typography variant="h6">Create New Automation Rule</Typography>
          <ValuePicker />
          <CategoryPicker />
        </Stack>
      </FormWrapper>
    </OpenModal>
  )
}

export default AutomationEdit
