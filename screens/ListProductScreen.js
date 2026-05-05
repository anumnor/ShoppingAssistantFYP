import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import ApiService from '../Service/apiService';

const ListProductScreen = ({ navigation, route }) => {
  const { storeName = 'Imtiaz' } = route.params || {};
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const [productResult, cartResult] = await Promise.all([
        ApiService.getProducts(storeName),
        ApiService.getCart(),
      ]);

      const cartByProduct = {};
      (cartResult.data || []).forEach(item => {
        cartByProduct[item.id] = item;
      });

      const nextProducts = (productResult.data || []).map(item => {
        const cartItem = cartByProduct[item.id];
        return cartItem
          ? { ...item, quantity: cartItem.quantity, checked: true, cartId: cartItem.cartId }
          : item;
      });

      setProducts(nextProducts);
    } catch (error) {
      console.log('Failed to load products', error.message);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [storeName]);

  const saveCart = async (product, quantity) => {
    try {
      if (quantity <= 0 && product.cartId) {
        await ApiService.removeCartItem(product.cartId);
      } else {
        await ApiService.addToCart({ id: product.id, quantity, price: product.price });
      }

      loadProducts();
    } catch (error) {
      console.log('Failed to update cart', error.message);
    }
  };

  const toggleProduct = (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const quantity = product.checked ? 0 : Math.max(product.quantity, 1);
    setProducts(prev => prev.map(p => p.id === id ? { ...p, quantity, checked: quantity > 0 } : p));
    saveCart(product, quantity);
  };

  const updateQty = (id, delta) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const quantity = Math.max(0, product.quantity + delta);
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, quantity, checked: quantity > 0 };
      }
      return p;
    }));
    saveCart(product, quantity);
  };

  // Filter selected items to pass to next screen
  const selectedItems = products.filter(p => p.checked && p.quantity > 0);

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.productPrice}>{item.price}</Text>
            <Text style={styles.unitText}>unit</Text>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity onPress={() => toggleProduct(item.id)} style={[styles.checkbox, item.checked && styles.checkedBg]}>
              {item.checked && <Text style={styles.checkMark}>âœ“</Text>}
            </TouchableOpacity>
            <View style={styles.qtyContainer}>
              <TouchableOpacity onPress={() => updateQty(item.id, -1)} style={styles.qtyBtn}><Text style={styles.qtyBtnText}>-</Text></TouchableOpacity>
              <Text style={styles.qtyText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => updateQty(item.id, 1)} style={styles.qtyBtn}><Text style={styles.qtyBtnText}>+</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.backArrow}>â†</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Select Products</Text>
        <View style={styles.cartIconContainer}>
           <Text style={{fontSize: 20}}>ðŸ›’</Text>
           <View style={styles.badge}><Text style={styles.badgeText}>{selectedItems.length}</Text></View>
        </View>
      </View>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 15, paddingBottom: 100 }}
      />
      <TouchableOpacity 
        style={styles.reviewBtn} 
        onPress={() => navigation.navigate('ReviewListScreen', { items: selectedItems, store: 'Imtiaz' })}
      >
        <Text style={styles.reviewText}>Review List ({selectedItems.length})</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f8f9' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, backgroundColor: '#fff' },
  backArrow: { fontSize: 24, color: '#444' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#444' },
  cartIconContainer: { padding: 5 },
  badge: { position: 'absolute', right: 0, top: 0, backgroundColor: 'red', borderRadius: 10, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 10, marginBottom: 15, elevation: 3 },
  productImage: { width: 70, height: 70, marginRight: 10 },
  detailsContainer: { flex: 1 },
  productName: { fontSize: 14, fontWeight: '600', color: '#333' },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  productPrice: { fontSize: 14, color: '#00bfa5', fontWeight: 'bold' },
  unitText: { fontSize: 12, color: '#00bfa5' },
  controls: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: 22, height: 22, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, marginRight: 15, justifyContent: 'center', alignItems: 'center' },
  checkedBg: { backgroundColor: '#00bfa5', borderColor: '#00bfa5' },
  checkMark: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  qtyContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#eee', borderRadius: 20, paddingHorizontal: 5 },
  qtyBtn: { padding: 5, paddingHorizontal: 10 },
  qtyBtnText: { fontSize: 18, color: '#666' },
  qtyText: { fontSize: 14, fontWeight: 'bold', marginHorizontal: 5 },
  reviewBtn: { position: 'absolute', bottom: 20, left: 20, right: 20, backgroundColor: '#00bfa5', padding: 15, borderRadius: 10, alignItems: 'center' },
  reviewText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default ListProductScreen;
