import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import ApiService from '../Service/apiService';

const CreateStoreScreen = ({ navigation }) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const loadStores = async () => {
      try {
        const result = await ApiService.getStores();
        setStores(result.data || []);
      } catch (error) {
        console.log('Failed to load stores', error.message);
      }
    };

    loadStores();
  }, []);

  const renderStore = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      // âœ… Store ka naam pass kar rahe hain
      onPress={() => navigation.navigate('ListProductScreen', { 
        storeName: item.name 
      })} 
    >
      <View style={styles.cardLeft}>
        <View style={styles.logoContainer}>
          <Image source={{ uri: item.logo }} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.storeName}>{item.name}</Text>
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
      </View>
      <View style={styles.arrowIcon} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.backArrow}>â†</Text></TouchableOpacity>
        <Text style={styles.headerTitle}>Select Store</Text>
      </View>
      <Text style={styles.subTitle}>Where are you shopping today?</Text>
      <FlatList data={stores} renderItem={renderStore} keyExtractor={item => item.id} contentContainerStyle={styles.listPadding} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 },
  backArrow: { fontSize: 26, color: '#4f6d7a' },
  headerTitle: { fontSize: 22, fontWeight: '600', color: '#4f6d7a', marginLeft: 10 },
  subTitle: { fontSize: 16, color: '#94a3b8', paddingHorizontal: 20, marginTop: 20, marginBottom: 10 },
  listPadding: { paddingHorizontal: 20 },
  card: { backgroundColor: '#ffffff', borderRadius: 15, padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, elevation: 2 },
  cardLeft: { flexDirection: 'row', alignItems: 'center' },
  logoContainer: { width: 60, height: 40, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  logo: { width: '100%', height: '100%' },
  storeName: { fontSize: 18, fontWeight: '600', color: '#334155' },
  locationText: { fontSize: 14, color: '#94a3b8' },
  arrowIcon: { width: 8, height: 8, borderTopWidth: 2, borderRightWidth: 2, borderColor: '#94a3b8', transform: [{ rotate: '45deg' }] },
});

export default CreateStoreScreen;
