import { Offcanvas, OffcanvasHeader, OffcanvasBody, Button } from "reactstrap";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import MiniCartTable from "./MiniCartTable";
import { formatCurrency } from "@/utils/format";
import { formatCep } from "@/utils/format";
import { useState, useEffect } from "react";

interface MiniCartModal {
  isOpen: boolean;
  toggle: () => void;
}

const MiniCartModal = ({ isOpen, toggle }: MiniCartModal) => {
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

  return (
    <>
      <Offcanvas isOpen={isOpen} toggle={toggle} direction="end">
        <OffcanvasHeader toggle={toggle}>Carrinho de Compras</OffcanvasHeader>
        <OffcanvasBody>
          {cart.length > 0 ? (
            <div className="d-flex justify-content-between flex-column h-100">
              <MiniCartTable />

              <div className="minicart-total">
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

                <div>
                  <div className="d-flex justify-content-between">
                    <strong>Frete:</strong>
                    {freeShipping ? (
                      <span>Grátis</span>
                    ) : (
                      <span>Calcular Frete</span>
                    )}
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

                <div className="d-flex justify-content-between w-100 h-auto">
                  <div className="w-100 m-1">
                    <Link href="/products" passHref legacyBehavior>
                      <a className="nav-link me-2 w-50 h-100 w-100">
                        <Button
                          className="btn-continue-shopping"
                          outline
                          onClick={toggle}
                        >
                          Continuar Comprando
                        </Button>
                      </a>
                    </Link>
                  </div>
                  <div className="w-100 m-1">
                    <Link href="/cart" passHref legacyBehavior>
                      <a className="nav-link me-2 w-50 h-100 w-100">
                        <Button className="d-block w-100 h-100 btn-checkout">
                          Finalizar Compra
                        </Button>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <p>Seu carrinho está vazio!</p>
              <Link href="/products" passHref legacyBehavior>
                <a className="nav-link me-2">
                  <Button color="secondary" onClick={toggle}>
                    Continuar comprando!
                  </Button>
                </a>
              </Link>
            </>
          )}
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
};

export default MiniCartModal;
