const favoriteList= document.getElementById('favorite-list');
const reset= document.getElementById('reset');

function saveQuestionsList() {
  for (var i = 0; i < localStorage.length; i++) {
    let listQuestion= document.createElement('li');
    let remove= document.createElement('span');
    remove.innerHTML = "remove";
    remove.className += 'remove ';
    remove.id +=  i;
    remove.addEventListener('click', removeQuestion);
    listQuestion.innerHTML= localStorage.getItem(i+1);
    listQuestion.appendChild(remove);
    listQuestion.setAttribute('id', i);
    favoriteList.appendChild(listQuestion);
  }
}

saveQuestionsList();

function removeQuestion(event){
  let questionID= event.target.id;
  questionToRemove= document.getElementById(questionID);
  favoriteList.removeChild(questionToRemove);
}

reset.addEventListener('click', resetList);

function resetList() {
  while (favoriteList.hasChildNodes()) {
      favoriteList.removeChild(favoriteList.lastChild);
  }
  localStorage.clear();
}
