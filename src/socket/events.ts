import { useAtom } from 'jotai'
import { socket } from '../main'
import { valueState } from '../state'
import { intiSocketI } from '../types'

export const socketEvents = ({ setValue, setMessages }: intiSocketI) => {

  socket.on('queueLength', ({ queueLength }) => {
    setValue(crr => ({ ...crr, queueLength }))
  })

  socket.on('positionInLine', ({ positionInLine }) => {
    setValue(crr => ({ ...crr, positionInLine }))
  })

  socket.on('new-message', ({ message, name }) => {
    console.log('new message received', message, socket.id)
    setMessages(crr => ([...crr, { from: socket.id, message, name }]))
  })
  socket.on('user-count', (count) => {
    console.log('total online', count)
    setValue(crr => ({ ...crr, online: count }))
  })
  

}