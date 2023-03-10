import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const { Device } = require('twilio-client');

class App extends Component {
  constructor(props) {
    super(props)

    this.state={
      identity: '',
      status: '',
      ready: false
    }
  }

  componentDidMount() {
    const device = new Device();

    this.setState({
      device: device
    });

    device.on('incoming', connection => {
      // immediately accepts incoming connection
      connection.accept();
  
      this.setState({
        status: connection.status()
      });
    });
  
    device.on('ready', device => {
      this.setState({
        status: "device ready",
        ready: true
      });
    });
  
    device.on('connect', connection => {
      this.setState({
        status: connection.status()
      });
    });
  
    device.on('disconnect', connection => {
      this.setState({
        status: connection.status()
      });
    });
  }


  setup(event) {
    // prevents form submission and page refresh
    event.preventDefault();
  }


  render() {
    return (
      <div className="App">
        { 
          this.state.ready
          ? <button>
              Press to Talk
            </button> 
          : <div>
              <p>Enter your name to begin.</p>
              <form>
                <input 
                  type="text" 
                  placeholder="What's your name?"></input>
                <input type="submit" value="Begin Session"></input>
              </form>
            </div>
        }
        <p>{ this.state.status }</p>
      </div>
    );
  }
}

export default App;