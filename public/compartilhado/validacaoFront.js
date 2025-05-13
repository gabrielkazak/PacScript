export async function validarCodigo(parametro, codigo) {

    const response = await fetch(`/api/validar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parametro, codigo }),
    });

    console.log(response)
    if (!response.ok) throw new Error("Erro ao validar");

    const resultado = await response.json();
    console.log("Resultado recebido:", resultado);

    return resultado;
}

