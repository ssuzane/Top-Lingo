'use strict'

const textareaFrom = document.querySelector("#textareaFrom");
const textareaTo = document.querySelector("#textareaTo");
const btnTranslate = document.querySelector("#btnTranslate");
const selects = document.querySelectorAll("select");
const icons = document.querySelectorAll(".row img")

const countries = {
    "en-GB": "Inglês",
    "es-ES": "Espanhol",
    "it-IT": "Italiano",
    "ja-JP": "Japonês",
    "pt-BR": "Português",

}

selects.forEach((tag) => {
    for (let country in countries) {
      let selected;
      if (tag.className.includes("selectFrom") && country == "pt-BR") {
        selected = "selected";
      } else if (tag.className.includes("selectTo") && country == "en-GB") {
        selected = "selected";
      }
  
      const option = `<option value="${country}" ${selected}>${countries[country]}</option>`;
  
      tag.insertAdjacentHTML("beforeend", option);
    }
  });
  
  btnTranslate.addEventListener("click", () => {
    if (textareaFrom.value) {
      loadTranslation();
    } else {
      textareaTo.value = "";
    }
  });
  
  function loadTranslation() {
    fetch(
      `https://api.mymemory.translated.net/get?q=${textareaFrom.value}&langpair=${selects[0].value}|${selects[1].value}`
    )
      .then((res) => res.json())
      .then((data) => {
        textareaTo.value = data.responseData.translatedText;
      });
  }

  function alice() {

    if(textareaFrom == "Alice" && country == "pt-BR"){
        document.body.classList.toggle('purple');
    }
    else{
        return false
    }

  }

 icons.forEach(Image => {
    Image.addEventListener("click", ({target}) =>{
      let fala;
      if(target.id == "from"){
        fala = new SpeechSynthesisUtterance(textareaFrom.value)
        fala.lang = selects[0].value;
      }else{
        fala = new SpeechSynthesisUtterance(textareaTo.value)
        fala.lang = selects[1].value;
      }if(target.id == "to"){
        fala = new SpeechSynthesisUtterance(textareaTo.value)
        fala.lang = selects[0].value;
      }else{
        fala = new SpeechSynthesisUtterance(textareaTo.value)
        fala.lang = selects[1].value;
      }
      speechSynthesis.speak(fala)
    });
  }); 

 