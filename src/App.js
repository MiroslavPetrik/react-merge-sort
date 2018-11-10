import React, { Component } from "react";
import PropTypes from "prop-types";

class List extends Component {
  static propTypes = {
    values: PropTypes.array.isRequired
  };

  render() {
    const { values } = this.props;

    return (
      <div className="list">
        {values.map(value => (
          <code className="cell" key={value}>
            {value}
          </code>
        ))}
      </div>
    );
  }
}

class Join extends Component {
  static propTypes = {
    array: PropTypes.array.isRequired,
    left: PropTypes.number.isRequired,
    mid: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired
  };

  render() {
    const { array, left, right, mid } = this.props;

    const leftSorted = array.slice(left, mid);
    const rightSorted = array.slice(mid, right);

    // here we mutate the array prop, so each component has access to the partial sorts
    // it's just a component communication, in real mergesort procedure, we wouldn't need this
    let sorted = [];

    while (leftSorted.length && rightSorted.length) {
      const [a] = leftSorted;
      const [b] = rightSorted;

      sorted.push(Math.min(a, b));

      sorted[sorted.length - 1] === a
        ? leftSorted.shift()
        : rightSorted.shift();
    }

    sorted = [...sorted, ...leftSorted, ...rightSorted];
    sorted.forEach((x, i) => (array[left + i] = x));

    return <List values={sorted} />;
  }
}

class MergeSort extends Component {
  static propTypes = {
    array: PropTypes.array.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired
  };

  render() {
    const { array, left, right } = this.props;
    const chunk = array.slice(left, right);
    const mid = left + Math.floor(chunk.length / 2);

    return (
      <div className="merge-sort">
        <div className="input">
          <List values={chunk} />
        </div>
        {chunk.length !== 1 && (
          <>
            <MergeSort {...this.props} right={mid} />
            <MergeSort {...this.props} left={mid} />
            <div className="join">
              <Join {...this.props} mid={mid} />
            </div>
          </>
        )}
      </div>
    );
  }
}

class App extends Component {
  render() {
    const array = [8, 5, 4, 6, 7, 1, 3, 2];

    return (
      <>
        <header>
          <h1>Merge Sort</h1>
        </header>
        <section>
          <MergeSort array={array} left={0} right={array.length} />
        </section>
        <footer>⚛ Miroslav Petrik</footer>
      </>
    );
  }
}

export default App;
