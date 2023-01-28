import { createContext, useContext, useEffect, useState } from "react";

export const SessionContext = createContext<any>({})

const SessionProvider = ({ children }: any) => {
  const [user, setUser] = useState({ id: '' })
  useEffect(() => {
    // setUser({ id: '1' })
  }, [])
  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  )
}
export default SessionProvider
