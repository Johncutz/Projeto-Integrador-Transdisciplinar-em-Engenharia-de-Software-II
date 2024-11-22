// __tests__/Home.test.tsx
import { screen } from "@testing-library/react";
import Home from "@/pages";
import { render } from "../src/utils/test-utils";
import "@testing-library/jest-dom";

const mockSession = {
  user: { name: "Usuário Teste", email: "test@example.com" },
  expires: "2025-01-01T00:00:00.000Z",
};

describe("Home Page", () => {
  it("deve renderizar o título da página corretamente", () => {
    render(<Home />);
    expect(
      screen.getByText("O melhor cupcake do mundo!!!")
    ).toBeInTheDocument();
  });

  it("deve exibir a imagem principal do banner", () => {
    render(<Home />);
    const mainBanner = screen.getByAltText("Banner Principal");
    expect(mainBanner).toBeInTheDocument();
  });

  it("deve exibir o texto sobre os cupcakes na página", () => {
    render(<Home />);
    const descriptionText = screen.getByText(
      /Na nossa loja de cupcakes, cada bolinho/i
    );
    expect(descriptionText).toBeInTheDocument();
  });

  it("deve renderizar o botão para conhecer os produtos", () => {
    render(<Home />);
    const button = screen.getByRole("button", {
      name: /conheça nossos produtos/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("deve exibir a imagem dos cupcakes adicionais", () => {
    render(<Home />, { session: mockSession });
    const cupcakeImage = screen.getByAltText("Vários cupcakes");
    expect(cupcakeImage).toBeInTheDocument();
  });
});
