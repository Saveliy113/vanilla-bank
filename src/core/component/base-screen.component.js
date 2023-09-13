export class BaseScreen {
	#pageTitle;

	render(pageTitle) {
		if (pageTitle && pageTitle.length !== 0) {
			console.log(pageTitle);
			document.querySelector('title').innerText = `Vanilla Bank | ${
				pageTitle === '/'
					? 'Home'
					: pageTitle.charAt(1).toUpperCase() + pageTitle.slice(2)
			}`;
		}
	}
}
