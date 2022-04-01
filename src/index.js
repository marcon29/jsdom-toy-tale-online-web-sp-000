let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  // ---------------------------
  getToys();
});

// ###############################

const allToys = document.getElementById("toy-collection")
const newToyInputs = document.querySelectorAll(".add-toy-form input.input-text")

document.addEventListener("submit", event => {
  event.preventDefault();
  addNewToy(processToyForm());
  clearForm();
  }
)

function processToyForm() {
  let formData = {};
  for (const toyInput of newToyInputs) {
    formData[toyInput.name] = toyInput.value;
  };
  formData["likes"] = 0;
  return formData;
}

function addNewToy(formData) {
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch("http://localhost:3000/toys", configObj)
    .then(repsonse => repsonse.json())
    .then(json => {
      displayToyCard(json);
    })
}

function clearForm() {
  for (const toyInput of newToyInputs) {
    toyInput.value = "";
  };
}

function getToys() {
  fetch("http://localhost:3000/toys")
    .then(repsonse => repsonse.json())
    .then(json => {
      displayAllToys(json);
    })
}

function displayAllToys(allToysInfo) {
  for (const toyInfo of allToysInfo) {
    displayToyCard(toyInfo);
  }		
}

function displayToyCard(toyInfo) {
  const newToyCard = document.createElement("div");
  newToyCard.className = "card";
  allToys.appendChild(newToyCard);

  const newToyName = document.createElement("h2");
  newToyName.innerText = toyInfo.name;

  const newToyImage = document.createElement("img");
  newToyImage.className = "toy-avatar";
  newToyImage.src = toyInfo.image;

  const newToyLikes = document.createElement("p");
  newToyLikes.innerText = `${toyInfo.likes} Likes`;

  const newLikeButton = document.createElement("button");
  newLikeButton.className = "like-btn";
  newLikeButton.innerText = "Like";
  newLikeButton.id = toyInfo.id;
  
  newToyCard.appendChild(newToyName);
  newToyCard.appendChild(newToyImage);
  newToyCard.appendChild(newToyLikes);
  newToyCard.appendChild(newLikeButton);
  
  newLikeButton.addEventListener("click", event => likeToy(event));
}

function likeToy(event) {
  const likeP = event.srcElement.previousElementSibling
  const toyID = event.srcElement.id
  const updatedLikes = parseInt(likeP.innerText)+1

  configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( { likes: updatedLikes } )
  }

  fetch(`http://localhost:3000/toys/${toyID}`, configObj)
    .then(repsonse => repsonse.json())
  // 

  likeP.innerText = `${updatedLikes} Likes`
}



