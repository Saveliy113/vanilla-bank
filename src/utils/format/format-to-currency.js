/**
 * Formats a number as a string with the specified currency symbol.
 *
 * @param {number} number - Number to be converted into currency format.
 * @returns {string} Formatted number with the currency symbol.
 */
export function formatToCurrency(number) {
	return new Intl.NumberFormat('ru-RU', {
		currency: 'RUB',
		style: 'currency'
	}).format(number);
}
