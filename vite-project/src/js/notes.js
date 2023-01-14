import { getInputValue } from "./search";

export function getNotes() {
	fetch("http://localhost:3000/notes?q=" + getInputValue())
		.then((response) => response.json())
		.then((json) => {
			const notes = json.map((note) => {
				return `
					<h3>${note.title}</h3>
					<p>${note.description}</p>
				`;
			});
			document.querySelector("#note").innerHTML = notes.join("");
		});
}
