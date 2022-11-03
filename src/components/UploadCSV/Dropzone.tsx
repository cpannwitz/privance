import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';

// https://react-dropzone.js.org/
// https://github.com/react-dropzone/react-dropzone/issues/276
// https://github.com/mantinedev/mantine/blob/master/src/mantine-dropzone/src/Dropzone/Dropzone.styles.ts
// https://mantine.dev/others/dropzone/
export interface DropzoneStatus {
  accepted: boolean;
  rejected: boolean;
}
interface DropzoneProps {
  /** Render children based on dragging state */
  children(status: DropzoneStatus): React.ReactNode;

  /** Disable files capturing */
  disabled?: boolean;

  /** Called when files are dropped into dropzone */
  onDrop(files: File[]): void;

  /** Display loading overlay over dropzone */
  loading?: boolean;

  /** File types to accept  */
  accept?: string[];

  /** Allow selection of multiple files */
  multiple?: boolean;

  /** Set maximum file size in bytes */
  maxSize?: number;
}

const Dropzone = ({
  children,
  onDrop,
  disabled,
  loading,
  accept,
  multiple,
  maxSize
}: DropzoneProps) => {
  const { getRootProps, getInputProps, isDragAccept, isDragReject, isDragActive } = useDropzone({
    onDropAccepted: files => onDrop(files),
    disabled: disabled || loading,
    accept,
    multiple,
    maxSize
  });

  return (
    <Box
      {...getRootProps()}
      sx={theme => ({
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 4,
        borderRadius: 4,
        borderWidth: 2,
        borderStyle: 'dashed',
        outline: 'none',
        transition: `all 0.25s ease-in-out`,
        cursor: 'pointer',

        ...(theme.palette.mode === 'light'
          ? isDragAccept
            ? {
                borderColor: 'success.light',
                backgroundColor: 'success.main',
                '&:hover': { backgroundColor: 'success.dark' }
              }
            : isDragReject
            ? {
                borderColor: 'error.light',
                backgroundColor: 'error.main',
                '&:hover': { backgroundColor: 'error.dark' }
              }
            : isDragActive
            ? {
                borderColor: 'info.light',
                backgroundColor: 'info.main',
                '&:hover': { backgroundColor: 'info.dark' }
              }
            : {
                borderColor: 'grey.700',
                backgroundColor: 'grey.500',
                '&:hover': { backgroundColor: 'grey.800' }
              }
          : isDragAccept
          ? {
              borderColor: 'success.dark',
              backgroundColor: 'success.light',
              '&:hover': { backgroundColor: 'success.main' }
            }
          : isDragReject
          ? {
              borderColor: 'error.dark',
              backgroundColor: 'error.light',
              '&:hover': { backgroundColor: 'error.main' }
            }
          : isDragActive
          ? {
              borderColor: 'info.dark',
              backgroundColor: 'info.main',
              '&:hover': { backgroundColor: 'info.light' }
            }
          : {
              borderColor: 'grey.800',
              backgroundColor: 'grey.500',
              '&:hover': { backgroundColor: 'grey.700' }
            })
      })}
    >
      <input {...getInputProps()} />
      {children({ accepted: isDragAccept, rejected: isDragReject })}
    </Box>
  );
};

export default Dropzone;
