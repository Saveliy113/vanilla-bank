import { BaseScreen } from '@/core/component/base-screen.component';
import renderService from '@/core/services/render.service';
import template from './home.template.html';
import styles from './home.module.scss';
import { $R } from '@/core/rquery/rquery.lib';

export class Home extends BaseScreen {
	constructor() {
		super({ pageTitle: 'Home' });
	}

	render() {
		const element = renderService.htmlToElement(template, [], styles);
		$R(element).find('h1').css('background-color', 'green');
		return element;
	}
}
