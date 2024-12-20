import { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../utils/firebase";
import { ref, get, child } from "firebase/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Referência ao nó "cupcakes" no Firebase
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, "cupcakes"));

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Nenhum cupcake encontrado." });
    }

    // Convertendo o objeto retornado em um array
    const cupcakes = Object.values(snapshot.val());

    res.status(200).json(cupcakes);
  } catch (error) {
    console.error("Erro ao buscar cupcakes:", error);
    res.status(500).json({ error: "Erro ao buscar cupcakes" });
  }
}
