import * as yup from 'yup';

export const ItemSchema1 = yup.object().shape({
  name: yup.string().required('Name Field is Required').min(4, 'Name Field must be at least 6 characters long'),

  description: yup.string().required('Description is required').min(30, 'Description Field must be at least 30 characters long'),

  area: yup.string().required('Area is required'),

  state: yup.string().required('The state is required'),

address: yup.string().required('The Address is required'),

  condition: yup.string().required('The condition  is required'),

  // defectReason: yup.string().when('selectedId', {
  //   is: value => value === 'Yes',
  //   then: schema => schema.required('List out the defect'),
  //   otherwise: schema => schema,
  // }),
});

export const ItemSchema2 = yup.object().shape({
 categories: yup.string().required('Category  is Required'),

  brand: yup.string().required('Brand is required'),

 
});
