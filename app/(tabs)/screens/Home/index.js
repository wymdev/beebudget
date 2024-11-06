import React from 'react';

import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import {
  Wrapper,
  Container,
  Header,
  BalanceContainer,
  BalanceTitle,
  Balance
} from './styles';

import Suggestions from '../../appcomponents/Suggestions';
import Activities from '../../appcomponents/Activities';
import Tips from '../../appcomponents/Tips';
import Banner from '../../appcomponents/Banner';

export default function Home() {
  return (
    <Wrapper>
      <Container>
        <Header>
          <MaterialCommunityIcons name="qrcode-scan" size={25} color="#10c86e" />

          <BalanceContainer>
            <BalanceTitle>Meu saldo</BalanceTitle>
            <Balance>R$ 798.611,65</Balance>
          </BalanceContainer>

          <AntDesign name="gift" size={25} color="#10c86e" />
        </Header>

        <Suggestions />
        
        <Activities />

        <Tips />
        
        <Banner />
      </Container>
    </Wrapper>    
  );
}