import React from 'react';
import PropTypes from 'prop-types';
import Host from '../model/Host';
import { isDev } from '../constants';
import './HostCard.scss';

const HostCard = props => {
	const [apps, setApps] = React.useState(props.host.getApps().slice(0, 5));
	React.useEffect(() => {
		const subscriptionId = 'apps-update';
		props.host.subscribe(subscriptionId, apps => setApps(apps.slice(0, 5)));
		return () => props.host.unsubscribe(subscriptionId);
	}, [props.host]);

	if (isDev) console.log('- render HostCard');
	return (
		<li className="host--card">
			<h3>{props.id}</h3>
			<ul className="host--list">
				{apps.map(app => (
					<li key={app.id} className="host--app">
						<small>{app.apdex}</small>
						<span>{app.name}</span>
					</li>
				))}
			</ul>
		</li>
	);
};

const { string, instanceOf } = PropTypes;
HostCard.propTypes = {
	id: string.isRequired,
	host: instanceOf(Host).isRequired,
};

HostCard.defaultProps = {};

export default React.memo(HostCard);
