import { getInputValue } from "./search";
import { highlightWords } from "./utils";

export function getNotes() {
	const inputValue = getInputValue();

	fetch(`http://localhost:3000/notes?q=${inputValue}`)
		.then((response) => response.json())
		.then((json) => {
			if (json.length === 0) {
				document.getElementById("notes").innerHTML = `
					<h1>
						No Results;(
					</h1>
				`;
			} else {
				const notes = json.map((note) => {
					const title = highlightWords(note.title, inputValue);
					const description = highlightWords(note.description, inputValue);

					return `
						<div class="note">
							<h2>${title}</h2>
							<p>${description}</p>
						</div>
					`;
				});
				document.querySelector("#notes").innerHTML = notes.join("");
			}
		});
}

export function getAllNotes() {
	fetch("http://localhost:3000/notes")
		.then((response) => response.json())
		.then((json) => {
			const notes = json.map((note) => {
				return `
					<div class="note">
						<h2>${note.title}</h2>
						<p>${note.description}</p>
					</div>
				`;
			});
			document.querySelector("#notes").innerHTML = notes.join("");
		});
}
