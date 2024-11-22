import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { useCart } from "../hooks/useCart";
import { ProductType } from "../services/products";

type CartEntry = {
  product: ProductType;
  quantity: number;
};

const MiniCarteTableProducts = (props: { entry: CartEntry }) => {
  const { addProduct, removeProduct, removeAllProducts } = useCart();

  return (
    <div>
      <div className="d-flex align-items-start w-100 justify-content-between my-md-4 ">
        <div className="d-flex w-75">
          <div>
            <Image
              src={props.entry.product.imageUrl}
              alt={props.entry.product.name}
              height={79}
              width={70}
            />
          </div>
          <div className="ml-10">
            <div>{props.entry.product.name}</div>
            <div>R$ {props.entry.product.price}</div>
            <div>
              <div className="d-flex align-items-center quantify-items">
                <Button
                  color="secondary"
                  size="sm"
                  outline
                  onClick={() => removeProduct(props.entry.product.id)}
                  className="me-2 btn-remove-product"
                >
                  –
                </Button>
                <span className="me-2">{props.entry.quantity}</span>
                <Button
                  color="secondary"
                  size="sm"
                  outline
                  onClick={() => addProduct(props.entry.product)}
                  className="me-2 btn-add-product"
                >
                  +
                </Button>{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end w-25">
          <Button
            size="sm"
            outline
            onClick={() => removeAllProducts(props.entry.product.id)}
            className="me-2 btn-remove-products"
          >
            x
          </Button>
        </div>
      </div>
    </div>
  );
};

const MiniCartTable = () => {
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
    <div>
      {cartEntries.map((entry) => (
        <MiniCarteTableProducts key={entry.product.id} entry={entry} />
      ))}
    </div>
  );
};

export default MiniCartTable;
