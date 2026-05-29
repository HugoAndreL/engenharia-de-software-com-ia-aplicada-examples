# LLMs: Large Language Model's
As LLMs são modelos de Linguagem pré-treinados como o [Chat **GPT**: **G**enerative **P**re-treined **T**ransformer](https://chatgpt.com/), etc.
Os LLMs usam o **Modelo de geração de texto**, que constitui:

- **Generative** (gerador):
Gera o texto token por token.

- **Pre-treined** (pré-treinado):
Antes de virar o *"assistente"*, ele é treinado com uma quantidade enorme de texto para aprender padrões gerais da linguagem.

- **Transformer**:
É a arquitetura usada por dentro, famosa por conseguir *"prestar atenção"* em partes importantes do texto **(attention)**.

E ele pensa usando essas 4 logicas:

1. **Tokenização**:
O texto é quebrado em *tokens*.
    > Tokens em LLMs: Penquenas partes de palavras.
    >
    > Exemplo:
    >
    > ![Tokenização: Exemplo](./img/Tokenização%20-%20Exemplo.png)
    >
    > *Cada cor separada que está nos texto são diferentes tokens*

2. **Embeddings**:
Cada token que é gerado vira um dado numérico e inserido em um vetor:
![Embeddings: Exemplo](./img/Embeddings%20-%20Exemplo.png)
Esse vetor é como uma cordenada que carregam o significado aproximado e ajuda o modelo a dar as similiaridades.
Palavras utilizadas de forma parecida ficam próximas nesse espaço.
Relações frequentes viram direções no vetor.
    > Exemplo: rei - homem + mulher ≈ rainha
    > Sendo as **direção de genero** (homem e mulher) e a **direção de realeza** (rei/rainha, principe/princesa)
    > Sendo assim:
    > - rei - home = realeza
    > - realeza + homem = rei
    > Aprendendo que rei e rainha aparecem em contextos muito parecidos, mas diferem na dimensão/**"direção"** associada a masculino e feminino.
Assim, o modelo irá consegir entender relações.

**Ideia simples**:

- Palavras com usos parecidos ficam perto no espaço vetorial.
  > Exemplo: carro e veículo ficam próximas.
- Palavras com usos diferentes ficam distantes.
  > Exemplo: carro e banana ficam distantes.

- **O que isso significa?**:
O embedding captura semelhança de contexto e associação semântica.
    > Exemplo: médico e hospital não são a mesma coisa, mas aparecem juntos e ficam relacionados.


3. **Transformer processa o contexto**:
Processa os tokens e os tokens em vetores (**embeddings**) usando as **atentions**, gerando um token melhorado
    > Attentions: o peso gerado por cada palavra dita
    > Exemplo: o **gato** sentou no *tapete* porque estava **cansado**.
    > Se não existisse as embeddings o modelo acharia que foi o tapete que se cansou.
    >
    > [IA Burra](https://www.youtube.com/watch?v=3l0dh4ncfew)

4. O modelo gera varias predições para o proximo token
    > Exemplo:
    > O Céu é:
    > 1. azul - Probabilidade de 0,55
    > 2. nublado - Probabilidade de 0,18
    > 3. claro - Probabilidade de 0,10
    > 4. bonito - Probabilidade de 0,07

E decisão depende do método de **decodding** que, geralmente é configurado antes de ser executado um prompt.
Os Parametro para ser configurado um prompt são:

- **Temperature**: controla o nível de aleatoriedade na escolha do próximo token.
Baixa: mais previsível, mais segura e determinística.
Alta: mais variada e criativa, mas menos previsível.

- **TopK**: limita o modelo a considerar só os K tokens mais prováveis.
Exemplo: top-k = 3 significa que ele escolhe entre os 3 mais prováveis, evitando opções muito improváveis.

- **TopP**: também chamado de nucleus sampling.
Em vez de limitar por quantidade fixa, ele considera os tokens cuja soma das probabilidades chega até um limite, por exemplo 0,9. Assim, inclui apenas o conjunto mais provável até atingir essa confiança.

5. Definição do próximo Token (Sampling).

Por isso, o custo e o tempo crescem com a quantidade de tokens
