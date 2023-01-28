import { atom } from 'jotai'
import { valueT } from '../types'

export const valueState = atom<valueT[]>([])
