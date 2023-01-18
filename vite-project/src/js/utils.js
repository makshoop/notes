export function highlightWords(line, word) {
	const regex = new RegExp(`(${word})`, "gi");
	return line.replace(regex, "<mark>$1</mark>");
}

// document.querySelector("#note").innerHTML = `
// 	<h2>No results ;(</h2>`;

export function throttle(callee, timeout) {
	let timer = null;
	let isTouchedBeforeTimerClear = false;
	return function perform(...args) {
		if (timer) {
			isTouchedBeforeTimerClear = true;
			return;
		}

		callee(...args);
		clearTimeout(timer);

		timer = setTimeout(() => {
			if (isTouchedBeforeTimerClear) {
				callee(...args);
				clearTimeout(timer);
			}
			isTouchedBeforeTimerClear = false;
			timer = null;
		}, timeout);
	};
}
