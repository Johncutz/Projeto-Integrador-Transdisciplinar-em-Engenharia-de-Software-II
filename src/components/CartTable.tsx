import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "reactstrap";
import { useCart } from "../hooks/useCart";
import { ProductType } from "../services/products";
import { formatCurrency } from "@/utils/format";

type CartEntry = {
  product: ProductType;
  quantity: number;
};

const CartTableRow = (props: { entry: CartEntry }) => {
  const { addProduct, removeProduct, removeAllProducts } = useCart();

  return (
    <tr>
      <td>
        <Row className="align-items-center">
          <Col xs={4} md={2} lg={2}>
            <Image
              src={props.entry.product.imageUrl}
              alt={props.entry.product.name}
              height={58}
              width={70}
            />
          </Col>
          <Col xs={8} md={10} lg={10}>
            {props.entry.product.name}
          </Col>
        </Row>
      </td>
      <td>{formatCurrency(props.entry.product.price)}</td>
      <td>
        <div className="d-flex align-items-center  quantify-items">
          <Button
            size="sm"
            outline
            onClick={() => removeProduct(props.entry.product.id)}
            className="me-2 btn-remove-product"
          >
            –
          </Button>
          <span className="me-2">{props.entry.quantity}</span>
          <Button
            size="sm"
            outline
            onClick={() => addProduct(props.entry.product)}
            className="me-2 btn-add-product"
          >
            +
          </Button>{" "}
        </div>
      </td>
      <td>
        <div>
          <Button
            color="secondary"
            size="sm"
            outline
            onClick={() => removeAllProducts(props.entry.product.id)}
            className="me-2 btn-remove-products"
          >
            x
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default function CartTable() {
  const [cartEntries, setCartEntries] = useState<CartEntry[]>([]);
  const { cart } = useCart();

  useEffect(() => {
    const entriesList = cart.reduce((list, product) => {
      const entryIndex = list.findIndex(
        (entry) => entry.product.id === product.id
      );

      if (entryIndex === -1) {
        return [
          ...list,
          {
            product,
            quantity: 1,
          },
        ];
      }

      list[entryIndex].quantity++;
      return list;
    }, [] as CartEntry[]);

    entriesList.sort((a, b) => a.product.id - b.product.id);
    setCartEntries(entriesList);
  }, [cart]);

  return (
    <Table className="align-middle w-70 h-100">
      <thead>
        <tr>
          <th>Lista de produtos</th>
          <th>Preço unitário</th>
          <th>Quantidade</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {cartEntries.map((entry) => (
          <CartTableRow key={entry.product.id} entry={entry} />
        ))}
      </tbody>
    </Table>
  );
}
