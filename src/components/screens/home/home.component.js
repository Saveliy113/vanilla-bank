import { BaseScreen } from '@/core/component/base-screen.component';
import renderService from '@/core/services/render.service';
import template from './home.template.html';
import styles from './home.module.scss';
import { Field } from '@/components/ui/field/field.component';
import { UserItem } from '@/components/ui/user-item/user-item.component';
// import { $R } from '@/core/rquery/rquery.lib';

export class Home extends BaseScreen {
	constructor() {
		super({ pageTitle: 'Home' });
	}

	render() {
		const element = renderService.htmlToElement(
			template,
			[
				new Field({
					name: 'Test',
					placeholder: 'Enter email',
					variant: 'green'
				}),
				new UserItem({
					avatarPath:
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGQ8dQ-LMiMmTEyBijR0FzpQHC7tH6qTE2g&usqp=CAU',
					name: 'Saveliy'
				})
			],
			styles
		);

		return element;
	}
}
