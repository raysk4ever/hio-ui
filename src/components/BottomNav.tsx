import { motion } from 'framer-motion'
import { AiFillHome, AiFillMessage, AiFillMoneyCollect, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai'
import { MdSmokingRooms } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { inOutVarient } from '../styled/variants'

export default function BottomNav () {

  return (
    <BottomNavContainer
      initial='init'
      animate='in'
      exit='out'
      variants={inOutVarient}
      transition={{ duration: 0.3 }}
    >
      <NavItem to={'/home'}>
        <AiFillHome size={25} color='white' />
      </NavItem>
      <NavItem to={'/search'}>
        <AiOutlineSearch size={25} color='white' />
      </NavItem>
      <NavItem to={'/rooms'}>
        <MdSmokingRooms size={25} color='white' />
      </NavItem>
      <NavItem to={'/chat'}>
        <AiFillMessage size={25} color='white' />
      </NavItem>
      <NavItem to={'/profile'}>
        <AiOutlineUser size={25} color='white' />
      </NavItem>
    </BottomNavContainer>
  )
}

const NavItem = ({ to = '/', children }) => {
  return (
    <NavLinkWrapper
      to={to}
      // activeClassName='selected'
    >
      {children}
    </NavLinkWrapper>
  )
}
const BottomNavContainer = styled(motion.div)`
  background-color: #15162C;
  padding: 10px;
  justify-content: space-around;
  display: flex;
  max-height: 10vh;
  border-top: 1px solid #333;
`

const NavLinkWrapper = styled(NavLink)`
  &.active {
    svg {
      color: #4cd84c !important;
    }
  }
`