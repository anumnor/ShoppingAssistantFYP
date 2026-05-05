import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  TextInput, 
  SafeAreaView, 
  Alert // 1. Alert import kiya
} from 'react-native';
import ApiService from '../Service/apiService';

const ReviewListScreen = ({ route, navigation }) => {
  // Get data from params
  const { items, store } = route.params || { items: [], store: 'Store' };
  const [reviewItems, setReviewItems] = useState(items);

  const removeItem = async (id) => {
    const item = reviewItems.find(product => product.id === id);

    try {
      if (item?.cartId) {
        await ApiService.removeCartItem(item.cartId);
      }
      setReviewItems(prev => prev.filter(product => product.id !== id));
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to remove item.");
    }
  };

  // âœ… 2. Success message function
  const handleCreateList = async () => {
    if (reviewItems.length === 0) {
      Alert.alert("Empty List", "Please add some items first.");
      return;
    }

    try {
      await ApiService.placeOrder();

      Alert.alert(
        "Success", 
        "List created successfully!", 
        [
          { 
            text: "OK", 
            onPress: () => navigation.navigate('ListProductScreen') // OK dabane par wapis bhej dega
          }
        ]
      );
    } catch (error) {
      Alert.alert("Order Failed", error.message || "Could not place order.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
      <View style={styles.details}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productMeta}>Qty: {item.quantity}  â€¢  {item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.deleteBtn}>
        <Text style={{color: 'red', fontSize: 20}}>ðŸ—‘ï¸</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>â†</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review List</Text>
        <View style={{ width: 25 }} /> 
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Name your list</Text>
        <TextInput 
          style={styles.input} 
          placeholder="My Shopping List" 
          placeholderTextColor="#94a3b8" 
        />
        <Text style={styles.storeText}>Store: {store}</Text>

        <FlatList
          data={reviewItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
               <Text style={styles.emptyText}>No items added to the list yet.</Text>
            </View>
          }
        />
      </View>

      {/* âœ… 3. Button par onPress function lagaya */}
      <TouchableOpacity 
        style={styles.createBtn} 
        onPress={handleCreateList}
        activeOpacity={0.7}
      >
        <Text style={styles.createBtnText}>Create List</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f8f9' },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, backgroundColor: '#fff', elevation: 2 },
  backArrow: { fontSize: 28, color: '#4f6d7a' },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#4f6d7a' },
  content: { padding: 20, flex: 1 },
  label: { fontSize: 14, color: '#94a3b8', marginBottom: 8 },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 15, fontSize: 16, color: '#333', elevation: 2, marginBottom: 20 },
  storeText: { fontSize: 18, fontWeight: '600', color: '#4f6d7a', marginBottom: 15 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 12, elevation: 2 },
  productImage: { width: 45, height: 45, marginRight: 12 },
  details: { flex: 1 },
  productName: { fontSize: 15, fontWeight: '500', color: '#333' },
  productMeta: { fontSize: 13, color: '#64748b', marginTop: 4 },
  deleteBtn: { padding: 5 },
  emptyContainer: { marginTop: 100, alignItems: 'center' },
  emptyText: { color: '#94a3b8', fontSize: 16 },
  createBtn: { position: 'absolute', bottom: 30, left: 20, right: 20, backgroundColor: '#00c3b8', padding: 16, borderRadius: 12, alignItems: 'center', elevation: 5 },
  createBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default ReviewListScreen;
