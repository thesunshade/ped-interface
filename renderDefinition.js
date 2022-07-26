import { ped } from "./ped.js";
import addListenerToCrossRefs from "./addListenerToCrossRefs.js";
import { definitionArea } from "./index.js";

export default function renderDefinition(wordIndex) {
  const word = ped[wordIndex][0];
  let definition = ped[wordIndex][1];

  const regex = new RegExp("href='/define/(.+?)'", "gi");
  // remove href from links and replace with a class and id
  definition = definition.replace(regex, 'id="$1" class="cross-ref"');

  definitionArea.innerHTML = `<h1>${word} <span class="sc-link"><a href="https://suttacentral.net/define/${word}" title="Go to the entry on SuttaCentral.net" target="_blank"><img height="20px" src="./images/favicon-sc.png"></a></span></h1>
${definition}`;

  window.scrollTo(0, 0);
  addListenerToCrossRefs();
  history.pushState({ page: word }, "", `?${word}`);
  document.title = word;
}
