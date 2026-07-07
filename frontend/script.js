

//                                       Scripts PageView                                               //


const params = new URLSearchParams(window.location.search);

const animeId = params.get("anime-id");

const episodeId = params.get("ep-id");

const epAnime = params.get("ep-anime");




// Função goToEpisode
function goToEpisode(id){

    window.location.href = `anime-ep.html?ep-id=${id}`;

}
// Função goToSinopse
function goToSinopse(id){

    window.location.href = `anime-sinopse.html?anime-id=${id}`;

}


// Funcao goToNextEpisode
function goToNextEpisode(id){

    fetch(`/episodes/${id}/next`)
        .then(res => res.json())
        .then(ep => {

            if(!ep){
                alert("Último episódio!");
                return;
            }

            goToEpisode(ep.id);

        });

}


// Funcao goToPreviousEpisode
function goToPreviousEpisode(id){

    fetch(`/episodes/${id}/previous`)
        .then(res => res.json())
        .then(ep => {

            if(!ep){
                alert("Primeiro episódio!");
                return;
            }

            goToEpisode(ep.id);

        });

}





// Função goToMain
function goToMain(){
    window.location.href = `main.html`;

}

// Função goToAnime 
function goToAnime(animeId, episodeId){

    window.location.href = `anime-sinopse.html?anime=${animeId}&ep=${episodeId}`;

}






// Main > API Episodes

fetch('/episodes')
    .then(res => res.json())
    .then(data => {
        const container = document.querySelector('.episodes-grid');

        data.forEach(ep => {

            const dataFormatada = new Date(ep.release_date).toLocaleDateString('pt-BR');

            container.innerHTML += `
                <div class="episode-card" onclick="goToEpisode(${ep.id})">
                    <img src="/resources/images/${ep.image}">
                    <p class="episode-card-title-anime">${ep.anime}</p>
                    <p>Lançamento ${dataFormatada}</p>
                    <p class="episode-card-p-ep">Episódio ${ep.episode}</p>

                </div>
            `;
        });
    });


// Main > API Episodes Temporada

fetch('/episodes_temporada')
    .then(res => res.json())
    .then(data => {
        const container = document.querySelector('.episodes-grid-temporada');


        data.forEach(ep => {

            const dataFormatada = new Date(ep.release_date).toLocaleDateString('pt-BR');

            container.innerHTML += `
                <div class="episode-card" onclick="goToEpisode(${ep.id}})">
                    <img src="/resources/images/${ep.image}">
                    <p class="episode-card-title-anime">${ep.anime}</p>
                    <p>Lançamento ${dataFormatada}</p>
                    <p class="episode-card-p-ep">Episódio ${ep.episode}</p>
                </div>
            `;
        });
    });












// Anime-Ep
    fetch(`/episodes/${episodeId}`)
    .then(res => res.json())
    .then(episodioAtual => {

        const container =
            document.querySelector('.anime-ep');

        const dataFormatada =
            new Date(
                episodioAtual.release_date
            ).toLocaleDateString('pt-BR');

        container.innerHTML = `
            <div class="pre-video">

                <h2 class="title-video">
                    ${episodioAtual.anime}
                </h2>

                <div class="video-container">

                    <iframe
                        src="https://www.youtube.com/embed/${episodioAtual.url_video}"
                        frameborder="0"
                        allowfullscreen>
                    </iframe>

                </div>

                <div class="video-button">
                        <button class="btn-step" onclick="goToPreviousEpisode(${episodioAtual.id})">Anterior</button>

                        <button class="btn-list" onclick="goToSinopse(${episodioAtual.anime_id})"><i class="bi bi-list">Todos Episódios</i></button>
                        
                        <button class="btn-step" onclick="goToNextEpisode(${episodioAtual.id})">Próximo</button>
                </div>


                <div class="video-description">

                    <h2>
                        ${episodioAtual.anime}
                        - Episódio
                        ${episodioAtual.episode}
                    </h2>

                    <h4>
                        ${episodioAtual.sinopse}
                        <br><br>
                        Lançado em:
                        ${dataFormatada}
                    </h4>

                </div>

            </div>
        `;

    });




// Anime-Sinopse 


fetch(`/episodes/anime/${animeId}`)
    .then(res => res.json())
    .then(episodio => {
        const container = document.querySelector('.anime-sinopse');
        // Dados do anime (pega o primeiro episódio)
        console.log(container);
        const anime = episodio[0];

        // Parte fixa
        container.innerHTML = `
            <div class="anime-sinopse-card">
                <img src="/resources/images/${anime.image_default}">

                <div class="anime-sinopse-info">
                    <h1>${anime.anime}</h1>

                    <h2>
                        ${anime.sinopse}
                    </h2>

                    <div class="anime-sinopse-info-genero">
                        <span class="genero">Ação</span>
                        <span class="genero">Fantasia</span>
                        <span class="genero">Drama</span>
                    </div>
                </div>
            </div>
            
            <div class="episodes-list"></div>


        `;

        
        const lista = document.querySelector(".episodes-list");

        episodio.forEach(ep => {

            const dataFormatada = new Date(ep.release_date)
                .toLocaleDateString("pt-BR");

            lista.innerHTML += `
                <div class="episode-card-sinopse">
                    <img src="/resources/images/${ep.image}">
                    <p class="episode-card-sinopse-title-anime">${ep.anime}</p>
                    <p>Lançamento ${dataFormatada}</p>
                    <p>Episódio ${ep.episode}</p>
                </div>
            `;

        });
    });


