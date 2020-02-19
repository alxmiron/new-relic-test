class App {
	constructor(id, props) {
		this.id = id;
		this.name = props.name;
		this.contributors = props.contributors;
		this.apdex = props.apdex;
		this.version = props.version;
		this.host = props.host;
	}
}

export default App;
