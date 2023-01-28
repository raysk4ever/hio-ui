import styled from "styled-components"
import AppLayout from "../Layoutes/App"
import { IconWrapper, ImageWrapper, Text } from "../styled/common"
import { SlEqualizer } from 'react-icons/sl'
import { MdFavorite, MdSkipNext } from "react-icons/md"
import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"

const slidesMock = [
  { src: `https://api.lorem.space/image/face?w=400&h=600&t=${Math.random()}` }
]
function Home () {
  const [slides, setSlides] = useState(slidesMock)
  const handleSkip = useCallback(() => {
    setSlides(crr => {
      crr.splice(0, 1)
      return [...crr]
    })
    // setTimeout(() => {
    //   setSlides(crr => ([...crr, { src: `https://api.lorem.space/image/face?w=400&h=600&t=${Math.random()}` }]))
    // }, 100)
  }, [])

  return (
    <FeedContainer>
        <SwiperContainer>
          <AnimatePresence>
            {slides.map((s, idx) => <Slide key={idx} idx={idx} setSlides={setSlides} slides={slides} {...s} />)}
          </AnimatePresence>
        </SwiperContainer>
      <ActionsWrapper>
        <ActionItem whileTap={{ scale: 0.8 }}>
          <MdFavorite size={30} />
        </ActionItem>
        <ActionItem whileTap={{ scale: 0.8 }} onClick={handleSkip}>
          <MdSkipNext size={30} />
        </ActionItem>
      </ActionsWrapper>
    </FeedContainer>
  )
}

const Slide = ({ src = '', idx, setSlides, slides }) => {
  return (
    <SlideContainer
      key={src}
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '-100%', opacity: 0 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={() => {
        console.log('onTransitionEnd')
        if (!slides.length) {
          setSlides(() => [
            { src: `https://api.lorem.space/image/face?w=400&h=600&t=${Math.random()}` }
          ])
        }
      }}
      src={src}
    >

    </SlideContainer>
  )
}

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90%;
`
const SwiperContainer = styled.div`
  margin: 20px 0px;
  position: relative;
  display: flex;
  justify-content: center;
  flex: 1;
`
const SlideContainer = styled(motion.div)`
  width: 100%;
  height: 600px;
  background-image: url('${p => p.src}');
  border-radius: 30px;
  position: absolute;
  &:nth-child(1) {
    top: 10px;
    z-index: 1;
    width: 98%;
  }
  
`

const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  backdrop-filter: blur(1px);
  background: #f9f9f92e;
  z-index: 1;
  top: 106px;
  padding: 10px 0px;
  border-radius: 30px;
  width: 80%;
  align-self: center;
`

const ActionItem = styled(motion.div)`
  background-color: #e91e63;
  width: 40px;
  padding: 10px;
  aspect-ratio: 1/1;
  display: grid;
  place-items: center;
  border-radius: 50%;
`

const Header = () => {
  return (
    <HeaderContainer>
      <Text lgr>People Nearby</Text>
      <IconWrapper>
        <SlEqualizer />
      </IconWrapper>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`



Home.Layout = AppLayout
Home.Header = Header
export default Home
