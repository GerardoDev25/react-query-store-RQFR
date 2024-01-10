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
      queryClient.setQueryData(
        ['products', { filterKey: product.category }],
        (old: Product[]) => {
          if (!old) {
            return [optimisticProduct];
          } else return [...old, optimisticProduct];
        }
      );
      return { optimisticProduct };
    },
    onSuccess: (product, variables, context) => {
      console.log(product, variables, context);

      // queryClient.invalidateQueries({
      //   queryKey: ['products', { filterKey: product.category }],
      // });

      queryClient.removeQueries({
        queryKey: ['product', context?.optimisticProduct.id],
      });

      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: product.category }],
        (old) => {
          if (!old) {
            return [product];
          }
          return old.map((prod) =>
            prod.id === context?.optimisticProduct.id ? product : prod
          );
        }
      );
    },
    onError(error, variables, context) {
      console.log(error);
      queryClient.setQueryData(
        ['products', { filterKey: variables.category }],
        (old: Product[]) => {
          if (!old) {
            return [];
          }
          return old.filter(
            (prod) => prod.id !== context?.optimisticProduct.id
          );
        }
      );
    },
  });

  return mutation;
};
