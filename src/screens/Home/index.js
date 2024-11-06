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

import Suggestions from '../../components/Suggestions';
import Activities from '../../components/Activities';
import Tips from '../../components/Tips';
import Banner from '../../components/Banner';

export default function Home() {
  return (
    <Wrapper>
      <Container>
        <Header>
          <MaterialCommunityIcons name="qrcode-scan" size={25} color="#10c86e" />

          <BalanceContainer>
            <BalanceTitle>My balance</BalanceTitle>
            <Balance>MMK 79,861,165</Balance>
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