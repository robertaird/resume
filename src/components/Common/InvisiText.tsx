import styled, { css } from 'styled-components';

type InvisiTextProps = {
  top?: string;
};

export const InvisiText = styled.span<InvisiTextProps>`
  ${({ top }) =>
    top
      ? css`
          top: ${top}px;
        `
      : ''}
  left: -2px;
  font-weight: 800;
  font-size: 1.2rem;
  position: absolute;
  color: transparent;
`;
