document.addEventListener('DOMContentLoaded', ()=> {
    let characterList = document.getElementById('character-list');
    let searchInput = document.getElementById('search');
    let modal = document.getElementById('character-modal');
    let closeButton = document.querySelector('.close-button');

    axios.get('https://rickandmortyapi.com/api/character')
        .then(response => {
            let characters = response.data.results;

            function displayCharacters(characters) {
                characterList.innerHTML = ''; 
                characters.forEach(character => {
                    let characterCard = document.createElement('div');
                    characterCard.classList.add('character');

                    let characterImage = document.createElement('img');
                    characterImage.src = character.image;
                    characterCard.appendChild(characterImage);

                    let characterName = document.createElement('h2');
                    characterName.textContent = character.name;
                    characterCard.appendChild(characterName);

                    let characterStatus = document.createElement('p');
                    characterStatus.textContent = `Status: ${character.status}`;
                    characterCard.appendChild(characterStatus);

                    characterCard.addEventListener('click', function() {

                        document.getElementById('modal-character-name').textContent = character.name;
                        document.getElementById('modal-character-image').src = character.image;
                        document.getElementById('modal-character-status').textContent = `Status: ${character.status}`;
                        document.getElementById('modal-character-species').textContent = `Species: ${character.species}`;
                        document.getElementById('modal-character-gender').textContent = `Gender: ${character.gender}`;
                        modal.style.display = "block";
                    });

                    characterList.appendChild(characterCard);
                });
            }

            displayCharacters(characters);

            searchInput.addEventListener('input', function() {
                let query = this.value.toLowerCase();
                let filteredCharacters = characters.filter(character => character.name.toLowerCase().includes(query));
                displayCharacters(filteredCharacters);
            });

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});


document.addEventListener("DOMContentLoaded", () => {
    fetchEpisodes();
});

async function fetchEpisodes() {
    const response = await fetch("https://rickandmortyapi.com/api/episode");
    const data = await response.json();
    displayEpisodes(data.results);
}

function displayEpisodes(episodes) {
    const episodesList = document.getElementById("episodes-list");
    
    episodes.forEach(episode => {
        const episodeDiv = document.createElement("div");
        episodeDiv.classList.add("episode");
        
        episodeDiv.innerHTML = `
            <h3>parts ${episode.id}: ${episode.name}</h3>
            <p> Broadcast date: ${episode.air_date}</p>
            <p>Summary: ${episode.name}Blank field for description.</p>
        `;
        
        episodesList.appendChild(episodeDiv);
    });
}
