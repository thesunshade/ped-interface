import { ped } from "../ped.js";
import fuzzy from "../fuzzy.js";

const list = document.getElementById("list");
const definitionArea = document.getElementById("definition");
const inputWord = document.getElementById("word-input");
const fuzzyBox = document.getElementById("fuzzy-box");
const countArea = document.getElementById("count");

let fuzzyMode;

inputWord.focus();
inputWord.addEventListener("input", () => {
  if (!inputWord.value || inputWord.value.length <= 2) {
    list.innerHTML = "";
  } else if (inputWord.value && inputWord.value.length > 2) {
    createResultList();
  }
});

// Fuzzy search setting
if (localStorage.fuzzyMode === null) {
  localStorage.fuzzyMode === true;
} else if (localStorage.fuzzyMode === false) {
  fuzzyBox.checked = false;
  fuzzyMode = false;
} else {
  fuzzyMode = true;
}
fuzzyBox.addEventListener("click", e => {
  fuzzyMode = fuzzyBox.checked;
  localStorage.fuzzyMode = fuzzyBox.checked;
  createResultList();
});

function createResultList() {
  let htmlList = `<ul class="results">`;
  let resultCount = 0;
  if (fuzzyMode === true) {
    ped.forEach((item, index) => {
      if (new RegExp(fuzzy(inputWord.value), "i").test(fuzzy(item[0]))) {
        htmlList += `<li class="item" id="${index}">${item[0]}</li>`;
        resultCount++;
      }
    });
  } else if (fuzzyMode === false) {
    ped.forEach((item, index) => {
      if (new RegExp(inputWord.value, "i").test(item[0])) {
        htmlList += `<li class="item" id="${index}">${item[0]}</li>`;
        resultCount++;
      }
    });
  }
  list.innerHTML = htmlList + "</ul>";
  countArea.innerHTML = resultCount;

  const resultList = document.querySelectorAll(".item");
  resultList.forEach(listItem => {
    listItem.addEventListener("click", e => {
      renderDefinition(e.currentTarget.id);
    });
  });
}

function renderDefinition(wordIndex) {
  const regex = new RegExp("href='/define/(.+?)'", "gi");
  definitionArea.innerHTML = `<h1>${ped[wordIndex][0]} <a href="https://suttacentral.net/define/${
    ped[wordIndex][0]
  }" title="Go to the entry on SuttaCentral.net" target="_blank">🔗</a></h1>
${ped[wordIndex][1].replace(regex, 'id="$1" class="cross-ref"')}`;
  window.scrollTo(0, 0);
  addListenerToCrossRefs();
}

function addListenerToCrossRefs() {
  const crossRefs = document.getElementsByClassName("cross-ref");
  for (let i = 0; i < crossRefs.length; i++) {
    crossRefs[i].addEventListener("click", e => {
      console.log(e.target.text);
      // find the index of current word
      const index = () => {
        for (let i = 0; i < ped.length; i++) {
          if (e.target.text === ped[i][0]) {
            return i;
          }
        }
      };
      const thisIndex = index();
      renderDefinition(thisIndex);
    });
  }
}
