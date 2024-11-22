import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const IconSelector = ({ selectedIcon, onSelect }) => {
    const availableIcons = ['home', 'star', 'person', 'settings']; // Add more icons

    return (
        <View>
            <Text>Select an Icon:</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {availableIcons.map((icon) => (
                    <TouchableOpacity
                        key={icon}
                        onPress={() => onSelect(icon)}
                        style={{
                            padding: 10,
                            backgroundColor: selectedIcon === icon ? '#d3d3d3' : 'transparent',
                        }}
                    >
                        <MaterialCommunityIcons name={icon} size={30} color="black" />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default IconSelector;
