import renderService from '@/core/services/render.service';
import template from './auth.template.html';
import styles from './auth.module.scss';
import { BaseScreen } from '@/core/component/base-screen.component';
import { AuthService } from '@/api/auth.service';
import { Button } from '@/components/ui/button/button.component';
import { $R } from '@/core/rquery/rquery.lib';
import { Field } from '@/components/ui/field/field.component';

export class Auth extends BaseScreen {
	#isTypeLogin = true;

	constructor() {
		super({ pageTitle: 'Auth' });
		this.AuthService = new AuthService();
	}

	#handleSubmit = event => {
		console.log(event.target);
	};

	#changeFormType(event) {
		event.preventDefault();

		$R(this.element)
			.find('h1')
			.text(this.#isTypeLogin ? 'Register' : 'Sign In');

		$R(event.target).text(this.#isTypeLogin ? 'Sign In' : 'Register');

		this.#isTypeLogin = !this.#isTypeLogin;
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Button({
					children: 'Submit'
				})
			],
			styles
		);

		$R(this.element)
			.find('#auth-inputs')
			.append(
				new Field({
					placeholder: 'Enter email',
					name: 'email',
					type: 'email'
				}).render()
			)
			.append(
				new Field({
					placeholder: 'Enter password',
					name: 'password',
					type: 'password'
				}).render()
			);

		$R(this.element)
			.find('#change-form-type')
			.click(this.#changeFormType.bind(this));

		$R(this.element).find('form').submit(this.#handleSubmit);

		return this.element;
	}
}
