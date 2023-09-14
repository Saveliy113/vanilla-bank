const SITE_NAME = 'Vanilla Bank';

export const getPageTitle = title => {
	return title ? `${SITE_NAME} | ${title}` : SITE_NAME;
};
