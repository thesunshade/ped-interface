import { ped } from "./ped.js";
import addListenerToCrossRefs from "./addListenerToCrossRefs.js";
import { definitionArea } from "./index.js";

export default function renderDefinition(wordIndex) {
  const regex = new RegExp("href='/define/(.+?)'", "gi");
  definitionArea.innerHTML = `<h1>${ped[wordIndex][0]} <a href="https://suttacentral.net/define/${
    ped[wordIndex][0]
  }" title="Go to the entry on SuttaCentral.net" target="_blank">🔗</a></h1>
${ped[wordIndex][1].replace(regex, 'id="$1" class="cross-ref"')}`;
  window.scrollTo(0, 0);
  addListenerToCrossRefs();
}
