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
    const name = document.querySelector('.image__title')
    const latinName = document.querySelector('#latin_name');
    const animalType = document.querySelector('#animal_type');
    const activeTime = document.querySelector('#active_time');
    const habitat = document.querySelector('#habitat');
    const lifespan = document.querySelector('#lifespan');
    const diet = document.querySelector('#diet');
    const geoRange = document.querySelector('#geo_range');

    img.src = data['image_link'];
    name.textContent = data.name;
    latinName.textContent = data['latin_name'];
    animalType.textContent = data['animal_type'];
    activeTime.textContent = data['active_time'];
    habitat.textContent = data['habitat'];
    lifespan.textContent = data['lifespan'];
    diet.textContent = data['diet'];
    geoRange.textContent = data['geo_range'];
}



document.addEventListener('DOMContentLoaded', () => {
    getNewAnimalButton();
})