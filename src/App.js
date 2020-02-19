import React from 'react';
import 'whatwg-fetch';
import App from './model/App';
import Apps from './model/Apps';
import Hosts from './model/Hosts';
import HostsDashboard from './components/HostsDashboard';
import './App.scss';

const hosts = ['e7bf58af-f0be.dallas.biz', 'b0b655c5-928a.nadia.biz', '95b346a0-17f4.abbigail.name'];

function MyApp() {
	React.useEffect(() => {
		fetch('http://localhost:3000/host-app-data.json')
			.then(res => res.json())
			.then(appsList => {
				const apps = new Apps();
				const hosts = new Hosts();

				appsList.forEach((appData, index) => {
					const appId = `${index + 1}`;
					const app = new App(appId, appData);
					apps.add(app);
					hosts.addAppToHosts(app);
				});

				window.apps = apps;
				window.hosts = hosts;
				// console.log(apps.toString());
				// console.log(hosts.toString());
			});
	}, []);
	return <HostsDashboard hosts={hosts} />;
}

export default MyApp;
