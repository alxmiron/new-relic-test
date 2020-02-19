import React from 'react';
import PropTypes from 'prop-types';
import './HostCard.scss';

const HostCard = props => {
	return (
		<li className="host--card">
			<h3>{props.id}</h3>
			<ul className="host--list">
				{props.sites.map(site => (
					<li key={site.id} className="host--site">
						<small>{site.apdex}</small>
						<span>{site.name}</span>
					</li>
				))}
			</ul>
		</li>
	);
};

const { string, arrayOf, shape } = PropTypes;
HostCard.propTypes = {
	id: string.isRequired,
	sites: arrayOf(shape({ id: string.isRequired, name: string.isRequired })).isRequired,
};

HostCard.defaultProps = {};

export default HostCard;
