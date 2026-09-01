// ==========================================
// CONFIGURAÇÃO
// ==========================================

const colunas = "ABCDEFGHI".split("");
const quantidadeLinhas = 9;


// ==========================================
// NOMES ESCONDIDOS
// ==========================================

const nomes = [

    // ======================================
    // JOAS 1
    // Linha 3 - C até F
    // ======================================

    {
        nome: "JOAS",
        correto: false,

        letras: [
            { linha: 3, coluna: "C", letra: "J" },
            { linha: 3, coluna: "D", letra: "O" },
            { linha: 3, coluna: "E", letra: "A", explosao: true },
            { linha: 3, coluna: "F", letra: "S" }
        ]
    },

    // ======================================
    // JOAS 8
    // COLUNA I - 9 até 12
    // ======================================

    {
        nome: "JOAS",
        correto: true,

        letras: [
            { linha: 2, coluna: "I", letra: "J" },
            { linha: 3, coluna: "I", letra: "O" },
            { linha: 4, coluna: "I", letra: "A",},
            { linha: 5, coluna: "I", letra: "S" }
        ]
    },

    // ======================================
    // JOAS 2
    // Coluna H - linhas 1 até 4
    // ======================================

    {
        nome: "JOAS",
        correto: false,

        letras: [
            { linha: 1, coluna: "G", letra: "J" },
            { linha: 2, coluna: "G", letra: "O" },
            { linha: 3, coluna: "G", letra: "A" },
            { linha: 4, coluna: "G", letra: "S", explosao: true }
        ]
    },


    // ======================================
    // JOAS 3
    // Coluna J - linhas 1 até 4
    // ======================================

    {
        nome: "JOAS",
        correto: false,

        letras: [
            { linha: 4, coluna: "B", letra: "J" },
            { linha: 4, coluna: "C", letra: "O" },
            { linha: 4, coluna: "D", letra: "A", explosao: true },
            { linha: 4, coluna: "E", letra: "S" }
        ]
    },


    // ======================================
    // JOAS 4
    // Coluna C - linhas 3 até 6
    // ======================================

    {
        nome: "JOAS",
        correto: false,

        letras: [
            { linha: 3, coluna: "C", letra: "J" },
            { linha: 4, coluna: "C", letra: "O" },
            { linha: 5, coluna: "C", letra: "A" },
            { linha: 6, coluna: "C", letra: "S", explosao: true }
        ]
    },


    // ======================================
    // JOAS 5
    // Coluna K - linhas 4 até 7
    // ======================================

    {
        nome: "JAMAL",
        correto: false,

        letras: [
            { linha: 1, coluna: "B", letra: "J" },
            { linha: 1, coluna: "C", letra: "A" },
            { linha: 1, coluna: "D", letra: "M" },
            { linha: 1, coluna: "E", letra: "A" },
            { linha: 1, coluna: "F", letra: "L", explosao: true }
        ]
    },


    // ======================================
    // JOAS 6
    // Linha 8 - J até M
    // ======================================

    {
        nome: "JOAS",
        correto: false,

        letras: [
            { linha: 7, coluna: "B", letra: "J" },
            { linha: 7, coluna: "C", letra: "O" },
            { linha: 7, coluna: "D", letra: "A" },
            { linha: 7, coluna: "E", letra: "S", explosao: true }
        ]
    },


    // ======================================
    // JOAS 7
    // Linha 9 - B até E
    // ======================================

    {
        nome: "JOAS",
        correto: false,

        letras: [
            { linha: 8, coluna: "C", letra: "J" },
            { linha: 8, coluna: "D", letra: "O" },
            { linha: 8, coluna: "E", letra: "A" , explosao: true },
            { linha: 8, coluna: "F", letra: "S" }
        ]
    },


    // ======================================
    // HELENA 1
    // Linha 1 - B até G
    // ======================================

    {
        nome: "HELENA",
        correto: false,

        letras: [
            { linha: 2, coluna: "A", letra: "H" },
            { linha: 2, coluna: "B", letra: "E" },
            { linha: 2, coluna: "C", letra: "L" },
            { linha: 2, coluna: "D", letra: "E" },
            { linha: 2, coluna: "E", letra: "N", explosao: true },
            { linha: 2, coluna: "F", letra: "A" }
        ]
    },



    // ======================================
    // HELENA 3
    // Coluna A - linhas 2 até 7
    // ======================================

    {
        nome: "HELENA",
        correto: false,

        letras: [
            { linha: 2, coluna: "A", letra: "H" },
            { linha: 3, coluna: "A", letra: "E" },
            { linha: 4, coluna: "A", letra: "L"},
            { linha: 5, coluna: "A", letra: "E" },
            { linha: 6, coluna: "A", letra: "N", explosao: true  },
            { linha: 7, coluna: "A", letra: "A" }
        ]
    },


    // ======================================
    // HELENA 4
    // Linha 6 - D até I
    // ======================================

    {
        nome: "HELEN",
        correto: false,

        letras: [
            { linha: 6, coluna: "D", letra: "H" },
            { linha: 6, coluna: "E", letra: "E" },
            { linha: 6, coluna: "F", letra: "L" },
            { linha: 6, coluna: "G", letra: "E", explosao: true  },
            { linha: 6, coluna: "H", letra: "N" },
        ]
    },


    // ======================================
    // HELENA 5
    // Linha 9 - G até L
    // ======================================

    {
        nome: "HELENA",
        correto: false,

        letras: [
            { linha: 9, coluna: "B", letra: "H" },
            { linha: 9, coluna: "C", letra: "E" },
            { linha: 9, coluna: "D", letra: "L" },
            { linha: 9, coluna: "E", letra: "E" },
            { linha: 9, coluna: "F", letra: "N", explosao: true },
            { linha: 9, coluna: "G", letra: "A" }
        ]
    },

        // ======================================
    // HELENA 5
    // Linha 9 - G até L
    // ======================================

    {
        nome: "HELENA",
        correto: false,

        letras: [
            { linha: 2, coluna: "H", letra: "H" },
            { linha: 3, coluna: "H", letra: "E" },
            { linha: 4, coluna: "H", letra: "L" },
            { linha: 5, coluna: "H", letra: "E" },
            { linha: 6, coluna: "H", letra: "N" },
            { linha: 7, coluna: "H", letra: "A", explosao: true }
        ]
    },



    // ======================================
    // EMANUEL
    // Linha 7 - B até H
    // ======================================

    {
        nome: "EMANUEL",
        correto: false,

        letras: [
            { linha: 5, coluna: "A", letra: "E" },
            { linha: 5, coluna: "B", letra: "M" },
            { linha: 5, coluna: "C", letra: "A" },
            { linha: 5, coluna: "D", letra: "N" },
            { linha: 5, coluna: "E", letra: "U" , explosao: true},
            { linha: 5, coluna: "F", letra: "E" },
            { linha: 5, coluna: "G", letra: "L" }
        ]
    },


    // ======================================
    // ELIZA
    // Coluna I - linhas 1 até 5
    // ======================================

    {
        nome: "LIZ",
        correto: false,

        letras: [
            { linha: 6, coluna: "I", letra: "L" },
            { linha: 7, coluna: "I", letra: "I" },
            { linha: 8, coluna: "I", letra: "Z" , explosao: true  },

        ]
    },

   // ======================================
    // ELIZA
    // Coluna I - linhas 1 até 5
    // ======================================

    {
        nome: "ELISA",
        correto: false,

        letras: [
            { linha: 5, coluna: "F", letra: "E" },
            { linha: 6, coluna: "F", letra: "L" },
            { linha: 7, coluna: "F", letra: "I" },
            { linha: 8, coluna: "F", letra: "S" },
            { linha: 9, coluna: "F", letra: "A", explosao: true }
        ]
    },

];


// ==========================================
// CRIAR LISTA DE TODAS AS LETRAS
// ==========================================

const letrasEscondidas = {};

nomes.forEach(nome => {

    nome.letras.forEach(posicao => {

        const chave =
            `${posicao.linha}-${posicao.coluna}`;

        letrasEscondidas[chave] = {

            letra: posicao.letra,

            nome: nome.nome,

            correto: nome.correto,

            explosao: posicao.explosao === true

        };

    });

});


// ==========================================
// CONTROLAR LETRAS ENCONTRADAS
// ==========================================

const encontradas = {};


// ==========================================
// CRIAR TABULEIRO
// ==========================================

function criarTabuleiro() {

    const tabuleiro =
        document.getElementById("tabuleiro");

    tabuleiro.innerHTML = "";


    // ======================================
    // CANTO SUPERIOR ESQUERDO
    // ======================================

    const canto =
        document.createElement("div");

    canto.classList.add("coluna");

    tabuleiro.appendChild(canto);


    // ======================================
    // CABEÇALHO A ATÉ I
    // ======================================

    colunas.forEach(letra => {

        const coluna =
            document.createElement("div");

        coluna.classList.add("coluna");

        coluna.textContent = letra;

        tabuleiro.appendChild(coluna);

    });


    // ======================================
    // LINHAS 1 ATÉ 9
    // ======================================

    for (
        let linha = 1;
        linha <= quantidadeLinhas;
        linha++
    ) {

        // Número da linha

        const numero =
            document.createElement("div");

        numero.classList.add("linha");

        numero.textContent = linha;

        tabuleiro.appendChild(numero);


        // ==================================
        // CASAS
        // ==================================

        for (
            let coluna = 0;
            coluna < colunas.length;
            coluna++
        ) {

            const letraColuna =
                colunas[coluna];

            const casa =
                document.createElement("div");

            casa.classList.add("casa");

            casa.dataset.linha = linha;

            casa.dataset.coluna =
                letraColuna;


            // ==================================
            // CASA TOTALMENTE ESCONDIDA
            // ==================================

            casa.innerHTML = "";


            // ==================================
            // CLIQUE
            // ==================================

            casa.addEventListener(
                "click",
                () => clicarCasa(casa)
            );


            tabuleiro.appendChild(casa);

        }

    }

}


// ==========================================
// CLICAR NA CASA
// ==========================================

function clicarCasa(casa) {

    // Não permite clicar novamente
    if (
        casa.classList.contains("acerto") ||
        casa.classList.contains("agua")
    ) {

        return;

    }


    const linha =
        casa.dataset.linha;

    const coluna =
        casa.dataset.coluna;

    const chave =
        `${linha}-${coluna}`;


    const letraEscondida =
        letrasEscondidas[chave];


    // ======================================
    // ENCONTROU UMA LETRA
    // ======================================

    if (letraEscondida) {

        // Registra a casa
        encontradas[chave] = true;


        // ==================================
        // VERIFICAR SE É A ÚLTIMA LETRA DO JOAS
        // ==================================

        const joasCorreto =
            nomes.find(nome =>
                nome.nome === "JOAS" &&
                nome.correto === true
            );


        const joasCompleto =
            joasCorreto &&
            joasCorreto.letras.every(posicao => {

                const chaveJoas =
                    `${posicao.linha}-${posicao.coluna}`;

                return encontradas[chaveJoas];

            });


        // ==================================
        // ÚLTIMA LETRA DO JOAS
        // ==================================

        if (joasCompleto) {

            // NÃO mostra a última letra

            // Começa imediatamente a tela preta
            iniciarRevelacao();

            return;

        }


        // ==================================
        // BOMBA
        // ==================================

        if (letraEscondida.explosao) {

            casa.classList.add("acerto");

            casa.innerHTML = `
                <span class="bomba">💣</span>
            `;

            document
                .getElementById("mensagem")
                .textContent =
                "💥 BOOM! Você encontrou uma bomba!";

        }


        // ==================================
        // LETRA NORMAL
        // ==================================

        else {

            casa.classList.add("acerto");

            casa.innerHTML = `
                <span class="letra">
                    ${letraEscondida.letra}
                </span>
            `;

            document
                .getElementById("mensagem")
                .textContent =
                `🎯 Você encontrou a letra ${letraEscondida.letra}!`;

        }


        // ==================================
        // VERIFICAR JOAS
        // ==================================

        verificarJoas();

    }


    // ======================================
    // ÁGUA
    // ======================================

    else {

        casa.classList.add("agua");

        casa.innerHTML =
            `<span class="agua-texto">•</span>`;


        document
            .getElementById("mensagem")
            .textContent =
            "💦 Água! Tente outra casa.";

    }

}

function verificarJoas() {

    const joasEncontrados =
        nomes.filter(nome => {

            return (
                nome.nome === "JOAS" &&
                nome.correto === true
            );

        });


    for (
        const joas of joasEncontrados
    ) {

        const todasEncontradas =
            joas.letras.every(posicao => {

                const chave =
                    `${posicao.linha}-${posicao.coluna}`;

                return encontradas[chave];

            });


        if (todasEncontradas) {

            // Mensagem normal do jogo
            document
                .getElementById("mensagem")
                .textContent =
                "🎉💙 PARABÉNS! VOCÊ DESCOBRIU O NOME: JOAS! 💙🎉";


            // Espera um pouquinho antes de começar a revelação
            setTimeout(() => {

                iniciarRevelacao();

            }, 1000);


            return;

        }

    }

}
// ==========================================
// REVELAÇÃO FINAL
// ==========================================

function iniciarRevelacao() {

    const revelacao =
        document.getElementById("revelacao");

    const confetes =
        document.querySelector(".confetes");

    revelacao.style.display = "flex";

    revelacao.querySelector(".texto-eum").style.display = "none";
    revelacao.querySelector(".texto-menino").style.display = "none";
    revelacao.querySelector(".texto-bem-vindo").style.display = "none";
    revelacao.querySelector(".texto-joas").style.display = "none";

    confetes.classList.remove("ativa");

    setTimeout(() => {

        revelacao.querySelector(".texto-eum").style.display = "block";
        revelacao.querySelector(".texto-menino").style.display = "block";
        revelacao.querySelector(".texto-bem-vindo").style.display = "block";
        revelacao.querySelector(".texto-joas").style.display = "block";

        confetes.classList.add("ativa");

    },5000);

}
// ==========================================
// INICIAR JOGO
// ==========================================

function iniciarJogo() {

    criarTabuleiro();

}


// ==========================================
// BOTÃO REINICIAR
// ==========================================

function configurarBotaoReiniciar() {

    const botao =
        document.getElementById("reiniciarJogo");


    if (!botao) {

        return;

    }


    botao.addEventListener(
        "click",
        () => {

            // Limpa as casas encontradas

            Object.keys(encontradas)
                .forEach(chave => {

                    delete encontradas[chave];

                });


            // Recria o tabuleiro

            criarTabuleiro();


            // Mensagem

            document
                .getElementById("mensagem")
                .textContent =
                "🎯 Jogo reiniciado! Boa sorte!";

        }
    );

}


// ==========================================
// INICIAR QUANDO A PÁGINA CARREGAR
// ==========================================

document.addEventListener(
    "DOMContentLoaded",

    () => {

        iniciarJogo();

        configurarBotaoReiniciar();

    }
);