import { BaseScreen } from '@/core/component/base-screen.component';

export class Auth extends BaseScreen {
	constructor() {
		super({ pageTitle: 'Auth' });
	}

	render() {
		return '<p>Auth</p>';
	}
}
