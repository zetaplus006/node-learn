import { EventEmitter } from "events";


class Pulsar extends EventEmitter {

    static events = {
        pluse: 'pluse'
    }

    constructor (
        public speed: number,
        public times: number
    ) {
        super()
        this.on('newListener', (name, listener) => {
            console.log('Event name added:', name, listener)
            if (name === Pulsar.events.pluse) {
                this.start()
            }
        })
    }

    start () {
        const id = setInterval(() => {
            this.emit(Pulsar.events.pluse)
            if (--this.times === 0) {
                clearInterval(id)
            }
        }, this.speed)
    }

    stop () {
        if (this.listeners(Pulsar.events.pluse).length === 0) {
            throw new Error('No listeners')
        }
    }


}

const pulsar = new Pulsar(250, 5)
pulsar.on(Pulsar.events.pluse, () => {
    console.log('.')
})

