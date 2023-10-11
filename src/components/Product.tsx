import React from "react";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  ProductNames,
  decrementByAmount,
  decrementProductAmounth,
} from "../store/userSlice";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import "./product.scss";

type ProductProps = {
  productName: ProductNames;
  image: string;
  price: number;
};

const Product = ({ image, productName, price }: ProductProps) => {
  const dispatch = useAppDispatch();
  const balance = useAppSelector((state) => state.counter.balance);
  const productAmounth = useAppSelector(
    (state) => state.counter[productName].amount
  );
  const productTemperature = useAppSelector(
    (state) => state.counter[productName].temp
  );

  const buyProduct = () => {
    if (balance >= price && productAmounth > 0) {
      dispatch(decrementByAmount(price));
      dispatch(decrementProductAmounth(productName));
      toast.success(`${productName} purchased successfully!`);
    } else if (productAmounth === 0) {
      toast.error(
        `There is no more ${productName} in the machine! Wait for admin to load ${productName.toLowerCase()}.`
      );
    } else if (balance < price) {
      toast.error("You don't have enough money. Please add money.");
    }
  };

  return (
    <Card className="product-component" sx={{ width: "100%", maxWidth: 300 }}>
      <CardMedia
        sx={{ height: 220 }}
        image={image}
        className="product-image"
        title={productName}
      />
      <CardContent>
        <Typography
          className="product-name"
          gutterBottom
          variant="h5"
          component="div"
        >
          {productName}
        </Typography>
        <Typography
          className="product-name"
          variant="body2"
          color="text.secondary"
          component="div"
        >
          <Typography component="div">
            {productName} available: {productAmounth}
          </Typography>
          <Typography component="div">
            {productName} temperature : {productTemperature}
          </Typography>
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          className="product-button"
          onClick={buyProduct}
        >
          {productName} {price} <CurrencyLiraIcon fontSize="small" />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
