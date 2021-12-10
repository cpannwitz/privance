import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps,
} from "@chakra-ui/react"
import { PropsWithChildren, ReactNode } from "react"

interface OpenModalProps {
  onCancel: () => void
  modalTitle?: string
  footerChildren: ReactNode
  modalProps?: ModalProps
}

const OpenModal = ({
  modalTitle = "",
  onCancel = () => {},
  footerChildren,
  modalProps,
  children,
}: PropsWithChildren<OpenModalProps>) => {
  return (
    <Modal
      size="xl"
      isCentered
      onClose={onCancel}
      onEsc={onCancel}
      isOpen={true}
      motionPreset="slideInBottom"
      {...modalProps}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton onClick={onCancel} />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>{footerChildren}</ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default OpenModal
