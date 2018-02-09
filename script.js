function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}

// STOPWATCH CLASS DEFINITION
class Stopwatch {
  constructor(display, results) {
    this.running = false;
    this.display = display;
    this.results = results;
    this.reset();
    this.print(this.times);
  }
  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }
  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
  }
  print() {
    this.display.innerText = this.format(this.times);
  }
  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }
  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }
  stop() {
    this.running = false;
    clearInterval(this.watch);
  }
  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
    this.print();
  }
  addResult() {
    let listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(this.format(this.times)));
    this.results.appendChild(listItem);
  }
  clearResult() {
    this.results.innerHTML = "";
  }
}

// STOPWATCH OBJECT CREATION
const stopwatch = new Stopwatch(
  document.querySelector(".stopwatch"),
  document.querySelector(".results")
);

// BUTTONS VARIABLES
var startButton = document.getElementById("start");
startButton.addEventListener("click", () => stopwatch.start());

var stopButton = document.getElementById("stop");
stopButton.addEventListener("click", () => stopwatch.stop());

var resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => stopwatch.reset());

var addResultButton = document.getElementById("addResult");
addResultButton.addEventListener("click", () => stopwatch.addResult());

var clearResultButton = document.getElementById("clearResult");
clearResultButton.addEventListener("click", () => stopwatch.clearResult());
