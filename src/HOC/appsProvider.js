import React from 'react';
import Apps from '../model/Apps';

const appsProvider = Component => props => {
	const ref = React.useRef(null);
	if (!ref.current) ref.current = new Apps();
	return <Component {...props} apps={ref.current} />;
};

export default appsProvider;
