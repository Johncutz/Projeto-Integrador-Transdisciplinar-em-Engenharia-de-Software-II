import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProductType } from "@/services/products";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "reactstrap";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

type Order = {
  user: {
    name: string;
    email: string;
    image: string;
  };
  items: ProductType[][];
};

type OrderTableProps = {
  orderItems: ProductType[];
  orderNumber: number;
};

const OrderTable = ({ orderItems, orderNumber }: OrderTableProps) => {
  return (
    <div className="order-table mb-5 border">
      <h3>Pedido #{orderNumber + 1}</h3>
      {orderItems.map((product) => (
        <div
          key={product.id}
          className="d-flex align-items-start w-100 justify-content-between my-md-4 "
        >
          <div className="d-flex w-75">
            <div className="ml-10">
              <Link href={`/products/${product.id}`} passHref legacyBehavior>
                <a className="nav-link me-2">
                  <p>{product.name}</p>
                </a>
              </Link>
              <div>R$ {product.price}</div>
              <div>{product.description}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const OrdersPage = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    "dadosPessoais"
  );

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const storedOrders = localStorage.getItem(`order-${session?.user?.email}`);

    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, [session]);

  return (
    <div>
      <Head>
        <title>Carrinho</title>
        <meta name="description" content="Meu carrinho de compras" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {}
      <div className="d-flex ms-3">
        <div className="d-flex flex-column wid-20">
          <Button
            onClick={() => handleOptionChange("dadosPessoais")}
            className="mb-2 btn-login-types "
          >
            Dados Pessoais
          </Button>
          <Button
            onClick={() => handleOptionChange("meusPedidos")}
            className="mb-2 btn-login-types "
          >
            Meus Pedidos
          </Button>
          <Button onClick={() => signOut()} className="mb-2 btn-login-types">
            Sair
          </Button>
        </div>

        <div className="wid-80">
          {selectedOption === "dadosPessoais" && (
            <div className="ms-5 border">
              <h1>Meus Dados</h1>
              <div>
                <div className="d-flex">
                  <p>Nome: </p>
                  <p className="ms-2">{session?.user?.name}</p>
                </div>
                <div className="d-flex">
                  <p>Email: </p>
                  <p className="ms-2">{session?.user?.email}</p>
                </div>
              </div>
            </div>
          )}
          {selectedOption === "meusPedidos" && (
            <div className="ms-5">
              <h1>Meus Pedidos</h1>
              {orders?.items.map((orderItems, index) => (
                <OrderTable
                  key={index}
                  orderItems={orderItems}
                  orderNumber={index}
                />
              ))}
              {!orders && <p>Nenhum pedido encontrado.</p>}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        email: session?.user?.email,
      },
    },
  };
};

export default OrdersPage;
