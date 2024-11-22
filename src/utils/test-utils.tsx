// __tests__/test-utils.tsx
import { render, RenderOptions } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import { CartContextProvider } from "@/hooks/useCart";
import { ReactElement } from "react";
import { act } from "react"; // importe o act diretamente do React

interface CustomRenderOptions extends RenderOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session?: any;
}

const customRender = (
  ui: ReactElement,
  { session, ...options }: CustomRenderOptions = {}
) => {
  let result;

  act(() => {
    // envolve a renderização em React.act
    result = render(
      <SessionProvider session={session}>
        <CartContextProvider>{ui}</CartContextProvider>
      </SessionProvider>,
      options
    );
  });

  return result;
};

export * from "@testing-library/react";
export { customRender as render };
