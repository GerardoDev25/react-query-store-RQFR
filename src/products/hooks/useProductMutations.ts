import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, productActions } from '..';

export const useProductMutations = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onMutate: async (product) => {
      console.log('mutando');
      // optimistic product
      const optimisticProduct = { id: Math.random(), ...product };
      // store the product in the cache
      queryClient.setQueriesData(
        ['products', { filterKey: product.category }],
        (old: Product[]) => {
          if (!old) {
            return [optimisticProduct];
          } else return [...old, optimisticProduct];
        }
      );
    },
    onSuccess: (product) => {
      queryClient.invalidateQueries({
        queryKey: ['products', { filterKey: product.category }],
      });

      // queryClient.setQueriesData<Product[]>(
      //   ['products', { filterKey: product.category }],
      //   (old) => {
      //     if (!old) {
      //       return [old];
      //     } else return [...old, product];
      //   }
      // );
    },
  });

  return mutation;
};
