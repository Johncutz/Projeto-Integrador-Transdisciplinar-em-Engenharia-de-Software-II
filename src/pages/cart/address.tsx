import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useState } from "react";
import Head from "next/head";
import HeaderCheckout from "@/components/HeaderCheckout";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";

interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

const Address = () => {
  const { cart } = useCart();
  const { data: session } = useSession();

  const [address, setAddress] = useState<Address>({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      address.name &&
      address.street &&
      address.city &&
      address.state &&
      address.zip
    ) {
      console.log("Endereço enviado:", address);
      router.push("/cart/profile");
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  };

  return (
    <>
      <Head>
        <title>Endereço</title>
        <meta name="description" content="Endereço" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderCheckout />

      <>
        {session ? (
          <main>
            {cart.length > 0 ? (
              <Container>
                <h2>Informações de Endereço</h2>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="name">Nome:</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={address.name}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="street">Endereço:</Label>
                    <Input
                      type="text"
                      name="street"
                      id="street"
                      value={address.street}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="city">Cidade:</Label>
                    <Input
                      type="text"
                      name="city"
                      id="city"
                      value={address.city}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="state">Estado:</Label>
                    <Input
                      type="text"
                      name="state"
                      id="state"
                      value={address.state}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="zip">CEP:</Label>
                    <Input
                      type="text"
                      name="zip"
                      id="zip"
                      value={address.zip}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <Button type="submit" className="btns-checkout">
                    Enviar
                  </Button>
                </Form>
              </Container>
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
        ) : (
          <div className="d-flex align-items-center justify-content-center mt-4 flex-column">
            <div>
              <h3>Faça login para continuar comprando</h3>
            </div>
            <Button
              className="nav-link me-2 color-m btn-login-cart"
              onClick={() => signIn("google")}
            >
              Fazer Login
            </Button>
          </div>
        )}
      </>

      <Footer />
    </>
  );
};

export default Address;
