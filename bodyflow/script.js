let completedTasks = 0;

const totalTasks = 3;

const progress = document.getElementById("progress");

const progressText =
    document.getElementById("progress-text");

const days =
    document.getElementById("days");

const checkButtons =
    document.querySelectorAll(".check-button");

const startButton =
    document.querySelector(".start-button");

const minimumButton =
    document.getElementById("minimum-button");


function updateProgress() {

    const percentage =
        (completedTasks / totalTasks) * 100;

    progress.style.width =
        percentage + "%";

    progressText.textContent =
        completedTasks +
        " de " +
        totalTasks +
        " atividades concluídas";


    if (completedTasks === totalTasks) {

        days.textContent = 1;

        progressText.textContent =
            "Dia concluído! 🔥";
    }
}


/* CARDIO E ALIMENTAÇÃO */

checkButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            if (
                button.classList.contains("completed")
            ) {

                button.classList.remove("completed");

                completedTasks--;

            } else {

                button.classList.add("completed");

                completedTasks++;
            }

            updateProgress();
        }
    );

});


/* TREINO */

startButton.addEventListener(
    "click",
    function() {

        if (
            !startButton.classList.contains("completed")
        ) {

            startButton.classList.add("completed");

            startButton.textContent =
                "Treino concluído ✓";

            completedTasks++;

            updateProgress();
        }
    }
);


/* MODO MÍNIMO */

minimumButton.addEventListener(
    "click",
    function() {

        alert(
            "Modo mínimo ativado!\n\n" +
            "🚶 10 minutos de caminhada\n" +
            "🏋️ 2 exercícios simples\n" +
            "🥗 1 escolha alimentar equilibrada"
        );

    }
);
/* ========================================
   PUBLICAR EVOLUÇÃO
======================================== */

const publishButton =
    document.getElementById("publish-button");

const progressPhoto =
    document.getElementById("progress-photo");

const progressMessage =
    document.getElementById("progress-message");

const posts =
    document.getElementById("posts");


if (publishButton) {

    publishButton.addEventListener(
        "click",
        function () {

            const message =
                progressMessage.value;

            const photo =
                progressPhoto.files[0];


            /* VERIFICA SE ESCREVEU ALGO */

            if (message.trim() === "") {

                alert(
                    "Escreva alguma coisa sobre sua evolução 💜"
                );

                return;
            }


            /* CRIA O NOVO POST */

            const newPost =
                document.createElement("article");

            newPost.classList.add(
                "progress-post"
            );


            /* CABEÇALHO */

            newPost.innerHTML = `
                <div class="post-header">

                    <div class="post-avatar">
                        👤
                    </div>

                    <div>
                        <strong>Ane</strong>
                        <p>Agora</p>
                    </div>

                </div>
            `;


            /* SE A PESSOA ESCOLHEU UMA FOTO */

            if (photo) {

                const reader =
                    new FileReader();


                reader.onload =
                    function (event) {

                        const image =
                            document.createElement("img");

                        image.src =
                            event.target.result;

                        image.classList.add(
                            "published-image"
                        );


                        newPost.innerHTML += `
                            <div class="post-content">

                                <p>
                                    ${message}
                                </p>

                            </div>

                            <div class="post-actions">

                                <button class="like-button">
                                    ♡ <span>0</span>
                                </button>

                                <button>
                                    💬 0
                                </button>

                            </div>
                        `;


                        newPost
                            .querySelector(".post-header")
                            .after(image);


                        posts.prepend(newPost);


                        activateLikeButton(newPost);

                    };


                reader.readAsDataURL(photo);

            } else {

                /* POST SEM FOTO */

                newPost.innerHTML += `
                    <div class="post-content">

                        <p>
                            ${message}
                        </p>

                    </div>

                    <div class="post-actions">

                        <button class="like-button">
                            ♡ <span>0</span>
                        </button>

                        <button>
                            💬 0
                        </button>

                    </div>
                `;


                posts.prepend(newPost);


                activateLikeButton(newPost);

            }


            /* LIMPA OS CAMPOS */

            progressMessage.value = "";

            progressPhoto.value = "";

        }
    );
}


/* ========================================
   CURTIR PUBLICAÇÃO
======================================== */

function activateLikeButton(post) {

    const likeButton =
        post.querySelector(".like-button");


    likeButton.addEventListener(
        "click",
        function () {

            const counter =
                likeButton.querySelector("span");


            if (
                likeButton.classList.contains("liked")
            ) {

                likeButton.classList.remove("liked");

                likeButton.innerHTML =
                    `♡ <span>0</span>`;

            } else {

                likeButton.classList.add("liked");

                likeButton.innerHTML =
                    `♥ <span>1</span>`;
            }

        }
    );

}