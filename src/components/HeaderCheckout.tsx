import Link from "next/link";
import { Navbar } from "reactstrap";
import { GiCupcake } from "react-icons/gi";

const HeaderCheckout = () => {
  return (
    <Navbar container="md">
      <div className="d-flex justify-content-center w-100">
        <Link href="/" passHref legacyBehavior>
          <a className="navbar-brand color-m d-flex align-center">
            <GiCupcake size={30} color="#000" />
            Cupcake Store
          </a>
        </Link>
      </div>
    </Navbar>
  );
};

export default HeaderCheckout;
