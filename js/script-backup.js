// ==========================================
// FIREBASE
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDuQO89U-bVhWG_wty7LlXobXxRW-WsRAQ",
    authDomain: "cha-de-bebe-68275.firebaseapp.com",
    projectId: "cha-de-bebe-68275",
    storageBucket: "cha-de-bebe-68275.firebasestorage.app",
    messagingSenderId: "816690613085",
    appId: "1:816690613085:web:f2542ed77b7e09b42d76b4",
    measurementId: "G-43YG1L95N0"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// ==========================================
// VARIÁVEIS DAS FRALDAS
// ==========================================

// Aqui ficam guardados todos os tamanhos escolhidos
const fraldasEscolhidas = {};


// ==========================================
// CONTAGEM REGRESSIVA
// 05/09/2026 às 16:00
// ==========================================

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


// ==========================================
// POPUP DE CONFIRMAÇÃO
// ==========================================

const popupPresenca =
    document.getElementById("popup-overlay");

const botaoConfirmar =
    document.getElementById("botao-confirmar-presenca");

const fecharPopup =
    document.querySelector(".fechar-popup");

const formulario =
    document.querySelector(".form-presenca");


// ==========================================
// ABRIR POPUP DE PRESENÇA
// ==========================================

botaoConfirmar.addEventListener("click", function () {

    popupPresenca.style.display = "flex";

    document.body.style.overflow = "hidden";

});


// ==========================================
// FECHAR POPUP DE PRESENÇA
// ==========================================

fecharPopup.addEventListener("click", function () {

    popupPresenca.style.display = "none";

    document.body.style.overflow = "";

});


// ==========================================
// ENVIO DA CONFIRMAÇÃO PARA O FIREBASE
// ==========================================

formulario.addEventListener("submit", async function (event) {

    event.preventDefault();


    const nome =
        document.getElementById("nome").value.trim();


    const quantidade =
        document.getElementById("quantidade").value;


    // Verifica o nome

    if (nome === "") {

        alert("Por favor, digite seu nome.");

        return;
    }


    // Verifica quantidade

    if (quantidade === "" || Number(quantidade) < 1) {

        alert("Por favor, informe a quantidade de pessoas.");

        return;
    }


    // ==========================================
    // MONTA OS DADOS DA CONFIRMAÇÃO
    // ==========================================

    const dadosConfirmacao = {

        nome: nome,

        quantidade: Number(quantidade),

        fraldas: { ...fraldasEscolhidas },

        dataConfirmacao: new Date().toISOString()

    };


    console.log(
        "DADOS QUE SERÃO ENVIADOS:",
        dadosConfirmacao
    );


    try {

        await addDoc(
            collection(db, "confirmacoes"),
            dadosConfirmacao
        );


        alert(
            "Presença confirmada com sucesso! ❤️\n\nObrigado por confirmar!"
        );


        // Limpa o formulário

        formulario.reset();


        // Fecha o popup

        popupPresenca.style.display = "none";

        document.body.style.overflow = "";


    } catch (erro) {

        console.error(
            "Erro ao salvar confirmação:",
            erro
        );


        alert(
            "Não foi possível confirmar sua presença agora. Tente novamente."
        );

    }

});


// ==========================================
// ESCOLHA DE FRALDAS
// VÁRIOS TAMANHOS
// ==========================================

const botoesEscolher =
    document.querySelectorAll(".botao-escolher");


const popupFralda =
    document.getElementById("popup-fralda-overlay");


const fecharPopupFralda =
    document.getElementById("fechar-popup-fralda");


const tamanhoFraldaPopup =
    document.getElementById("tamanho-fralda-popup");


const quantidadeFraldaPopup =
    document.getElementById("quantidade-fralda-popup");


const diminuirFralda =
    document.getElementById("diminuir-fralda");


const aumentarFralda =
    document.getElementById("aumentar-fralda");


const confirmarFralda =
    document.getElementById("confirmar-fralda");


let tamanhoSelecionado = "";

let quantidadeSelecionada = 1;


// ==========================================
// ABRIR POPUP DA FRALDA
// ==========================================

botoesEscolher.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const caixaFralda =
            botao.closest(".fralda-box");


        tamanhoSelecionado =
            caixaFralda
                .querySelector("h3")
                .textContent
                .trim();


        const textoMeta =
            caixaFralda
                .querySelector("p")
                .textContent;


        const meta =
            parseInt(textoMeta.match(/\d+/)[0]);


        // Se já escolheu esse tamanho,
        // mostra a quantidade anterior

        quantidadeSelecionada =
            fraldasEscolhidas[tamanhoSelecionado] || 1;


        quantidadeFraldaPopup.textContent =
            quantidadeSelecionada;


        tamanhoFraldaPopup.textContent =
            tamanhoSelecionado;


        popupFralda.dataset.meta =
            meta;


        popupFralda.style.display =
            "flex";


        document.body.style.overflow =
            "hidden";

    });

});


// ==========================================
// AUMENTAR QUANTIDADE
// ==========================================

aumentarFralda.addEventListener("click", function () {

    const meta =
        Number(popupFralda.dataset.meta);


    if (quantidadeSelecionada < meta) {

        quantidadeSelecionada++;


        quantidadeFraldaPopup.textContent =
            quantidadeSelecionada;

    } else {

        alert(
            `A quantidade máxima é de ${meta} pacotes.`
        );

    }

});


// ==========================================
// DIMINUIR QUANTIDADE
// ==========================================

diminuirFralda.addEventListener("click", function () {

    if (quantidadeSelecionada > 1) {

        quantidadeSelecionada--;


        quantidadeFraldaPopup.textContent =
            quantidadeSelecionada;

    }

});


// ==========================================
// FECHAR POPUP DA FRALDA
// ==========================================

fecharPopupFralda.addEventListener("click", function () {

    popupFralda.style.display =
        "none";


    document.body.style.overflow =
        "";

});


// ==========================================
// CONFIRMAR ESCOLHA DA FRALDA
// ==========================================

confirmarFralda.addEventListener("click", function () {

    const caixasFralda =
        [...document.querySelectorAll(".fralda-box")];


    const caixaFralda =
        caixasFralda.find(function (caixa) {

            return caixa
                .querySelector("h3")
                .textContent
                .trim() === tamanhoSelecionado;

        });


    if (!caixaFralda) {

        alert(
            "Não foi possível identificar o tamanho da fralda."
        );

        return;
    }


    const textoMeta =
        caixaFralda
            .querySelector("p")
            .textContent;


    const meta =
        parseInt(textoMeta.match(/\d+/)[0]);


    // ==========================================
    // GUARDA A ESCOLHA
    // ==========================================

    fraldasEscolhidas[tamanhoSelecionado] =
        quantidadeSelecionada;


    console.log(
        "FRALDAS ESCOLHIDAS:",
        fraldasEscolhidas
    );


    // ==========================================
    // ATUALIZA BARRA DE PROGRESSO
    // ==========================================

    const porcentagem =
        (quantidadeSelecionada / meta) * 100;


    const barra =
        caixaFralda
            .querySelector(".barra-progresso");


    barra.style.width =
        porcentagem + "%";


    // ==========================================
    // ATUALIZA BOTÃO
    // ==========================================

    const botao =
        caixaFralda
            .querySelector(".botao-escolher");


    botao.textContent =
        `ESCOLHIDO: ${quantidadeSelecionada} PACOTE${quantidadeSelecionada > 1 ? "S" : ""}`;


    // Permite alterar novamente

    botao.disabled = false;


    // ==========================================
    // FECHA POPUP
    // ==========================================

    popupFralda.style.display =
        "none";


    document.body.style.overflow =
        "";


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

    const nome =
        nomeMensagem.value.trim();


    const mensagem =
        textoMensagem.value.trim();


    // Verifica nome

    if (nome === "") {

        alert(
            "Por favor, digite seu nome."
        );

        return;
    }


    // Verifica mensagem

    if (mensagem === "") {

        alert(
            "Por favor, escreva uma mensagem."
        );

        return;
    }


    // Cria cartão

    const cartao =
        document.createElement("div");


    cartao.classList.add(
        "mensagem-card"
    );


    cartao.innerHTML = `

        <strong>${nome}</strong>

        <p>${mensagem}</p>

    `;


    // Coloca na tela

    mensagensContainer.prepend(
        cartao
    );


    // Limpa campos

    nomeMensagem.value = "";

    textoMensagem.value = "";


    alert(
        "Sua mensagem foi enviada com carinho! ❤️"
    );

});