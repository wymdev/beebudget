import React from 'react';

import {
  Container,
  Details,
  Img,
  Title,
  Description,
} from './styles';

import img13 from '../../images/13.png';

export default function Banner() {
  return (
    <Container>
      <Details>
        <Title>Cover a friend</Title>

        <Description>
          Keep your installments up to date, use BeeBudget to make your charges.
        </Description>
      </Details>

      <Img source={img13} />
    </Container>
  )
}
