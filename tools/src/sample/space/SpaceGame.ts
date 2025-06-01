import { GameInitializer, GameController } from "gamelib";

import { launchOpeningSequence } from "./OpeningSequence";

export class SpaceGame implements GameInitializer{

    highscore: number = 0;

    preloadImages = [{ name: 'asteroid', src: '/assets/images/asteroid.png', rows: 2, columns: 10, type: 'animate' }
        , { name: 'player', src: '/assets/images/ship_anim.png', rows: 1, columns: 24, scale: .4, angleOffset: Math.PI / 2, type: 'rotate' }
        , { name: 'shield', src: '/assets/images/shield.png', scale: .3, type: 'static' }
        , { name: 'enemy', src: '/assets/images/Enemy.png', scale: .8, type: 'animate' }
        , { name: 'explosionSmall', src: '/assets/images/ExplosionSheetSmall.png', rows: 4, columns: 4, type: 'animate' }
        , { name: 'explosionBig', src: '/assets/images/ExplosionSheet2.png', rows: 6, columns: 8, type: 'animate' }
        , { name: 'missle', src: '/assets/images/Laser.png', type: 'animate' }
        , { name: 'OpeningScene', src: '/assets/images/Scene.jpg', noTransparent: true, type: 'static' }
        , { name: 'MainGameScene', src: '/assets/images/starfield_alpha2.png', noTransparent: true , type: 'static'}
        , { name: 'BetweenLevelScene', src: '/assets/images/Scene.jpg', noTransparent: true, type: 'static' }
    ];
    preloadSounds = [{ name: 'missle', src: '/assets/sounds/missle_fire.wav' }
        , { name: 'alienMissle', src: '/assets/sounds/alien_missle_fire.wav' }
        , { name: 'gameOver', src: '/assets/sounds/game_over.wav' }
        , { name: 'levelComplete', src: '/assets/sounds/level_complete.wav' }
        , { name: 'explosionSmall', src: '/assets/sounds/small_explosion.wav' }
        , { name: 'explosionBig', src: '/assets/sounds/big_explosion.wav' }
        , { name: 'newHighScore', src: '/assets/sounds/new_high_score.wav' }];

    init(controller: GameController): void {
        launchOpeningSequence(controller, this);
        //controller.debug = true;
    }
}