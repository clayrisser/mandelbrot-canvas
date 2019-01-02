export default class Mandelbrot {
  mouseState = {
    down: null
  };

  state = {
    calibration: 5,
    height: 600,
    hue: 0,
    detail: 100,
    magnification: 200,
    panX: 2,
    panY: 1.5,
    width: 600
  };

  constructor(element = document.getElementById('mandelbrot'), state) {
    this.state = {
      ...this.state,
      ...state
    };
    this.element = element;
    this.canvas = document.createElement('canvas');
    this.canvas.height = this.state.height;
    this.canvas.onmousedown = this.handleMouseDown.bind(this);
    this.canvas.onmousemove = this.handleMouseMove.bind(this);
    this.canvas.onmouseup = this.handleMouseUp.bind(this);
    this.canvas.onmousewheel = this.handleMouseWheel.bind(this);
    this.canvas.width = this.state.width;
    this.ctx = this.canvas.getContext('2d');
    element.appendChild(this.canvas);
  }

  handleMouseDown(e) {
    this.mouseState = {
      down: e
    };
  }

  handleMouseUp() {
    this.setState(this.mouseState.newState);
    this.mouseState = {
      down: null
    };
  }

  handleMouseWheel(e) {
    const { magnification } = this.state;
    this.setState({
      magnification:
        magnification - e.deltaY >= 50 ? magnification - e.deltaY : 50
    });
  }

  handleMouseMove(e) {
    if (this.mouseState?.down) {
      const { panX, panY } = this.state;
      this.mouseState = {
        ...this.mouseState,
        newState: {
          panX:
            panX +
            (e.screenX - this.mouseState.down.screenX) /
              this.state.magnification,
          panY:
            panY +
            (e.screenY - this.mouseState.down.screenY) /
              this.state.magnification
        }
      };
    }
  }

  belongsToSet(x, y) {
    let X = x;
    let Y = y;
    for (let i = 0; i < this.state.detail; i++) {
      const newX = X * X - Y * Y + x;
      const newY = 2 * Y * X + y;
      X = newX;
      Y = newY;
      if (X * Y > this.state.calibration) {
        return (i / this.state.detail) * 100;
      }
    }
    return 0;
  }

  setState(state) {
    this.state = {
      ...this.state,
      ...state
    };
    this.render();
  }

  render() {
    this.canvas.width = this.state.width;
    this.canvas.height = this.state.height;
    for (let x = 0; x < this.canvas.width; x++) {
      for (let y = 0; y < this.canvas.height; y++) {
        const belongsToSet = this.belongsToSet(
          x / this.state.magnification - this.state.panX,
          y / this.state.magnification - this.state.panY
        );
        if (belongsToSet === 0) {
          this.ctx.fillStyle = '#000';
          this.ctx.fillRect(x, y, 1, 1);
        } else {
          this.ctx.fillStyle = `hsl(${this.state.hue}, 100%, ${belongsToSet}%)`;
          this.ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  }
}
