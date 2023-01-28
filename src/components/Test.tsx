import { useEffect, useId } from 'react'
import { useAtom } from 'jotai'
import { useContext, useState } from 'react'
import { SocketContext } from './SocketProvider'
import { addClientToQueue, joinRoom, sendMessage } from '../socket/emits'
import { valueState } from '../state'
import styled from 'styled-components'

const rooms = [
  { id: 'india', name: 'India' },
  { id: 'usa', name: 'Usa' },
  { id: 'australia', name: 'Australia' }
]

function Test({ onRoomJoin }) {
  const { messages, online, socketId } = useContext(SocketContext)
  // const [messages, setMessages] = useAtom(valueState)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [activeRoom, setActiveRoom] = useState(rooms[0])

  const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    // setMessages(crr => [...crr, { message }])
    sendMessage(activeRoom.id, message, name)
  }

  useEffect(() => {
    if (activeRoom.id) {
      joinRoom(activeRoom.id, onRoomJoin)
    }
  }, [activeRoom])
  return (
    <>
      <input onChange={e => setName(e.target.value)} placeholder='enter your name here..' />
      <p>Total Online Users: {online.total}</p>
      <p>Active Room: {activeRoom.name}</p>
      {activeRoom.id && name && (
        <>
          <input onChange={e => setMessage(e.target.value)} />
          <button onClick={handleOnClick}>Send</button>
          {messages.map((m, index) => (
            <div key={index}>
              <p>{m.name}</p>
              <p>{m.message}</p>
            </div>
          ))}
        </>
      )}
      </>
  )
}

export default Test