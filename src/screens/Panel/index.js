import React, { useState, useCallback , useRef } from 'react';
import { View, TextInput, Button, Alert, Modal, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import SweetAlert from '@/src/components/SweetAlert';

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

import IconSelector from '../../components/IconSelector';
import { addCategory } from '@/src/actions/actions';
import CategoriesList from '../../components/CategoriesList';

export default function Panel() {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#52E78C');
  const [icon, setIcon] = useState('home'); // Default icon
  const [showModal, setShowModal] = useState(false); // For color picker modal

  const [useBalance, setUseBalance] = useState(true);

  const sweetAlertRef = useRef();

  const dispatch = useDispatch();
  const bottomSheetModalRef = React.useRef(null);

  // Open Bottom Sheet Modal
  const handleOpenBottomSheet = useCallback(() => {
    // Alert.alert('hi')
    bottomSheetModalRef.current?.present();
  }, []);

  // Close Bottom Sheet Modal
  const handleCloseBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleAddCategory = () => {
    if (!name ) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    dispatch(addCategory(name, icon, color ));
    // Alert.alert('Success', 'Category added successfully');
    sweetAlertRef.current.showSweetAlert({
      title: 'Category added successfully',
      text: '',
      showCancelButton: false,
      cancelButtonText: '',
      confirmButtonText: 'OK',
      onConfirm: () => {
        console.log('OK');
        
      },
      onClose: () => {
        console.log('Closing alert');
      },
      type: 'success', // Can be 'info', 'success', 'danger', 'warning'
    });
    setName('');
    setColor('#52E78C');
    setIcon('home');
    handleCloseBottomSheet(); // Close modal after adding category
  };

  const onSelectColor = ({ hex }) => {
    setColor(hex);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#868686' }}>
      <SweetAlert ref={sweetAlertRef} />
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
              <Action onPress={handleOpenBottomSheet}>
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
        <CategoriesList />
      </Wrapper>
      <BottomSheetModalProvider>
        {/* Bottom Sheet Modal */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
          keyboardBehavior="interactive" // Ensures modal adjusts with keyboard
          keyboardBlurBehavior="restore" // Handles modal restoration after keyboard dismiss
          style={styles.bottomSheetModal}
        >
          <BottomSheetView style={styles.bottomSheetContainer}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}
            >
              <Text style={styles.modalTitle}>Add New Category</Text>
              <TextInput
                placeholder="Category Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholderTextColor={'#B0B0B0'}
              />
              <IconSelector selectedIcon={icon} onSelect={setIcon} />
              <TouchableOpacity style={styles.button} onPress={handleAddCategory}>
                <Text style={styles.buttonText}>Add Category</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView >
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#52E78C',
    padding: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSheetModal: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  bottomSheetContainer: {
    backgroundColor: '#1C1C1E',
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#3C3C3E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: '#52E78C',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});



