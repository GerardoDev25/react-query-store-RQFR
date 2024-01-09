import { type Product, productApi } from '..';

interface GetProductOptions {
  filterKey?: string;
}

const sleep = async (seconds: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(true);
    }, seconds * 1000);
  });
};

export const getProducts = async ({
  filterKey,
}: GetProductOptions): Promise<Product[]> => {
  await sleep(2);
  const filteredURL = filterKey ? `category=${filterKey}` : '';

  const { data } = await productApi.get<Product[]>(`/products?${filteredURL}`);

  return data;
};
