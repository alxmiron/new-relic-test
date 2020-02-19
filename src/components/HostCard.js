import React from 'react';
import PropTypes from 'prop-types';
import './HostCard.scss';

const HostCard = props => {
	return (
		<li className="host--card">
			<h3>{props.id}</h3>
			<ul className="host--list">
				{props.apps.map(app => (
					<li key={app.id} className="host--app">
						<small>{app.apdex}</small>
						<span>{app.name}</span>
					</li>
				))}
			</ul>
		</li>
	);
};

const { string, arrayOf, shape } = PropTypes;
HostCard.propTypes = {
	id: string.isRequired,
	apps: arrayOf(shape({ id: string.isRequired, name: string.isRequired })).isRequired,
};

HostCard.defaultProps = {};

export default HostCard;
