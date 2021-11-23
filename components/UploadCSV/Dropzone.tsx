import { chakra, useStyleConfig } from "@chakra-ui/react"
import { useDropzone } from "react-dropzone"

// https://react-dropzone.js.org/
// https://github.com/react-dropzone/react-dropzone/issues/276
// https://github.com/mantinedev/mantine/blob/master/src/mantine-dropzone/src/Dropzone/Dropzone.styles.ts
// https://mantine.dev/others/dropzone/
export interface DropzoneStatus {
  accepted: boolean
  rejected: boolean
}
interface DropzoneProps {
  /** Render children based on dragging state */
  children(status: DropzoneStatus): React.ReactNode

  /** Disable files capturing */
  disabled?: boolean

  /** Called when files are dropped into dropzone */
  onDrop(files: File[]): void

  /** Display loading overlay over dropzone */
  loading?: boolean

  /** File types to accept  */
  accept?: string[]

  /** Allow selection of multiple files */
  multiple?: boolean

  /** Set maximum file size in bytes */
  maxSize?: number
}

const Dropzone = ({
  children,
  onDrop,
  disabled,
  loading,
  accept,
  multiple,
  maxSize,
}: DropzoneProps) => {
  const { getRootProps, getInputProps, isDragAccept, isDragReject, isDragActive } = useDropzone({
    onDropAccepted: files => onDrop(files),
    disabled: disabled || loading,
    accept,
    multiple,
    maxSize,
  })

  // TODO: create styles for disabled and loading ???

  function getDropzoneVariant() {
    if (isDragAccept) return "accept"
    if (isDragReject) return "reject"
    if (isDragActive) return "active"
    return "default"
  }

  const dropzoneStyles = useStyleConfig("Dropzone", {
    variant: getDropzoneVariant(),
  })

  return (
    <>
      <ChakraDropzone __css={dropzoneStyles} {...getRootProps()}>
        <input {...getInputProps()} />
        {children({ accepted: isDragAccept, rejected: isDragReject })}
      </ChakraDropzone>
    </>
  )
}

export default Dropzone

const ChakraDropzone = chakra("div")
