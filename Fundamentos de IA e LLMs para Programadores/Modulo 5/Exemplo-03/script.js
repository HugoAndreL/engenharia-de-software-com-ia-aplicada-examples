const statusCard = document.getElementById("status-card");
const statusBadge = document.getElementById("status-badge");
const statusText = document.getElementById("status-text");
const sessionEl = document.getElementById("session");

(async () => {
    const status = await LanguageModel.availability();
    let color = "#000000";
    let text = "Descrição: ";
    switch (status) {
        case "unavailable":
            text += "\nO dispositivo do usuário ou as opções de sessão solicitadas não são compatíveis.\nO dispositivo pode ter energia ou espaço em disco insuficientes.";
            color = "#EF4444"; // Vermelho suave (Erro)
            break;
        case "downloadable":
            text += "\nSão necessários downloads adicionais para criar uma sessão, que pode incluir um modelo especializado, um modelo de linguagem ou ajuste fino. A ativação do usuário pode ser necessária para chamar create().";
            color = "#3B82F6"; // Azul (Ação disponível)
            break;
        case "downloading":
            text += "\nOs downloads estão em andamento e precisam ser concluídos antes que você possa usar uma sessão.";
            color = "#F59E0B"; // Laranja/Âmbar (Em andamento)
            break;
        case "available":
            text += "\nVocê pode criar uma sessão imediatamente.";
            color = "#10B981"; // Verde esmeralda (Pronto/Sucesso)
            break;
    }

    statusBadge.textContent = status;
    statusBadge.style.backgroundColor = color;
    statusText.innerText = text;

    const chatCard = document.querySelector('.chat-card:not(#status-card)');

    if (status === "available") {
        // Oculta o card de status e exibe o chat
        statusCard.style.display = 'none';
        chatCard.style.display = 'block';
    } else {
        // Exibe o card de status e oculta o chat
        statusCard.style.display = 'flex';
        chatCard.style.display = 'none';
        return;
    }

    const temperature = 1;
    const topK = 3;

    // Geralmente é usado 2 roles, a de sistema dizendo oque a IA irá fazer, e uma de user com a pergunta solicitada.   
    const initialPrompts = [
        {
            role: 'system',
            content: 'Prazer, sou um assistente de IA que responde de forma clara e objetiva.'
        }
    ];

    const questionCSharp = "Como surgiu o c#";
    const session = await LanguageModel.create({
        expectdInputLanguages: ["pt"],
        temperature,
        topK,
        initialPrompts
    });

    const responseStream = await session.promptStreaming([
        {
            role: 'user',
            content: questionCSharp
        }
    ])

    let fullText = "";
    for await (const token of responseStream) {
        console.log(`Esse são os tokens gerados pela minha IA.\n${token}`);
        fullText += token;
        sessionEl.innerHTML = markdown.toHtml(fullText);
    }
})();
