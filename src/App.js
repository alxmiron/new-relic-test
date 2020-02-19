import React from 'react';
import 'whatwg-fetch';
import Site from './model/Site';
import Sites from './model/Sites';
import Hosts from './model/Hosts';
import HostsDashboard from './components/HostsDashboard';
import './App.scss';

const hosts = ['e7bf58af-f0be.dallas.biz', 'b0b655c5-928a.nadia.biz', '95b346a0-17f4.abbigail.name'];

function App() {
	React.useEffect(() => {
		fetch('http://localhost:3000/host-app-data.json')
			.then(res => res.json())
			.then(sitesList => {
				const sites = new Sites();
				const hosts = new Hosts();

				sitesList.forEach((siteData, index) => {
					const siteId = `${index + 1}`;
					const site = new Site(siteId, siteData);
					sites.add(site);
					hosts.addAppToHosts(site);
				});

				// console.log(sites.toString());
				// console.log(hosts.toString());
			});
	}, []);
	return <HostsDashboard hosts={hosts} />;
}

export default App;
