import ChildComponent from '@/core/component/child.component';
import renderService from '@/core/services/render.service';
import template from './header.template.html';
import styles from './header.module.scss';
import { Logo } from './logo/logo.component';
import { LogoutButton } from './logout-button/logout-button.component';
import { Search } from './search/search.component';
import { UserItem } from '@/components/ui/user-item/user-item.component';

export class Header extends ChildComponent {
	constructor({ router }) {
		super();
		this.router = router;
	}
	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				Logo,
				new LogoutButton({ router: this.router }),
				Search,
				new UserItem({
					avatarPath:
						'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGQ8dQ-LMiMmTEyBijR0FzpQHC7tH6qTE2g&usqp=CAU',
					name: 'Saveliy'
				})
			],
			styles
		);

		return this.element;
	}
}
