import renderService from '@/core/services/render.service';
import template from './auth.template.html';
import styles from './auth.module.scss';
import { BaseScreen } from '@/core/component/base-screen.component';
import { Heading } from '@/components/ui/heading/heading.component';

export class Auth extends BaseScreen {
	constructor() {
		super({ pageTitle: 'Auth' });
	}
	render() {
		this.element = renderService.htmlToElement(
			template,
			[new Heading('Авторизация')],
			styles
		);

		return this.element;
	}
}
