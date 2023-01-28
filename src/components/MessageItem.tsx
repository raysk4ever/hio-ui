import { motion } from "framer-motion"
import styled from "styled-components"
import { Text } from "../styled/common"

const MessageItem = ({ type = 'text', message = '', src = '', from = '' }) => {
  const isText = type === 'text'
  const isMe = from === '1'
  return (
    <Container
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      isMe={isMe}
      isText={isText}
    >
      {isText ? <Text>{message}</Text> : null}
      {src ? <Image src={src} /> : null}
    </Container>
  )
}

export default MessageItem

const Container = styled(motion.div)`
  background: #cccdcc45;
  border-radius: 10px;
  width: fit-content;
  ${p => p.isMe && `
    align-self: flex-end;
    background: ${p.isText ? 'green' : 'transparent'};
  `}
  ${p => p.isText && `
    padding: 10px 20px;
  `}
`

const Image = ({ src }) => {
  return (
    <ImageWrapper src={src}>
    </ImageWrapper>
  )
}
const ImageWrapper = styled.div`
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 10px;
  background-image: url('${p => p.src}');
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #0000002e;
  background-position: center;
`