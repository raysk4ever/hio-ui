import SocketProvider from "./SocketProvider";

export default function withSocket (Component) {
  const SocketComponent = () => {
    return (
      <SocketProvider>
        <Component />
      </SocketProvider>
    )
  }
  return SocketComponent
}
