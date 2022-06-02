//Animal API address = https://zoo-animal-api.herokuapp.com/animals/rand
//For multiple animals = https://zoo-animal-api.herokuapp.com/animals/rand/{number 1-10}

function getNewAnimalButton() {
    const animalBtn = document.querySelector('#getAnimal');
    animalBtn.addEventListener("click", getAnimalInfo);
}

function getAnimalInfo() {
    fetch("https://zoo-animal-api.herokuapp.com/animals/rand")
    .then(res => res.json())
    .then(data => buildAnimalCard(data));
}

function buildAnimalCard(data) {
    const img = document.querySelector('.image__img');
    const name = document.querySelector('.image__title');
    const latinName = document.querySelector('#latin_name');
    const animalType = document.querySelector('#animal_type');
    const activeTime = document.querySelector('#active_time');
    const habitat = document.querySelector('#habitat');
    const lifespan = document.querySelector('#lifespan');
    const diet = document.querySelector('#diet');
    const geoRange = document.querySelector('#geo_range');
    // const favBtn = document.querySelector('#add-favorite');

    img.src = data['image_link'];
    name.textContent = data.name;
    latinName.textContent = data['latin_name'];
    animalType.textContent = data['animal_type'];
    activeTime.textContent = data['active_time'];
    habitat.textContent = data['habitat'];
    lifespan.textContent = data['lifespan'];
    diet.textContent = data['diet'];
    geoRange.textContent = data['geo_range'];

    // favBtn.addEventListener('click', addSpiritToDatabase(data));
}




function favoriteSpiritButton() {
    const favBtn = document.querySelector('#add-favorite');
    console.log(favBtn)
    favBtn.addEventListener('click', addSpiritToDatabase);
}

function addSpiritToDatabase() {
    const img = document.querySelector('.image__img');
    const name = document.querySelector('.image__title');
    const latinName = document.querySelector('#latin_name');
    const animalType = document.querySelector('#animal_type');
    const activeTime = document.querySelector('#active_time');
    const habitat = document.querySelector('#habitat');
    const lifespan = document.querySelector('#lifespan');
    const diet = document.querySelector('#diet');
    const geoRange = document.querySelector('#geo_range');

    fetch('http://localhost:3000/favoriteSpirits', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "name": name.textContent,
            "latin_name": latinName.textContent,
            "animal_type": animalType.textContent,
            "active_time": activeTime.textContent,
            "lifespan": lifespan.textContent,
            "habitat": habitat.textContent,
            "diet": diet.textContent,
            "geo_range": geoRange.textContent,
            "image_link": img.src
        })
    })
    .then(res => res.json())
    .then(data => createFavorites(data));
}



function addFavoritesFromDatabase() {
    fetch('http://localhost:3000/favoriteSpirits')
    .then(res => res.json())
    .then(data => data.forEach(createFavorites));
}

function createFavorites(spirit) {
    const spiritList = document.querySelector('#savedAnimalList');
    const li = document.createElement('li');
    const img = document.createElement('img');
    const span = document.createElement('span');

    img.src = spirit['image_link'];
    img.className = 'listImage';
    span.textContent = spirit.name;

    li.append(img, span);
    li.className = 'spirit';

    li.addEventListener('click', () => getFavoriteSpirit(spirit.id));

    spiritList.append(li);
}

function getFavoriteSpirit(id) {
    fetch(`http://localhost:3000/favoriteSpirits/${id}`)
    .then(res => res.json())
    .then(data => buildAnimalCard(data));
}

document.addEventListener('DOMContentLoaded', () => {
    getNewAnimalButton();
    favoriteSpiritButton();
    addFavoritesFromDatabase();
})