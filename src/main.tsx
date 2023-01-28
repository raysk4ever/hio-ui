import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import RoutesHandler from './routes'
import './index.css'

import { intiSocketI } from './types'
import io, { Manager } from 'socket.io-client'
import { socketEvents } from './socket/events'
import { getQueueLength } from './socket/emits'
import SessionProvider from './components/SessionProvider'

export const socket = io('http://localhost:4040', { transports : ['websocket'] })
socket.on('error', (error) => {
  console.log('error2', error)
})

export const initSocket = ({ setValue, setMessages, setError }: intiSocketI) => {
  socketEvents({ setValue, setMessages })
  getQueueLength()
  socket.io.on('error', (error) => {
    console.log('error1', error)
    setError(error)
  })
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <SessionProvider>
      <RoutesHandler />
    </SessionProvider>
  </BrowserRouter>
)
