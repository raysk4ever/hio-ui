import { AnimatePresence, motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { AiOutlineLoading, AiOutlineNumber } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md'
import { SlUser } from 'react-icons/sl'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import AppLayout from '../Layoutes/App'
import { getRooms, joinRoom } from '../socket/emits'
import { ImageWrapper, Text } from '../styled/common'
import GlassPopup from './GlassPopup'
import { SocketContext } from './SocketProvider'
// import Test from './Test'

function Rooms() {
  const [rooms, setRooms] = useState([])
  const [activeRoom, setActiveRoom] = useState<any>(null)
  const [randomUsers, setRandomUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [loading, setLoading] = useState({ randomUsers: true, rooms: true })
  const { error } = useContext(SocketContext)
  console.log('error', error)

  const fetchRandomUsers = async () => {
    try {
      const { results = [] } = await (await fetch('https://randomuser.me/api/?results=25')).json()
      setLoading(crr => ({ ...crr, randomUsers: false }))
      setRandomUsers(results)
    } catch (error) {
      console.error('error', error)
    }
  }

  useEffect(() => {
    getRooms().then((data:any) => {
      setRooms(data.rooms)
      setLoading(crr => ({...crr, rooms: false}))
    })
    fetchRandomUsers()
  }, [])
  const handleJoinRoom = (e: any, room: any) => {
    joinRoom(room.id)
  }
  const navigate = useNavigate()
  const goToRoom = (roomId: string) => {
    navigate('/rooms/' + roomId)
  }

  return (
    <div>
      <p>Rooms</p>
      <RoomContainer>
        <>
          {loading.rooms && <p>Loading Rooms...</p>}
          {rooms.map((r: any) => (
            <RoomItem key={r.id} className={r.id === activeRoom?.id ? 'active' : ''} onClick={(e) => goToRoom(r.id)}>
              <span>{r.name}</span>
              {/* <span>{online[r.id] ?? 0}</span> */}
            </RoomItem>
          ))}
        </>
      </RoomContainer>
      <p>Random Users</p>
      <RandomUsersContainer>
        {loading.randomUsers && <p>Loading Users...</p>}
        {randomUsers.map((user: any, idx) => (
          <RandomUserItem
            key={user.id.value + idx}
            initial={{ y: -10 }}
            // animate={{ y: 0 }}
            whileInView={{ y: 0  }}
            onClick={() => setSelectedUser(() => ({...user}))}
          >
            <ImageWrapper src={user.picture.large} width='80px' />
            <Text>{user.name.first}</Text>
          </RandomUserItem>
        ))}
      </RandomUsersContainer>
      <AnimatePresence>
        {!!selectedUser && (
          <GlassPopup onClose={() => {
            setSelectedUser(null)
          }}>
            <SelectedUserWrapper>
              <ImageWrapper asc src={selectedUser.picture.large} width='15rem' />
              <div>
                <SlUser />
                <Text ml={10}>{selectedUser.name.first}</Text>
              </div>
              <div>
                <MdEmail />
                <Text ml={10}>{selectedUser.email}</Text>
              </div>
              <div>
                <AiOutlineNumber />
                <Text ml={10}>{selectedUser.dob.age}</Text>
              </div>
            </SelectedUserWrapper>
          </GlassPopup>
        )}
      </AnimatePresence>
    </div>
  )
}
Rooms.Layout = AppLayout
Rooms.showHeader = false

export default Rooms

const RoomContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 6rem;
`
const RandomUsersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  gap: 1rem;
  overflow: scroll;
  
`
const RoomItem = styled.div`
background: white;
color: teal;
margin: 10px;
width: 100px;
height: 100px;
display: grid;
place-items: center;
outline: 1px solid teal;
&.active {
    background: teal;
    color: white;
  }
`
const RandomUserItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`

const SelectedUserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`