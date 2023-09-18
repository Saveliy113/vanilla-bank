/**
 * Represents RQuery class for working with DOM elements
 */
class RQuery {
	/**
	 * Create a new RQuery instance
	 * @param {string | HTMLElement} selector - CSS selector or HTMLElement
	 */
	constructor(selector) {
		if (typeof selector === 'string') {
			this.element = document.querySelector(selector);

			if (!this.element) {
				throw new Error(`Element ${selector} was not found!`);
			}
		} else if (selector instanceof HTMLElement) {
			this.element = selector;
		} else {
			throw new Error('Invalid selector type');
		}
	}

	/**
	 * Find the first element which matches the specified selector
	 * within selected element.
	 * @param {string} selector - CSS selector string tyo search for within selected element.
	 * @returns {RQuery} New RQUery instance for the found element.
	 */
	find(selector) {
		const element = new RQuery(this.element.querySelector(selector));
		if (element) {
			return element;
		} else {
			throw new Error(`Element ${selector} not found!`);
		}
	}

	/**
	 * Append a new element as a child of the selected element.
	 * @param {HTMLElement} childElement - New child element to append.
	 * @returns {RQuery} - Current RQuery instance for chaining.
	 */
	append(childElement) {
		this.element.appendChild(childElement);
		return this;
	}

	/**
	 * Insert a new element before the selected element.
	 * @param {HTMLElement} newElement - A new element to insert before the selected element.
	 * @returns {RQuery} - Current RQuery instance for chaining.
	 */
	before(newElement) {
		if (!(newElement instanceof HTMLElement)) {
			throw new Error('Element must be an HTMLElement');
		}

		const parentElement = this.element.parentElement;

		if (parentElement) {
			parentElement.insertBefore(newElement, this.element);
			return this;
		} else {
			throw new Error('Element does not have a parent element!');
		}
	}

	/**
	 * Get or Set inner HTML of the selected element.
	 * @param {string} [htmlContent] - optional HTML Content to set. If
	 * not provided, current inner HTML will be returned.
	 * @returns {RQuery | string} - The current RQuery instace for chaining when setting HTML content,
	 * or the current inner HTML when getting.
	 */
	html(htmlContent) {
		if (typeof htmlContent === 'undefined') {
			return this.element.innerHTML;
		} else {
			this.element.innerHTML = htmlContent;
			return this;
		}
	}

	/**
	 * Attach a click event listener to the selected element.
	 * @param {function(Event): void} callback - The event listener
	 * function to execute when the selected element is clicked. The
	 * function will receive the event object	as its argument.
	 * @returns {RQuery} - The current RQuery instance for chaining.
	 */
	click(callback) {
		this.element.addEventListener('click', callback);

		return this;
	}

	/**
	 * Set CSS style of selected element
	 * @param {string} property - CSS property to set
	 * @param {string} value - Value to set for the CSS property
	 * @returns {RQuery} Current RQuery instance for chaining.
	 */
	css(property, value) {
		if (typeof property !== 'string' || typeof value !== 'string') {
			throw new Error('Property and value must be a string!');
		}

		this.element.style[property] = value;
		return this;
	}

	/**
	 * Add a class or a list of classes to the current element.
	 * @param {string | string[]} classNames - A single class name or
	 * an array of class names to add to the element.
	 * @returns {RQuery} - Current RQuery instance for chaining.
	 */
	addClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				this.element.classList.add(className);
			}
		} else {
			this.element.classList.add(classNames);
		}

		return this;
	}

	/**
	 * Remove a class or a list of classes to the current element.
	 * @param {string | string[]} classNames - A single class name or
	 * an array of class names to add to the element.
	 * @returns {RQuery} - Current RQuery instance for chaining.
	 */
	removeClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				this.element.classList.remove(className);
			}
		} else {
			this.element.classList.remove(classNames);
		}

		return this;
	}
}

/**
 * Create a new RQuery instance for the given selector.
 * @param {string | HTMLElement} selector - CSS selector string or an HTML element
 * @returns {RQuery} A new RQuery instance for the given selector
 */
export function $R(selector) {
	return new RQuery(selector);
}