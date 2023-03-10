import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography
} from '@mui/material';
import Product from '../../app/models/product';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: 'secondary.main' }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: 'bold', color: 'primary.main' }
        }}
      />

      <CardMedia
        component="img"
        alt={product.name}
        sx={{ height: 140, objectFit: 'contain', bgcolor: 'primary.light' }}
        image={product.pictureUrl}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          {(product.price / 100).toFixed(2)} SEK
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
};

export { ProductCard };
