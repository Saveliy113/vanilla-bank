import { BaseScreen } from '@/core/component/base-screen.component';

export class Home extends BaseScreen {
	constructor() {
		super({ pageTitle: 'Home' });
	}

	render() {
		return '<p>Home</p>';
	}
}
