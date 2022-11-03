import { Controller, useFormContext } from 'react-hook-form';
import { CategoryEditFormValues } from './CategoryEdit';

import { icons } from '../../../shared/iconUtils';

import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface IconPickerProps {}

const IconPicker = ({}: IconPickerProps) => {
  const { control } = useFormContext<CategoryEditFormValues>();
  return (
    <Controller
      name="icon"
      control={control}
      render={({ field }) => (
        <FormControl>
          <FormLabel>Icon</FormLabel>
          <Grid container spacing={5} sx={{ width: '100%' }}>
            {Object.keys(icons).map(icon => (
              <Grid item xs sx={{ minWidth: '2rem' }} key={icon}>
                <IconBox icon={icon} onIconClick={field.onChange} active={field.value === icon} />
              </Grid>
            ))}
          </Grid>
        </FormControl>
      )}
    />
  );
};

export default IconPicker;

interface IconBoxProps {
  icon: string;
  onIconClick: (icon: string) => void;
  active: boolean;
}
const IconBox = ({ icon, onIconClick, active = false }: IconBoxProps) => {
  function onClick() {
    onIconClick(icon);
  }
  return (
    <IconButton
      aria-label="choose icon"
      sx={{
        backgroundColor: active ? 'violet' : 'grey.300'
      }}
      onClick={onClick}
    >
      <SvgIcon htmlColor={active ? 'white' : 'grey.500'}>{icons[icon]}</SvgIcon>
    </IconButton>
  );
};
