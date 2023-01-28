import styled from "styled-components"
import AppLayout from "../Layoutes/App"
import { ImageWrapper, Text } from "../styled/common"

const intrests = [
  { title: '🧑🏻‍💻 Coding', },
  { title: '❤️ Love', },
  { title: '✈️ Travel' },
]

export default function Profile () {
  return (
    <ProfileContainer>
      <BasicInfo>
        <ImageWrapper width='100px' src={`https://api.lorem.space/image/face?w=200&h=200&t=${Math.random()}`} />
        <Text bold lgr>Natasha Singh</Text>
        <Text bold>Delhi, India</Text>
      </BasicInfo>
      <OtherInfo>
        <Text>This is my Bio 💁🏻</Text>
        <Text>Coding 🧑🏻‍💻</Text>
      </OtherInfo>
      <Text lgr>Your Intrests</Text>
      <IntrestsContainer>
        {intrests.map((i, idx) => <IntrestItem key={idx} {...i} />)}
      </IntrestsContainer>
    </ProfileContainer>
  )
}

Profile.Layout = AppLayout
Profile.showHeader = false

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const BasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`
const OtherInfo = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff30;
  padding: 10px;
  gap: 10px;
  border-radius: 10px;
`

const IntrestsContainer = styled.div`
  display: flex;
  gap: 10px;
`


const IntrestItem = ({ title = '' }) => {
  return (
    <IntrestWrapper>
      <Text>{title}</Text>
    </IntrestWrapper>
  )
}

const IntrestWrapper = styled.div`
  border: 1px solid #20A65B;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: #20a65b5e;
`