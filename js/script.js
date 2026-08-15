// ==========================================
// FIREBASE
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    setDoc,
    getDoc,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


// ==========================================
// CONFIGURAÇÃO FIREBASE
// ==========================================

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
// METAS DAS FRALDAS
// ==========================================

const metasFraldas = {
    RN: 7,
    P: 14,
    M: 27,
    G: 48,
    XG: 53
};


// ==========================================
// VARIÁVEIS
// ==========================================

let tamanhoSelecionado = "";
let quantidadeSelecionada = 1;


// ==========================================
// CONTADOR
// ==========================================

const dataEvento = new Date(2026, 8, 5, 16, 0, 0);

function atualizarContador() {

    const agora = new Date();
    const distancia = dataEvento - agora;

    const diasElemento = document.getElementById("dias");
    const horasElemento = document.getElementById("horas");
    const minutosElemento = document.getElementById("minutos");
    const segundosElemento = document.getElementById("segundos");

    if (
        !diasElemento ||
        !horasElemento ||
        !minutosElemento ||
        !segundosElemento
    ) {
        return;
    }

    if (distancia <= 0) {

        diasElemento.textContent = "00";
        horasElemento.textContent = "00";
        minutosElemento.textContent = "00";
        segundosElemento.textContent = "00";

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

    diasElemento.textContent =
        String(dias).padStart(2, "0");

    horasElemento.textContent =
        String(horas).padStart(2, "0");

    minutosElemento.textContent =
        String(minutos).padStart(2, "0");

    segundosElemento.textContent =
        String(segundos).padStart(2, "0");
}

atualizarContador();

setInterval(
    atualizarContador,
    1000
);


// ==========================================
// POPUP CONFIRMAÇÃO DE PRESENÇA
// ==========================================

const popupPresenca =
    document.getElementById("popup-overlay");

const botaoConfirmar =
    document.getElementById("botao-confirmar-presenca");

const fecharPopup =
    document.querySelector(".fechar-popup");

const formulario =
    document.querySelector(".form-presenca");


if (botaoConfirmar && popupPresenca) {

    botaoConfirmar.addEventListener(
        "click",
        function () {

            popupPresenca.style.display = "flex";

            document.body.style.overflow = "hidden";
        }
    );
}


if (fecharPopup && popupPresenca) {

    fecharPopup.addEventListener(
        "click",
        function () {

            popupPresenca.style.display = "none";

            document.body.style.overflow = "";
        }
    );
}


// ==========================================
// CONFIRMAR PRESENÇA
// ==========================================

if (formulario) {

    formulario.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const nomeElemento =
                document.getElementById("nome");

            const quantidadeElemento =
                document.getElementById("quantidade");

            if (
                !nomeElemento ||
                !quantidadeElemento
            ) {
                return;
            }

            const nome =
                nomeElemento.value.trim();

            const quantidade =
                quantidadeElemento.value;

            if (nome === "") {

                alert(
                    "Por favor, digite seu nome."
                );

                return;
            }

            if (
                quantidade === "" ||
                Number(quantidade) < 1
            ) {

                alert(
                    "Por favor, informe a quantidade de pessoas."
                );

                return;
            }

            const dadosConfirmacao = {

                nome: nome,

                quantidade:
                    Number(quantidade),

                dataConfirmacao:
                    new Date().toISOString()
            };

            try {

                await addDoc(
                    collection(
                        db,
                        "confirmacoes"
                    ),
                    dadosConfirmacao
                );

                alert(
                    "Presença confirmada com sucesso! ❤️\n\nAgora você pode escolher as fraldas que pretende levar."
                );

                formulario.reset();

                if (popupPresenca) {

                    popupPresenca.style.display =
                        "none";
                }

                document.body.style.overflow = "";

            } catch (erro) {

                console.error(
                    "ERRO AO SALVAR PRESENÇA:",
                    erro
                );

                alert(
                    "Não foi possível confirmar sua presença."
                );
            }
        }
    );
}


// ==========================================
// ELEMENTOS DAS FRALDAS
// ==========================================

const botoesEscolher =
    document.querySelectorAll(
        ".botao-escolher"
    );

const popupFralda =
    document.getElementById(
        "popup-fralda-overlay"
    );

const fecharPopupFralda =
    document.getElementById(
        "fechar-popup-fralda"
    );

const tamanhoFraldaPopup =
    document.getElementById(
        "tamanho-fralda-popup"
    );

const quantidadeFraldaPopup =
    document.getElementById(
        "quantidade-fralda-popup"
    );

const diminuirFralda =
    document.getElementById(
        "diminuir-fralda"
    );

const aumentarFralda =
    document.getElementById(
        "aumentar-fralda"
    );

const confirmarFralda =
    document.getElementById(
        "confirmar-fralda"
    );


// ==========================================
// BUSCAR ESTOQUE DE FRALDAS
// ==========================================

async function buscarEstoque() {

    const estoque = {

        RN: 0,
        P: 0,
        M: 0,
        G: 0,
        XG: 0
    };

    try {

        const consulta =
            await getDocs(
                collection(
                    db,
                    "estoque_fraldas"
                )
            );

        consulta.forEach(
            function (documento) {

                const dados =
                    documento.data();

                const tamanho =
                    dados.tamanho;

                const escolhidas =
                    Number(
                        dados.escolhidas
                    ) || 0;

                if (
                    estoque[tamanho] !== undefined
                ) {

                    estoque[tamanho] =
                        escolhidas;
                }
            }
        );

    } catch (erro) {

        console.error(
            "ERRO AO BUSCAR ESTOQUE:",
            erro
        );
    }

    return estoque;
}


// ==========================================
// ATUALIZAR FRALDAS NA TELA
// ==========================================

async function atualizarTelaFraldas() {

    const estoque =
        await buscarEstoque();

    const caixas =
        document.querySelectorAll(
            ".fralda-box"
        );

    caixas.forEach(
        function (caixa) {

            const titulo =
                caixa.querySelector("h3");

            const texto =
                caixa.querySelector("p");

            const barra =
                caixa.querySelector(
                    ".barra-progresso"
                );

            const botao =
                caixa.querySelector(
                    ".botao-escolher"
                );

            if (
                !titulo ||
                !texto
            ) {
                return;
            }

            const tamanho =
                titulo.textContent.trim();

            const meta =
                metasFraldas[tamanho];

            if (!meta) {
                return;
            }

            const escolhidas =
                estoque[tamanho] || 0;

            let faltam =
                meta - escolhidas;

            if (faltam < 0) {
                faltam = 0;
            }

            texto.textContent =
                `Faltam ${faltam} de ${meta}`;

            if (barra) {

                const porcentagem =
                    (escolhidas / meta) * 100;

                barra.style.width =
                    Math.min(
                        porcentagem,
                        100
                    ) + "%";
            }

            if (botao) {

                if (faltam <= 0) {

                    botao.textContent =
                        "ESGOTADO";

                    botao.disabled = true;

                } else {

                    botao.textContent =
                        "ESCOLHER";

                    botao.disabled = false;
                }
            }
        }
    );
}


// ==========================================
// CARREGAR FRALDAS AO ABRIR
// ==========================================

atualizarTelaFraldas();


// ==========================================
// ABRIR POPUP DAS FRALDAS
// ==========================================

botoesEscolher.forEach(
    function (botao) {

        botao.addEventListener(
            "click",
            async function () {

                const caixa =
                    botao.closest(
                        ".fralda-box"
                    );

                if (!caixa) {
                    return;
                }

                const titulo =
                    caixa.querySelector("h3");

                if (!titulo) {
                    return;
                }

                tamanhoSelecionado =
                    titulo.textContent.trim();

                const meta =
                    metasFraldas[
                        tamanhoSelecionado
                    ];

                if (!meta) {
                    return;
                }

                const estoque =
                    await buscarEstoque();

                const escolhidas =
                    estoque[
                        tamanhoSelecionado
                    ] || 0;

                const faltam =
                    meta - escolhidas;

                if (faltam <= 0) {

                    alert(
                        `As fraldas ${tamanhoSelecionado} já estão esgotadas.`
                    );

                    return;
                }

                quantidadeSelecionada = 1;

                if (tamanhoFraldaPopup) {

                    tamanhoFraldaPopup.textContent =
                        tamanhoSelecionado;
                }

                if (quantidadeFraldaPopup) {

                    quantidadeFraldaPopup.textContent =
                        quantidadeSelecionada;
                }

                if (popupFralda) {

                    popupFralda.dataset.disponivel =
                        faltam;

                    popupFralda.style.display =
                        "flex";
                }

                document.body.style.overflow =
                    "hidden";
            }
        );
    }
);


// ==========================================
// AUMENTAR QUANTIDADE
// ==========================================

if (aumentarFralda && popupFralda) {

    aumentarFralda.addEventListener(
        "click",
        function () {

            const disponivel =
                Number(
                    popupFralda.dataset.disponivel
                );

            if (
                quantidadeSelecionada <
                disponivel
            ) {

                quantidadeSelecionada++;

                if (quantidadeFraldaPopup) {

                    quantidadeFraldaPopup.textContent =
                        quantidadeSelecionada;
                }
            }
        }
    );
}


// ==========================================
// DIMINUIR QUANTIDADE
// ==========================================

if (diminuirFralda) {

    diminuirFralda.addEventListener(
        "click",
        function () {

            if (
                quantidadeSelecionada > 1
            ) {

                quantidadeSelecionada--;

                if (quantidadeFraldaPopup) {

                    quantidadeFraldaPopup.textContent =
                        quantidadeSelecionada;
                }
            }
        }
    );
}


// ==========================================
// FECHAR POPUP FRALDA
// ==========================================

if (fecharPopupFralda && popupFralda) {

    fecharPopupFralda.addEventListener(
        "click",
        function () {

            popupFralda.style.display =
                "none";

            document.body.style.overflow =
                "";
        }
    );
}


// ==========================================
// CONFIRMAR ESCOLHA DA FRALDA
// ==========================================

if (confirmarFralda) {

    confirmarFralda.addEventListener(
        "click",
        async function () {

            const tamanho =
                tamanhoSelecionado;

            const quantidade =
                quantidadeSelecionada;

            if (!tamanho) {
                return;
            }

            try {

                // ======================================
                // DOCUMENTO DO TAMANHO
                // ======================================

                const referencia =
                    doc(
                        db,
                        "estoque_fraldas",
                        tamanho
                    );

                const documento =
                    await getDoc(
                        referencia
                    );

                let escolhidasAtual = 0;

                if (
                    documento.exists()
                ) {

                    const dados =
                        documento.data();

                    escolhidasAtual =
                        Number(
                            dados.escolhidas
                        ) || 0;
                }


                // ======================================
                // VERIFICAR LIMITE
                // ======================================

                const meta =
                    metasFraldas[tamanho];

                const disponivel =
                    meta - escolhidasAtual;

                if (
                    quantidade >
                    disponivel
                ) {

                    alert(
                        `Só existem ${disponivel} pacote${disponivel !== 1 ? "s" : ""} de ${tamanho} disponível${disponivel !== 1 ? "is" : ""}.`
                    );

                    await atualizarTelaFraldas();

                    return;
                }


                // ======================================
                // NOVO TOTAL
                // ======================================

                const novoTotal =
                    escolhidasAtual +
                    quantidade;

                const faltam =
                    meta -
                    novoTotal;


                // ======================================
                // SALVAR NO FIREBASE
                // ======================================

                await setDoc(
                    referencia,
                    {

                        tamanho:
                            tamanho,

                        meta:
                            meta,

                        escolhidas:
                            novoTotal,

                        faltam:
                            Math.max(
                                faltam,
                                0
                            ),

                        ultimaAtualizacao:
                            new Date().toISOString()
                    }
                );


                // ======================================
                // SALVAR HISTÓRICO
                // ======================================

                await addDoc(
                    collection(
                        db,
                        "historico_fraldas"
                    ),
                    {

                        tamanho:
                            tamanho,

                        quantidade:
                            quantidade,

                        data:
                            new Date().toISOString()
                    }
                );


                // ======================================
                // ATUALIZAR SITE
                // ======================================

                await atualizarTelaFraldas();

                if (popupFralda) {

                    popupFralda.style.display =
                        "none";
                }

                document.body.style.overflow =
                    "";

                alert(
                    `Pronto! Foram registradas ${quantidade} pacote${quantidade > 1 ? "s" : ""} de fralda ${tamanho}. ❤️`
                );

                tamanhoSelecionado = "";

                quantidadeSelecionada = 1;

            } catch (erro) {

                console.error(
                    "ERRO AO SALVAR FRALDA:",
                    erro
                );

                alert(
                    "Não foi possível salvar a escolha da fralda. Verifique o Firebase."
                );
            }
        }
    );
}


// ==========================================
// MENSAGENS AOS FUTUROS PAPAIS
// ==========================================

const nomeMensagem =
    document.getElementById(
        "nome-mensagem"
    );

const textoMensagem =
    document.getElementById(
        "texto-mensagem"
    );

const enviarMensagem =
    document.getElementById(
        "enviar-mensagem"
    );

const mensagensContainer =
    document.getElementById(
        "mensagens-container"
    );


// ==========================================
// ENVIAR MENSAGEM
// ==========================================

if (enviarMensagem) {

    enviarMensagem.addEventListener(
        "click",
        async function () {

            if (
                !nomeMensagem ||
                !textoMensagem
            ) {
                return;
            }

            const nome =
                nomeMensagem.value.trim();

            const mensagem =
                textoMensagem.value.trim();

            if (nome === "") {

                alert(
                    "Por favor, digite seu nome."
                );

                return;
            }

            if (mensagem === "") {

                alert(
                    "Por favor, escreva uma mensagem."
                );

                return;
            }

            try {

                await addDoc(
                    collection(
                        db,
                        "mensagens"
                    ),
                    {

                        nome:
                            nome,

                        mensagem:
                            mensagem,

                        data:
                            new Date()
                    }
                );

                nomeMensagem.value = "";

                textoMensagem.value = "";

                alert(
                    "Sua mensagem foi enviada com carinho! ❤️"
                );

                carregarMensagens();

            } catch (erro) {

                console.error(
                    "Erro ao salvar mensagem:",
                    erro
                );

                alert(
                    "Não foi possível enviar a mensagem. Tente novamente."
                );
            }
        }
    );
}


// ==========================================
// CARREGAR MENSAGENS
// ==========================================

async function carregarMensagens() {

    if (!mensagensContainer) {
        return;
    }

    try {

        const consulta =
            query(
                collection(
                    db,
                    "mensagens"
                ),
                orderBy(
                    "data",
                    "desc"
                )
            );

        const resultado =
            await getDocs(
                consulta
            );

        mensagensContainer.innerHTML = "";

        resultado.forEach(
            function (documento) {

                const dados =
                    documento.data();

                const cartao =
                    document.createElement(
                        "div"
                    );

                cartao.classList.add(
                    "mensagem-card"
                );

                cartao.innerHTML = `
                    <strong>${dados.nome}</strong>
                    <p>${dados.mensagem}</p>
                `;

                mensagensContainer.appendChild(
                    cartao
                );
            }
        );

    } catch (erro) {

        console.error(
            "Erro ao carregar mensagens:",
            erro
        );
    }
}


// ==========================================
// CARREGAR MENSAGENS AO ABRIR
// ==========================================

carregarMensagens();
