import React, { Component } from 'react';
import Mandelbrot from '../src';

export default class App extends Component {
  componentDidMount() {
    this.mandelbrot = new Mandelbrot(this.refs.mandelbrot);
    this.mandelbrot.render();
  }

  render() {
    return (
      <div>
        <h1>Mandelbrot Canvas</h1>
        <div ref="mandelbrot" />
      </div>
    );
  }
}
