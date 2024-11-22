import Image from "next/image";
import React, { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import { ProductType } from "../services/products";
import SuccessToast from "./SuccessToast";
import { useCart } from "@/hooks/useCart";

type ProductDetailsProps = {
  product: ProductType;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const { addProduct } = useCart();

  return (
    <Row>
      <Col lg={6}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          height={400}
          width={600}
          className="w-100-i"
        />
      </Col>

      <Col lg={6}>
        <h1>{product.name}</h1>

        <h2 className="text-muted">R$ {product.price}</h2>

        <p className="my-3">
          <span className="d-block font-weight-bold">Descrição:</span>
          {product.description}
        </p>

        <Button
          className="my-3 pb-2 btn-addcart"
          onClick={() => {
            addProduct(product);
            setToastIsOpen(true);
            setTimeout(() => setToastIsOpen(false), 1000 * 3);
          }}
        >
          Adicionar ao Carrinho
        </Button>

        <SuccessToast
          toastIsOpen={toastIsOpen}
          setToastIsOpen={setToastIsOpen}
        />
      </Col>
    </Row>
  );
};

export default ProductDetails;
