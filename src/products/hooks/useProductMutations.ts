import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, productActions } from '..';

export const useProductMutations = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onSuccess: (product) => {
      // queryClient.invalidateQueries({
      //   queryKey: ['products', { filterKey: data.category }],
      // });

      queryClient.setQueriesData<Product[]>(
        ['products', { filterKey: product.category }],
        (old) => {
          if (!old) {
            return [old];
          } else return [...old, product];
        }
      );
    },
  });

  return mutation;
};
