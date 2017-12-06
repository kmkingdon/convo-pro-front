const questionAPI= "https://convo-pro-server.herokuapp.com/questions"
const advancedAPI= "https://convo-pro-server.herokuapp.com/advanced"
const questionSection= document.getElementById('question');
const start = document.getElementById('start');
const save= document.getElementById('save');
const favoriteList= document.getElementById('favorite-list');
let availableIds= [];

fetch(advancedAPI)
  .then(response => response.json())
  .then(availableIdGenerator)

function availableIdGenerator(response) {
  let array2= [];
  let array1= Object.values(response)[0];
  for (var i = 0; i < array1.length; i++) {
    if(array1[i].familyFriendly === true) {
      array2.push(array1[i]);
    }
  }

  for (var i = 0; i < array2.length; i++) {
    availableIds.push(array2[i].id);
  }
}

start.addEventListener('click', createNewQuestion)

function createNewQuestion() {
  fetch(questionAPI)
    .then(function(response) {
      return response.json();
    })
    .then(mergeData)
    .then(questionGenerator)
}


function mergeData(questions) {
  let mergedArray= [];
  let questionArray = Object.values(questions)[0];
  return fetch(advancedAPI)
    .then(response => response.json())
    .then(function(advanced) {
      let advancedArray= Object.values(advanced)[0];
      questionArray.forEach(function(item, i) {
        mergedArray.push(Object.assign(item, advancedArray[i]))
        })
      return mergedArray;
    })
}


function questionGenerator(mergedArray){
  let newQuestion;
  let index;
  let familyArray= [];

  let id= availableIds[Math.floor(Math.random() * (availableIds.length))];

  for (var i = 0; i < mergedArray.length; i++) {
    if(mergedArray[i].familyFriendly === true) {
      familyArray.push(mergedArray[i]);
    }
  }

  for (var i = 0; i < familyArray.length; i++) {
    if(familyArray[i].id === id) {
      newQuestion = familyArray[i].question;
      let index = availableIds.indexOf(id);
      availableIds.splice(index, 1);
    }
  }

  let saveImgPlaceholder= save.innerHTML;
  let saveImg= document.createElement('img');
  saveImg.src = "assets/favorites.png";
  saveImg.addEventListener("click", saveQuestion);

  if(saveImgPlaceholder === "") {
    save.appendChild(saveImg)
  }

  questionSection.innerHTML = newQuestion;
}



function saveQuestion(event){
  let currentQuestion= questionSection.innerHTML;
  function storeQuestion () {
    localStorage.setItem(localStorage.length + 1, currentQuestion);
  }
  storeQuestion();
}
