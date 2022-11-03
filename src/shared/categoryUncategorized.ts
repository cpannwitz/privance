import { Category } from '@prisma/client';

const categoryUncategorized: Category = {
  color: '#cccccc',
  icon: 'earth',
  name: '?',
  id: -1,
  createdAt: new Date(),
  updatedAt: new Date()
};

export default categoryUncategorized;
