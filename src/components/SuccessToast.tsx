import { Toast, ToastBody, CloseButton } from "reactstrap";

const SuccessToast = (props: {
  toastIsOpen: boolean;
  setToastIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <Toast
      className="bg-dark text-white fixed-bottom ms-auto me-4 mb-4"
      isOpen={props.toastIsOpen}
      fade
    >
      <ToastBody className="d-flex justify-content-between">
        Produto adicionado ao carrinho.
        <CloseButton
          className="btn-close-white"
          onClick={() => props.setToastIsOpen(false)}
        ></CloseButton>
      </ToastBody>
    </Toast>
  );
};

export default SuccessToast;
