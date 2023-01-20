import { getInputValue } from "./search";
import { highlightWords } from "./utils";

export function getNotes() {
	const inputValue = getInputValue();

	fetch(`http://localhost:3000/notes?q=${inputValue}`)
		.then((response) => response.json())
		.then((json) => {
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
			if (notes.length === 0) {
				document.getElementById("notes").innerHTML = `
					<h1>
						No Results;(
					</h1>
				`;
			}

			document.querySelector("#notes").innerHTML = notes.join("");
			if (notes.length === 0) {
				document.getElementById("notes").innerHTML = `
					<h1>
						No Results:(
					</h1>
				`;
			}
		});
}

function getAllNotes() {
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

getAllNotes();
