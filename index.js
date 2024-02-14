let allPokemonData = [];
let currentPage = 1;
const limitPerPage = 10;

async function fetchDatos(url) {
    const response = await fetch(url);
    if (!response.ok) {
        console.log('API');
    }
    return await response.json();
}

async function fetchAllPokemonData(responseData) {
    for (const { url } of responseData.results) {
        const pokemonData = await fetchDatos(url);
        allPokemonData.push(pokemonData);
    }
    renderPage(currentPage);
}

function renderPage(page) {
    const start = (page - 1) * limitPerPage;
    const end = start + limitPerPage;
    const pokemonDataForPage = allPokemonData.slice(start, end);
    const container = document.getElementById('pokemon-container');
    container.innerHTML = ''; 
    pokemonDataForPage.forEach(pokemonData => {
        const {id, abilities, types, base_experience, name, weight, sprites } = pokemonData;
        const card = document.createElement('div');
        card.classList.add('col-md-3');
        card.innerHTML = `
            <div class="card pokemon-card border border-light">
            <center><span class="row align-items-center text-white"></span> <span class="row align-items-center text-white" style="height:30px">${id}<br></span></center>
                <img src="${sprites.front_default}" class="card-img-top pokemon-img" alt="${name}">
                <div class="card-body">
                
                    <h5 class="card-title text-center text-white">${name}</h5>
                    <p class="card-text">
                        
                        <span class="fw-bold text-white">Habilidades: </span> <span class="text-white">${abilities.map(a => a.ability.name).join(', ')}<br></span>
                        <span class="fw-bold text-white">Tipo: </span> <span class="text-white">${types.map(type => type.type.name).join(', ')}<br></span>  
                        <span class="fw-bold text-white">Experiencia base: </span><span class="text-white">${base_experience}<br></span> 
                        <span class="fw-bold text-white">Peso: </span> <span class="text-white"> ${weight} </span>
                    </p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    renderPageButtons();
}

function renderPageButtons() {
    const totalPages = Math.ceil(allPokemonData.length / limitPerPage);
    const buttonsContainer = document.getElementById('pageButtons');
    buttonsContainer.innerHTML = '';

    const previousButton = document.createElement('button');
    previousButton.id = 'previousPage';
    previousButton.classList.add('btn', 'btn-light', 'mx-2', 'mb-4');
    previousButton.textContent = 'Anterior';
    previousButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPage(currentPage);
        }
    });
    buttonsContainer.appendChild(previousButton);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.classList.add('btn', 'mx-1');
        button.style.width = '30px';
        button.style.height = '30px';
        button.style.padding = '0';
        button.style.fontSize = '0.75rem';
        button.textContent = i;
        if (i === currentPage) {
            button.classList.add
            ('btn-outline-light');
        } else {
            button.classList.add
            ('btn-outline-light');
        }
        button.addEventListener('click', () => {
            currentPage = i;
            renderPage(currentPage);
        });
        buttonsContainer.appendChild(button);
    }

    const nextButton = document.createElement('button');
    nextButton.id = 'nextPage';
    nextButton.classList.add('btn', 'btn-light', 'mx-2', 'mb-4');
    nextButton.textContent = 'Siguiente';
    nextButton.addEventListener('click', () => {
        const nextPageStartIndex = currentPage * limitPerPage;
        if (nextPageStartIndex < allPokemonData.length) {
            currentPage++;
            renderPage(currentPage);
        }
    });
    buttonsContainer.appendChild(nextButton);
}

fetchDatos('https://pokeapi.co/api/v2/pokemon?limit=100')
    .then(fetchAllPokemonData)
    .catch(error => {
        console.error(`Error al consumir API: ${error}`);
    });