import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function validarCodigoIA(parametro, codigo) {
    try {
        const { text } = await generateText({
            model: openai.chat("gpt-4o"),
            messages: [
                {
                    role: "system",
                    content: parametro
                },
                {
                    role: "user",
                    content: codigo,
                },
            ],
        });

        console.log("Resposta bruta da IA:", text);
        return JSON.parse(text);
    } catch (error) {
        console.error("Erro ao interpretar resposta vinda da IA", error);
        return [false, false];
    }
}