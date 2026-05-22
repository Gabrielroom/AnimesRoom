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
                    <p class="episode-card-p-ep">${ep.episode}</p>

                </div>
            `;
        });
    });

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

    /* Anime Sinopse */
    
    fetch('/episodes_temporada')
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
                    <p>ID:${ep.id}</p>

                </div>
            `;
        });
    });


