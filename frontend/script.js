

//                                       Scripts PageView                                               //

// Função goToEpisode
function goToEpisode(animeId, episodeId){

    window.location.href = `anime-ep.html?anime-id=${animeId}&ep-id=${episodeId}`;

}


const params = new URLSearchParams(window.location.search);

const animeId = params.get("anime-id");

const episodeId = params.get("ep-id");


// Função goToAnime 
function goToAnime(animeId, episodeId){

    window.location.href = `anime-sinopse.html?anime=${animeId}&ep=${episodeId}`;

}

// API Episodes

fetch('/episodes')
    .then(res => res.json())
    .then(data => {
        const container = document.querySelector('.episodes-grid');

        data.forEach(ep => {

            const dataFormatada = new Date(ep.release_date).toLocaleDateString('pt-BR');

            container.innerHTML += `
                <div class="episode-card" onclick="goToEpisode(${ep.anime_id}, ${ep.id})">
                    <img src="/resources/images/${ep.image}">
                    <p class="episode-card-title-anime">${ep.anime}</p>
                    <p>Lançamento ${dataFormatada}</p>
                    <p class="episode-card-p-ep">Episódio ${ep.episode}</p>

                </div>
            `;
        });
    });


// API Episodes Temporada

fetch('/episodes_temporada')
    .then(res => res.json())
    .then(data => {
        const container = document.querySelector('.episodes-grid-temporada');


        data.forEach(ep => {

            const dataFormatada = new Date(ep.release_date).toLocaleDateString('pt-BR');

            container.innerHTML += `
                <div class="episode-card">
                    <img src="/resources/images/${ep.image}">
                    <p class="episode-card-title-anime">${ep.anime}</p>
                    <p>Lançamento ${dataFormatada}</p>
                    <p>${ep.episode}</p>
                </div>
            `;
        });
    });


// Anime Sinopse 


fetch('/episodes')
    .then(res => res.json())
    .then(data => {
        const container = document.querySelector('.episodes-sinopse');

        data.forEach(ep => {

            const dataFormatada = new Date(ep.release_date).toLocaleDateString('pt-BR');

            container.innerHTML += `
                <div class="episode-card-sinopse">
                    <img src="/resources/images/${ep.image}">
                    <p class="episode-card-title-anime">${ep.anime}</p>
                    <p>Lançamento ${dataFormatada}</p>
                    <p class="episode-card-p-ep">${ep.episode}</p>
                    <p>ID:${ep.anime_id}</p>

                </div>
            `;
        });
    });


// Anime Ep
fetch('/episodes')
    .then(res => res.json())
    .then(data => {

            const container = document.querySelector('.anime-ep');
            const episodioAtual = data.find(ep => ep.id == episodeId);
            const dataFormatada = new Date(episodioAtual.release_date).toLocaleDateString('pt-BR');

 
            container.innerHTML += `
                <div class="pre-video">
                <h2 class="title-video">${episodioAtual.anime}</h2>

                <div class="video-container">
                    <iframe 
                        src="https://www.youtube.com/embed/${episodioAtual.url_video}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                    
                </div>
                
                <div class="video-button">
                        <button class="btn-step">Anterior</button>

                        <button class="btn-list"><i class="bi bi-list">Todos Episódios</i></button>
                        
                        <button class="btn-step">Próximo</button>
                </div>

                <div class="video-description">
                        <h2>${episodioAtual.anime} - Episódio ${episodioAtual.episode} </h2>
                        <h4>${episodioAtual.sinopse}
                            <br>
                            <br>
                            Lançado em: ${dataFormatada}
                        </h4>

                </div>
            </div>        
            
            `;
    });


