import React, { useState } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Head from "next/head";
import HeaderCheckout from "@/components/HeaderCheckout";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  cpf: string;
}

const ProfileData: React.FC = () => {
  const { cart } = useCart();

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    cpf: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      personalInfo.name &&
      personalInfo.email &&
      personalInfo.phone &&
      personalInfo.birthDate &&
      personalInfo.cpf
    ) {
      console.log("Informações pessoais enviadas:", personalInfo);
      router.push("/cart/payment");
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  };

  return (
    <>
      <Head>
        <title>Dados Pessoais</title>
        <meta name="description" content="Dados Pessoais" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderCheckout />

      {cart.length > 0 ? (
        <Container>
          <h2>Dados Pessoais</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Nome:</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={personalInfo.name}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={personalInfo.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="phone">Telefone:</Label>
              <Input
                type="tel"
                name="phone"
                id="phone"
                value={personalInfo.phone}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="birthDate">Data de Nascimento:</Label>
              <Input
                type="date"
                name="birthDate"
                id="birthDate"
                value={personalInfo.birthDate}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="cpf">CPF:</Label>
              <Input
                type="text"
                name="cpf"
                id="cpf"
                value={personalInfo.cpf}
                onChange={handleChange}
                required
                placeholder="XXX.XXX.XXX-XX"
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

      <Footer />
    </>
  );
};

export default ProfileData;
