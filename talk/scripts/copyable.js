// https://github.com/sindresorhus/copy-text-to-clipboard
// (but without exports, because I can't be bothered building stuff)

const copy = input => {
	const el = document.createElement('textarea');

	el.value = input;

	// Prevent keyboard from showing on mobile
	el.setAttribute('readonly', '');

	el.style.contain = 'strict';
	el.style.position = 'absolute';
	el.style.left = '-9999px';
	el.style.fontSize = '12pt'; // Prevent zooming on iOS

	const selection = getSelection();
	let originalRange = false;
	if (selection.rangeCount > 0) {
		originalRange = selection.getRangeAt(0);
	}

	document.body.appendChild(el);
	el.select();

	let success = false;
	try {
		success = document.execCommand('copy');
	} catch (err) {}

	document.body.removeChild(el);

	if (originalRange) {
		selection.removeAllRanges();
		selection.addRange(originalRange);
	}

	return success;
}




// Function to perform a better "data-trim" on code snippets
// Will slice an indentation amount on each line of the snippet (amount based on the line having the lowest indentation length)
function betterTrim(snippetEl) {
	// Helper functions
	function trimLeft(val) {
		// Adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
		return val.replace(/^[\s\uFEFF\xA0]+/g, '');
	}
	function trimLineBreaks(input) {
		var lines = input.split('\n');

		// Trim line-breaks from the beginning
		for (var i = 0; i < lines.length; i++) {
			if (lines[i].trim() === '') {
				lines.splice(i--, 1);
			} else break;
		}

		// Trim line-breaks from the end
		for (var i = lines.length-1; i >= 0; i--) {
			if (lines[i].trim() === '') {
				lines.splice(i, 1);
			} else break;
		}

		return lines.join('\n');
	}

	// Main function for betterTrim()
	return (function(snippetEl) {
		var content = trimLineBreaks(snippetEl.innerHTML);
		var lines = content.split('\n');
		// Calculate the minimum amount to remove on each line start of the snippet (can be 0)
		var pad = lines.reduce(function(acc, line) {
			if (line.length > 0 && trimLeft(line).length > 0 && acc > line.length - trimLeft(line).length) {
				return line.length - trimLeft(line).length;
			}
			return acc;
		}, Number.POSITIVE_INFINITY);
		// Slice each line with this amount
		return lines.map(function(line, index) {
			return line.slice(pad);
		})
		.join('\n');
	})(snippetEl);
}


// Prepare elements (important that this runs before highlightjs)
for(let element of document.querySelectorAll('[data-copyable]')) {
	if(element.matches('[data-trim]')) betterTrim(element)
	element.dataset.copyableContent = element.innerText
	element.style.cursor = 'pointer'
}




let current = null

Reveal.addEventListener( 'slidechanged', function( event ) {
	current = event.currentSlide.querySelector('[data-copyable]')
	if(current) current.style.opacity = 0.3
})

window.addEventListener('click', () => {
	if(current) {
		const content = current.dataset.copyableContent
		console.log("copying %s", content)
		copy(content)
		current.style.opacity = 1
	}
})
