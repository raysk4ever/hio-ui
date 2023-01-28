import { useCallback } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { devices } from "./styled/devices"

function App () {
  return (
    <>
      <Nav />
      <Landing />
    </>
  )
}
export default App

function Nav() {
  return (
    <ContainerNav>
      <Brand>
        <img src='/logo.svg' />
      </Brand>
      <Menu>
        <Link to='/chat'>Chat App</Link>
        <span>Explore</span>
        <span>Subscribe Now</span>
      </Menu>
    </ContainerNav>
  )
}

function Stats () {
  return (
    <ContainerStats>
      <div className='item'>
        Online 30k
      </div>
      <div className='item'>
        Rooms 30k
      </div>
      <div className='item'>
        Matches 100k
      </div>
    </ContainerStats>
  )
}

const ContainerStats = styled.div`
  height: 20vh;
  width: 100vw;
  top: 90vh;
  position: absolute;
  display: flex;
  color: var(--p1);
  .item {
    width: 300px;
    background: red;
    font-weight: 900;
    flex: 1;
  }
`

function Landing () {
  const navigate = useNavigate()
  const onNow = useCallback(() => {
    navigate('/chat')
  }, [])
  return (
    <Container>
      <Section>
        <LeftSection>
          <h1>Connect with</h1>
          <h1>YOUR NEW</h1>
          <h1>Social Amigo</h1>
          <button onClick={onNow}>Now !!</button>
        </LeftSection>
        <RightSection>
          <Grid>
            {Array.from({ length: 2 }).map((_,i) => (
              <Card key={i}>
                <img src={`https://api.lorem.space/image/face?w=300&h=400&hash=i1c2nklj?t=${i}`} />
                <div className="blur">
                  <span className="name">Natasha</span>
                  <span>{(Math.random() + 1).toFixed(2)} km Away</span>
                </div>
              </Card>
            ))}
          </Grid>
        </RightSection>
      </Section>
      <img className='wave' src='/wave.svg' />
    </Container>
  )
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  // background: var(--p5);
  background-image: linear-gradient(90deg, var(--p5), var(--p1));
  color: var(--p3);
  img.wave {
    position: absolute;
    bottom: -150px;
  }
`
const ContainerNav = styled(Container)`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 40px;
  @media ${devices.mobileL} { 
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`
const Brand = styled.div`
`
const Menu = styled.div`
  display: flex;
  gap: 20px;
  a {
    color: white;
    text-decoration: none;
  }
`
const Section = styled.div`
  display: flex;
  min-height: 100vh;
  padding: 10px 10rem;
  z-index: 1;
  gap: 1rem;
  h1 {
    font-weight: 900;
    font-size: 5rem;
    margin: 20px 0px;
    text-align: left;
  }
  @media ${devices.mobileL} { 
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 10px 0px;
    h1 {
      font-size: 3rem;
    }
  }
`
const LeftSection = styled.div`
  flex: 1;
  button {
    border: none;
    padding: 20px 40px;
    font-size: 20px;
    background: var(--p1);
    color: var(--p3);
    font-weight: 600;
    cursor: pointer;
  }
  @media ${devices.mobileL} {
    flex: 0;
  }
`
const RightSection = styled.div`
  flex: 1;
`

const Grid = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
  @media ${devices.mobileL} {
    display: flex;
    flex-wrap: wrap;
  }
`
const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 330px;
  border-radius: 10px;
  overflow: hidden;
  color: var(--p3);
  background-color: var(--p1);
  position: relative;
  img {
    height: 100%;
  }
  .blur {
    width: 100%;
    padding: 10px;
    position: absolute;
    background: rgba(122, 95, 95, 0.5);
    mix-blend-mode: normal;
    backdrop-filter: blur(2px);
    display: flex;
    justify-content: space-around;
    .name:before  {
      content: '';
      width: 8px;
      height: 8px;
      background: #4cd84c;
      position: absolute;
      left: 1.2rem;
      top: 35%;
      outline: 1px solid var(--p3);
      border-radius: 50%;
    }
  }
  @media ${devices.mobileL} {
    width: 180px;
    height: auto;
    .blur {
      flex-direction: column;
      padding-left: 40px;
    }
  }
`