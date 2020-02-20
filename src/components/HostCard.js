import React from 'react';
import PropTypes from 'prop-types';
import Hosts from '../model/Hosts';
import { isDev } from '../constants';
import AppItem from './AppItem';
import './HostCard.scss';

const HostCard = props => {
	const [apps, setApps] = React.useState(props.hosts.getTopAppsByHost(props.id).slice(0, 5));
	React.useEffect(() => {
		const host = props.hosts.get(props.id);
		const subscriptionId = 'apps-update';
		host.subscribe(subscriptionId, apps => setApps(apps.slice(0, 5)));
		return () => host.unsubscribe(subscriptionId);
	}, [props.hosts, props.id]);

	if (isDev) console.log('- render HostCard');
	return (
		<li className="host--card">
			<h3>{props.id}</h3>
			<ul className="host--list">
				{apps.map(app => (
					<AppItem key={app.id} id={app.id} app={app} hosts={props.hosts} />
				))}
			</ul>
		</li>
	);
};

const { string, instanceOf } = PropTypes;
HostCard.propTypes = {
	id: string.isRequired,
	hosts: instanceOf(Hosts).isRequired,
};

export default React.memo(HostCard);
