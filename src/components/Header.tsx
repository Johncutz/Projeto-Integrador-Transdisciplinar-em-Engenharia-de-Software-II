import { useState } from "react";
import Link from "next/link";
import {
  Nav,
  Navbar,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import MiniCartModal from "./MiniCartModal";
import { useCart } from "@/hooks/useCart";
import { useSession, signIn, signOut } from "next-auth/react";
import { FiShoppingCart } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { GiCupcake } from "react-icons/gi";

const Header = () => {
  const { getUniqueProductCount } = useCart();
  const { data: session, status } = useSession();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropDown = () => setDropdownOpen((prevState) => !prevState);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <Navbar container="md">
      <Link href="/" passHref legacyBehavior>
        <a className="navbar-brand color-m d-flex align-center">
          <GiCupcake size={30} color="#000" />
          Cupcake Store
        </a>
      </Link>
      <Nav className="flex-row" navbar>
        <Link href="/products" passHref legacyBehavior>
          <a className="nav-link me-2 color-m">Produtos</a>
        </Link>
        <Button
          className="nav-link me-2 color-m"
          color="none"
          onClick={toggleCart}
        >
          <div>
            <FiShoppingCart size={24} color="#000" />
            {getUniqueProductCount() > 0 && (
              <span className="number-minicart">{getUniqueProductCount()}</span>
            )}
          </div>
        </Button>

        <MiniCartModal isOpen={isCartOpen} toggle={toggleCart} />

        {status === "loading" ? (
          <></>
        ) : session ? (
          <div className="d-flex">
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown}>
              <DropdownToggle className="btn-perfil" caret>
                <FiUser size={24} color="#000" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Olá, {session?.user?.name}</DropdownItem>
                <DropdownItem>
                  <Link href="/login">Acessar Perfil</Link>
                </DropdownItem>
                <DropdownItem onClick={() => signOut()}>Sair</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        ) : (
          <Button
            className="nav-link me-2 color-m btn-login"
            onClick={() => signIn("google")}
          >
            <FiUser size={24} color="#000" />
          </Button>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
