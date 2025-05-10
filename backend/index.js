import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { validarCodigoIA } from "./validarCodigo.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/validar/codigo", async (req, res) => {
    const { parametro, codigo } = req.body;
    const result = await validarCodigoIA(parametro, codigo);

    const flags = result;

    res.json(flags);
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
