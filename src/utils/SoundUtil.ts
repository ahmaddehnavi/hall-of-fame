import Sound from 'react-native-sound'
import Assets from '../assets/Assets';


export class SoundUtil {
    static playTest() {
        return new Promise(resolve => {
            Sound.setCategory('Playback', true);
            let player = new Sound(Assets.sounds.test, error => {
                    if (error) {
                        resolve(false)
                    } else {
                        player.play(success => {
                            resolve(success)
                        });

                    }
                }
            );
        })

    }
}