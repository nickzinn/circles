import React from 'react';

import './Canvas.css';

export default class Canvas extends React.Component {
  constructor (props) {
    super(props);
    this.canvasRef = React.createRef();
    this.animate.bind(this);

  }

  drawScore(score){
    var method = this.props['setScore'];
    method(score);
  }

  componentDidMount () {
    //add keyboard listener
    //add mouse listener

    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    var that = this;
  
    var width = canvas.width;
    var height = canvas.height;
    // If window size is changed this is called to resize the canvas
    // It is not called via the resize event as that can fire to often and
    // debounce makes it feel sluggish so is called from main loop.
    function resizeCanvas () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      width = canvas.width;
      height = canvas.height;
    }

    let keysPressed = {};
    document.addEventListener('keydown', (event) => {
      keysPressed[event.key] = true;
    });
    document.addEventListener('keyup', (event) => {
      delete keysPressed[event.key];
   });

    window.addEventListener('mousedown', function(e) {
      const rect = canvas.getBoundingClientRect()
      that.handleMouseClick( e.clientX - rect.left, e.clientY - rect.top )
    });
    window.addEventListener("touchmove", function(e){
      const rect = canvas.getBoundingClientRect();
      const touch = e.targetTouches[0];
      that.handleMouseClick( touch.clientX - rect.left, touch.clientY - rect.top )
    }, false);

    var lastTime =0;
    
    function loop (time) {
      const timeSinceLastAnimation = time-lastTime;
      lastTime = time;
      if (width !== window.innerWidth || height !== window.innerHeight) {
        resizeCanvas();
      }

      Object.keys(keysPressed).forEach( (key) => that.handleKeyPressed(key));

      ctx.save(); //Freeze redraw
      
      that.animate(timeSinceLastAnimation, ctx, canvas); 
      
      ctx.restore();//now do redraw

      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    this.init();
  }

  init(){

  }

  handleMouseClick(x, y){
  }

  handleKeyPressed(key){
  }

  action(command){
  }

  animate(timeSinceLastAnimation, ctx, canvas){
  }

  render () {
    return (
        <canvas id='Canvas' ref={this.canvasRef} />
    );
  }
}
