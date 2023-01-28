import { AnimatePresence, motion, useAnimation } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import { AiFillPlusCircle, AiOutlineFileImage, AiOutlineSend } from "react-icons/ai"
import { MdLocationOn } from "react-icons/md"
import styled from "styled-components"
import { FadeCard } from "../styled/common"
import { inOutVarient } from "../styled/variants"

const ComposeMessage = ({ onMessageSent }) => {
  const attachmentAnimation = useAnimation()
  const sendAnimation = useAnimation()
  const [isAttachmentOpen, setIsAttachmentOpen] = useState(false)
  const [newMessage, setNewMessage] = useState({})

  const fileRef = useRef()

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
  const handleSend = useCallback((e) => {
    e.stopPropagation()
    if (!newMessage.message) {
      sendAnimation.start({ rotate: -180, x: [0, -10, 0, -20, 0] })
      return
    }
    sendAnimation.start({ rotate: -90 })
    onMessageSent(newMessage)
    setNewMessage({})
    setTimeout(() => {
      sendAnimation.start({
        rotate: 0
      })
    }, 300)
  }, [newMessage])
  const handleOnChange = useCallback((e) => {
    setNewMessage(crr => ({ ...crr, [e.target.name]: e.target.value }))
  }, [])

  const handleOnFileIconClick = useCallback((e, type) => {
    if (!fileRef.current) {
      return
    }
    setIsAttachmentOpen(false)
    if (type) {
      fileRef.current.accept = `${type}/*`
    }
    fileRef.current.click()
  }, [])

  const handleOnFileSelect = useCallback((e) => {
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
      initial={{ y: 19 }}
      animate='in'
      exit='out'
      transition={{ duration: 0.2 }}
      variants={inOutVarient}
    >
      <AnimatePresence>
        {isAttachmentOpen && <AttachmentsActions onFileSelect={handleOnFileIconClick} />}
      </AnimatePresence>
      <AttachmentIcon onClick={toggleAttachment} animate={attachmentAnimation}>
        <AiFillPlusCircle color={!isAttachmentOpen ? 'gray' : 'white'} size={25} />
      </AttachmentIcon>
      <input value={newMessage.message ?? ''} onFocus={onFocus} placeholder="Type your message here..." name="message" onChange={handleOnChange}/>
      <FileInput type='file' multiple ref={fileRef} onChange={handleOnFileSelect} />
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

const AttachmentsActions = ({ onFileSelect }) => {
  return (
    <AttachmentsContainer
      initial={{ y:  20, opacity: 0 }}
      animate={{ y: -10, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
    >
      <ActionItem onClick={onFileSelect}>
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

export default ComposeMessage
