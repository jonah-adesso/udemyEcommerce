import { Grid } from '@mui/material';
import Product from '../../app/models/product';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[];
};

const ProductList = ({ products }: Props) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={3} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export { ProductList };
