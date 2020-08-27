import React from 'react';
import styled from 'styled-components';

const TitleSVG = styled.svg`
  max-height: -webkit-fill-available;
  height: 72pt;
  width: -webkit-fill-available;
`;

const TitleText = styled.text`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-variant: small-caps;
  font-weight: 800;
  letter-spacing: 0.05em;
  fill: ${({ theme }) => theme.palette.primary.main};
`;

export const Name = ({ text }: { text: string }) => (
  <TitleSVG viewBox="0 -5 102.5 10.5" preserveAspectRatio="none">
    <TitleText x="0" y="5">
      {text}
    </TitleText>
  </TitleSVG>
);
