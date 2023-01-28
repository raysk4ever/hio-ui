import React, { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import { initSocket } from '../main'

export const SocketContext = createContext({
  queueLength: 0,  
  positionInLine: 0,
  online: 0,
  socketId: '',
  messages: [],
  error: null
})

export default function SocketProvider({ children }: any) {
  const [value, setValue] = useState({
    queueLength: 0,  
    positionInLine: 0,
    online: 0,
    socketId: ''
  })
  const [error, setError] = useState(null)
  const [messages, setMessages] = useState<{ from: string, message: string }[]>([])
  useEffect(() => initSocket({ setValue, setMessages, setError }), [initSocket])

  return (
    <SocketContext.Provider value={{ ...value, messages, foo: 'bar' }}>
      {children}
    </SocketContext.Provider>
  )
}
