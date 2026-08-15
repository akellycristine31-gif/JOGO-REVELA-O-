// ==========================================
// SENHA DO ADMINISTRADOR
// ==========================================

const SENHA_ADMIN = "8520258";


// ==========================================
// ELEMENTOS DA TELA
// ==========================================

const telaLogin =
    document.getElementById("tela-login");

const painelAdmin =
    document.getElementById("painel-admin");

const senhaInput =
    document.getElementById("senha-admin");

const botaoLogin =
    document.getElementById("botao-login");

const mensagemErro =
    document.getElementById("mensagem-erro");

const botaoSair =
    document.getElementById("botao-sair");


// ==========================================
// LOGIN
// ==========================================

botaoLogin.addEventListener(
    "click",
    entrarNoPainel
);


senhaInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            entrarNoPainel();

        }

    }
);


// ==========================================
// ENTRAR
// ==========================================

function entrarNoPainel() {

    const senhaDigitada =
        senhaInput.value;


    if (
        senhaDigitada ===
        SENHA_ADMIN
    ) {

        telaLogin.style.display =
            "none";


        painelAdmin.style.display =
            "block";


        mensagemErro.textContent =
            "";


        iniciarFirebase();

    } else {

        mensagemErro.textContent =
            "Senha incorreta. Tente novamente.";


        senhaInput.value =
            "";


        senhaInput.focus();

    }

}


// ==========================================
// SAIR
// ==========================================

botaoSair.addEventListener(
    "click",
    function () {

        painelAdmin.style.display =
            "none";


        telaLogin.style.display =
            "flex";


        senhaInput.value =
            "";


        mensagemErro.textContent =
            "";


        senhaInput.focus();

    }
);


// ==========================================
// FIREBASE
// ==========================================

async function iniciarFirebase() {


    const {
        initializeApp
    } = await import(
        "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js"
    );


    const {
        getFirestore,
        collection,
        onSnapshot
    } = await import(
        "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js"
    );


    // ======================================
    // CONFIGURAÇÃO
    // ======================================

    const firebaseConfig = {

        apiKey:
            "AIzaSyDuQO89U-bVhWG_wty7LlXobXxRW-WsRAQ",

        authDomain:
            "cha-de-bebe-68275.firebaseapp.com",

        projectId:
            "cha-de-bebe-68275",

        storageBucket:
            "cha-de-bebe-68275.firebasestorage.app",

        messagingSenderId:
            "816690613085",

        appId:
            "1:816690613085:web:f2542ed77b7e09b42d76b4",

        measurementId:
            "G-43YG1L95N0"

    };


    const app =
        initializeApp(
            firebaseConfig
        );


    const db =
        getFirestore(app);


    // ======================================
    // CONFIRMAÇÕES
    // ======================================

    onSnapshot(
        collection(
            db,
            "confirmacoes"
        ),

        function (consulta) {

            const lista =
                document.getElementById(
                    "listaConfirmacoes"
                );


            let totalConfirmacoes =
                0;


            let totalPessoas =
                0;


            lista.innerHTML =
                "";


            consulta.forEach(
                function (documento) {

                    const dados =
                        documento.data();


                    totalConfirmacoes++;


                    const quantidade =
                        Number(
                            dados.quantidade
                        ) || 0;


                    totalPessoas +=
                        quantidade;


                    const linha =
                        document.createElement(
                            "tr"
                        );


                    linha.innerHTML = `

                        <td>
                            ${dados.nome || "Sem nome"}
                        </td>

                        <td>
                            ${quantidade}
                        </td>

                    `;


                    lista.appendChild(
                        linha
                    );

                }
            );


            document.getElementById(
                "totalConfirmacoes"
            ).textContent =
                totalConfirmacoes;


            document.getElementById(
                "totalAdultos"
            ).textContent =
                totalPessoas;

        },

        function (erro) {

            console.error(
                "Erro nas confirmações:",
                erro
            );

        }

    );


    // ======================================
    // FRALDAS
    // ======================================

    onSnapshot(
        collection(
            db,
            "estoque_fraldas"
        ),

        function (consulta) {


            document.getElementById(
                "fraldaRN"
            ).textContent = "0";


            document.getElementById(
                "fraldaP"
            ).textContent = "0";


            document.getElementById(
                "fraldaM"
            ).textContent = "0";


            document.getElementById(
                "fraldaG"
            ).textContent = "0";


            document.getElementById(
                "fraldaXG"
            ).textContent = "0";


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
                        tamanho === "RN"
                    ) {

                        document.getElementById(
                            "fraldaRN"
                        ).textContent =
                            escolhidas;

                    }


                    if (
                        tamanho === "P"
                    ) {

                        document.getElementById(
                            "fraldaP"
                        ).textContent =
                            escolhidas;

                    }


                    if (
                        tamanho === "M"
                    ) {

                        document.getElementById(
                            "fraldaM"
                        ).textContent =
                            escolhidas;

                    }


                    if (
                        tamanho === "G"
                    ) {

                        document.getElementById(
                            "fraldaG"
                        ).textContent =
                            escolhidas;

                    }


                    if (
                        tamanho === "XG"
                    ) {

                        document.getElementById(
                            "fraldaXG"
                        ).textContent =
                            escolhidas;

                    }

                }
            );

        },

        function (erro) {

            console.error(
                "Erro nas fraldas:",
                erro
            );

        }

    );


    // ======================================
    // MENSAGENS DE CARINHO
    // ======================================

    const listaMensagens =
        document.getElementById(
            "listaMensagens"
        );


    onSnapshot(
        collection(
            db,
            "mensagens"
        ),

        function (consulta) {


            listaMensagens.innerHTML =
                "";


            // ==================================
            // NENHUMA MENSAGEM
            // ==================================

            if (
                consulta.empty
            ) {

                listaMensagens.innerHTML = `

                    <p class="sem-mensagens">
                        Ainda não há mensagens de carinho. ❤️
                    </p>

                `;

                return;

            }


            // ==================================
            // MOSTRAR MENSAGENS
            // ==================================

            consulta.forEach(
                function (documento) {

                    const dados =
                        documento.data();


                    const cartao =
                        document.createElement(
                            "div"
                        );


                    cartao.classList.add(
                        "mensagem-admin"
                    );


                    cartao.innerHTML = `

                        <div class="mensagem-admin-nome">

                            💕
                            ${dados.nome || "Sem nome"}

                        </div>


                        <div class="mensagem-admin-texto">

                            ${dados.mensagem || ""}

                        </div>

                    `;


                    listaMensagens.appendChild(
                        cartao
                    );

                }
            );

        },

        function (erro) {

            console.error(
                "Erro nas mensagens:",
                erro
            );

        }

    );

}