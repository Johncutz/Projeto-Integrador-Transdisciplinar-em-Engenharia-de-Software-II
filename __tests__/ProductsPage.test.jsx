// __tests__/ProductsPage.test.jsx
import { render, screen, fireEvent } from "./test-utils";
import Products from "../pages/products";
import ProductsList from "../components/ProductsList";
import ProductCard from "../components/ProductCard";

// Mock do hook useCart para simular a função de adicionar ao carrinho
jest.mock("@/hooks/useCart", () => ({
  useCart: jest.fn(),
}));

const mockAddProduct = jest.fn();
(useCart).mockReturnValue({ addProduct: mockAddProduct });

// Dados de exemplo para os produtos
const mockProducts = [
  {
    id: 1,
    name: "Cupcake de Chocolate",
    imageUrl: "/assets/chocolate-cupcake.jpg",
    price: 5.99,
    description: ""
  },
  {
    id: 2,
    name: "Cupcake de Morango",
    imageUrl: "/assets/strawberry-cupcake.jpg",
    price: 6.99,
    description: ""
  },
];

describe("Products Page", () => {
  it("deve renderizar o título da página", () => {
    render(<Products products={mockProducts} />);
    expect(screen.getByText("Nossos Produtos")).toBeInTheDocument();
  });

  it("deve exibir a lista de produtos", () => {
    render(<Products products={mockProducts} />);
    const productNames = mockProducts.map((product) => product.name);
    productNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it("deve chamar o getStaticProps e retornar os produtos corretamente", async () => {
    const { props } = await getStaticProps({});
    expect(props).toHaveProperty("products");
    expect(Array.isArray(props.products)).toBe(true);
  });
});

describe("ProductsList Component", () => {
  it("deve renderizar cada produto na lista", () => {
    render(<ProductsList products={mockProducts} />);
    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(`R$ ${product.price.toFixed(2)}`)).toBeInTheDocument();
    });
  });
});

describe("ProductCard Component", () => {
  const mockProduct = mockProducts[0];

  it("deve exibir o nome, imagem e preço do produto", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText("R$ 5,99")).toBeInTheDocument();
    const productImage = screen.getByAltText(mockProduct.name);
    expect(productImage).toBeInTheDocument();
  });

  it("deve adicionar o produto ao carrinho ao clicar no botão", () => {
    render(<ProductCard product={mockProduct} />);
    const addButton = screen.getByRole("button", { name: /adicionar ao carrinho/i });
    fireEvent.click(addButton);
    expect(mockAddProduct).toHaveBeenCalledWith(mockProduct);
  });
});
