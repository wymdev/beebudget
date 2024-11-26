import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { loadCategories, deleteCategory } from '../../actions/actions';

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);

  // Load categories on mount
  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  // Handle delete action
  const handleDelete = (id) => {
    Alert.alert(
      'Delete Category',
      'Are you sure you want to delete this category?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteCategory(id)),
        },
      ]
    );
  };

  // Handle long press to delete
  const handleLongPress = (item) => {
    Alert.alert(
      'Delete Category',
      `Do you want to delete the category "${item.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDelete(item.id),
        },
      ]
    );
  };

  // Render each category as a grid item
  const renderCategory = ({ item }) => (
    <View style={styles.gridItem}>
      <TouchableOpacity
        onLongPress={() => handleLongPress(item)} // Long press to delete
        style={styles.categoryButton}
      >
        <Ionicons name={item.icon} size={40} color={item.color ? item.color : '#52E78C'} />
        <Text style={styles.categoryName}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => {console.log(item);
       item.name.toString()}}
      renderItem={renderCategory}
      numColumns={3} // Grid with 3 columns
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.row} // Align items row by row
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1E',
  },
  row: {
    justifyContent: 'space-between', // Evenly space items in the row
    marginBottom: 10, // Add spacing between rows
  },
  gridItem: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  categoryButton: {
    backgroundColor: '#2C2C2E',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryName: {
    marginTop: 10,
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
});

export default CategoryList;
