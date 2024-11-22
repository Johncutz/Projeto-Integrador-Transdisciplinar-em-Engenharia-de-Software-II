export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const formatCep = (value: string): string => {
  // Remove qualquer caractere não numérico
  let onlyNumbers = value.replace(/\D/g, "");

  // Limita o número de caracteres a 8
  if (onlyNumbers.length > 8) {
    onlyNumbers = onlyNumbers.substring(0, 8);
  }

  // Aplica a máscara para o formato 00000-000
  if (onlyNumbers.length > 5) {
    return onlyNumbers.replace(/(\d{5})(\d{1,3})/, "$1-$2");
  }

  return onlyNumbers;
};

export const formatCardNumber = (value: string): string => {
  let onlyNumbers = value.replace(/\D/g, "");

  // Limita o número de caracteres a 16
  if (onlyNumbers.length > 16) {
    onlyNumbers = onlyNumbers.substring(0, 16);
  }

  // Aplica a máscara para o formato 0000 0000 0000 0000
  return onlyNumbers.replace(/(\d{4})(?=\d)/g, "$1 ");
};

export const formatCardName = (value: string): string => {
  // Remove caracteres não alfabéticos
  return value.replace(/[^a-zA-Z\s]/g, "").toUpperCase();
};

export const formatCardExpiry = (value: string): string => {
  let onlyNumbers = value.replace(/\D/g, "");

  // Limita o número de caracteres a 4
  if (onlyNumbers.length > 4) {
    onlyNumbers = onlyNumbers.substring(0, 4);
  }

  // Aplica a máscara para o formato MM/AA
  if (onlyNumbers.length > 2) {
    return onlyNumbers.replace(/(\d{2})(\d{1,2})/, "$1/$2");
  }

  return onlyNumbers;
};

export const formatCVV = (value: string): string => {
  // Remove caracteres não numéricos e limita a 4 dígitos
  return value.replace(/\D/g, "").substring(0, 4);
};
