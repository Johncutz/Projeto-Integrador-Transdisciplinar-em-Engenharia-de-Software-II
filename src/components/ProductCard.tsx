import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Card, CardBody, CardSubtitle } from "reactstrap";
import { ProductType } from "../services/products";
import SuccessToast from "./SuccessToast";
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/format";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const { id, name, imageUrl, price } = product;
  const { addProduct } = useCart();

  return (
    <>
      <Card>
        <Link href={`/products/${id}`}>
          <Image
            className="card-img-top"
            src={imageUrl}
            alt={product.name}
            height={250}
            width={200}
          />
        </Link>

        <CardBody>
          <Link href={`/products/${id}`}>
            <h5 className="card-title ellipsis">{name}</h5>
          </Link>

          <CardSubtitle className="mb-3 text-muted" tag="h6">
            {formatCurrency(price)}
          </CardSubtitle>

          <Button
            className="pb-2 btn-addcart"
            block
            onClick={() => {
              addProduct(product);
              setToastIsOpen(true);
              setTimeout(() => setToastIsOpen(false), 1000 * 3);
            }}
          >
            Adicionar ao Carrinho
          </Button>
        </CardBody>
      </Card>

      <SuccessToast toastIsOpen={toastIsOpen} setToastIsOpen={setToastIsOpen} />
    </>
  );
};

export default ProductCard;
