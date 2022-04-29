import { ped } from "./ped.js";
import fuzzy from "./fuzzy.js";
import renderDefinition from "./renderDefinition.js";

const list = document.getElementById("list");
export const definitionArea = document.getElementById("definition");
const inputWord = document.getElementById("word-input");
const fuzzyBox = document.getElementById("fuzzy-box");
const countArea = document.getElementById("count");

let fuzzyMode;

inputWord.focus(); // puts cursor in input box
inputWord.addEventListener("input", () => {
  createResultList();
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
  if (!inputWord.value || inputWord.value.length <= 2) {
    list.innerHTML = "";
  } else if (inputWord.value && inputWord.value.length > 2) {
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
}
