const publishButton =
    document.getElementById("publish-button");

const progressPhoto =
    document.getElementById("progress-photo");

const progressMessage =
    document.getElementById("progress-message");

const posts =
    document.getElementById("posts");


publishButton.addEventListener("click", function () {

    const message = progressMessage.value;

    const photo = progressPhoto.files[0];


    if (message.trim() === "") {

        alert("Escreva algo sobre sua evolução 💜");

        return;
    }


    const newPost =
        document.createElement("article");

    newPost.classList.add("progress-post");


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


    if (photo) {

        const reader = new FileReader();


        reader.onload = function (event) {

            newPost.innerHTML += `
                <img
                    class="published-image"
                    src="${event.target.result}"
                    alt="Foto de evolução"
                >

                <div class="post-content">
                    <p>${message}</p>
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
        };


        reader.readAsDataURL(photo);

    } else {

        newPost.innerHTML += `
            <div class="post-content">
                <p>${message}</p>
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


    progressMessage.value = "";

    progressPhoto.value = "";

});


function activateLikeButton(post) {

    const button =
        post.querySelector(".like-button");


    button.addEventListener("click", function () {

        if (button.classList.contains("liked")) {

            button.classList.remove("liked");

            button.innerHTML =
                "♡ <span>0</span>";

        } else {

            button.classList.add("liked");

            button.innerHTML =
                "♥ <span>1</span>";
        }

    });

}