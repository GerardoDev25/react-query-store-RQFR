import { useMutation } from '@tanstack/react-query';
import { productActions } from '..';

export const useProductMutations = () => {
  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onSuccess: () => {
      console.log('product created');
    },
    onSettled: () => {
      console.log('on settle');
    },
  });

  return mutation;
};
