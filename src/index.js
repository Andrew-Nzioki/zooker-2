document.querySelector('#animal-form').addEventListener('submit',handleSubmit)

function handleSubmit(e){
    e.preventDefault()
    let animalObj={
        name:e.target.name.value,
        imageURL:e.target.imageURL.value,
        description:e.target.description.value,
        donations:0
    }
    renderOneAnimal(animalObj)
    adoptAnimal(animalObj)
}

function renderOneAnimal(animal){
    //Build Animal from the data
    let card=document.createElement('li')
    card.className='card'
    card.innerHTML=`
    <img src="${animal.imageURL}">
    <div class="content">
    <h4>${animal.name}</h4>
    <p>
    $<span class="donation-count">${animal.donations}</span> Donated
    </p>
    <p>${animal.description}</p>

    </div>
    <div>
    <button id="donate"> Donate $10</>
    <button id="set_free"> Set free $10</>
    </div>
    `
card.querySelector('#donate').addEventListener('click',(e)=>{
    // e.preventDefault()
    animal.donations+=10
    card.querySelector('span').textContent=animal.donations
    //adding patch
    //we need ID and animal
    updateDonation(animal)
})
card.querySelector('#set_free').addEventListener('click',()=>{
    card.remove()
    deleteAnimal(animal.id)
})

document.querySelector('#animal-list').appendChild(card)

}

//Fetch requests
//Get for all animals
function getAllAnimals(){
    fetch('http://localhost:3000/animalData')
    .then(res=>res.json())
    .then(animalData=>animalData.forEach(animal=>renderOneAnimal(animal)))
}


function adoptAnimal(animalObj){
    fetch(`http://localhost:3000/animalData`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(animalObj)
    })
    .then(res=>res.json())
    .then(animal=>console.log(animal))
}

function updateDonation(animalObj){
   
    fetch(`http://localhost:3000/animalData/${animalObj.id}`,{
        method:'PATCH',
        headers: { 'Content-Type':'application/json'
    },
    body:JSON.stringify(animalObj)
    })
    .then(res=>res.json())
    .then(animal=>console.log(animal))
}

function deleteAnimal(id){
    fetch(`http://localhost:3000/animalData/${id}`,{
        method:'DELETE',
        headers: { 'Content-Type':'application/json'}
    }).then(res=>res.json())
    .then(()=>console.log(animal))
}

function initialize(){
    getAllAnimals()
}
initialize()
// window.addEventListener('load',initialize)