import * as yup from 'yup';

export const schema = yup
  .object({
    category: yup.object().required('Please select a category.'),
    value: yup.string().required('Please provide search term')
  })
  .required();
