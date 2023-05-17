const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('start', () => {
    console.log('started')
}
)
console.log('before')
eventEmitter.emit('start')
console.log('after')