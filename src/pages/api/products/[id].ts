// import { NextApiRequest, NextApiResponse } from "next";
// import products from '../../../../database.json'

// export default function handler(req:NextApiRequest , res:NextApiResponse) {
//     const {id} = req.query

//     const product = products.find(prod => prod.id === Number(id))
//     res.status(200).json(product)
// }

// import { NextApiRequest, NextApiResponse } from "next";
// import pool from '../../../utils/db';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;

//   if (!id) {
//       return res.status(400).json({ error: 'ID do produto é necessário' });
//   }

//   try {
//       const result = await pool.query('SELECT * FROM cupcakes WHERE id = $1', [Number(id)]);

//       if (result.rows.length === 0) {
//           return res.status(404).json({ error: 'Produto não encontrado' });
//       }

//       const product = result.rows[0];
//       res.status(200).json(product);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Erro ao buscar o produto' });
//   }
// }

import { NextApiRequest, NextApiResponse } from "next";
import { database } from "../../../utils/firebase";
import { ref, get, child } from "firebase/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "ID do produto é necessário" });
  }

  try {
    // Referência ao nó "cupcakes" no Firebase
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `cupcakes/${id}`));

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    // Obter os dados do produto específico
    const product = snapshot.val();

    res.status(200).json(product);
  } catch (error) {
    console.error("Erro ao buscar o produto:", error);
    res.status(500).json({ error: "Erro ao buscar o produto" });
  }
}
