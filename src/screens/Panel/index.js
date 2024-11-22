import React, { useState, useEffect } from 'react';
import { Switch, View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Feather, MaterialCommunityIcons, FontAwesome, AntDesign, FlatList } from '@expo/vector-icons';

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

import { useDispatch, useSelector } from 'react-redux';
import IconSelector from '../../components/IconSelector'
import { addCategory, loadCategories } from '@/src/actions/actions';

import creditCard from '../../images/credit-card.png';

export default function Panel() {
  const [isVisible, setIsVisible] = useState(true);
  const [useBalance, setUseBalance] = useState(true);

  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [icon, setIcon] = useState('home'); // Default icon
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.categories);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  function handleToggleVisibility() {
    setIsVisible((prevState) => !prevState);
  }

  function handleToggleUseBalance() {
    setUseBalance((prevState) => !prevState);
  }

  const handleAddCategory = () => {
    if (!name || !color) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    dispatch(addCategory(name, icon, color));
    Alert.alert('Success', 'Category added successfully');
    setName('');
    setColor('');
    setIcon('home');
  };

  const renderCategory = ({ item }) => (
    <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    }}>
      <MaterialCommunityIcons name={item.icon} size={24} color={item.color} />
      <Text style={{
        marginLeft: 10,
        fontSize: 16,
      }}>{item.name}</Text>
    </View>
  );

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

        <View>
          <TextInput
            placeholder="Category Name"
            value={name}
            onChangeText={setName}
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          <TextInput
            placeholder="Color (e.g., #FF5733)"
            value={color}
            onChangeText={setColor}
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
          />
          <IconSelector selectedIcon={icon} onSelect={setIcon} />
          <Button title="Add Category" onPress={handleAddCategory} />
        </View>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCategory}
          contentContainerStyle={{
            padding: 10 , 
          }}
        />
      </CategoryContainer>
    </Wrapper>
  );
}

