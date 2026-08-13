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


// ENVIAR CONFIRMAÇÃO E FECHAR

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    popupPresenca.style.display = "none";
    document.body.style.overflow = "";

});
// ==========================================
// ESCOLHA DE FRALDAS
// ==========================================

const botoesEscolher = document.querySelectorAll(".botao-escolher");

botoesEscolher.forEach(function(botao) {

    botao.addEventListener("click", function() {

        // Encontra a caixa da fralda onde o botão foi clicado
        const caixaFralda = botao.closest(".fralda-box");

        // Descobre o tamanho da fralda
        const tamanho = caixaFralda.querySelector("h3").textContent.trim();

        // Descobre a meta de pacotes
        const textoMeta = caixaFralda.querySelector("p").textContent;
        const meta = parseInt(textoMeta.match(/\d+/)[0]);

        // Pergunta quantos pacotes a pessoa quer escolher
        let quantidade = prompt(
            `Quantos pacotes de fralda ${tamanho} você deseja levar?\n\nMeta: ${meta} pacotes`
        );

        // Se a pessoa cancelar
        if (quantidade === null) {
            return;
        }

        // Transforma em número
        quantidade = parseInt(quantidade);

        // Verifica se foi digitado um número válido
        if (isNaN(quantidade) || quantidade <= 0) {
            alert("Digite uma quantidade válida.");
            return;
        }

        // Não permite escolher mais que a meta
        if (quantidade > meta) {
            alert(`A quantidade máxima para ${tamanho} é de ${meta} pacotes.`);
            return;
        }

        // Calcula a porcentagem da barra
        const porcentagem = (quantidade / meta) * 100;

        // Atualiza a barra de progresso
        const barra = caixaFralda.querySelector(".barra-progresso");

        barra.style.width = porcentagem + "%";

        // Muda o texto do botão
        botao.textContent = `ESCOLHIDO: ${quantidade} PACOTE${quantidade > 1 ? "S" : ""}`;

        // Desabilita o botão depois da escolha
        botao.disabled = true;

        // Mostra uma mensagem de confirmação
        alert(
            `Você escolheu ${quantidade} pacote${quantidade > 1 ? "s" : ""} de fralda ${tamanho}.\n\nObrigado pelo carinho! ❤️`
        );

    });

});