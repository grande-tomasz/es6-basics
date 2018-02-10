"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pad0 = function pad0(value) {
  var result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
};
var format = function format(times) {
  return pad0(times.minutes) + ":" + pad0(times.seconds) + ":" + pad0(Math.floor(times.miliseconds));
};

var resultId = 0;

var Result = function (_React$Component) {
  _inherits(Result, _React$Component);

  function Result() {
    _classCallCheck(this, Result);

    return _possibleConstructorReturn(this, (Result.__proto__ || Object.getPrototypeOf(Result)).apply(this, arguments));
  }

  _createClass(Result, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "ul",
        { className: "results" },
        this.results
      );
    }
  }, {
    key: "results",
    get: function get() {
      return this.props.results.map(function (result) {
        resultId++;
        return React.createElement(
          "li",
          { key: resultId },
          result
        );
      });
    }
  }]);

  return Result;
}(React.Component);

var App = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App(props) {
    _classCallCheck(this, App);

    var _this2 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this2.state = {
      times: {
        miliseconds: 0,
        seconds: 0,
        minutes: 0
      },
      running: false,
      results: []
    };
    _this2.display = _this2.props.display;
    _this2.results = _this2.props.results;
    return _this2;
  }

  _createClass(App, [{
    key: "calculate",
    value: function calculate() {
      this.setState({
        times: {
          miliseconds: this.state.times.miliseconds + 1,
          seconds: this.state.times.seconds,
          minutes: this.state.times.minutes
        }
      });
      if (this.state.times.miliseconds >= 100) {
        this.setState({
          times: {
            miliseconds: 0,
            seconds: this.state.times.seconds + 1,
            minutes: this.state.times.minutes
          }
        });
      }
      if (this.state.times.seconds >= 60) {
        this.setState({
          times: {
            miliseconds: this.state.times.miliseconds,
            seconds: 0,
            minutes: this.state.times.minutes + 1
          }
        });
      }
    }
  }, {
    key: "step",
    value: function step() {
      if (!this.state.running) return;
      this.calculate();
    }
  }, {
    key: "start",
    value: function start() {
      var _this3 = this;

      if (!this.state.running) {
        this.state.running = true;
        this.watch = setInterval(function () {
          return _this3.step();
        }, 10);
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      this.state.running = false;
      clearInterval(this.watch);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.setState({
        times: {
          miliseconds: 0,
          seconds: 0,
          minutes: 0
        }
      });
    }
  }, {
    key: "addResult",
    value: function addResult() {
      this.setState({
        results: [].concat(_toConsumableArray(this.state.results), [format(this.state.times)])
      });
    }
  }, {
    key: "clearResult",
    value: function clearResult() {
      resultId = 0;
      this.setState({
        results: []
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "stopwatch" },
          format(this.state.times)
        ),
        React.createElement(
          "nav",
          { className: "controls" },
          React.createElement(
            "a",
            { href: "#", className: "button", id: "start", onClick: this.start.bind(this) },
            "Start"
          ),
          React.createElement(
            "a",
            { href: "#", className: "button", id: "stop", onClick: this.stop.bind(this) },
            "Stop"
          ),
          React.createElement(
            "a",
            { href: "#", className: "button", id: "reset", onClick: this.reset.bind(this) },
            "Reset"
          ),
          React.createElement("br", null),
          React.createElement(
            "a",
            { href: "#", className: "button", id: "addResult", onClick: this.addResult.bind(this) },
            "Add to results"
          ),
          React.createElement(
            "a",
            { href: "#", className: "button", id: "clearResult", onClick: this.clearResult.bind(this) },
            "Clear results"
          )
        ),
        React.createElement(Result, { results: this.state.results, times: format(this.state.times) })
      );
    }
  }]);

  return App;
}(React.Component);

;

var app = React.createElement(App, null);
ReactDOM.render(app, document.getElementById("app"));
