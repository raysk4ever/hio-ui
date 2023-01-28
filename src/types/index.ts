export interface intiSocketI {
  setValue: React.Dispatch<React.SetStateAction<{
    queueLength: number;
    positionInLine: number;
    online: number;
    socketId: string;
  }>>
  setMessages: React.Dispatch<React.SetStateAction<{
    from: string;
    message: string;
  }[]>>
}

export type valueT = {
  message: string
}
