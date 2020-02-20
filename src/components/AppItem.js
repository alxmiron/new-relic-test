import React from 'react';
import PropTypes from 'prop-types';
import App from '../model/App';
import Hosts from '../model/Hosts';
import CrossIcon from './CrossIcon';
import './AppItem.scss';

const AppItem = props => {
	const app = props.app;
	return (
		<li key={app.id} className="appItem" onClick={() => alert(`Release version: ${app.version}`)}>
			<small>{app.apdex}</small>
			<span className="appItem--name">{app.name}</span>
			<button
				className="appItem--remove"
				type="button"
				onClick={e => {
					e.preventDefault();
					e.stopPropagation();
					props.hosts.removeAppFromHosts(app);
				}}
			>
				<CrossIcon />
			</button>
		</li>
	);
};

const { string, instanceOf } = PropTypes;
AppItem.propTypes = {
	id: string.isRequired,
	app: instanceOf(App).isRequired,
	hosts: instanceOf(Hosts).isRequired,
};

export default AppItem;
