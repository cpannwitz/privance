import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import { PropsWithChildren, ReactNode } from 'react'

interface OpenModalProps {
  onCancel: () => void
  modalTitle?: string
  footerChildren?: ReactNode
  modalProps?: DialogProps
}

const OpenModal = ({
  modalTitle = '',
  onCancel = () => {},
  footerChildren = null,
  modalProps,
  children
}: PropsWithChildren<OpenModalProps>) => {
  return (
    <Dialog fullWidth open={true} onClose={onCancel} {...modalProps}>
      <DialogTitle>{modalTitle}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>{footerChildren}</DialogActions>
    </Dialog>
  )
}

export default OpenModal
