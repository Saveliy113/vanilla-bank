import ChildComponent from '@/core/component/child.component';
import renderService from '@/core/services/render.service';
import template from './statistic-item.template.html';
import styles from './statistic-item.module.scss';
import { $R } from '@/core/rquery/rquery.lib';

/**
 * Statistic item is a class representing a statistic item component.
 */
export class StatisticItem extends ChildComponent {
	/**
	 * Constructs a Statistic Item instance.
	 * @param {string} label - Label to be displayed in the
	 * statistic item.
	 * @param {string|number} value - Value to be displayed in the
	 * statistic item.
	 * @param {('purple'|'green')} variant - Variant that
	 * determines the appearance of the statistic item. Allowed values:
	 * 'purple' or 'green'.
	 */
	constructor(label, value, variant) {
		super();

		if (!label || !value || !variant) {
			throw new Error('You must provide label, value and variant!');
		}

		this.label = label;
		this.value = value;
		this.variant = variant;
	}
	render() {
		this.element = renderService.htmlToElement(template, [], styles);

		$R(this.element).addClass(styles[this.variant]).addClass('fade-in');
		$R(this.element).find('#statistic-label').text(this.label);
		$R(this.element).find('#statistic-value').text(this.value);

		return this.element;
	}
}
