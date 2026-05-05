import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  Modal,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const COLORS = {
  background: '#F8FAFB',
  white: '#FFFFFF',
  textDark: '#455A64',
  teal: '#1CB5A3',
  red: '#E57373',
  modalOverlay: 'rgba(0,0,0,0.5)',
};

const ListDetailsScreen = ({ navigation }) => {
  // âœ… Rule: Sab hooks hamesha top par honi chahiye
  const [products, setProducts] = useState([
    { id: '1', name: 'Coca Cola Can 250ml', qty: 1, price: 'Rs 200.00', img: require('../assets/cocacola.png') },
    { id: '2', name: 'Colgate Maximum Cavity\nProtection 75gm', qty: 1, price: 'Rs 120.00', img: require('../assets/colgate.png') },
    { id: '3', name: 'Fanta 500ml', qty: 1, price: 'Rs 100.00', img: require('../assets/fanta.png') },
    { id: '4', name: 'Fruita Vitals Red Grapes 200ml', qty: 1, price: 'Rs 90.00', img: require('../assets/nestle.png') },
  ]);
  const [selectedIds, setSelectedIds] = useState([]); 
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const confirmDelete = () => {
    const remaining = products.filter(p => !selectedIds.includes(p.id));
    setProducts(remaining);
    setSelectedIds([]);
    setDeleteModalVisible(false);
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedIds.includes(item.id);
    return (
      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={() => toggleSelect(item.id)}
        style={[
          styles.card, 
          isSelected && { borderColor: COLORS.red, borderWidth: 1.5 }
        ]}
      >
        <View style={styles.imageContainer}>
          <Image source={item.img} style={styles.productImage} resizeMode="contain" />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.qtyText}>Qty: {item.qty}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Price: </Text>
            <Text style={styles.priceValue}>{item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <Modal
        animationType="fade"
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Remove Items</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to remove {selectedIds.length} item(s)?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setDeleteModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={confirmDelete}>
                <Text style={styles.deleteBtnText}>delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconPadding}>
          <Ionicons name="arrow-back" size={26} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Refreshment</Text>
        <View style={styles.navRight}>
          <TouchableOpacity 
            onPress={() => selectedIds.length > 0 && setDeleteModalVisible(true)}
            disabled={selectedIds.length === 0}
          >
            <MaterialCommunityIcons 
              name="delete-outline" 
              size={26} 
              color={selectedIds.length > 0 ? COLORS.red : '#BDC3C7'} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.mainButton}
          onPress={() => navigation.navigate('ConnectTrolleyScreen')}
        >
          <MaterialCommunityIcons name="qrcode-scan" size={22} color={COLORS.white} />
          <Text style={styles.buttonText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  navBar: { height: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, justifyContent: 'space-between' },
  navTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textDark },
  navRight: { flexDirection: 'row' },
  iconPadding: { padding: 5 },
  listContent: { padding: 16, paddingBottom: 100 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  imageContainer: { width: 60, height: 60, backgroundColor: '#F5F5F5', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  productImage: { width: '80%', height: '80%' },
  detailsContainer: { flex: 1, paddingLeft: 20 },
  productName: { fontSize: 16, fontWeight: 'bold', color: COLORS.textDark },
  qtyText: { fontSize: 14, color: '#90A4AE', marginVertical: 4 },
  priceRow: { flexDirection: 'row' },
  priceLabel: { fontSize: 14, color: COLORS.teal },
  priceValue: { fontSize: 14, fontWeight: 'bold', color: COLORS.teal },
  footer: { position: 'absolute', bottom: 30, alignSelf: 'center', width: '100%', alignItems: 'center' },
  mainButton: {
    backgroundColor: '#00796B',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  modalOverlay: { flex: 1, backgroundColor: COLORS.modalOverlay, justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '80%', backgroundColor: 'white', borderRadius: 20, padding: 25 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textDark, marginBottom: 10 },
  modalMessage: { fontSize: 16, color: '#78909C', marginBottom: 20 },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end' },
  cancelBtn: { marginRight: 20 },
  cancelBtnText: { fontSize: 16, color: '#90A4AE' },
  deleteBtn: { backgroundColor: COLORS.red, padding: 10, borderRadius: 10 },
  deleteBtnText: { color: 'white', fontWeight: 'bold' },
});

export default ListDetailsScreen;
