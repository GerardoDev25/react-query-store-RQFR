import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productActions } from '..';

export const useProductMutations = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onSuccess: (data) => {
      console.log('product created');
      queryClient.invalidateQueries({
        queryKey: ['products', { filterKey: data.category }],
      });
    },
  });

  return mutation;
};
