import { Route, Routes, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import App from './App'
import { Chat } from './components'
import Login from './components/Login'
import Rooms from './components/Rooms'
import SessionProvider from './components/SessionProvider'
import withSocket from './components/withSocket'
import { useMe } from './hooks/use-me'
import AppLayout from './Layoutes/App'
import ChatPage from './Pages/ChatPage'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import RoomPage from './Pages/RoomPage'

const LayoutContainer = ({ Component }: any) => {
  const { Layout = Component, socket = false, ...props } = Component
  const TheComponent = socket ? withSocket(Component) : Component
  return (
    <Layout {...props}>
      <TheComponent />
    </Layout>
  )
}

export default function RoutesHandler () {
  const my = useMe()
  const location = useLocation()
  if (!my.id && location.pathname !== '/') {
    return (
      <Login />
    )
  }
  return (
    <>
      <Routes>
        <Route path='/home' element={<LayoutContainer Component={Home} />} />
        <Route path='/chat' element={<LayoutContainer Component={Chat} />} />
        <Route path='/rooms' element={<LayoutContainer Component={Rooms} />} />
        <Route path='/rooms/:roomId' element={<LayoutContainer Component={RoomPage} />} />
        <Route path='/profile' element={<LayoutContainer Component={Profile} />} />
        <Route path='/chat/:chatId' element={<LayoutContainer Component={ChatPage} />} />
        <Route index element={<App />} />
        <Route path='*' element={<LayoutContainer Component={NotFound} />} />
      </Routes>
    </>
  )
}

function NotFound () {
  return (
    <NotFoundContainer>
      <h1>Not Found!</h1>
      <img src='/404.svg' width={400} />
    </NotFoundContainer>
  )
}
NotFound.showHeader = false

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`
NotFound.Layout = AppLayout
