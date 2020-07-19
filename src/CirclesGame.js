import Canvas from './Canvas';

export default class CirclesGame extends Canvas {
  constructor (props) {
    super(props);
  }

  init(){
    this.xPos =100;
    this.yPos =100;
    this.xVelocity =0;
    this.yVelocity =0;
    this.score =0;
    this.drawScore(this.score);
  }

   handleMouseClick(x, y){
    this.xPos = x;
    this.yPos = y;
    this.drawScore( ++ this.score );
  }

  handleKeyPressed(key){
    switch(key){
      case 'a':
      case 'ArrowLeft':
        this.xVelocity--;
        break;
      case 'w':
      case 'ArrowUp':
        this.yVelocity--;
        break;
      case 's':
      case 'ArrowDown':
        this.yVelocity++;
        break;
      case 'd':
      case 'ArrowRight':
        this.xVelocity++;
        break;
    }
  }

  action(command){
    if(command === "restart"){
      this.init();
    }
  }

  animate(timeSinceLastAnimation, ctx, canvas){
    ctx.fillStyle = 'lightGray';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.xPos-25, this.yPos-25, 50, 50);
    this.xPos+= this.xVelocity/10;
    this.yPos+= this.yVelocity/10;
    if(this.xPos> canvas.width)
      this.xPos=0;
    if(this.yPos> canvas.height)
      this.yPos=0;
    if(this.xPos < 0)
      this.xPos=canvas.width;
    if(this.yPos <0)
      this.yPos=canvas.height;
    ctx.fillText(`FPS: ${Math.round(1000 / timeSinceLastAnimation)}` , 5, canvas.height -5);
  }
}
