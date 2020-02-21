import React from 'react';
import PropTypes from 'prop-types';
import App from '../model/App';
import Apps from '../model/Apps';
import Hosts from '../model/Hosts';
import './NewAppForm.scss';

const NewAppForm = props => {
	const [name, setName] = React.useState('');
	const [apdex, setApdex] = React.useState('');
	const [hosts, setHosts] = React.useState(['']);
	const resetForm = () => {
		setName('');
		setApdex('');
		setHosts(['']);
	};
	const onSubmit = e => {
		e.preventDefault();
		const appData = {
			name: name,
			contributors: [],
			version: 1,
			apdex: apdex,
			host: hosts.filter(Boolean),
		};
		const app = new App(appData);
		props.apps.add(app);
		props.hosts.addAppToHosts(app);
		resetForm();
	};
	return (
		<form className="form" onSubmit={onSubmit}>
			<h2>Add App to Hosts</h2>
			<section>
				<input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required className="form--input" />
				<input
					type="number"
					name="apdex"
					value={apdex}
					onChange={e => {
						const num = parseInt(e.target.value, 10);
						if (isNaN(num)) return setApdex('');
						if (num > 100) return setApdex(100);
						if (num < 0) return setApdex(0);
						return setApdex(num);
					}}
					min="0"
					max="100"
					placeholder="Apdex"
					className="form--input"
					required
				/>
			</section>
			<section className="form--hosts">
				{hosts.concat('').map((hostId, idx) => (
					<input
						type="text"
						key={`host-${idx}`}
						name={`host-${idx}`}
						value={hostId}
						placeholder="Host ID"
						required={idx === 0}
						className="form--input"
						onChange={e => {
							if (idx < hosts.length) {
								setHosts(hosts.map((host, index) => (idx === index ? e.target.value : host)));
							} else {
								setHosts(hosts.concat(e.target.value));
							}
						}}
					/>
				))}
			</section>
			<footer>
				<button type="submit" className="form--btn">
					Submit
				</button>
			</footer>
		</form>
	);
};

const { instanceOf } = PropTypes;
PropTypes.propTypes = {
	apps: instanceOf(Apps).isRequired,
	hosts: instanceOf(Hosts).isRequired,
};

export default React.memo(NewAppForm);
