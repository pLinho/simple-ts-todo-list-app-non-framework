import { Skin } from "../core/appearance/skin";

export class MaterialInputSkinClone extends Skin {
  apply(input: HTMLInputElement) {
    const groupField = document.createElement("div");
    const label = document.createElement("label");

    label.setAttribute("for", "name");
    label.classList.add("form__label");
    label.innerText = input.placeholder;

    input.classList.add("form__field");
    input.setAttribute("name", "name");

    input.addEventListener("change", () => {
      if (input.value === "" || input.value === null) {
        label.classList.add("ph");
      }
    });
    input.addEventListener("focusin", () => {
      label.classList.remove("ph");
    });
    input.addEventListener("focusout", () => {
      if (input.value === "" || input.value === null) label.classList.add("ph");
    });

    if (input.value === "" || !input.value) {
      label.classList.add("ph");
    }

    groupField.classList.add("form__group");
    groupField.classList.add("field");
    groupField.classList.add(this.className);

    input.replaceWith(groupField);
    groupField.append(input);
    groupField.append(label);
  }
  style() {
    return `
    font-family:  sans-serif;
    font-size: 12px;
    `;
  }
  styleSheet() {
    return `
.form__group {
  font-family: inherit;
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 50%;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 1.3em;
  color: #000;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}
.form__field::placeholder {
  color: transparent;
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1em;
  color: #9b9b9b;
}

.form__field:focus {
  padding-bottom: 6px;
  border-width: 3px;
  border-image: linear-gradient(to right, #11998e, #38ef7d);
  border-image-slice: 1;
}
.form__field:focus ~ .form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1em;
  color: #11998e;
  font-weight: 700;
}

/* reset input */
.form__field:required, .form__field:invalid {
  box-shadow: none;
}

.ph{
  font-size: 1.3em;
  pointer-events: none;
  user-select: none;
  top: 20px;
}
`;
  }
}
