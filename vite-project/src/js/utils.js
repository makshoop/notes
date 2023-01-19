export function highlightWords(line, word) {
	const regex = new RegExp(`(${word})`, "gi");
	return line.replace(regex, "<mark>$1</mark>");
}

// document.querySelector("#note").innerHTML = `
// 	<h2>No results ;(</h2>`;

let load = document.getElementById("input");

export function throttle(callee, timeout) {
	let timer = null;
	let isTouchedBeforeTimerClear = false;

	return function perform(...args) {
		if (timer) {
			isTouchedBeforeTimerClear = true;

			return;
		}
		input.setAttribute(
			"style",
			"background: url(./src/assets/load.gif)  no-repeat center right; background-size: 20px;",
		);

		callee(...args);
		clearTimeout(timer);

		timer = setTimeout(() => {
			if (isTouchedBeforeTimerClear) {
				callee(...args);
				clearTimeout(timer);
			}
			isTouchedBeforeTimerClear = false;
			timer = null;
			input.setAttribute("style", "background: none;");
		}, timeout);
	};
}
