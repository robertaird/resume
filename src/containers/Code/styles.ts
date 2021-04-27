import styled from 'styled-components';

interface HoverFilePathProps {
  open: boolean;
  width: number;
  adjust: number;
}

export interface HoverAreaProps {
  open: boolean;
  'data-z-index': number;
  'data-adjust': number;
  'data-width': number;
  'data-height': number;
  'data-top': number;
  'data-left': number;
  'data-bottom': number;
  'data-right': number;
}

export const HoverArea = styled.div.attrs((props: HoverAreaProps) => ({
  style: {
    pointerEvents: props['open'] ? 'auto' : 'none',
    zIndex: props['data-z-index'],
    transform: `translate(${props['data-left']}px, ${props['data-top']}px)`,
    height: props['data-height'] - props['data-adjust'] / 2,
    width: props['data-width'] - props['data-adjust'],
  },
}))<HoverAreaProps>`
  transition: transform 300ms linear;
  /* will-change: transform; */
  &:hover {
  }
  &:hover h5 {
    font-style: italic;
  }
  &:hover div {
    background: #aaaaaa77;
    border: 3px solid ${(props) => props.theme.palette.primary.light};
  }
  & div {
    border: 1px solid ${(props) => props.theme.palette.secondary.dark};
    background: #aaaaaa22;
    border-radius: 4px;
    margin-top: 0px;
  }
  position: absolute;
`;

export const HoverPath = styled.h5.attrs((props: HoverFilePathProps) => ({
  style: {
    display: props.open ? '' : 'none',
    width: props.width,
  },
}))<HoverFilePathProps>`
  position: absolute;
  margin: 0;
  max-width: 50vw;
  top: 0;
  left: 5px;
  white-space: nowrap;
  text-align: left;
`;

export const HoverDiv = styled.div.attrs((props: HoverAreaProps) => ({
  style: {
    display: props.open ? '' : 'none',
    width: `calc(100% + ${props['data-adjust']}px)`,
    height: props['data-height'],
  },
}))<HoverAreaProps>`
  max-width: 100vw;
  pointer-events: none;
  border-radius: 4px;
`;
