import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

const CreateListScreen = ({ navigation, route }) => {
  const [myLists, setMyLists] = useState([
    { id: '1', title: 'Refreshment', store: 'Imtiaz', items: 4, products: [
        { id: 'p1', name: 'Coca Cola Can 250ml', qty: 1, price: '200.00' },
        { id: 'p2', name: 'Colgate Maximum Cavity', qty: 1, price: '120.00' },
    ]},
    { id: '2', title: 'Party List', store: 'Imtiaz', items: 3, products: [] },
  ]);

  useEffect(() => {
    if (route.params?.newList) {
      const newList = route.params.newList;
      setMyLists(prev => {
        if (prev.find(l => l.id === newList.id)) return prev;
        return [newList, ...prev];
      });
    }
  }, [route.params?.newList]);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.7}
      // âœ… Yahan click se Refreshment screen khulegi
      onPress={() => navigation.navigate('ListDetailsScreen', { 
        listTitle: item.title, 
        products: item.products 
      })}
    >
      <View style={styles.cardLeft}>
        <View style={styles.iconCircle}>
          <View style={styles.customIconLine} /><View style={styles.customIconLine} />
          <View style={[styles.customIconLine, { width: 10 }]} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.storeText}>Store: {item.store}</Text>
          <Text style={styles.itemCountText}>{item.items} items</Text>
        </View>
      </View>
      <View style={styles.arrowIcon} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.backArrow}>â†</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>My Shopping Lists</Text>
      </View>

      <FlatList data={myLists} renderItem={renderItem} keyExtractor={item => item.id} contentContainerStyle={styles.listPadding} />

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateStoreScreen')}>
        <Text style={styles.fabPlus}>+</Text>
        <Text style={styles.fabText}>New List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafb' },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, backgroundColor: '#fff', elevation: 2 },
  backArrow: { fontSize: 24, color: '#4f6d7a', marginRight: 10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#4f6d7a' },
  listPadding: { padding: 20, paddingBottom: 100 },
  card: { backgroundColor: '#fff', borderRadius: 15, padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, elevation: 3 },
  cardLeft: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: '#e0f7f4', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  customIconLine: { height: 2, width: 18, backgroundColor: '#00bfa5', marginVertical: 2 },
  titleText: { fontSize: 18, fontWeight: '600', color: '#333' },
  storeText: { fontSize: 14, color: '#00bfa5', marginTop: 2 },
  itemCountText: { fontSize: 13, color: '#999' },
  arrowIcon: { width: 10, height: 10, borderTopWidth: 2, borderRightWidth: 2, borderColor: '#999', transform: [{ rotate: '45deg' }] },
  fab: { position: 'absolute', bottom: 30, right: 20, backgroundColor: '#11c0a9', flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 22, borderRadius: 12, elevation: 5 },
  fabPlus: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginRight: 8 },
  fabText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default CreateListScreen;
