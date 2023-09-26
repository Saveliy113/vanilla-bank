import { formatCardNumberWithDashes } from '@/utils/format/format-card-number';

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
	 * @returns {RQuery} New RQuery instance for the found element.
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
	 * @returns {RQuery | string} - The current RQuery instance for chaining when setting HTML content,
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
	 * Get or Set text of the selected element.
	 * @param {string} [textContent] - optional text content to set. If
	 * not provided, current text content will be returned.
	 * @returns {RQuery | string} - Current RQuery instance for chaining when setting HTML content,
	 * or the current inner HTML when getting.
	 */
	text(textContent) {
		if (typeof textContent === 'undefined') {
			return this.element.textContent;
		} else {
			this.element.textContent = textContent;
			return this;
		}
	}

	/*       EVENTS      */

	/**
	 * Add on event listener to the selected element for the specified
	 * event type.
	 * @param {string} eventType - Type of the event to listen for (e.
	 * g., 'click', 'input', etc.).
	 * @param {function(Event): void} callback - Event listener
	 * function to execute when the event is triggered. The function will
	 * receive event object as its argument.
	 * @returns {RQuery} Current RQuery instance for chaining when setting HTML content,
	 * or the current inner HTML when getting.
	 */
	on(eventType, callback) {
		if (typeof eventType !== 'string' || typeof callback !== 'function') {
			throw new Error(
				'Event type must be a string and callback must be a function'
			);
		}

		this.element.addEventListener(eventType, callback);

		return this;
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

	/*   FORMS  */

	/**
	 * Set an event listener for the submit event of a form element.
	 * @param {function(Event): void} onSubmit - The event listener for
	 * the form's submit event.
	 * @returns {RQuery} - Current RQuery instance for chaining.
	 */
	submit(onSubmit) {
		if (this.element.tagName.toLowerCase() === 'form') {
			this.element.addEventListener('submit', event => {
				event.preventDefault();
				onSubmit(event);
			});
		} else {
			throw new Error('Element must be a form');
		}

		return this;
	}

	/**
	 * Set attributes and event listeners for an input element.
	 * @param {object} options - An object containing input options.
	 * @param {function(Event) :void} [options.onInput] - The event
	 * listener for the input's input event.
	 * @param {object} [options.rest] - Optional attributes to set on
	 * the input element.
	 * * @returns {RQuery} Current RQuery instance for chaining.
	 *  */
	input({ onInput, ...rest }) {
		console.log(this.element.tagName.toLowerCase());
		if (this.element.tagName.toLowerCase() !== 'input')
			throw new Error('Element must be an input');

		for (const [key, value] of Object.entries(rest)) {
			this.element.setAttribute(key, value);
		}

		if (onInput) {
			this.element.addEventListener('input', onInput);
		}

		return this;
	}

	/**
	 * Set attributes and event listeners for a number input element.
	 * @param {number} [limit] - The maximum length of input value.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	numberInput(limit) {
		if (
			this.element.tagName.toLowerCase() !== 'input' &&
			this.element.type !== 'number'
		)
			throw new Error('Element must be an input with type "number"');

		this.element.addEventListener('input', event => {
			let value = event.target.value.replace(/[^0-9]/g, '');
			if (limit) value = value.substring(0, limit);
			event.target.value = value;
		});
		return this;
	}

	/**
	 * Set attributes and event listeners for a credit card input
	 * element.
	 * @returns {RQuery} The current RQuery instance for chaining.
	 */
	creditCardInput() {
		const limit = 16;

		if (
			this.element.tagName.toLowerCase() !== 'input' &&
			this.element.type !== 'text'
		)
			throw new Error('Element must be an input with type "text"');

		this.element.addEventListener('input', event => {
			let value = event.target.value.replace(/[^0-9]/g, '');
			if (limit) value = value.substring(0, limit);
			event.target.value = formatCardNumberWithDashes(value);
		});

		return this;
	}

	/*        STYLES    */

	/**
	 * Shows the selected element by removing the 'display' style
	 * property.
	 * @returns {RQuery} Current RQuery instance for chaining.
	 */
	show() {
		this.element.style.removeProperty('display');
		return this;
	}

	/**
	 * Hides the selected element by setting the 'display' style
	 * to none.
	 * @returns {RQuery} Current RQuery instance for chaining.
	 */
	hide() {
		this.element.style.display = 'none';
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

	/**
	 * Set or get the value of an attribute on the selected element.
	 * @param {string} attributeName - The name of the attribute to set
	 * or get.
	 * @param {string} [value] - The value to set for the attribute. If
	 * not provided, the current value of the attribute will be returned.
	 * @returns {RQuery|string} The current RQuery instance for
	 * chaining (if setting) or the attribute value (if getting)
	 */
	attr(attributeName, value) {
		if (typeof attributeName !== 'string') {
			throw new Error('attributeName must be a string');
		}

		if (typeof value === 'undefined') {
			return this.element.getAttribute(attributeName);
		} else {
			this.element.setAttribute(attributeName, value);
			return this;
		}
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
