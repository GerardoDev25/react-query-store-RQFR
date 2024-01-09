import { useParams } from 'react-router-dom';
import { useProduct } from '..';
import { ProductCard } from '../components/ProductCard';

export const ProductById = () => {
  const { id } = useParams();

  const { product, isLoading } = useProduct({ id: +id! });

  return (
    <div className='flex-col'>
      <h1 className='text-2xl font-bold'>Producto: </h1>
      {isLoading && <p>Cargando...</p>}

      {product && <ProductCard product={product} fullDescription/>}
    </div>
  );
};
