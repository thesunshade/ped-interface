// import { dppnDpr } from "./dppnDpr.js";
import { ped } from "./ped.js";
const dictionaryArea = document.getElementById("dictionary-area");
const definitionArea = document.getElementById("definition");
import fuzzy from "./fuzzy.js";
// function buildDictionaryHtmlInDivs(dictionary) {
//   let html = "";
//   dictionary.forEach(entry => {
//     html += `<div class="entry"><div class="head-word">${entry[0]}</div>  ${entry[1]}</div>`;
//   });
//   dictionaryArea.innerHTML = html;
// }
// function buildDictionaryHtml(dictionary) {
//   let html = "<ul>";
//   dictionary.forEach(entry => {
//     html += `<li>${entry[0].toLowerCase()}</li>`;
//   });
//   dictionaryArea.innerHTML = html + "</ul>";
// }
// function buildDic(ped) {
//   let html = "";
//   ped.forEach(entry => {
//     html += `[\`${entry.word}\`,\`${entry.text}\`],\n`;
//   });
//   console.log(html);
// }
// buildDic(ped);
const inputWord = document.getElementById("word-input");
inputWord.focus();
inputWord.addEventListener("input", e => {
  if (!e.currentTarget.value || e.currentTarget.value.length <= 2) {
    dictionaryArea.innerHTML = "";
  } else if (e.currentTarget.value && e.currentTarget.value.length > 2) {
    {
      let htmlList = `<ul class="results">`;
      ped.forEach((item, index) => {
        if (new RegExp(fuzzy(e.currentTarget.value), "i").test(fuzzy(item[0]))) {
          htmlList += `<li class="item" id="${index}">${item[0]}</li>`;
        }
      });
      dictionaryArea.innerHTML = htmlList + "</ul>";

      const resultList = document.querySelectorAll(".item");
      resultList.forEach(listItem => {
        listItem.addEventListener("click", e => {
          definitionArea.innerHTML = `<h1>${ped[e.currentTarget.id][0]} <a href="https://suttacentral.net/define/${
            ped[e.currentTarget.id][0]
          }">🔗</a></h1>${ped[e.currentTarget.id][1]}`;
          window.scrollTo(0, 0);
        });
      });
    }
  }
});

// const strictButton = document.getElementById("strict-mode");
// strictButton.addEventListener("click", () => {
//   strictButton.innerText = "Disable Strict Mode";
// });

// if (localStorage.strictMode) {
//   if (localStorage.paliToggle === "true") {
//     // suttaArea.classList.add("hide-pali");
//   }
// } else {
//   localStorage.paliToggle = "false";
// }
