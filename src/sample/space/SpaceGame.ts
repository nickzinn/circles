import { GameInitializer } from "../../gamelib/GameInitializer";
import { GameController } from "../../gamelib/GameController";
import { launchOpenningSequence } from "./OpenningSequence";

export class SpaceGame implements GameInitializer<SpaceGame>{

    highscore: number = 0;

    preloadImages = [{ name: 'asteroid', src: '/circles/assets/images/asteroid.png', rows: 2, columns: 10 }
        , { name: 'player', src: '/circles/assets/images/ship_anim.png', rows: 1, columns: 24, scale: .4, angle: Math.PI / 2, type: 'rotate' }
        , { name: 'shield', src: '/circles/assets/images/shield.png', scale: .3 }
        , { name: 'enemy', src: '/circles/assets/images/Enemy.png', scale: .8 }
        , { name: 'explosionSmall', src: '/circles/assets/images/ExplosionSheetSmall.png', rows: 4, columns: 4 }
        , { name: 'explosionBig', src: '/circles/assets/images/ExplosionSheet2.png', rows: 6, columns: 8 }
        , { name: 'missle', src: '/circles/assets/images/Laser.png' }
        , { name: 'OpenningScene', src: '/circles/assets/images/Scene.jpg', noTransparent: true }
        , { name: 'MainGameScene', src: '/circles/assets/images/starfield_alpha2.png', noTransparent: true }
        , { name: 'BetweenLevelScene', src: '/circles/assets/images/Scene.jpg', noTransparent: true }
    ];
    preloadSounds = [{ name: 'missle', src: '/circles/assets/sounds/missle_fire.wav' }
        , { name: 'alienMissle', src: '/circles/assets/sounds/alien_missle_fire.wav' }
        , { name: 'gameOver', src: '/circles/assets/sounds/game_over.wav' }
        , { name: 'levelComplete', src: '/circles/assets/sounds/level_complete.wav' }
        , { name: 'explosionSmall', src: '/circles/assets/sounds/small_explosion.wav' }
        , { name: 'explosionBig', src: '/circles/assets/sounds/big_explosion.wav' }
        , { name: 'newHighScore', src: '/circles/assets/sounds/new_high_score.wav' }];

    init(controller: GameController<SpaceGame>): void {
        launchOpenningSequence(controller);
        controller.debug = true;
    }
}