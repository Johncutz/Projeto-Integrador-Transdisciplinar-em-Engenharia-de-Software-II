import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { useCart } from "@/hooks/useCart";
import HeaderCheckout from "@/components/HeaderCheckout";
import Head from "next/head";
import ItemsCheckout from "@/components/ItemsCheckout";
import Footer from "@/components/Footer";
import {
  formatCardNumber,
  formatCardName,
  formatCardExpiry,
  formatCVV,
} from "@/utils/format";
import Link from "next/link";

const PaymentOptions: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    "creditCard"
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { finalizeOrder, cart } = useCart();

  const [creditCard, setCreditCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [debitCard, setDebitCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleInputChange = (
    field: string,
    value: string,
    cardType: "credit" | "debit"
  ) => {
    const formattedValue =
      field === "number"
        ? formatCardNumber(value)
        : field === "name"
        ? formatCardName(value)
        : field === "expiry"
        ? formatCardExpiry(value)
        : field === "cvv"
        ? formatCVV(value)
        : value;

    if (cardType === "credit") {
      setCreditCard((prev) => ({
        ...prev,
        [field]: formattedValue,
      }));
    } else {
      setDebitCard((prev) => ({
        ...prev,
        [field]: formattedValue,
      }));
    }
  };

  const validateForm = () => {
    const card = selectedOption === "creditCard" ? creditCard : debitCard;
    const { number, name, expiry, cvv } = card;

    const isValid =
      number.length === 19 &&
      name.trim().length > 0 &&
      expiry.length === 5 &&
      cvv.length >= 3 &&
      /^[0-9]{2}\/[0-9]{2}$/.test(expiry);

    setIsFormValid(isValid);
  };

  const handleConfirmPayment = () => {
    if (!isFormValid) return;
    setIsModalOpen(true);

    finalizeOrder();
  };

  const handlePix = () => {
    setIsModalOpen(true);

    finalizeOrder();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  React.useEffect(() => {
    validateForm();
  }, [creditCard, debitCard, selectedOption]);

  return (
    <>
      <Head>
        <title>Pagamento</title>
        <meta name="description" content="Pagamento" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderCheckout />

      <Container>
        {cart.length > 0 ? (
          <>
            <h2>Opções de Pagamento</h2>

            <div className="d-flex">
              <div className="d-flex flex-column wid-20">
                <Button
                  onClick={() => handleOptionChange("creditCard")}
                  className="mb-2 payment-method"
                >
                  Cartão de Crédito
                </Button>
                <Button
                  onClick={() => handleOptionChange("debitCard")}
                  className="mb-2 payment-method"
                >
                  Cartão de Débito
                </Button>
                <Button
                  onClick={() => handleOptionChange("pix")}
                  className="mb-2 payment-method"
                >
                  PIX
                </Button>
              </div>

              <div className="wid-50 ms-3">
                {selectedOption === "creditCard" && (
                  <Form>
                    <h4>Pagamento com Cartão de Crédito</h4>
                    <FormGroup>
                      <Label for="creditCardNumber">Número do Cartão:</Label>
                      <Input
                        type="text"
                        id="creditCardNumber"
                        value={creditCard.number}
                        onChange={(e) =>
                          handleInputChange("number", e.target.value, "credit")
                        }
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="creditCardName">Nome no Cartão:</Label>
                      <Input
                        type="text"
                        id="creditCardName"
                        value={creditCard.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value, "credit")
                        }
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="creditCardExpiry">Validade:</Label>
                      <Input
                        type="text"
                        id="creditCardExpiry"
                        value={creditCard.expiry}
                        onChange={(e) =>
                          handleInputChange("expiry", e.target.value, "credit")
                        }
                        required
                        placeholder="MM/AA"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="creditCardCVV">CVV:</Label>
                      <Input
                        type="text"
                        id="creditCardCVV"
                        value={creditCard.cvv}
                        onChange={(e) =>
                          handleInputChange("cvv", e.target.value, "credit")
                        }
                        required
                      />
                    </FormGroup>
                    <Button
                      className="btns-checkout"
                      onClick={handleConfirmPayment}
                      disabled={!isFormValid}
                    >
                      Confirmar Pagamento
                    </Button>
                  </Form>
                )}

                {selectedOption === "debitCard" && (
                  <Form>
                    <h4>Pagamento com Cartão de Débito</h4>
                    <FormGroup>
                      <Label for="debitCardNumber">Número do Cartão:</Label>
                      <Input
                        type="text"
                        id="debitCardNumber"
                        value={debitCard.number}
                        onChange={(e) =>
                          handleInputChange("number", e.target.value, "debit")
                        }
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="debitCardName">Nome no Cartão:</Label>
                      <Input
                        type="text"
                        id="debitCardName"
                        value={debitCard.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value, "debit")
                        }
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="debitCardExpiry">Validade:</Label>
                      <Input
                        type="text"
                        id="debitCardExpiry"
                        value={debitCard.expiry}
                        onChange={(e) =>
                          handleInputChange("expiry", e.target.value, "debit")
                        }
                        required
                        placeholder="MM/AA"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="debitCardCVV">CVV:</Label>
                      <Input
                        type="text"
                        id="debitCardCVV"
                        value={debitCard.cvv}
                        onChange={(e) =>
                          handleInputChange("cvv", e.target.value, "debit")
                        }
                        required
                      />
                    </FormGroup>
                    <Button
                      className="btns-checkout"
                      onClick={handleConfirmPayment}
                      disabled={!isFormValid}
                    >
                      Confirmar Pagamento
                    </Button>
                  </Form>
                )}

                {selectedOption === "pix" && (
                  <div>
                    <h4>Pagamento com PIX</h4>
                    <p>
                      Use o código abaixo para realizar o pagamento via PIX:
                    </p>
                    <p>
                      <strong>Código PIX: 1234-5678-90</strong>
                    </p>
                    <Button className="btns-checkout" onClick={handlePix}>
                      Confirmar Pagamento
                    </Button>
                  </div>
                )}
              </div>

              <div className="wid-30 ms-3">
                <div className="border">
                  <ItemsCheckout />
                </div>
              </div>
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
      </Container>

      <Footer />

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Aviso</ModalHeader>
        <ModalBody>
          Isso é apenas um projeto pessoal, não será cobrado nenhum pagamento.
        </ModalBody>
      </Modal>
    </>
  );
};

export default PaymentOptions;
