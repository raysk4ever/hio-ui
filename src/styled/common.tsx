import { motion } from "framer-motion";
import styled, { css } from "styled-components";

type ImageWrapperType = {
  width?: string
  src?: string
  border?: string
  borderWidth?: string
  borderColor?: string
  asc?: boolean
}

type TextType = {
  color?: string
  xs?: boolean
  lgr?: boolean
  bold?: boolean
  ml?: number
}


export const ImageWrapper = styled.div<ImageWrapperType>`
  border-radius: 50%;
  overflow: hidden;
  width: ${p => p.width ?? '60px'};
  aspect-ratio: 1;
  background-image: ${p => `url('${p.src}');`}
  background-position: center;
  background-size: cover;
  border: ${p => p.border ?? `${p.borderWidth ?? '2px'} solid ${p.borderColor ?? '#20A65B'};`}
  padding: 1px;
  ${p => p.asc && css`
    align-self: center;
  `}
`
export const Text = styled.span<TextType>`
  font-size: medium;
  ${p => p.color && `
    color: ${p.color};
  `}
  ${p => p.xs && `
    font-size: small;
  `}
  ${p => p.lgr && `
    font-size: larger;
  `}
  ${p => p.bold && `
    font-weight: bold;
  `}
  ${p => p.ml && `
    margin-left: ${p.ml}px;
  `}

`
export const IconWrapper = styled.div`
  padding: 10px;
`

export const FadeCard = styled(motion.div)`
  margin: 1rem 0px;
  background: #2E2D41;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  outline: none;
  padding: 10px;
`

export const OnlineBadge = styled.div`
  width: 10px;
  height: 10px;
  background-color: #42dd42;
  border-radius: 50%;
`
