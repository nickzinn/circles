# Circles JavaScript Game Library.
A simple 2D game library for JavaScript to teach my kids programming.   Includes a demo space game implemented using the library.

### Game Library Key Concepts
+ GameCanvas, ReactJS Component that writes canvas DOM.  Runs a scene.  Supports transitions between scenes.
+ Scene, A graphics scene.  Contains sprites.
+ Sprite, graphical game objects that have a position and velocity.  Can collide with other objects.  
Can be subclassed and/or have ModelBehavior, PaintBehavior or CollisionBehavior mixed-in (sprite can only have one of each).  
  + ModelBehavior, intercepts spite.modelUpdate
  + PaintBehanvior, intercepts sprite.paint
  + CollisionBehavior, listens for collisions.
+ Utilities
  + SoundEffects

# Demo Space Game
1. Openning Scene.
2. Game Scene
3. Game Over
4. High Score
5. Leaderboard


# Helpful for Devs
[Hosted here](https://nickzinn.github.io/circles/)


