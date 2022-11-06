import { enqueueSnackbar, type VariantType } from 'notistack'

function notify(message: string, variant: VariantType = 'info') {
  return enqueueSnackbar(message, {
    variant: variant
  })
}

export function useNotification() {
  return {
    notify
  }
}
