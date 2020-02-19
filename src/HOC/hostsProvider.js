import React from 'react';
import Hosts from '../model/Hosts';

const hostsProvider = Component => props => {
	const ref = React.useRef(null);
	if (!ref.current) ref.current = new Hosts();
	return <Component {...props} hosts={ref.current} />;
};

export default hostsProvider;
