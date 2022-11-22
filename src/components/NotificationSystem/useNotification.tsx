import { enqueueSnackbar, VariantType } from 'notistack'

export function notify(message: string, variant: VariantType = 'info') {
  return enqueueSnackbar(message, {
    variant: variant
  })
}

export function useNotification() {
  return {
    notify
  }
}
