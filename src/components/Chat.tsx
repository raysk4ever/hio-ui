import styled from "styled-components"
import { AiFillDollarCircle, AiOutlineSearch } from 'react-icons/ai'
import AppLayout from "../Layoutes/App"
import { FadeCard, ImageWrapper, Text } from "../styled/common"
import { useCallback, useContext } from "react"
import { useNavigate } from 'react-router-dom'
import { SocketContext } from "./SocketProvider"

export default function Chat () {
  const socket = useContext(SocketContext)
  console.log(socket)
  return (
    <ChatContainer>
      {/* <Heading /> */}
      <SearchBar />
      <Users />
      <Messages />
    </ChatContainer>
  )
}

Chat.Layout = AppLayout
Chat.socket = AppLayout

const ChatContainer = styled.div`
  /* width: 25rem; */
  /* background: #15162C; */
  color: white;
  gap: 20px;
  overflow-y: auto;
`

const Heading = () => {
  return (
    <HeadingContainer>
      <HeadingText>Messeages</HeadingText>
      <AiFillDollarCircle size={25} color='#20A65B' />
  </HeadingContainer>
  )
}

Chat.Header = Heading

const HeadingText = styled.span`
  font-size: 1.5rem;
`
const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SearchBar = () => {
  return (
    <FadeCard>
      <AiOutlineSearch color='#8C8C9B' />
      <HintText placeholder="Search" />
    </FadeCard>
  )
}

const HintText = styled.input`
  /* color: #8C8C9B; */
  background: none;
  border: none;
  outline: none;
  width: 100%;
`

const Users = () => {
  return (
    <ListWrapper>
      <Text>Recents</Text>
      <UserList>
        {Array.from({ length: 5 }).map((_, index) => <UserItem key={index} />)}
      </UserList>
    </ListWrapper>
  )
}

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
`

const UserList = styled.div`
  display: flex;
  gap: 1rem;
  padding: 10px 0px;
  overflow: auto;
`

const UserItem = () => {
  return (
    <UserItemContainer>
      <ImageWrapper src={`https://api.lorem.space/image/face?w=200&h=200&t=${Math.random()}`} />
      <Text xs bold>Ravi</Text>
    </UserItemContainer>
  )
}


const UserItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const Messages = () => {
  return (
    <MessagesWrapper>
      <Text>Messages</Text>
      <MessageListWrapper>
        {Array.from({ length: 2 }).map((chat, idx) => <ChatMessageItem key={idx} id={idx} />)}
      </MessageListWrapper>
    </MessagesWrapper>
  )
}

const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const MessageListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 10px;
`

const ChatMessageItem = ({ id = '1' }: any) => {
  const navigate = useNavigate()
  const onChatItemClick = useCallback(() => {
    navigate('/chat/' + id)
  }, [])
  return (
    <ChatItemWrapper onClick={onChatItemClick}>
      <div>
        <ImageWrapper borderWidth='1px' borderColor='white' width='30px' src={`https://api.lorem.space/image/face?w=100&h=100&t=${Math.random()}`} />
      </div>
      <Right>
        <Text bold>Natasha</Text>
        <Text color='#999'>hi there ❤️‍🔥</Text>
      </Right>
    </ChatItemWrapper>
  )
}

const ChatItemWrapper = styled.div`
  display: flex;
  /* align-items: center; */
  gap: 10px;
  padding: 10px 0px;
`
const Right = styled.div`
  display: flex;
  flex-direction: column;
`