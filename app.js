const pad0 = (value) => {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
};
const format = (times) => {
  return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
};

let resultId = 0;
class Result extends React.Component {
  get results() {
    return this.props.results.map(result => {
      resultId++;
      return <li key={resultId}>{result}</li>
    });
  }
  render() {
    return (
      <ul className="results">{this.results}</ul>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      times: {
        miliseconds: 0,
        seconds: 0,
        minutes: 0
      },
      running: false,
      results: []
    };
    this.display = this.props.display;
    this.results = this.props.results;
  }
  calculate() {
    this.setState({
      times: {        
        miliseconds: this.state.times.miliseconds+1,
        seconds: this.state.times.seconds,
        minutes: this.state.times.minutes
      }
    });
    if (this.state.times.miliseconds >= 100) {
      this.setState({
        times: {        
          miliseconds: 0,
          seconds: this.state.times.seconds+1,
          minutes: this.state.times.minutes
        }
      });
    }
    if (this.state.times.seconds >= 60) {
      this.setState({
        times: {        
          miliseconds: this.state.times.miliseconds,
          seconds: 0,
          minutes: this.state.times.minutes+1
        }
      });
    }
  }
  step() {
    if (!this.state.running) return;
    this.calculate();
  }
  start() {
    if (!this.state.running) {
      this.state.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }
  stop() {
    this.state.running = false;
    clearInterval(this.watch);
  }
  reset() {
    this.setState({
      times: {        
        miliseconds: 0,
        seconds: 0,
        minutes: 0
      }
    });
  }
  addResult() {
    this.setState({
      results: [...this.state.results, format(this.state.times)]
    });
  }
  clearResult() {
    resultId = 0;
    this.setState({
      results: []
    });
  }
  render() {
    return (
      <div>
        <div className="stopwatch">{format(this.state.times)}</div>
        <nav className="controls">
          <a href="#" className="button" id="start" onClick={this.start.bind(this)}>Start</a>
          <a href="#" className="button" id="stop" onClick={this.stop.bind(this)}>Stop</a>
          <a href="#" className="button" id="reset" onClick={this.reset.bind(this)}>Reset</a>
          <br />
          <a href="#" className="button" id="addResult" onClick={this.addResult.bind(this)}>Add to results</a>
          <a href="#" className="button" id="clearResult" onClick={this.clearResult.bind(this)}>Clear results</a>
        </nav>
        <Result results={this.state.results} times={format(this.state.times)} />
      </div>
    );
  }
};

const app = <App />;
ReactDOM.render(app, document.getElementById("app"));
