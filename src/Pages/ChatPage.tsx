import { AnimatePresence, motion, useAnimation } from "framer-motion"
import { FC, useCallback, useEffect, useLayoutEffect, useState } from "react"
import { useNavigate } from "react-router"
import styled from "styled-components"
import MessageItem from "../components/MessageItem"
import AppLayout from "../Layoutes/App"
import { FadeCard, IconWrapper, ImageWrapper, OnlineBadge, Text } from "../styled/common"
import {  AiFillPlusCircle, AiOutlineArrowLeft, AiOutlineFileAdd, AiOutlineFileImage, AiOutlinePhone, AiOutlineSend, AiOutlineVideoCamera } from "react-icons/ai"
import {  MdLocationOn } from "react-icons/md"
import { inOutVarient } from "../styled/variants"

const mockMessages = [
  { from: '1', message: 'Hi' },
  { from: '1', src: `https://api.lorem.space/image/face?w=200&h=200&t=${Math.random()}`, type: 'image' },
  { from: '2', message: 'Hi there!' },
  { from: '2', src: `https://api.lorem.space/image/face?w=200&h=200&t=${Math.random()}`, type: 'image' },
  { from: '2', message: 'Thats me' },
]
export default function ChatPage () {
  const [messages, setMessages] = useState(mockMessages)
  // const messageContainerRef = useRef<HTMLDivElement | undefined>()
  let messageContainerRef: HTMLDivElement | null
  useLayoutEffect(() => {
    if (messageContainerRef) {
      messageContainerRef.scrollTop = messageContainerRef.scrollHeight 
    }
  }, [])
  const onMessageSent = useCallback((newMessage: any) => {
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

  return (
    <ChatPageContainer>
      <MessageList ref={el => {
        messageContainerRef = el
      }}>
        {messages.map((m, idx) => <MessageItem key={idx} {...m} />)}
      </MessageList>
      <ComposeMessage onMessageSent={onMessageSent} />
    </ChatPageContainer>
  )
}
const Header = () => {
  const navigate = useNavigate()
  const back = useCallback(() => {
    navigate('/chat')
  }, [])
  return (
    <ChatHeader>
      <IconWrapper onClick={back}>
        <AiOutlineArrowLeft />
      </IconWrapper>
      <ImageWrapper onClick={() => navigate('/profile')} width='40px' src={`https://api.lorem.space/image/face?w=200&h=200&t=${Math.random()}`} />
      <HeaderUserInfo>
        <Text>Natasha</Text>
        <Text color='#999'>Online</Text>
      </HeaderUserInfo>
      <RightActions>
        <AiOutlinePhone size={25} />
        <AiOutlineVideoCamera size={25} />
      </RightActions>
  </ChatHeader>
  )
}

ChatPage.Layout = AppLayout
ChatPage.showBottomNav = false
ChatPage.Header = Header
ChatPage.contentStyles = {
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

const ComposeMessage = ({ onMessageSent }: any) => {
  const attachmentAnimation = useAnimation()
  const sendAnimation = useAnimation()
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false)
  const [newMessage, setNewMessage] = useState({
    message: ''
  })

  // const fileRef = useRef()
  let fileRef: HTMLInputElement | null

  useEffect(() => {
    attachmentAnimation.start({
      rotate: isAttachmentOpen ? 45 : 0
    })
  }, [isAttachmentOpen])

  const toggleAttachment = useCallback(() => {
    setIsAttachmentOpen(crr => !crr)
  }, [])
  const onFocus = useCallback(() => {
    setIsAttachmentOpen(false)
  }, [])
  const handleSend = useCallback((e: any) => {
    e.stopPropagation()
    if (!newMessage.message) {
      sendAnimation.start({ rotate: -180, x: [0, -10, 0, -20, 0] })
      return
    }
    sendAnimation.start({ rotate: -90 })
    onMessageSent(newMessage)
    setNewMessage({ message: '' })
    setTimeout(() => {
      sendAnimation.start({
        rotate: 0
      })
    }, 300)
  }, [newMessage])
  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    setNewMessage(crr => ({ ...crr, [e.target.name]: e.target.value }))
  }, [])

  const handleOnFileIconClick = useCallback((e: any, type: string) => {
    if (!fileRef) {
      return
    }
    setIsAttachmentOpen(false)
    if (type) {
      fileRef.accept = `${type}/*`
    }
    fileRef.click()
  }, [])

  const handleOnFileSelect = useCallback((e: any) => {
    const { files = [] } = e.target
    if (!e.target.files.length) {
      return
    }
    const newMessages = []
    for(let f of files) {
      newMessages.push({
        type: 'image',
        src: URL.createObjectURL(f)
      })
    }
    onMessageSent(newMessages)
  }, [])

  return (
    <ComposeWrapper
      initial={{ y: '100%' }}
      animate='in'
      exit='out'
      transition={{ delay: 0.3, duration: 0.2 }}
      variants={inOutVarient}
    >
      <AnimatePresence>
        {isAttachmentOpen && <AttachmentsActions onFileSelect={handleOnFileIconClick} />}
      </AnimatePresence>
      <AttachmentIcon onClick={toggleAttachment} animate={attachmentAnimation}>
        <AiFillPlusCircle color={!isAttachmentOpen ? 'gray' : 'white'} size={25} />
      </AttachmentIcon>
      <input value={newMessage.message ?? ''} onFocus={onFocus} placeholder="Type your message here..." name="message" onChange={handleOnChange}/>
      <FileInput type='file' multiple ref={e => fileRef = e} onChange={handleOnFileSelect} />
      <AttachmentIcon onClick={handleSend} animate={sendAnimation}>
        <AiOutlineSend color='#20A65B' size={25} onClick={handleSend} />
      </AttachmentIcon>
    </ComposeWrapper>
  )
}

const ComposeWrapper = styled(FadeCard)`
  margin: 0px;
  input {
    width: 100%;
    background: none;
    border: none;
    outline: none;
    color: white;
    font-size: medium;
  }
`

const AttachmentIcon = styled(motion.div)`

`
const FileInput = styled.input`
  display: none;
`
type AttachmentsActionsP = {
  onFileSelect: any
}
const AttachmentsActions: FC<AttachmentsActionsP> = ({ onFileSelect }) => {
  return (
    <AttachmentsContainer
      initial={{ y:  20, opacity: 0 }}
      animate={{ y: -10, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
    >
      <ActionItem onClick={e => onFileSelect(e, '')}>
        <MdLocationOn size={25} />
      </ActionItem>
      <ActionItem onClick={e => onFileSelect(e, 'image')}>
        <AiOutlineFileImage size={25} />
      </ActionItem>
    </AttachmentsContainer>
  )
}

const AttachmentsContainer = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 60px;
  padding: 10px;
  background: #2E2D41;
  left: 5px;
  border-radius: 10px;
  gap: 15px;
`
const ActionItem = styled.div`

`