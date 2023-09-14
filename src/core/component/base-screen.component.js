import { getPageTitle } from '@/config/seo.config';

export class BaseScreen {
	/**
	 * Create a new BaseScreen instance.
	 * @param {Object} options - Options for the Base Screen.
	 * @param {string} options.pageTitle - Title for the page meta.
	 */
	constructor({ pageTitle }) {
		document.title = getPageTitle(pageTitle);
	}

	/**
	 * Renders the child component content.
	 * @returns {HTMLElement}
	 */
	render() {
		throw new Error('Render method must be implemented in the child class');
	}
}
