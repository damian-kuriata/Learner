import Phrase from "language_phrase";
import ManagePaneHandler from "./managePaneHandler";
import LearnPaneHandler from "./LearnPaneHandler";
import PhraseInputDialog from "./phraseInputDialog";
import Search from "./search";

let learnButton = document.querySelector(".nav-btn:first-child");
let manageButton = document.querySelector(".nav-btn:nth-child(2)");
let learnPane = document.querySelector("#learn-pane");
let managePane = document.querySelector("#manage-pane");
let searchValue = "";

let currentPane = "learning";

let search = new Search(onSearchChange, onSearchSubmit);
let learning = new LearnPaneHandler(learnPane);
let manage = new ManagePaneHandler(managePane);

learnButton.addEventListener("click", () => {
  const isCurrent = switchPane("learning");
  if (isCurrent) {
    return;
  }
  learning.processOnePhrase();
});

manageButton.addEventListener("click", () => {
  const isCurrent = switchPane("manage");
  if (isCurrent) manage
});

learning.processOnePhrase();

function onSearchChange (ev) {
  searchValue = ev.target.value;
}

// Switches to "manage pane" (if not already in) showing search results.
function onSearchSubmit (ev) {
  switchPane("manage", searchValue);
  console.log("submit");
  ev.preventDefault();
}

function switchPane (paneName, ...params) {
  switch (paneName) {
    case "learning":
      if (currentPane === "learning") return true;
      currentPane = "learning";
      learning.show(...params);
      manage.hide();
      learnButton.classList.add("active-nav-btn");
      manageButton.classList.remove("active-nav-btn");
    break;
    case "manage":
      if (currentPane === "manage") {
          manage.show(...params);
          return;
      }
      currentPane = "manage";
      manage.show(...params);
      learning.hide();
      learnButton.classList.remove("active-nav-btn");
      manageButton.classList.add("active-nav-btn");
    break;
  }
  return false;
}
