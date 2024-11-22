import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Container } from "reactstrap";
import Header from "@/components/Header";
import ProductDetails from "@/components/ProductDetails";
import Footer from "@/components/Footer";
import { ProductType } from "../../services/products";

const Product = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Erro ao buscar o produto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!product) return <p>Produto não encontrado.</p>;

  return (
    <div>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Container className="mt-5">
        <ProductDetails product={product} />
      </Container>

      <Footer />
    </div>
  );
};

export default Product;
