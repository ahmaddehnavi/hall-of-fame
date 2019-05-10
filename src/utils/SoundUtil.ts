import Sound from 'react-native-sound'

const TestSound = require('../assets/sounds/sound.wav');

export class SoundUtil {
    static playTest() {
        return new Promise(resolve => {
            Sound.setCategory('Playback', true);
            let player = new Sound(TestSound, error => {
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