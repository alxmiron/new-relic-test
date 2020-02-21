import uuidv4 from 'uuid/v4';

class App {
	constructor(props, customId) {
		this.id = customId || uuidv4();
		this.name = props.name;
		this.contributors = props.contributors;
		this.apdex = props.apdex;
		this.version = props.version;
		this.host = props.host;
	}
}

export default App;
