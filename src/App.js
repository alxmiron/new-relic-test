import React from 'react';
import logo from './logo.svg';
import 'whatwg-fetch';
import './App.css';
import Hosts from './model/Hosts';

function App() {
	React.useEffect(() => {
		fetch('http://localhost:3000/host-app-data.json')
			.then(res => res.json())
			.then(sitesData => {
				const hosts = new Hosts(sitesData);
				console.log(hosts.toString());
			});
	}, []);
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
