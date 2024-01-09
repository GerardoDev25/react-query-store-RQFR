import { type Product, productApi } from '..';

interface GetProductOptions {
  filterKey?: string;
}

export const getProducts = async ({
  filterKey,
}: GetProductOptions): Promise<Product[]> => {
  const { data } = await productApi.get<Product[]>(`/products`);

  return data;
};
