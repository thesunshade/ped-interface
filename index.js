// import { dppnDpr } from "./dppnDpr.js";
import { ped } from "./ped.js";
const list = document.getElementById("list");
const definitionArea = document.getElementById("definition");
import fuzzy from "./fuzzy.js";
// function buildDictionaryHtmlInDivs(dictionary) {
//   let html = "";
//   dictionary.forEach(entry => {
//     html += `<div class="entry"><div class="head-word">${entry[0]}</div>  ${entry[1]}</div>`;
//   });
//   list.innerHTML = html;
// }
// function buildDictionaryHtml(dictionary) {
//   let html = "<ul>";
//   dictionary.forEach(entry => {
//     html += `<li>${entry[0].toLowerCase()}</li>`;
//   });
//   list.innerHTML = html + "</ul>";
// }
// function buildDic(ped) {
//   let html = "";
//   ped.forEach(entry => {
//     html += `[\`${entry.word}\`,\`${entry.text}\`],\n`;
//   });
//   console.log(html);
// }
// buildDic(ped);

let fuzzyMode;

const inputWord = document.getElementById("word-input");
inputWord.focus();
inputWord.addEventListener("input", e => {
  if (!inputWord.value || inputWord.value.length <= 2) {
    list.innerHTML = "";
  } else if (inputWord.value && inputWord.value.length > 2) {
    createResultList();
  }
});

const fuzzyBox = document.getElementById("fuzzy-box");

if (localStorage.fuzzyMode === undefined) {
  localStorage.fuzzyMode === true;
} else if (localStorage.fuzzyMode === false) {
  fuzzyBox.checked = false;
  fuzzyMode = false;
} else {
  fuzzyMode = true;
}

fuzzyBox.addEventListener("click", e => {
  fuzzyMode = e.originalTarget.checked;
  localStorage.fuzzyMode = e.originalTarget.checked;
  createResultList();
});

function createResultList() {
  let htmlList = `<ul class="results">`;
  if (fuzzyMode === true) {
    ped.forEach((item, index) => {
      if (new RegExp(fuzzy(inputWord.value), "i").test(fuzzy(item[0]))) {
        htmlList += `<li class="item" id="${index}">${item[0]}</li>`;
      }
    });
  } else if (fuzzyMode === false) {
    ped.forEach((item, index) => {
      if (new RegExp(inputWord.value, "i").test(item[0])) {
        htmlList += `<li class="item" id="${index}">${item[0]}</li>`;
      }
    });
  }
  list.innerHTML = htmlList + "</ul>";

  const resultList = document.querySelectorAll(".item");
  resultList.forEach(listItem => {
    listItem.addEventListener("click", e => {
      definitionArea.innerHTML = `<h1>${ped[e.currentTarget.id][0]} <a href="https://suttacentral.net/define/${
        ped[e.currentTarget.id][0]
      }" title="Go to the entry on SuttaCentral.net" target="_blank">🔗</a></h1>${ped[e.currentTarget.id][1]}`;
      window.scrollTo(0, 0);
      // const terms = document.getElementsByClassName("term");
      // console.log(terms);
      // terms.addEventListener("click", e => {
      //   definitionArea.innerHTML = `<h1>${ped[e.currentTarget.id][0]} <a href="https://suttacentral.net/define/${
      //     ped[e.currentTarget.id][0]
      //   }" title="Go to the entry on SuttaCentral.net" target="_blank">🔗</a></h1>${ped[e.currentTarget.id][1]}`;
      //   window.scrollTo(0, 0);
      // });
    });
  });
}
