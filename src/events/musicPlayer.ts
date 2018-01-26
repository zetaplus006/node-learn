import { EventEmitter } from "events";
import * as  domain from 'domain'
const audioDomain = domain.create()

class AudioDevice extends EventEmitter {
    timer: NodeJS.Timer
    playing: boolean
    play (track) {
        this.emit('error', 'not implemented yet')
        this.timer = setInterval(() => {

            console.log(track)

        }, 200);
    }
    stop () {
        clearInterval(this.timer)
    }
}


class MusicPlayer extends EventEmitter {

    audioDevice = new AudioDevice()

    constructor () {
        super()
        this.bindEvent();
    }


    private bindEvent () {
        this.on('play', track => {
            this.audioDevice.playing = true;
            this.audioDevice.play(track);
        });
        this.on('stop', () => {
            this.audioDevice.playing = false;
            this.audioDevice.stop();
        });

        this.emit('error', 'No audio tracks are available')
    }
}

audioDomain.on('error', err => {
    console.log('audioDomain error:', err)
})


audioDomain.run(() => {

    const player = new MusicPlayer();
    player.emit('play', 'fires')

    setTimeout(() => player.emit('stop'), 5000)
})
