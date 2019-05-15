import {RandomUtil} from '@shared';
import autobind from 'autobind-decorator';
import {action, observable} from 'mobx';
import {ImageSourcePropType} from 'react-native';
import Assets from '../assets/Assets';
import shuffleSeed from 'shuffle-seed'

export type InjectedWelcomeStoreProps = {
    $welcomeStore: WelcomeStore
}

type AnimationData = {
    image: ImageSourcePropType
    animationName: string
}

@autobind
export class WelcomeStore {

    public static readonly NAME = '$welcomeStore';

    @observable.ref
    protected _numberValue: number = 1;

    @observable.ref
    protected _activeAnimationIndex = 0;

    @observable.ref
    protected animationChangerIntervalId;

    protected animations: Array<AnimationData> = [
        {animationName: 'fadeIn', image: Assets.images.gif_1},
        {animationName: 'zoomIn', image: Assets.images.gif_2},
        {animationName: 'slideInLeft', image: Assets.images.gif_3},
        {animationName: 'slideInRight', image: Assets.images.gif_4},
        {animationName: 'bounce', image: Assets.images.gif_5},
    ];

    @action
    updateNumber(num: number) {
        this._numberValue = num
    }

    get numberValue() {
        return this._numberValue;
    }

    get activeAnimationIndex() {
        return this._activeAnimationIndex;
    }

    startAnimationChanger(duration = 5000) {
        // change animation every 5 second
        this.animationChangerIntervalId = setInterval(this.setNextAnimationAsActive, duration)
    }

    stopAnimationChanger() {
        clearInterval(this.animationChangerIntervalId);
    }

    setNextAnimationAsActive() {
        // set next animation as active (looped)
        this._activeAnimationIndex = (this._activeAnimationIndex + 1) % this.animations.length
    }

    get activeAnimation() {
        return this.animations[this._activeAnimationIndex]
    }

    save() {
        // randomise animations based on number value
        // let shuffleRate = this.numberValue / 10 || .5;
        // this.animations = this.animations.sort(_ => {
        //     return Math.random() > shuffleRate ? -1 : 1
        // });
        this.animations = shuffleSeed.shuffle(this.animations, this.numberValue);
        // update current animation based on new animation list
        this.setNextAnimationAsActive();
    }

    randomise() {
        this.updateNumber(RandomUtil.randomInt(0, 9))
    }

}