[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/nickzinn/circles)

# Circles JavaScript Game Library.
A simple 2D game library for JavaScript/TypeScript to teach my kids programming.   Includes a demo space game implemented using the library.

**[Demo Hosted Here](https://nickzinn.github.io/circles/)**

**[2D Game Programming Presentation](docs/2d-Game-Programming.pdf)**
### Game Library Key Concepts
+ **GameController**, Runs the main game loop for a given graphical scene.   For each step in the loop two functions are called for each scene and sprite:
  + paint: paints to the 2d graphics context.
  + updateModel: updates the game model, which includes sprite/scene lifecycle, sprites positions, collision and user input handlers.
+ **Scene**, A graphics scene.  Contains sprites.  Does all movement.  Handles collisions.  Handles user input.  Currently supports mouse, touch and keyboard.
+ **Sprite**, interface for a graphical game objects that have a position, size and velocity.  Can collide with other objects.  
+ DefaultSprite, Default implementation of a sprite that supports Behaviors.   
  + AnimatedSprite, a default sprite that supports animation and rotation.
  + Behavior, additional effects to apply to a sprite.  Effects are things like expiration and graphic effects:
    + Sprite Sheet Behavior, displays an image for a sprite.  Handles rotation and scaling.
    + Blend Image, composite one sprite sheet on top of another.sprite
    + Fade In & Fade Out, graphic effect fade a sprite sheet over time.
    + Trailing Effect
    + Sprite Expiration and Timed Behavior, expires sprites and behaviors with some timeout.
+ **GameInitializer**, any game needs to implement this interface.
+ Utilities
  + Sound Effects, preload and play/pause sound effects.
  + Image Preloader
  + Sprite Sheet, draws an image from a sprite sheet which is an image that has multiple sprite images stored on same sheet.
## How to use Library
  1. Implement Game Initializer.  This is where images and sounds are pre-loaded and the initial scene is set.
  2. Create a Scene either by extending Scene class or setting properties on Scene.
  3. Initialize GameController passing in the canvas element to use.
### Samples
+ BouncingBall
+ Space Hunter
  + Scenes
    1. Openning Scene.
    2. Main Game Scene
    3. Between Level Scene
    4. Game over scene
# Helpful for Devs
## NPM Commands
+ npm start
+ npm run deploy
+ npm run test
## Project Dependencies
+ Create React App, used for web shell for demo
+ gh-pages, used to deploy project demo to git hub pages.
+ typescript
+ material-ui, used to draw surrounding UI for demo.
## Library Dependencies
+ [Howler.js](https://github.com/goldfire/howler.js)