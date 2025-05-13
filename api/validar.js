import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    const { parametro, codigo } = req.body;

    try {
        const { text } = await generateText({
            model: openai.chat("gpt-4o"),
            messages: [
                { role: "system", content: parametro },
                { role: "user", content: codigo },
            ],
        });

        console.log("Resposta da IA:", text);
        const parsed = JSON.parse(text);
        return res.status(200).json(parsed);

    } catch (error) {
        console.error("Erro ao validar:", error);
        return res.status(500).json([false, false]);
    }
}
