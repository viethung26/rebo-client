import socket from 'socket.io-client'
const ENDPOINT = 'http://localhost:3000'
export const io = socket(ENDPOINT, {
    autoConnect: false
})
console.info('9779 io', io)
export const ioListener = []
io.on('connect', (socket) => {
  console.info('9779 ', io.connected)
})
// io.on('data', data => {
//     console.info('9779 xx', data, ioListener)
//     ioListener.forEach(fn => fn(data))
// })
// console.info('9779 ', io.connected)
io.on('disconnect', () => {
  console.info('9779 ', io.connected)
})
io.on('error', (error) => {
  console.info('9779 err', error)
  io.disconnect()
});