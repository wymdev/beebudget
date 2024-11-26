import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconSelector = ({ selectedIcon, onSelect }) => {
    const availableIcons = [
        'home-outline',
        'basket-outline',
        'beer-outline',
        'card-outline',
        'car-sport-outline',
        'cash-outline',
        'receipt-outline',
        'restaurant-outline',
        'ticket-outline',
        'cart-outline',
        'document-outline',
        'cut-outline',
        'airplane-outline',
        'bed-outline',
        'bus-outline',
        'cafe-outline',
        'fast-food-outline',
        'shirt-outline',
    ];

    return (
        <View style={{ padding: 10 }}>
            <Text style={{ marginBottom: 10, fontSize: 16 , color:'#ffffff' }}>Select an Icon:</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {availableIcons.map((icon) => (
                    <TouchableOpacity
                        key={icon}
                        onPress={() => onSelect(icon)}
                        style={{
                            padding: 10,
                            margin: 5,
                            borderWidth: 2,
                            borderColor: selectedIcon === icon ? '#0DB060' : 'transparent',
                            borderRadius: 10, // To make the corners rounded
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f9f9f9', // Optional background color for contrast
                        }}
                    >
                        <Ionicons name={icon} size={30} color="black" />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default IconSelector;
