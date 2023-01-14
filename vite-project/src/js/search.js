import { getNotes } from "./notes";

const inputValue = document.getElementById("input");

export function getInputValue() {
	const valueInput = inputValue.value;
	return valueInput;
}

document.getElementById("but").addEventListener("click", function () {
	getNotes();
});
