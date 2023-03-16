import { Grid } from '@mui/material';
import Product from '../../app/models/product';
import { useAppSelector } from '../../app/store/configureStore';
import { ProductCard } from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

type Props = {
  products: Product[];
};

const ProductList = ({ products }: Props) => {
  const { productsLoaded } = useAppSelector((state) => state.catalog);
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={4} key={product.id}>
          {productsLoaded ? (
            <ProductCard product={product} />
          ) : (
            <ProductCardSkeleton />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export { ProductList };
