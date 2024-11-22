import { Card, CardBody, CardFooter } from "reactstrap";
import { useCart } from "../hooks/useCart";
import Link from "next/link";
import { Nav, Button } from "reactstrap";
import { formatCurrency, formatCep } from "@/utils/format";
import { useState, useEffect } from "react";

const CartTotal = () => {
  const { cart } = useCart();
  const [cep, setCep] = useState("");
  const [errorCep, setErrorCep] = useState(false);
  const [freeShipping, setFreeShipping] = useState(false);

  useEffect(() => {
    const storedCep = localStorage.getItem("cep");
    if (storedCep) {
      setCep(storedCep);
      setFreeShipping(/^\d{5}-\d{3}$/.test(storedCep));
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCep = formatCep(event.target.value);
    setCep(formattedCep);
  };

  const handleOkClick = () => {
    const cepRegex = /^\d{5}-\d{3}$/;
    if (cepRegex.test(cep)) {
      setFreeShipping(true);
      setErrorCep(false);
      localStorage.setItem("cep", cep);
    } else {
      setErrorCep(true);
      setFreeShipping(false);
    }
  };

  const handleFinalizeClick = (e: { preventDefault: () => void }) => {
    const cepRegex = /^\d{5}-\d{3}$/;
    if (!cepRegex.test(cep)) {
      e.preventDefault();
      setErrorCep(true);
    }
  };

  return (
    <Card className="w-30 bg-page">
      <CardBody>
        <div>
          <div>
            <div>
              <label htmlFor="shipping-input">CALCULE SEU FRETE</label>
              <div>
                <div className="d-flex justify-content-between shipping-input-container">
                  <div className="input-container">
                    <input
                      type="text"
                      id="shipping-input"
                      placeholder="Digite aqui seu CEP"
                      value={cep}
                      onChange={handleChange}
                      maxLength={9}
                    />
                    {errorCep && <p>Erro: CEP inválido.</p>}
                  </div>
                  <button
                    type="button"
                    className="test-class-btn btn-shipping"
                    onClick={handleOkClick}
                  >
                    OK
                  </button>
                </div>
              </div>
              <div>
                <a
                  href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                  target="_blank"
                  rel="noreferrer"
                >
                  Não sabe seu CEP?
                </a>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="d-flex justify-content-between">
            <strong>Frete:</strong>
            {freeShipping ? <span>Grátis</span> : <span>Calcular Frete</span>}
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <strong>Total:</strong>
          <span>
            {formatCurrency(
              cart.reduce((total, product) => total + +product.price, 0)
            )}
          </span>
        </div>
      </CardBody>
      <CardFooter>
        <Nav
          className="flex-row ms-auto d-flex justify-content-between w-100"
          navbar
        >
          <Link href="/products" passHref legacyBehavior>
            <a className="nav-link me-2 w-50">
              <Button
                color="secondary"
                outline
                className="btn-continue-shopping"
              >
                Continuar comprando
              </Button>
            </a>
          </Link>
          <Link href="/cart/address" passHref legacyBehavior>
            <a className="nav-link w-50">
              <Button
                className="btn-checkout"
                color="secondary"
                onClick={handleFinalizeClick}
              >
                Finalizar Compra
              </Button>
            </a>
          </Link>
        </Nav>
      </CardFooter>
    </Card>
  );
};

export default CartTotal;
