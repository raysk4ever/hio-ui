import { useContext } from "react";
import { SessionContext } from "../components/SessionProvider";

export const useMe = () => useContext(SessionContext)?.user ?? {}