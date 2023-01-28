import { socket } from '../main'

export const addClientToQueue = () => {
  socket.emit('addClientIdToQueue')
}
export const getRooms = () => {
  return new Promise((resolve) => {
    socket.emit('get-rooms', null, (data: any) => {
      console.log('get-rooms', data)
      resolve(data)
    })
  })
}
export const joinRoom = (room: string, onRoomJoinCb?: any) => {
  socket.emit('join-room', room, (res: any) => {
    console.log('res', res)
    onRoomJoinCb && onRoomJoinCb()
  })
}

export const sendMessage = (room: string, message: string = 'hi', name: string) => {
  socket.emit('sendMessage', { room, message, name }, (response: any) => {
    console.log('message sent! response', response)
  })
  console.log('inside sending message', message, socket)
}

export const getQueueLength = () => {
  socket.emit('queueLengthToSocket')
}

export const removeUserFromQueue = () => {
  socket.emit('removeUserFromQueue')
}
