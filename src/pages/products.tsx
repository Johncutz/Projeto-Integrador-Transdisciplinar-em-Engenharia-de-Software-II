import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import { Container } from "reactstrap";
import ProductsList from "../components/ProductsList";
import { fetchProducts, ProductType } from "../services/products";
import { ReactNode } from "react";
import Footer from "@/components/Footer";

export const getStaticProps: GetStaticProps = async () => {
  const products = await fetchProducts();

  return { props: { products } };
};

const Products: NextPage = (props: {
  children?: ReactNode;
  products?: ProductType[];
}) => {
  return (
    <>
      <Head>
        <title>Nossos Produtos</title>
        <meta name="description" content="Conheça todos os nossos produtos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <Container className="mb-5">
          <h1 className="my-5">Nossos Produtos</h1>

          {<ProductsList products={props.products!} />}
        </Container>
      </main>

      <Footer />
    </>
  );
};

export default Products;