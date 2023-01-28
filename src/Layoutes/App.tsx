import styled from "styled-components";
import { AnimatePresence } from 'framer-motion'
import BottomNav from "../components/BottomNav";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IconWrapper } from "../styled/common";
import { useCallback, useContext } from "react";
import { SessionContext } from "../components/SessionProvider";
import { LayoutContainer } from "../styled/containers";
// import { useLocation } from "react-router";


export default function AppLayout ({ children, Header, showBottomNav = true, showHeader = true, contentStyles = {} }) {
  // const { pathname } = useLocation()
  // const pageVariants = {
  //   initial: { opacity: pathname === '/chat' ? 0.8 : 1 },
  //   in: { opacity: 1 },
  //   closed: { opacity: 0, x: "-100%" },
  // }
  const session = useContext(SessionContext)
  console.log('session', session)
  const HeaderComponent = Header ?? Heading
  return (
    <LayoutContainer
      // key={pathname}
      // initial="initial"
      // animate="in"
      // // exit='closed'
      // variants={pageVariants}
      // transition={{ duration: 0.1 }}
    >
      <AppContent style={{ ...contentStyles }}>
        {showHeader && <HeaderComponent />}
        {children}
      </AppContent>
      <AnimatePresence>
        {showBottomNav && <BottomNav />}
      </AnimatePresence>
    </LayoutContainer>
  )
}

const AppContent = styled.div`
  position: relative;
  overflow: auto;
  padding: 2rem 10px;
  padding-bottom: 5px;
  flex: 1;
  color: white;
  /* max-height: calc(100vh - 50px); */
  max-height: calc(100vh - 10px);
`
const Heading = ({ back = () => {} }) => {
  const onBack = useCallback(() => {
    back()
  }, [])
  return (
    <HeadingContainer>
      <IconWrapper onClick={onBack}>
        <AiOutlineArrowLeft />
      </IconWrapper>
  </HeadingContainer>
  )
}

const HeadingText = styled.span`
  font-size: 1.5rem;
`
const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
