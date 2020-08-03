import { Howl, Howler } from 'howler';


export interface PreloadSoundEffect{
    name:string;
    src:string;
}

export default class SoundEffects {
    sounds:Map<string, Howl> = new Map();
    rate:number = 1.0;

    private _mute:boolean = false;

  constructor (effectPreloads:PreloadSoundEffect[]) {
    for(let effect of effectPreloads )
        this.sounds.set(effect.name, new Howl({src:effect.src,preload: true}) );
    this.rate = 1.0;
    this._mute = false;
  }

  play (key:string) {
    const sound = this.sounds.get(key);
    if(sound){
        sound.rate(this.rate);
        sound.play();
    }else{
        console.log(`Sound not found! ${key}`);
    }
  }

  get mute ():boolean { return this._mute; }

  set mute (mute:boolean) {
    Howler.mute(mute);
    this._mute = mute;
  }
}
