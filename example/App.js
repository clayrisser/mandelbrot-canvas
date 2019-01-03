import React, { Component } from 'react';
import Slider from 'carbon-components-react/es/components/Slider';
import Mandelbrot from '../src';

export default class App extends Component {
  static styles = {
    parent: {
      paddingTop: '20px',
      paddingLeft: '20px'
    },
    child: {
      marginBottom: '20px',
      marginRight: '20px'
    }
  };

  state = {
    hue: 0,
    detail: 100,
    magnification: 10
  };

  componentDidMount() {
    this.mandelbrot = new Mandelbrot(this.refs.mandelbrot, {
      width: 1000
    });
    this.mandelbrot.render();
  }

  render() {
    const { detail, hue, magnification } = this.state;
    return (
      <div style={App.styles.parent}>
        <h1>Mandelbrot Canvas</h1>
        <div
          style={{
            display: 'flex'
          }}
        >
          <div style={App.styles.child} ref="mandelbrot" />
          <div>
            <div style={App.styles.child}>
              <Slider
                labelText="Hue"
                min={0}
                max={366}
                value={hue}
                onMouseUp={() => this.mandelbrot.setState({ hue })}
                onChange={({ value }) => this.setState({ hue: value })}
              />
            </div>
            <div style={App.styles.child}>
              <Slider
                labelText="Detail"
                min={0}
                max={500}
                value={detail}
                onMouseUp={() => this.mandelbrot.setState({ detail })}
                onChange={({ value }) => this.setState({ detail: value })}
              />
            </div>
            <div style={App.styles.child}>
              <Slider
                labelText="Magnification"
                min={0}
                max={1000}
                value={magnification}
                onMouseUp={() =>
                  this.mandelbrot.setState({
                    magnification: magnification * magnification + 50
                  })
                }
                onChange={({ value }) =>
                  this.setState({ magnification: value })
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
