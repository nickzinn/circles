(this.webpackJsonpcircles=this.webpackJsonpcircles||[]).push([[0],{61:function(e,t,i){e.exports=i(72)},66:function(e,t,i){},71:function(e,t,i){},72:function(e,t,i){"use strict";i.r(t);var n=i(0),a=i.n(n),o=i(8),s=i.n(o),r=i(120),l=i(119),h=i(9),c=i(10),u=i(35),d=i(34),v=(i(66),i(113)),p=i(114),g=i(42),m=i(105),f=i(115),y=i(116),w=i(117),b=i(45),k=i(40),C=i(18),S=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{x:0,y:0},i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{width:0,height:0};Object(h.a)(this,e),this.position=void 0,this.size=void 0,this.isAlive=!0,this.speed=0,this.angle=0,this.acceleration=0,this.canCollide=!1,this.isFixedPosition=!1,this.behaviors=[],this.position=t,this.size=i}return Object(c.a)(e,[{key:"addBehavior",value:function(e){e.init&&e.init(this),this.behaviors.push(e)}},{key:"paint",value:function(e,t,i){var n=this;this.behaviors.forEach((function(a){var o;return null===(o=a.paint)||void 0===o?void 0:o.call(a,n,e,t,i)}))}},{key:"updateModel",value:function(e){var t=this;this.behaviors.forEach((function(i){var n;return null===(n=i.updateModel)||void 0===n?void 0:n.call(i,t,e)}))}},{key:"handleKill",value:function(){var e=this;this.behaviors.forEach((function(t){var i;return null===(i=t.handleKill)||void 0===i?void 0:i.call(t,e)}))}},{key:"handleCollision",value:function(e){var t=this;this.behaviors.forEach((function(i){var n;return null===(n=i.handleCollision)||void 0===n?void 0:n.call(i,t,e)}))}}]),e}();function z(e){return{x:Math.round(e.x),y:Math.round(e.y)}}function x(e){return e.speed&&e.angle?{x:e.speed*Math.cos(e.angle),y:e.speed*Math.sin(e.angle)}:{x:0,y:0}}function E(e,t){var i=e.size.width,n=e.size.height;if((i|n)<0)return t;var a=t.size.width,o=t.size.height;if((a|o)<0)return e;var s=e.position.x,r=e.position.y;i+=s,n+=r;var l=t.position.x,h=t.position.y;return s>l&&(s=l),r>h&&(r=h),i<(a+=l)&&(i=a),n<(o+=h)&&(n=o),{position:{x:s,y:r},size:{width:i-=s,height:n-=r}}}function M(e,t){var i=e.size.width,n=e.size.height,a=t.size.width,o=t.size.height;if(a<=0||o<=0||i<=0||n<=0)return!1;var s=e.position.x,r=e.position.y,l=t.position.x,h=t.position.y;return o+=h,i+=s,n+=r,((a+=l)<l||a>s)&&(o<h||o>r)&&(i<s||i>l)&&(n<r||n>h)}function O(e,t){var i=e.indexOf(t,0);i>-1&&e.splice(i,1)}var P=function(e){Object(u.a)(i,e);var t=Object(d.a)(i);function i(e){var n,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{width:0,height:0};return Object(h.a)(this,i),(n=t.call(this)).viewPort={x:0,y:0},n.controller=void 0,n.debug=!1,n.collisionListeners=[],n.sprites=[],n.wrapAround=!1,n.sceneSpeed=1,n.modelSize=void 0,n.count=0,n.totalTime=0,n.controller=e,n.modelSize=a,n}return Object(c.a)(i,[{key:"handleKeyPressed",value:function(e){}},{key:"handleMouseClick",value:function(e,t){}},{key:"getSpritesAtPoint",value:function(e){return this.sprites.filter((function(t){return function(e,t){return e.x>=t.position.x&&e.x<t.position.x+t.size.width&&e.y>=t.position.y&&e.y<t.position.y+t.size.height}(e,t)}))}},{key:"addSprite",value:function(e){this.debug&&console.log("AddSprite: "+e),this.sprites.push(e),e.priorPosition=e.position,e.handleCollision&&this.collisionListeners.push(e)}},{key:"removeSprite",value:function(e){var t;null===(t=e.handleKill)||void 0===t||t.call(e),this.debug&&console.log("RemoveSprite: "+e),O(this.sprites,e),O(this.collisionListeners,e)}},{key:"resetGame",value:function(){this.sprites=[],this.collisionListeners=[]}},{key:"updateModel",value:function(e){Object(k.a)(Object(C.a)(i.prototype),"updateModel",this).call(this,e),this.handleMovement(e)}},{key:"handleMovement",value:function(e){for(var t=e/1e3,i=this.sprites.slice();i.length;){var n=i.pop();if(n.isAlive){if(n.speed){var a={position:z(n.position),size:n.size},o=x(n),s=n.position.x+o.x*t*this.sceneSpeed,r=n.position.y+o.y*t*this.sceneSpeed,l=!1;if(this.wrapAround){var h=this.size.width,c=this.size.height;0!==this.modelSize.width&&(h=this.modelSize.width,c=this.modelSize.height),s<0?(s=h-n.size.width,l=!0):s+n.size.width>h&&(s=0,l=!0),r<0?(r=c-n.size.height,l=!0):r+n.size.height>c&&(r=0,l=!0)}n.priorPosition=a.position,n.position={x:s,y:r};var u={position:z(n.position),size:n.size};l||(u=E(a,u)),n.canCollide&&this._handleCollision(u,n),n.acceleration&&(Math.sign(n.acceleration+n.speed)!==Math.sign(n.speed)?n.speed=0:n.speed=n.speed+n.acceleration)}n.updateModel&&n.updateModel(e),n.isAlive||this.removeSprite(n)}else this.removeSprite(n)}}},{key:"_handleCollision",value:function(e,t){var i;if(t.handleCollision)for(var n=0;n<this.sprites.length;n++){var a=this.sprites[n];if(t!==a&&a.canCollide&&M(e,a)){t.handleCollision(a),i=a;break}}i||(i=t);for(var o=0;o<this.collisionListeners.length;o++){var s=this.collisionListeners[o];if(t!==s&&M(e,s)){s.handleCollision(t),i=s;break}}i.isAlive||this.removeSprite(i)}},{key:"paint",value:function(e,t,n){e={x:e.x+this.viewPort.x,y:e.y+this.viewPort.y},Object(k.a)(Object(C.a)(i.prototype),"paint",this).call(this,e,t,n);var a,o=0,s=Object(b.a)(this.sprites);try{for(s.s();!(a=s.n()).done;){var r=a.value;if(!r.isAlive)throw Error("No Dead Sprites Should Make it to render step.\n"+r);var l=z(r.position);r.isFixedPosition||(l={x:l.x-e.x,y:l.y-e.y}),l.x>this.size.width||l.y>this.size.height||r.size.width+l.x<0||r.size.height+l.y<0||(r.paint(l,t,n),o++)}}catch(h){s.e(h)}finally{s.f()}this.debug&&(++this.count%300===0?(this.totalTime=n,this.count=1):this.totalTime+=n,t.fillStyle="red",t.fillText("FPS: ".concat(Math.round(1e3/(this.totalTime/++this.count))," Alive Sprites: ").concat(this.sprites.length," On Screen Sprites: ").concat(o),10,this.size.height-10))}},{key:"addSprites",value:function(e){var t=this;e.forEach((function(e){return t.addSprite(e)}))}}]),i}(S),j=function(){function e(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;Object(h.a)(this,e),this.rows=void 0,this.columns=void 0,this.image=void 0,this.size=void 0,this.image=t,this.rows=i,this.columns=n,this.size={width:Math.floor(this.image.width/this.columns),height:Math.floor(this.image.height/this.rows)}}return Object(c.a)(e,[{key:"paint",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1;if(n<1||n>this.rows||a<1||a>this.columns)throw Error("Row and columns of sprite need to be in bounds (".concat(n,",").concat(a,")"));var o=this.size.width,s=this.size.height;if(i&&(t.translate(e.x+o/2,e.y+s/2),t.rotate(i),e.x=0-o/2,e.y=0-s/2),1===this.columns&&1===this.rows)t.drawImage(this.image,e.x,e.y,o,s);else{var r=Math.floor(this.image.width*((a-1)/this.columns)),l=Math.floor(this.image.height*((n-1)/this.rows));t.drawImage(this.image,r,l,o,s,e.x,e.y,o,s)}i&&t.setTransform(1,0,0,1,0,0)}},{key:"frameCount",get:function(){return this.rows*this.columns}}]),e}(),L=function(){function e(t){Object(h.a)(this,e),this.spriteSheet=void 0,this.framesPerSecond=10,this.age=0,this.animateOnce=!1,this.rotate=!1,this.spriteSheet=t}return Object(c.a)(e,[{key:"init",value:function(e){e.size=this.spriteSheet.size}},{key:"paint",value:function(e,t,i,n){var a;if(this.framesPerSecond&&0!==this.spriteSheet.frameCount){var o=1/this.framesPerSecond;a=Math.floor(this.age/o%this.spriteSheet.frameCount)}else a=0;var s=Math.floor(a%this.spriteSheet.columns)+1,r=Math.floor(a/this.spriteSheet.columns)+1,l=e.angle?e.angle:0;this.spriteSheet.paint(t,i,l,r,s)}},{key:"updateModel",value:function(e,t){var i=t/1e3;this.age+=i,this.animateOnce&&this.age>this.spriteSheet.frameCount/this.framesPerSecond&&(e.isAlive=!1)}}]),e}();function I(e,t,i){return{position:e,size:t,isAlive:!0,paint:function(i,n,a){n.fillStyle="\trgb(50,50,50)",n.fillRect(e.x,e.y,t.width,t.height)},handleCollision:function(e){var t=x(e);i?(t.x>0?e.position.x=this.position.x-e.size.width:e.position.x=this.position.x+this.size.width,e.position.y=e.priorPosition.y,e.angle=Math.PI-e.angle+.2*(Math.random()-.5)):(t.y>0?e.position.y=this.position.y-e.size.height:e.position.y=this.position.y+this.size.height,e.position.x=e.priorPosition.x,e.angle=-1*e.angle+.2*(Math.random()-.5))}}}var A=function(){function e(){Object(h.a)(this,e)}return Object(c.a)(e,[{key:"preloadImagesKeyPathMap",value:function(){var e=new Map;return e.set("ball","/circles/assets/ball-sheet2.png"),e}},{key:"init",value:function(e){var t=new P(e);e.scene=t;var i=e.imagePreloader.getImageFromCache("ball"),n=new j(i,4,8),a=n.size.width/2;t.handleMouseClick=function(e,i){var o=t.getSpritesAtPoint({x:e,y:i});if(o.length)o.filter((function(e){return e.canCollide})).forEach((function(e){return t.removeSprite(e)}));else{var s=new S({x:e-a,y:i-a});s.isAlive=!0,s.speed=300*Math.random()+100,s.angle=Math.random()*Math.PI*2,s.canCollide=!0,s.addBehavior(new L(n)),s.size={width:s.size.width-2,height:s.size.height-2},t.addSprite(s)}},t.debug=!0,t.wrapAround=!1,t.paintBackground=function(e){e.fillStyle="black",e.fillRect(0,0,t.size.width,t.size.height)};var o=t.size;t.addSprite(I({x:0,y:0},{width:o.width-4,height:4},!1)),t.addSprite(I({x:0,y:o.height-4},{width:o.width,height:4},!1)),t.addSprite(I({x:0,y:0},{width:4,height:o.height-4},!0)),t.addSprite(I({x:o.width-4,y:0},{width:4,height:o.height-4},!0))}}]),e}(),B=function(){function e(){Object(h.a)(this,e),this.imageCache=new Map,this.loadsCompleted=0,this.nLoads=0,this.loadCallback=void 0}return Object(c.a)(e,[{key:"registerCallback",value:function(e){this.loadsCompleted===this.nLoads&&e(),this.loadCallback=e}},{key:"getImageFromCache",value:function(e){var t=this.imageCache.get(e);if(this.nLoads++,!t)throw Error("unable to load image: "+e);return t}},{key:"preLoadImage",value:function(e,t){var i=this,n=new Image;this.nLoads++,n.src=t,n.onload=function(){var t=i.makeTransparent(n);t.onload=function(){i.imageCache.set(e,t),++i.loadsCompleted===i.nLoads&&i.loadCallback&&i.loadCallback()}}}},{key:"makeTransparent",value:function(e){var t=document.createElement("canvas"),i=t.getContext("2d");t.height=e.height,t.width=e.width,i.drawImage(e,0,0);for(var n,a=i.getImageData(0,0,e.width,e.height),o=a.data,s=0,r=0,l=0,h=0,c=0,u=o.length;c<u;c+=4){var d=o[c],v=o[c+1],p=o[c+2];0===c&&(n=[d,v,p]),d===n[0]&&v===n[1]&&p===n[2]&&(o[c]=s,o[c+1]=r,o[c+2]=l,o[c+3]=h)}i.putImageData(a,0,0);var g=document.createElement("img");return g.src=t.toDataURL("image/png"),g}}]),e}(),R=function(){function e(t){var i=this;Object(h.a)(this,e),this.debug=!1,this.keysPressed=new Map,this.imagePreloader=void 0,this.canvas=void 0,this.isShutdown=!1,this.pause=!1,this.readyCallback=void 0,this._scene=void 0,this.gameInitializer=void 0,this.gameInitializer=t,this.imagePreloader=new B,t.preloadImagesKeyPathMap().forEach((function(e,t){return i.imagePreloader.preLoadImage(t,e)}))}return Object(c.a)(e,[{key:"init",value:function(e,t){var i=this;this.readyCallback=t,this.canvas=e,this.imagePreloader.registerCallback((function(){i._handleImagesLoaded()}))}},{key:"restart",value:function(){var e=this.canvas;e.width=window.innerWidth,e.height=window.innerHeight;var t={width:e.width,height:e.height};if(this.gameInitializer.init(this),!this.scene)throw Error("Game Initializer must set scene.");this.scene.size=t}},{key:"transition",value:function(e,t){var i=this;e.addBehavior({handleKill:function(){i.scene=t}}),this.scene!==e&&(this.scene=e)}},{key:"_handleImagesLoaded",value:function(){var e=this,t=this.canvas;document.addEventListener("keydown",(function(t){e.keysPressed.set(t.key,!0)})),document.addEventListener("keyup",(function(t){e.keysPressed.delete(t.key)})),t.addEventListener("mousedown",(function(i){if(!e.pause){var n=t.getBoundingClientRect();e.scene.handleMouseClick(i.clientX-n.left,i.clientY-n.top)}})),document.addEventListener("touchmove",(function(i){if(!e.pause){var n=t.getBoundingClientRect(),a=i.targetTouches[0];e.scene.handleMouseClick(a.clientX-n.left,a.clientY-n.top)}}),!1);var i=0;this.restart(),requestAnimationFrame((function n(a){if(!e.isShutdown){var o=i?a-i:0;i=a,(o>100||e.pause)&&(o=0);var s=t.getContext("2d"),r=t.width,l=t.height;r===window.innerWidth&&l===window.innerHeight||e.restart(),e.keysPressed.forEach((function(t,i){return e.scene.handleKeyPressed(i)})),s.save(),e.paintBackground(s),e.scene.paint({x:0,y:0},s,o),e.scene.updateModel(o),s.restore(),requestAnimationFrame(n)}})),this.readyCallback()}},{key:"paintBackground",value:function(e){this.scene.paintBackground?this.scene.paintBackground(e):(e.fillStyle="white",e.fillRect(0,0,this.scene.size.width,this.scene.size.height))}},{key:"updateModel",value:function(e){this.scene.updateModel(e)}},{key:"scene",set:function(e){this.debug&&console.log("SetScene: ".concat(e.constructor.name)),e.debug=this.debug;var t=this.canvas;e.size={width:t.width,height:t.height},this._scene=e},get:function(){return this._scene}}]),e}(),F=i(122),T=i(4),K=i(118),N=i(52),_=i(112),D=i(121),G=i(111),W=i(108),q=i(109),J=i(107),H=i(104),U=i(49),X=i(102),Y=i(110),Z=i(106),$=Object(X.a)((function(e){return Object(F.a)({infoButton:{marginRight:e.spacing(1)}})}));function Q(){var e=a.a.useState(!1),t=Object(N.a)(e,2),i=t[0],n=t[1],o=$(),s=Object(U.a)(),r=Object(H.a)(s.breakpoints.down("sm")),l=function(){n(!1)};return a.a.createElement("div",null,a.a.createElement(m.a,{edge:"start",className:o.infoButton,onClick:function(){n(!0)},color:"primary","aria-label":"menu"},a.a.createElement(Z.a,null)),a.a.createElement(D.a,{fullScreen:r,open:i,onClose:l,"aria-labelledby":"responsive-dialog-title"},a.a.createElement(J.a,{id:"responsive-dialog-title"},"Cicles"),a.a.createElement(W.a,null,a.a.createElement(q.a,null,"A simple 2D game library for JavaScript to teach my kids programming. A demo space game implemented using the library. Nick Zinn 2020.",a.a.createElement("br",null),a.a.createElement(Y.a,{component:"button",variant:"body2",onClick:function(){return window.open("https://github.com/nickzinn/circles")}},"Github Repository"))),a.a.createElement(G.a,null,a.a.createElement(_.a,{onClick:l,color:"primary",autoFocus:!0},"Close"))))}var V=Object(T.a)((function(e){return Object(F.a)({root:{flexGrow:1},controlButton:{},score:{marginRight:e.spacing(2)},title:{flexGrow:1}})}))(function(e){Object(u.a)(i,e);var t=Object(d.a)(i);function i(e){var n;return Object(h.a)(this,i),(n=t.call(this,e)).canvasRef=a.a.createRef(),n.gameController=void 0,n.state=void 0,n.gameController=new R(new A),n.state={score:0,imagesLoaded:!1,pause:!1},n}return Object(c.a)(i,[{key:"componentDidMount",value:function(){var e=this,t=this.canvasRef.current;this.gameController.init(t,(function(){return e.setState({imagesLoaded:!0})}))}},{key:"handleRestart",value:function(e){e.stopPropagation(),this.gameController.restart()}},{key:"handlePause",value:function(e){e.stopPropagation(),this.gameController.pause=!this.gameController.pause,this.setState({pause:this.gameController.pause})}},{key:"componentWillUnmount",value:function(){this.gameController.isShutdown=!0}},{key:"render",value:function(){var e=this,t=this.props.classes;return a.a.createElement(a.a.Fragment,null,a.a.createElement(v.a,{position:"static",style:{background:"transparent",boxShadow:"none"}},a.a.createElement(p.a,null,a.a.createElement(Q,null),a.a.createElement(g.a,{variant:"h6",color:"primary",className:t.title},"Circles"),a.a.createElement(g.a,{variant:"h6",color:"primary",className:t.score},"Score: ",this.state.score),a.a.createElement(m.a,{edge:"start",className:t.controlButton,onClick:function(t){return e.handlePause(t)},color:"primary","aria-label":"menu"},this.state.pause?a.a.createElement(f.a,null):a.a.createElement(y.a,null)),a.a.createElement(m.a,{edge:"start",className:t.controlButton,onClick:function(t){return e.handleRestart(t)},color:"primary","aria-label":"menu"},a.a.createElement(w.a,null)))),!this.state.imagesLoaded&&a.a.createElement(a.a.Fragment,null,a.a.createElement(g.a,{variant:"h2",gutterBottom:!0},"Loading images..."),a.a.createElement(K.a,null)),a.a.createElement("canvas",{id:"Canvas",ref:this.canvasRef}))}}]),i}(a.a.Component));var ee=function(){return a.a.createElement(V,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i(71);var te=i(51),ie=Object(te.a)({overrides:{MuiCssBaseline:{"@global":{body:{width:"100%",height:"100%",margin:"0"}}}}});s.a.render(a.a.createElement(l.a,{theme:ie},a.a.createElement(r.a,null),a.a.createElement(ee,null)),document.querySelector("#root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[61,1,2]]]);
//# sourceMappingURL=main.14fa35b0.chunk.js.map