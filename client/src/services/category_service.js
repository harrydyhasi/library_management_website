import api from '../utils/http/http_client';

export const fetchCategories = () => {
  return api.get('/category');
};

export const createCategory = (categoryData) => {
  return api.post('/category', categoryData);
};

export const updateCategory = (categoryId, categoryData) => {
  return api.put(`/category/${categoryId}`, categoryData);
};

export const deleteCategory = (categoryId) => {
  return api.delete(`/category/${categoryId}`); 
};
