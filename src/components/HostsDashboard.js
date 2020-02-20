import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import App from '../model/App';
import Apps from '../model/Apps';
import Hosts from '../model/Hosts';
import hostsProvider from '../HOC/hostsProvider';
import appsProvider from '../HOC/appsProvider';
import { isDev } from '../constants';
import Checkbox from './Checkbox';
import HostCard from './HostCard';
import './HostsDashboard.scss';

const HostsDashboard = props => {
	const [listMode, setListMode] = React.useState(false);
	const [hosts, setHosts] = React.useState([]);
	React.useEffect(() => {
		const subscriptionId = 'hosts-update';

		if (isDev) {
			window.apps = props.apps;
			window.hosts = props.hosts;
		}

		fetch('/host-app-data.json')
			.then(res => res.json())
			.then(appsList => {
				appsList.forEach((appData, index) => {
					const appId = `${index + 1}`;
					const app = new App(appId, appData);
					props.apps.add(app);
					props.hosts.addAppToHosts(app);
				});

				setHosts(props.hosts.getAll());
				props.hosts.subscribe(subscriptionId, setHosts);
			});

		return () => props.hosts.unsubscribe(subscriptionId);
	}, [props.apps, props.hosts]);

	if (isDev) console.log('- render HostsDashboard');
	return (
		<div className="hosts-dashboard">
			<header>
				<h1 className="hosts-dashboard--title">Apps by Host</h1>
				<span className="hosts-dashboard--user">for user {props.userEmail}</span>
				<Checkbox className="hosts-dashboard--checkbox" value={listMode} onChange={setListMode}>
					{listMode ? <span>Show as an awesome grid</span> : <span>Show as list</span>}
				</Checkbox>
			</header>
			<ul className={classNames('hosts-dashboard--list', listMode ? 'hosts-dashboard--list-list' : 'hosts-dashboard--list-grid')}>
				{hosts.map(host => (
					<HostCard key={host.id} id={host.id} hosts={props.hosts} />
				))}
			</ul>
		</div>
	);
};

const { string, instanceOf } = PropTypes;
HostsDashboard.propTypes = {
	userEmail: string,
	apps: instanceOf(Apps).isRequired,
	hosts: instanceOf(Hosts).isRequired,
};

HostsDashboard.defaultProps = {
	userEmail: 'averylongemailaddress@companyname.com',
};

export default appsProvider(hostsProvider(HostsDashboard));
