import Sound from 'react-native-sound'
import Assets from '../assets/Assets';


export class SoundUtil {
    static play(sound: number) {
        return new Promise(resolve => {
            Sound.setCategory('Playback', true);
            let player = new Sound(sound, error => {
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