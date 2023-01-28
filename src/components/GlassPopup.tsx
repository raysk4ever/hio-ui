import { motion } from "framer-motion"
import { MdClose } from "react-icons/md"
import styled from "styled-components"
import { IconWrapper } from "../styled/common"

const GlassPopup = ({ children, onClose = () => {} }) => {
  return (
    <GlassContainer
      initial={{ opacity: 0, scale: 0, borderRadius: '50%' }}
      animate={{ opacity: 1, scale: 1, borderRadius: '0%' }}
      exit={{ opacity: 0, scale: 0, borderRadius: '50%' }}
      transition={{ duration: 0.3 }}
    >
      <IconWrapper onClick={onClose}>
        <MdClose />
      </IconWrapper>
      {children}
    </GlassContainer>
  )
}
export default GlassPopup

const GlassContainer = styled(motion.div)`
  width: calc(100vw - 2rem);
  height: calc(100vh - 50px - 2rem);
  position: fixed;
  top: 0px;
  left: 0px;
  backdrop-filter: blur(8px);
  background-color: #00000080;
  padding: 1rem
`
