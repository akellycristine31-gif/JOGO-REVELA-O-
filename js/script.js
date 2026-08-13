// ========================================
// CONTAGEM REGRESSIVA - CHÁ REVELAÇÃO
// 05/09/2026 às 16:00
// ========================================

const dataEvento = new Date(2026, 8, 5, 16, 0, 0);

function atualizarContador() {

    const agora = new Date();

    const distancia = dataEvento - agora;

    if (distancia <= 0) {
        document.getElementById("dias").textContent = "00";
        document.getElementById("horas").textContent = "00";
        document.getElementById("minutos").textContent = "00";
        document.getElementById("segundos").textContent = "00";
        return;
    }

    const dias = Math.floor(
        distancia / (1000 * 60 * 60 * 24)
    );

    const horas = Math.floor(
        (distancia / (1000 * 60 * 60)) % 24
    );

    const minutos = Math.floor(
        (distancia / (1000 * 60)) % 60
    );

    const segundos = Math.floor(
        (distancia / 1000) % 60
    );

    document.getElementById("dias").textContent =
        String(dias).padStart(2, "0");

    document.getElementById("horas").textContent =
        String(horas).padStart(2, "0");

    document.getElementById("minutos").textContent =
        String(minutos).padStart(2, "0");

    document.getElementById("segundos").textContent =
        String(segundos).padStart(2, "0");
}

atualizarContador();

setInterval(atualizarContador, 1000);



// POPUP DE CONFIRMAÇÃO

const popupPresenca = document.getElementById("popup-overlay");
const botaoConfirmar = document.getElementById("botao-confirmar-presenca");
const fecharPopup = document.querySelector(".fechar-popup");
const formulario = document.querySelector(".form-presenca");


// ABRIR POPUP

botaoConfirmar.addEventListener("click", function () {

    popupPresenca.style.display = "flex";
    document.body.style.overflow = "hidden";

});


// FECHAR PELO X

fecharPopup.addEventListener("click", function () {

    popupPresenca.style.display = "none";
    document.body.style.overflow = "";

});

// ========================================
// ENVIO DA CONFIRMAÇÃO
// PREPARADO PARA O FIREBASE
// ========================================

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    // Pega os dados preenchidos no formulário
    const nome = document.getElementById("nome").value.trim();
    const quantidade = document.getElementById("quantidade").value;

    // Verifica se o nome foi preenchido
    if (nome === "") {
        alert("Por favor, digite seu nome.");
        return;
    }

    // Verifica se a quantidade foi preenchida
    if (quantidade === "" || quantidade < 1) {
        alert("Por favor, informe a quantidade de pessoas.");
        return;
    }

    // Dados que serão enviados para o Firebase
    const dadosConfirmacao = {
        nome: nome,
        quantidade: Number(quantidade),
        dataConfirmacao: new Date().toISOString()
    };

    // POR ENQUANTO:
    // Apenas mostra os dados no console.
    // Amanhã vamos substituir esta parte pelo envio para o Firebase.

    console.log("Confirmação preparada:", dadosConfirmacao);

    // Mensagem temporária de teste
    alert("Dados preparados para envio!");

});

// ==========================================
// ESCOLHA DE FRALDAS - POPUP
// ==========================================

const botoesEscolher = document.querySelectorAll(".botao-escolher");

const popupFralda = document.getElementById("popup-fralda-overlay");
const fecharPopupFralda = document.getElementById("fechar-popup-fralda");

const tamanhoFraldaPopup = document.getElementById("tamanho-fralda-popup");
const quantidadeFraldaPopup = document.getElementById("quantidade-fralda-popup");

const diminuirFralda = document.getElementById("diminuir-fralda");
const aumentarFralda = document.getElementById("aumentar-fralda");

const confirmarFralda = document.getElementById("confirmar-fralda");


// GUARDA O TAMANHO ESCOLHIDO

let tamanhoSelecionado = "";


// GUARDA A QUANTIDADE

let quantidadeSelecionada = 1;


// ==========================================
// ABRIR POPUP
// ==========================================

botoesEscolher.forEach(function(botao) {

    botao.addEventListener("click", function() {

        const caixaFralda = botao.closest(".fralda-box");

        tamanhoSelecionado = caixaFralda
            .querySelector("h3")
            .textContent
            .trim();

        const textoMeta = caixaFralda.querySelector("p").textContent;

        const meta = parseInt(textoMeta.match(/\d+/)[0]);


        // Começa sempre com 1

        quantidadeSelecionada = 1;

        quantidadeFraldaPopup.textContent = quantidadeSelecionada;

        tamanhoFraldaPopup.textContent = tamanhoSelecionado;


        // Guarda a meta da fralda

        popupFralda.dataset.meta = meta;


        // Abre o popup

        popupFralda.style.display = "flex";

        document.body.style.overflow = "hidden";

    });

});


// ==========================================
// BOTÃO +
// ==========================================

aumentarFralda.addEventListener("click", function() {

    const meta = Number(popupFralda.dataset.meta);

    if (quantidadeSelecionada < meta) {

        quantidadeSelecionada++;

        quantidadeFraldaPopup.textContent = quantidadeSelecionada;

    } else {

        alert(`A quantidade máxima é de ${meta} pacotes.`);

    }

});


// ==========================================
// BOTÃO -
// ==========================================

diminuirFralda.addEventListener("click", function() {

    if (quantidadeSelecionada > 1) {

        quantidadeSelecionada--;

        quantidadeFraldaPopup.textContent = quantidadeSelecionada;

    }

});


// ==========================================
// FECHAR PELO X
// ==========================================

fecharPopupFralda.addEventListener("click", function() {

    popupFralda.style.display = "none";

    document.body.style.overflow = "";

});


// ==========================================
// CONFIRMAR ESCOLHA
// ==========================================

confirmarFralda.addEventListener("click", function() {

    const caixaFralda = [...document.querySelectorAll(".fralda-box")]
        .find(function(caixa) {

            return caixa.querySelector("h3").textContent.trim() === tamanhoSelecionado;

        });


    const textoMeta = caixaFralda.querySelector("p").textContent;

    const meta = parseInt(textoMeta.match(/\d+/)[0]);


    // Calcula a porcentagem

    const porcentagem =
        (quantidadeSelecionada / meta) * 100;


    // Atualiza a barra

    const barra =
        caixaFralda.querySelector(".barra-progresso");

    barra.style.width = porcentagem + "%";


    // Atualiza o botão

    const botao =
        caixaFralda.querySelector(".botao-escolher");

    botao.textContent =
        `ESCOLHIDO: ${quantidadeSelecionada} PACOTE${quantidadeSelecionada > 1 ? "S" : ""}`;


    // Desabilita o botão

    botao.disabled = true;


    // Fecha o popup

    popupFralda.style.display = "none";

    document.body.style.overflow = "";


    // Mensagem

    alert(
        `Você escolheu ${quantidadeSelecionada} pacote${quantidadeSelecionada > 1 ? "s" : ""} de fralda ${tamanhoSelecionado}.\n\nObrigado pelo carinho! ❤️`
    );

});
// ==========================================
// MENSAGENS AOS FUTUROS PAPAIS
// ==========================================

const nomeMensagem =
    document.getElementById("nome-mensagem");

const textoMensagem =
    document.getElementById("texto-mensagem");

const enviarMensagem =
    document.getElementById("enviar-mensagem");

const mensagensContainer =
    document.getElementById("mensagens-container");


enviarMensagem.addEventListener("click", function () {

    const nome = nomeMensagem.value.trim();

    const mensagem = textoMensagem.value.trim();


    // Verifica o nome

    if (nome === "") {

        alert("Por favor, digite seu nome.");

        return;

    }


    // Verifica a mensagem

    if (mensagem === "") {

        alert("Por favor, escreva uma mensagem.");

        return;

    }


    // Cria o cartão da mensagem

    const cartao = document.createElement("div");

    cartao.classList.add("mensagem-card");


    cartao.innerHTML = `

        <strong>${nome}</strong>

        <p>${mensagem}</p>

    `;


    // Coloca a mensagem na tela

    mensagensContainer.prepend(cartao);


    // Limpa os campos

    nomeMensagem.value = "";

    textoMensagem.value = "";


    // Mensagem temporária

    alert(
        "Sua mensagem foi enviada com carinho! ❤️"
    );

});
