export class Layout {
	constructor({ router, children }) {
		this.router = router;
		this.children = children;
	}

	render() {
		const headerHTML = '<header>Header</header>';

		return `
      ${headerHTML}
      <nav>
        <a href="/">
          Home
        </a>
        <a href="/auth">
          Auth
        </a>
      </nav>
      <main>
        ${this.children}
      </main>
    `;
	}
}
