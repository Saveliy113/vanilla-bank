import { BaseScreen } from '@/core/component/base-screen.component';

export class AboutUs extends BaseScreen {
	constructor() {
		super({ pageTitle: 'About Us' });
	}
	render() {
		return '<p>About Us</p>';
	}
}
