import { useState, useEffect } from "react";
import Address from "./cart/address";
import PaymentOptions from "./cart/payment";
import ProfileData from "./cart/profile";
import Head from "next/head";
import HeaderCheckout from "@/components/HeaderCheckout";

const Checkout = () => {
  const [currentSection, setCurrentSection] = useState<string>("profile");

  useEffect(() => {
    const handleHashChange = () => {
      const section = window.location.hash.replace("#", "") || "profile";
      setCurrentSection(section);
    };

    window.addEventListener("hashchange", handleHashChange);

    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const renderSection = () => {
    switch (currentSection) {
      case "address":
        return <Address />;
      case "payment":
        return <PaymentOptions />;
      case "profile":
      default:
        return <ProfileData />;
    }
  };

  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="checkout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderCheckout />

      <div>
        <h1>Checkout</h1>
        <div>
          <nav>
            <ul>
              <li>
                <a href="#profile">Perfil</a>
              </li>
              <li>
                <a href="#address">Endereço</a>
              </li>
              <li>
                <a href="#payment">Pagamento</a>
              </li>
            </ul>
          </nav>
        </div>

        {renderSection()}
      </div>
    </>
  );
};

export default Checkout;
