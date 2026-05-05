import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const TrolleyDashboardScreen = () => {
  const [activeTab, setActiveTab] = useState('Cart');
  
  // FIXED: Items data same rakha hai
  const [items] = useState([
    { id: '1', name: 'Coca Cola Can 250ml', qty: 1, price: '200.00', image: require('../assets/cocacola.png') },
    { id: '2', name: 'Colgate Maximum Cavity Protection 75gm', qty: 1, price: '120.00', image: require('../assets/colgate.png') },
    { id: '3', name: 'Fanta 500ml', qty: 1, price: '100.00', image: require('../assets/fanta.png') },
    { id: '4', name: 'Fruita Vitals Red Grapes 200ml', qty: 1, price: '90.00', image: require('../assets/nestle.png') },
  ]);

  // FIXED: Yahan se {{ uri }} hata diya hai taake local assets load hon
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.productImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQty}>Qty: {item.qty}</Text>
        <Text style={styles.itemPrice}>Rs {item.price}</Text>
      </View>
    </View>
  );

  const renderContent = () => {
    if (activeTab === 'Scanner') {
      return (
        <View style={styles.scannerScreenContent}>
           <Image 
            source={require('../assets/QRcode.png')}
            style={styles.dashboardImage}
            resizeMode="cover"
          />
        </View>
      );
    }

    if (activeTab === 'Cart') {
      return (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="cart-outline" size={100} color="#BDC3C7" />
          <Text style={styles.emptyText}>Cart is empty. Scan products to add them!</Text>
          <TouchableOpacity style={styles.refreshRow}>
            <Ionicons name="refresh-outline" size={20} color="#1ABC9C" />
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (activeTab === 'List') {
      return (
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          <View style={styles.listHeader}>
            <View>
              <Text style={styles.listTitle}>Shopping List</Text>
              <Text style={styles.refreshmentSub}>Refreshment</Text>
              <Text style={styles.itemCount}>{items.length} items</Text>
            </View>
            <TouchableOpacity style={styles.refreshRow}>
              <Ionicons name="refresh-outline" size={20} color="#1ABC9C" />
              <Text style={styles.refreshText}>Refresh</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.header}>
        <View style={{ width: 24 }} />
        <Text style={styles.headerTitle}>Trolley Dashboard</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <MaterialCommunityIcons name="logout-variant" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        {renderContent()}
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('Scanner')}>
          <MaterialCommunityIcons name="qrcode-scan" size={24} color={activeTab === 'Scanner' ? '#1ABC9C' : '#95A5A6'} />
          <Text style={[styles.tabLabel, { color: activeTab === 'Scanner' ? '#1ABC9C' : '#95A5A6' }]}>Scanner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('Cart')}>
          <MaterialCommunityIcons name="cart" size={26} color={activeTab === 'Cart' ? '#1ABC9C' : '#95A5A6'} />
          <Text style={[styles.tabLabel, { color: activeTab === 'Cart' ? '#1ABC9C' : '#95A5A6' }]}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('List')}>
          <Ionicons name="list-outline" size={24} color={activeTab === 'List' ? '#1ABC9C' : '#95A5A6'} />
          <Text style={[styles.tabLabel, { color: activeTab === 'List' ? '#1ABC9C' : '#95A5A6' }]}>List</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles remain exactly the same as you provided
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFB' },
  header: {
    height: 60, flexDirection: 'row', alignItems: 'center', 
    justifyContent: 'space-between', paddingHorizontal: 20,
    backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE'
  },
  headerTitle: { fontSize: 19, fontWeight: '600', color: '#34495E' },
  mainContent: { flex: 1 },
  scannerScreenContent: { flex: 1, backgroundColor: '#000' },
  dashboardImage: { width: '100%', height: '100%' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  emptyText: { textAlign: 'center', color: '#95A5A6', fontSize: 16, marginTop: 15, paddingHorizontal: 30 },
  refreshRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  refreshText: { color: '#1ABC9C', fontSize: 17, marginLeft: 6, fontWeight: '500' },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginBottom: 15 },
  listTitle: { fontSize: 28, fontWeight: 'bold', color: '#2C3E50' },
  refreshmentSub: { color: '#1ABC9C', fontSize: 16, fontWeight: '600' },
  itemCount: { color: '#BDC3C7', marginTop: 4 },
  card: {
    backgroundColor: '#FFF', borderRadius: 15, padding: 15, 
    flexDirection: 'row', marginBottom: 12, alignItems: 'center',
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.1, shadowRadius: 3
  },
  productImage: { width: 55, height: 55, resizeMode: 'contain', marginRight: 15 },
  itemName: { fontSize: 16, fontWeight: '600', color: '#2C3E50' },
  itemQty: { color: '#7F8C8D', marginVertical: 2 },
  itemPrice: { color: '#1ABC9C', fontWeight: 'bold', fontSize: 17 },
  tabBar: { height: 75, flexDirection: 'row', backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#EEE', paddingBottom: 10 },
  tabItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  tabLabel: { fontSize: 12, marginTop: 4 }
});

export default TrolleyDashboardScreen;
