import { BaseScreen } from '@/core/component/base-screen.component';

export class NotFound extends BaseScreen {
	constructor() {
		super({ pageTitle: 'Not Found' });
	}
	
	render() {
		return '<p>Not Found</p>';
	}
}
