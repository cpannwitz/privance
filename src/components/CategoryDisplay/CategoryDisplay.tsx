import { Category } from '@prisma/client'

import Chip from '@mui/material/Chip'

import { icons, placeholderIcon } from '../../shared/iconUtils'

interface CategoryDisplayProps {
  category?: Partial<Category> | null
  onClick?: () => void
}

const CategoryDisplay = ({ category, onClick }: CategoryDisplayProps) => {
  const { name, icon, color } = category || {
    name: 'Choose Category',
    color: '#bbbbbb'
  }

  return (
    <Chip
      label={name}
      icon={icon ? icons[icon] : placeholderIcon}
      onClick={onClick}
      sx={{
        backgroundColor: color,
        color: 'white',
        '& .MuiChip-icon': { color: 'white' }
      }}
    />
  )
}

export default CategoryDisplay
