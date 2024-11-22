import type { NextPage } from "next";
import Head from "next/head";
import { Container, Button } from "reactstrap";
import HeaderCheckout from "@/components/HeaderCheckout";
import CartTable from "@/components/CartTable";
import CartTotal from "@/components/CartTotal";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import Footer from "@/components/Footer";

const Cart: NextPage = () => {
  const { cart } = useCart();

  return (
    <>
      <Head>
        <title>Carrinho</title>
        <meta name="description" content="Meu carrinho de compras" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderCheckout />

      <main>
        {cart.length > 0 ? (
          <>
            <Container className="mb-5">
              <h1 className="my-5">Meu carrinho de compras</h1>
            </Container>
            <div className="d-flex justify-content-between w-100">
              <CartTable />
              <CartTotal />
            </div>
          </>
        ) : (
          <div className="d-flex align-items-center justify-content-center mt-4 flex-column">
            <h1>Seu carrinho está vazio!</h1>
            <Link href="/products" passHref legacyBehavior>
              <a className="nav-link me-2">
                <Button color="secondary">Continuar comprando!</Button>
              </a>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Cart;
