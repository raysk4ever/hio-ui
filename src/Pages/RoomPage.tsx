import { AnimatePresence, motion, useAnimation } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import styled from "styled-components"
import MessageItem from "../components/MessageItem"
import AppLayout from "../Layoutes/App"
import { FadeCard, IconWrapper, ImageWrapper, OnlineBadge, Text } from "../styled/common"
import {  AiFillPlusCircle, AiOutlineArrowLeft, AiOutlineFileAdd, AiOutlineFileImage, AiOutlinePhone, AiOutlineSend, AiOutlineVideoCamera } from "react-icons/ai"
import {  MdLocationOn } from "react-icons/md"
import { inOutVarient } from "../styled/variants"
import ComposeMessage from "../components/ComponseMessage"

const mockMessages = [
  { from: '1', message: 'Hi' },
  { from: '1', src: `https://api.lorem.space/image/face?w=200&h=200&t=${Math.random()}`, type: 'image' },
  { from: '2', message: 'Hi there!' },
  { from: '2', src: `https://api.lorem.space/image/face?w=200&h=200&t=${Math.random()}`, type: 'image' },
  { from: '2', message: 'Thats me' },
]
export default function RoomPage () {
  const [messages, setMessages] = useState(mockMessages)
  const messageContainerRef = useRef()
  const onMessageSent = useCallback((newMessage) => {
    if (!newMessage) {
      return
    }
    if (Array.isArray(newMessage)) {
      const messsages = newMessage.map(m => ({ ...m, from: '1' }))
      setMessages(crr => ([...crr, ...messsages]))
      return
    }
    setMessages(crr => ([...crr, { from: '1', ...newMessage }]))
  }, [])

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight 
    }
  }, [messages.length])

  return (
    <ChatPageContainer>
      <MessageList ref={messageContainerRef}>
        {messages.map((m, idx) => <MessageItem key={idx} {...m} />)}
      </MessageList>
      <ComposeMessage onMessageSent={onMessageSent} />
    </ChatPageContainer>
  )
}
const Header = () => {
  const navigate = useNavigate()
  const params = useParams()
  const back = useCallback(() => {
    navigate('/rooms')
  }, [])
  return (
    <ChatHeader>
      <IconWrapper onClick={back}>
        <AiOutlineArrowLeft />
      </IconWrapper>
      <ImageWrapper onClick={() => navigate('/profile')} width='40px' src={`https://api.lorem.space/image/face?w=200&h=200&t=${Math.random()}`} />
      <HeaderUserInfo>
        <Text>{params.roomId}</Text>
        <Text color='#999'>Online</Text>
      </HeaderUserInfo>
      <RightActions>
        <AiOutlinePhone size={25} />
        <AiOutlineVideoCamera size={25} />
      </RightActions>
  </ChatHeader>
  )
}

RoomPage.Layout = AppLayout
RoomPage.showBottomNav = false
RoomPage.Header = Header
RoomPage.contentStyles = {
  padding: '1rem 10px'
}

const ChatPageContainer = styled.div`
  padding: 10px 0px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
`
const MessageList = styled.div`
  flex: 1;
  gap: 10px;
  display: flex;
  flex-direction: column;
  max-height: 85vh;
  overflow-y: scroll;
  padding-bottom: 10px;
`
const ChatHeader = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #333;
`
const HeaderUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
`
const RightActions = styled.div`
  display: flex;
  gap: 10px;
`

