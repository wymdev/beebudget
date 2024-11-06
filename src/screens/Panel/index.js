import React, { useState } from 'react';
import { Switch } from 'react-native';
import { Feather, MaterialCommunityIcons, FontAwesome, AntDesign } from '@expo/vector-icons';

import {
  Wrapper,
  Header,
  HeaderContainer,
  Title,
  BalanceContainer,
  Value,
  Bold,
  EyeButton,
  Info,
  Actions,
  Action,
  ActionLabel,
  UseBalance,
  UseBalanceTitle,
  PaymentMethods,
  PaymentMethodsTitle,
  CategoryContainer,
  Card,
  CardBody,
  CardDetails,
  CardTitle,
  CardInfo,
  Img,
  AddButton,
  AddLabel,
  UseTicketContainer,
  UseTicketButton,
  UseTicketLabel,
} from './styles';

import creditCard from '../../images/credit-card.png';

export default function Panel() {
  const [isVisible, setIsVisible] = useState(true);
  const [useBalance, setUseBalance] = useState(true);

  function handleToggleVisibility() {
    setIsVisible((prevState) => !prevState);
  }

  function handleToggleUseBalance() {
    setUseBalance((prevState) => !prevState);
  }

  return (
    <Wrapper>
      <Header
        colors={
          useBalance
            ? ['#52E78C', '#1AB563']
            : ['#D3D3D3', '#868686']
        }
      >
        <HeaderContainer>
          <Title>BeeBudget</Title>

          <BalanceContainer>
            <Value>
              <Bold>Categories</Bold>
            </Value>
          </BalanceContainer>

          <Info>
            Manage your categories
          </Info>

          <Actions>
            <Action>
              <MaterialCommunityIcons name="plus" size={25} color="#fff" />
              <ActionLabel>Add New</ActionLabel>
            </Action>

            {/* <Action>
              <FontAwesome name="bank" size={20} color="#fff" />
              <ActionLabel>To remove</ActionLabel>
            </Action> */}
          </Actions>
        </HeaderContainer>
      </Header>

      
      <CategoryContainer>
        <PaymentMethods>
            <PaymentMethodsTitle>
            Payment Method
            </PaymentMethodsTitle>

            <Card>
            <CardBody>
                <CardDetails>
                <CardTitle>
                    Register your credit card
                </CardTitle>
                <CardInfo>
                    Register a credit card to be able to make payments even when you
                    don't have a balance on your BeeBudget.
                </CardInfo>
                </CardDetails>

                <Img source={creditCard} resizeMode="contain" />
            </CardBody>

            <AddButton>
                <AntDesign name="pluscircleo" size={30} color="#0DB060" />
                <AddLabel>
                Add Credit Card
                </AddLabel>
            </AddButton>
            </Card>
        </PaymentMethods>
      </CategoryContainer>
    </Wrapper>
  );
}