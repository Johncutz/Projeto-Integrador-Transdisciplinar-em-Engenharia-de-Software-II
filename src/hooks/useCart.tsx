import { ProductType, PurchaseType } from "@/services/products";
import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from "react";
import { useSession } from "next-auth/react";

type CartContextType = {
  cart: ProductType[];
  purchase: PurchaseType[];
  addProduct: (product: ProductType) => void;
  removeProduct: (productId: number) => void;
  removeAllProducts: (productId: number) => void;
  getUniqueProductCount: () => number;
  finalizeOrder: () => void;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartContextProvider = (props: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [cart, setCart] = useState<ProductType[]>([]);
  const [purchase, setPurchase] = useState<PurchaseType[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("shopping-cart");

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (session) {
      const purchaseList = localStorage.getItem(
        `order-${session?.user?.email}`
      );

      if (purchaseList) {
        setPurchase(JSON.parse(purchaseList).items);
      }
    }
  }, [session]);

  const addProduct = (product: ProductType) => {
    const updatedCart = [...cart, product];
    localStorage.setItem("shopping-cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const removeProduct = (productId: number) => {
    const productIndex = cart.findIndex((product) => product.id === productId);

    if (productIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(productIndex, 1);
      localStorage.setItem("shopping-cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  const removeAllProducts = (productId: number) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    localStorage.setItem("shopping-cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const getUniqueProductCount = () => {
    const uniqueProductIds = new Set(cart.map((product) => product.id));
    return uniqueProductIds.size;
  };

  const finalizeOrder = async () => {
    if (!session) {
      alert("Você precisa estar logado com o Google para finalizar o pedido.");
      return;
    }

    const previousOrder = localStorage.getItem(`order-${session.user?.email}`);
    const parsedOrder = previousOrder
      ? JSON.parse(previousOrder)
      : { user: session.user, items: [] };

    const updatedItems = [...parsedOrder.items, cart];

    const updatedOrder = {
      ...parsedOrder,
      items: updatedItems,
    };

    localStorage.setItem(
      `order-${session.user?.email}`,
      JSON.stringify(updatedOrder)
    );

    setCart([]);
    localStorage.removeItem("shopping-cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        removeAllProducts,
        getUniqueProductCount,
        finalizeOrder,
        purchase,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
