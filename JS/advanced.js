const questionAPI= "https://convo-pro-server.herokuapp.com/questions";
const advancedAPI= "https://convo-pro-server.herokuapp.com/advanced";
const start = document.getElementById('start');
const questionSection= document.getElementById('question');
const form= document.getElementsByClassName('form')[0];
const advancedQuestionDiv= document.getElementsByClassName('advanced-question-area')[0];
const intimacyLevel= document.getElementById('intimacy');
const nsfwLevel= document.getElementById('nsfw');
const startAdvanced= document.getElementsByClassName('start-advanced')[0];
const changeSettings= document.getElementById('change-settings');
let intimacy;
let nsfw;
const saveSettingsButton= document.querySelector('form');
const save= document.getElementById('save');
let availableIds= [];

saveSettingsButton.addEventListener('submit', saveSettings);

function saveSettings(event) {
  event.preventDefault();
  intimacy = event.target[0].value;
  let intimacyNode= document.createTextNode(intimacy);
  intimacyLevel.appendChild(intimacyNode);
  nsfw= event.target[1].value;
  let nsfwNode= document.createTextNode(nsfw);
  nsfwLevel.appendChild(nsfwNode);
  let startConversating= document.createElement('img');
  startConversating.src= "assets/advancedConversating.png";
  startConversating.id += "start-advanced-img";
  startConversating.addEventListener('click', displayStart);
  startAdvanced.appendChild(startConversating)
}

function displayStart() {
  form.className += " hidden";
  advancedQuestionDiv.classList.remove("hidden");
  fetch(advancedAPI)
    .then(response => response.json())
    .then(availableIdGenerator)
}

changeSettings.addEventListener('click', changeSettingsFunc);

function changeSettingsFunc() {
  location.reload();
}


function availableIdGenerator(response) {
  let array2= [];
  let array1= Object.values(response)[0];

  if(nsfw === "Nice") {
    nsfw= "true";
  } else if (nsfw === "Naughty") {
    nsfw= "false";
  } else if(nsfw === "Both") {
    nsfw= "Both"
  };

  if(nsfw === "Both" && intimacy === "All") {
    for (var i = 0; i < array1.length; i++) {
      array2.push(array1[i]);
    }
  } else if(nsfw === "Both" && intimacy === "1") {
      array1.filter(function(item) {
        if(item.intimacyLevel === 1) {
          array2.push(item);
        }
        return array2;
      })
  } else if(nsfw === "Both" && intimacy === "2") {
      array1.filter(function(item) {
        if(item.intimacyLevel === 2) {
          array2.push(item);
        }
        return array2;
      })
  } else if(nsfw === "Both" && intimacy === "3") {
      array1.filter(function(item) {
        if(item.intimacyLevel === 3) {
          array2.push(item);
        }
        return array2;
      })
  } else if(nsfw === "Both" && intimacy === "4") {
      array1.filter(function(item) {
        if(item.intimacyLevel === 4) {
          array2.push(item);
        }
        return array2;
      })
  } else if(nsfw === "true" && intimacy === "4") {
      array1.filter(function(item) {
        if(item.intimacyLevel === 4 && item.familyFriendly === true) {
          array2.push(item);
        }
        return array2;
      })
  }else if(nsfw === "false") {
      array1.filter(function(item) {
        if(item.familyFriendly === false) {
          array2.push(item);
        }
        return array2;
      })
  } else if(nsfw === "true" && intimacy === "1") {
      array1.filter(function(item) {
        if(item.intimacyLevel === 1) {
          array2.push(item);
        }
        return array2;
      })
  } else if(nsfw === "true" && intimacy === "2") {
      array1.filter(function(item) {
        if(item.intimacyLevel === 2) {
          array2.push(item);
        }
        return array2;
      })
  } else if(nsfw === "true" && intimacy === "3") {
      array1.filter(function(item) {
        if(item.intimacyLevel === 3) {
          array2.push(item);
        }
        return array2;
      })
  }

  for (var i = 0; i < array2.length; i++) {
    availableIds.push(array2[i].id);
  }
  console.log(availableIds);
}



start.addEventListener('click', createNewQuestion);

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
