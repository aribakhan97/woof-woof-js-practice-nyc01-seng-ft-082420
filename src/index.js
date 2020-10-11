document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = 'http://localhost:3000/pups/'


    const getDogs = () => {
        fetch(baseUrl)
        .then(response => response.json())
        .then(dogs =>{
            renderDogsBar(dogs)
        })
    }
    const renderDog = (dog, dogBar) => {
        var dogSpan = document.createElement("span")
        var dogName = dog.name
        dogSpan.innerHTML  = dogName
        dogSpan.dataset.id = dog.id
        dogSpan.addEventListener('click', e => {
        getSingleDog(e.target.dataset.id)
        .then(dog => displayDog(dog))
        })
        dogBar.append(dogSpan)
        
    }

    const renderDogsBar = (dogs) => {
        const dogBar = document.querySelector("#dog-bar")
        for(const dog of dogs){
            renderDog(dog, dogBar)
        }
    }
    const getSingleDog = (dogId) => {
        return fetch(baseUrl + dogId)
        .then(dog => dog.json())
    }
    /*<img src=dog_image_url>
    <h2>Mr. Bonkers</h2>
    <button>Good Dog!</button>*/


    const displayDog = (dog) => {
        const dogInfo = document.querySelector("#dog-info")
        dogInfo.innerHTML  = " "
        const img = document.createElement("img")
        img.src = dog.image
        const name = document.createElement("h2")
        name.innerHTML = dog.name
        const button = document.createElement("button")
        if (dog.isGoodDog) {
            button.innerHTML = 'Good Dog!'
        }
        else {
            button.innerHTML ='Bad Dog!'
        }

        button.dataset.id = dog.id
        button.addEventListener('click', e => {
        onDogButtonClick(e)
        })

        dogInfo.append(img)
        dogInfo.append(name)
        dogInfo.append(button)

    }
    const onDogButtonClick = (e) => {
        var dogId = e.target.dataset.id
        if (e.target.innerHTML === 'Good Dog!'){
            e.target.innerHTML = 'Bad Dog!'
            updateDogStatus(false, dogId)
        }
        else {
            e.target.innerHTML = "Good Dog!"
            updateDogStatus(true, dogId)
        }
    }
    const updateDogStatus = (status, dogId) => {
        options = {
            method: "PATCH", 
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({isGoodDog: status})
        }        
        return fetch(baseUrl + dogId, options)
        .then(response => response.json())
    }
// create element using innerHTML, conditionals, know append method and how to use it
    

    getDogs()



})

// KNOW HOW CREATE ELEMENT, innerHTML, add an element to an exisiting element(div)
// know database patch calls with fetch, how to set the options, how to test new data saves correctly 