import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import HostCard from './HostCard';
import './HostsDashboard.scss';

const apps = [
	{
		id: '1',
		name: 'Small Fresh Pants - Kautzer - Boyer, and Sons',
		contributors: ['Edwin Reinger', 'Ofelia Dickens', 'Hilbert Cole', 'Helen Kuphal', 'Maurine McDermott Sr.'],
		version: 7,
		apdex: 68,
	},
	{
		id: '2',
		name: 'Refined Concrete Shirt - Hudson - Sauer, Group',
		contributors: ['Ramon Harris DDS', 'Summer Dicki', 'Triston Sipes', 'Fae Lind', 'Carole Emard'],
		version: 6,
		apdex: 57,
	},
	{
		id: '3',
		name: 'Ergonomic Wooden Soap - Lemke and Sons, Inc',
		contributors: ['Miss Moises Walter', 'Caroline Murazik'],
		version: 2,
		apdex: 61,
	},
	{
		id: '4',
		name: 'Small Fresh Pants - Kautzer - Boyer, and Sons',
		contributors: ['Edwin Reinger', 'Ofelia Dickens', 'Hilbert Cole', 'Helen Kuphal', 'Maurine McDermott Sr.'],
		version: 7,
		apdex: 68,
	},
	{
		id: '5',
		name: 'Refined Concrete Shirt - Hudson - Sauer, Group',
		contributors: ['Ramon Harris DDS', 'Summer Dicki', 'Triston Sipes', 'Fae Lind', 'Carole Emard'],
		version: 6,
		apdex: 57,
	},
	{
		id: '6',
		name: 'Ergonomic Wooden Soap - Lemke and Sons, Inc',
		contributors: ['Miss Moises Walter', 'Caroline Murazik'],
		version: 2,
		apdex: 61,
	},
];

const HostsDashboard = props => {
	const [listMode, setListMode] = React.useState(false);
	return (
		<div className="hosts-dashboard">
			<header>
				<h1 className="hosts-dashboard--title">Apps by Host</h1>
				<span className="hosts-dashboard--user">for user {props.userEmail}</span>
				<Checkbox className="hosts-dashboard--checkbox" value={listMode} onChange={setListMode}>
					{listMode ? <span>Show as an awesome grid</span> : <span>Show as list</span>}
				</Checkbox>
			</header>
			<ul className="hosts-dashboard--list">
				{props.hosts.map(host => (
					<HostCard id={host} key={host} apps={apps} />
				))}
			</ul>
		</div>
	);
};

const { string, arrayOf } = PropTypes;
HostsDashboard.propTypes = {
	userEmail: string,
	hosts: arrayOf(string).isRequired,
};

HostsDashboard.defaultProps = {
	userEmail: 'averylongemailaddress@companyname.com',
};

export default HostsDashboard;
