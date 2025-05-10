export async function validarCodigo(parametro, codigo) {

    console.log(codigo)
    console.log(parametro)

    const response = await fetch("http://localhost:3000/validar/codigo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parametro, codigo }),
    });

    if (!response.ok) throw new Error("Erro ao validar");

    const resultado = await response.json();
    console.log("Resultado recebido:", resultado);

    return resultado; // retorna tudo que o back enviar
}

