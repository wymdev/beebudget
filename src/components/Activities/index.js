import React from 'react';

import { Feather, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import {
  Container,
  Header,
  Title,
  Card,
  CardHeader,
  Avatar,
  Description,
  Bold,
  CardBody,
  UserName,
  CardFooter,
  Details,
  Value,
  Divider,
  Date,
  Actions,
  Option,
  OptionLabel,
} from './styles';

import avatar from '../../images/avatar.png';

export default function Activities() {
  return (
    <Container>
      <Header>
        <Title>Activities</Title>
      </Header>

      <Card>
        <CardHeader>
          <Avatar source={avatar} />
          <Description>
            <Bold>You</Bold> paid to <Bold>@osvaldokalvaitir</Bold>
          </Description>
        </CardHeader>

        <CardBody>
          <UserName>Wai Yan Maing</UserName>
        </CardBody>

        <CardFooter>
          <Details>
            <Value>MMK 18,000</Value>

            <Divider />

            <Feather name="lock" color="#fff" size={14} />
            <Date>2 months ago</Date>
          </Details>

          <Actions>
            <Option>
              <MaterialCommunityIcons
                name="comment-outline"
                size={14}
                color="#fff"
              />
              <OptionLabel>0</OptionLabel>
            </Option>

            <Option>
              <AntDesign
                name="hearto"
                size={14}
                color="#fff"
              />
              <OptionLabel>0</OptionLabel>
            </Option>
          </Actions>
        </CardFooter>
      </Card>
    </Container>
  )
}