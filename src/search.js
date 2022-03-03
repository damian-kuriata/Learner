export default class Search {
  constructor (onInputChange=null, onSubmit=null) {
    this.form = document.querySelector("#search");
    this.input = document.querySelector("#search > input[type='search']");

    if (onSubmit) {
      this.form.addEventListener("submit", onSubmit);
    }
    if (onInputChange) {
      this.input.addEventListener("input", onInputChange);
    }
  }

  setInputValue (val) {
    this.input.value = val;
  }
}
