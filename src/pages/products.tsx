import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import { Container } from "reactstrap";
import ProductsList from "../components/ProductsList";
import { fetchProducts, ProductType } from "../services/products";
import Footer from "@/components/Footer";

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

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
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <ProductsList products={products} />
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Products;
