// DOM
const error = document.getElementById('error')
const img = document.getElementById('img');
const name = document.getElementById('name')
const search = document.getElementById('search')
const searchbtn = document.getElementById('searchbtn')
const sts = document.getElementById('sts')
// api 
const access_token = 1126460181313327;
let base_url = `https://superheroapi.com/api.php/${access_token}`;

// random searched
let id = Math.ceil(Math.random() * 730);

const randomSuperHero = () => {
    id = Math.ceil(Math.random() * 730);
    superhero(id);
}
// main random hero function
const superhero = (id) => {
    fetch(`${base_url}/${id}`).then(response => response.json()).then(json =>
        detail(json))
}
superhero(id);

// main searched hero function
searchedHero = ()=>{
    fetch(`${base_url}/search/${search.value}`).then(response => response.json()).then(json => {
        if(json.response == "error") {error.style.display = 'block';}
        else {detail(json.results[0]);error.style.display = 'none';}
    })
}
searchbtn.onclick = () => searchedHero();
document.addEventListener('keydown',(key)=>{
    if(key.key == "Enter") searchedHero();
    else if(key.key == "r") randomSuperHero();
})
//details

let stat = {

}
const detail = (json) => {
    img.innerHTML = `<img src="${json.image.url}" alt="Error!"/>`;
    name.innerHTML = `<h1>${json.name}</h1>`;
    getStats(json.powerstats)
}
// stats
let statsEmoji = {
    intelligence: '🧠',
    speed: '⚡',
    power: '💪🏻',
    durability: '🏋🏻',
    combat:'🥷🏻',
    strength: '✊🏻'

}
// stats main
const getStats = (char) => {
    const stats = Object.keys(char).map(stat => {
        return `<p>${statsEmoji[stat]}${stat}: ${char[stat]}</p>`
    });
    sts.innerHTML = `${stats.join('')}`
}
