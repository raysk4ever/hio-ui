import { useContext } from "react"
import { useState } from "react"
import styled from "styled-components"
import { LayoutContainer } from "../styled/containers"
import { SessionContext } from "./SessionProvider"

const Login = () => {
  const [showOTP, setShowOTP] = useState(false)
  const { setUser } = useContext(SessionContext)
  const handleLogin = () => {
    setUser({ id: 1 })
  }
  return (
    <LayoutContainer>
      <LoginContainer>
        <LogoContainer>
          <img src="/logo.svg" />
        </LogoContainer>
        <FormContainer>
          <input placeholder="email" />
          {showOTP && <input placeholder="OTP" />}
          <button onClick={handleLogin}>Login</button>
        </FormContainer>
      </LoginContainer>
    </LayoutContainer>
  )
}

export default Login

const LoginContainer = styled.div`
  flex: 1;
  padding: 3rem 10px;
`
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  gap: 1rem;
  input {
    padding: 10px;
    border-radius: 30px;
    border: 1px solid green;
    outline: none;
    background: none;
    background: #2E2D41
  }
  button {
    padding: 10px 30px;
    border-radius: 30px;
    border: none;
    background: green;
  }
`