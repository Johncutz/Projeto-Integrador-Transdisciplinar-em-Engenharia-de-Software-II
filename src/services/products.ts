// src/services/products.ts

export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export type PurchaseType = {
  items: ProductType[];
  user: {
    name: string;
    email: string;
  };
};

export const fetchProducts = async () => {
  const products: ProductType[] = await fetch(
    `${process.env.NEXT_PUBLIC_APIURL}/api/products`
  ).then((res) => res.json());
  return products;
};

export const fetchProduct = async (id: string | number) => {
  const product: ProductType = await fetch(
    `${process.env.NEXT_PUBLIC_APIURL}/api/products/${id}`
  ).then((res) => res.json());
  return product;
};
