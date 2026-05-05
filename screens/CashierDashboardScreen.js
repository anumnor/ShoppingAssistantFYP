import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Modal,
  ScrollView
} from 'react-native';

const CashierDashboardScreen = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Tab 1 Data
  const activeTrolleys = [
    { id: '1', name: 'Safa Marwa', trolley: '4', time: '10:42 AM', duration: '18 min', items: '9', total: '3,580', scanned: '9/12', initials: 'AK' },
    { id: '2', name: 'habiba khan', trolley: '7', time: '10:57 AM', duration: '11 min', items: '6', total: '2,100', scanned: '6/6', initials: 'BA' },
  ];

  // Tab 2 Data
  const checkoutRequests = [
    { id: '3', name: 'alishba bibi', trolley: '3', time: '11:14 AM', duration: '2 min ago', items: '12', total: '4,675', matched: '12/12', initials: 'SI' },
    { id: '4', name: 'samia noor', trolley: '9', time: '11:17 AM', duration: '1 min ago', items: '7', total: '2,850', matched: '7/7', initials: 'HF' },
  ];

  const trolleyItems = {
    '3': [
      { id: '1', name: 'Coca Cola Can 250ml', price: 200, qty: 4, total: 800 },
      { id: '2', name: 'Colgate Maximum Cavity Protection', price: 120, qty: 2, total: 240 },
      { id: '3', name: 'Fanta 500ml', price: 100, qty: 2, total: 200 },
    ]
  };

  const renderActiveCard = ({ item }) => (
    <View style={styles.mainCard}>
      <View style={styles.cardHeader}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{item.initials}</Text></View>
        <View style={styles.headerInfo}>
          <Text style={styles.customerName}>{item.name}</Text>
          <Text style={styles.subText}>Trolley #{item.trolley}  |  Started {item.time}</Text>
        </View>
        <View style={styles.statusBadge}><Text style={styles.statusText}>Shopping</Text></View>
      </View>
      
      <View style={styles.statsRow}>
        <View style={styles.statPill}><Text style={styles.pillText}>🕒 {item.duration}</Text></View>
        <View style={styles.statPill}><Text style={styles.pillText}>📋 {item.items} items</Text></View>
      </View>

      <View style={styles.priceContainer}>
        <View>
          <Text style={styles.groceryTitle}>Weekend Grocery Run</Text>
          <Text style={styles.scannedText}>{item.scanned} items scanned</Text>
        </View>
        <Text style={styles.priceText}>Rs {item.total}</Text>
      </View>
    </View>
  );

  const renderCheckoutCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.mainCard} 
      onPress={() => { setSelectedCustomer(item); setModalVisible(true); }}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.avatar, {backgroundColor: '#E8F5E9'}]}>
          <Text style={[styles.avatarText, {color: '#4CAF50'}]}>{item.initials}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.customerName}>{item.name}</Text>
          <Text style={styles.subText}>Trolley #{item.trolley}  |  {item.time}</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statPill}><Text style={styles.pillText}>🗑️ {item.items} items</Text></View>
        <View style={styles.statPill}><Text style={styles.pillText}>🕒 {item.duration}</Text></View>
      </View>

      <View style={[styles.priceContainer, {backgroundColor: '#F1F8F1'}]}>
        <View>
          <Text style={[styles.groceryTitle, {color: '#4CAF50'}]}>Verification status</Text>
          <Text style={styles.scannedText}>{item.matched} items matched</Text>
        </View>
        <Text style={[styles.priceText, {color: '#2E7D32'}]}>Rs {item.total}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.topHeader}>
        <Text style={styles.topTitle}>Cashier Dashboard</Text>
        <View style={styles.headerIcons}>
          <Text style={styles.iconBlue}>↻</Text>
          <Text style={styles.iconRed}>↪</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('Active')} style={[styles.tab, activeTab === 'Active' && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === 'Active' && styles.activeTabText]}>Active Trolleys</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Checkout')} style={[styles.tab, activeTab === 'Checkout' && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === 'Checkout' && styles.activeTabText]}>Checkout Requests</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        {/* Floor Overview Card */}
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Store Floor Overview</Text>
          <Text style={styles.overviewSub}>Monitor active trolleys, review checkout requests, and release completed orders.</Text>
          <View style={styles.overviewStats}>
            <View style={styles.statBox}>
              <Text style={styles.statIcon}>🛒</Text>
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statIcon}>📋</Text>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Checkout</Text>
            </View>
          </View>
        </View>

        <FlatList
          data={activeTab === 'Active' ? activeTrolleys : checkoutRequests}
          keyExtractor={(item) => item.id}
          renderItem={activeTab === 'Active' ? renderActiveCard : renderCheckoutCard}
          scrollEnabled={false}
        />
      </ScrollView>

      {/* Modern Checkout Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderRow}>
                 <View style={styles.modalIcon}><Text>🧾</Text></View>
                 <View>
                    <Text style={styles.modalTitle}>Checkout Request</Text>
                    <Text style={styles.modalSub}>{selectedCustomer?.name} - Trolley #{selectedCustomer?.trolley}</Text>
                 </View>
                 <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                    <Text style={{fontSize: 20}}>✕</Text>
                 </TouchableOpacity>
              </View>
              <View style={styles.modalPills}>
                <View style={styles.statPill}><Text>🗑️ {selectedCustomer?.items} items</Text></View>
                <View style={styles.statPill}><Text>💵 Rs {selectedCustomer?.total}</Text></View>
                <View style={styles.statPill}><Text>🕒 {selectedCustomer?.time}</Text></View>
              </View>
              <View style={styles.verifyBanner}>
                <Text style={styles.verifyText}>✅ Model verification complete: {selectedCustomer?.matched} items matched</Text>
              </View>
            </View>

            <FlatList
              data={trolleyItems[selectedCustomer?.trolley] || []}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <View style={styles.itemRow}>
                  <View style={styles.itemIcon}><Text>🛍️</Text></View>
                  <View style={{flex: 1}}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>Rs {item.price} each</Text>
                  </View>
                  <View style={{alignItems: 'flex-end'}}>
                    <Text style={styles.itemQty}>Qty {item.qty}</Text>
                    <Text style={styles.itemTotal}>Rs {item.total}</Text>
                  </View>
                </View>
              )}
            />

            <View style={styles.modalFooter}>
               <View style={styles.footerRow}>
                  <Text style={styles.totalLabel}>Order total</Text>
                  <Text style={styles.totalAmount}>Rs {selectedCustomer?.total}</Text>
               </View>
               <TouchableOpacity style={styles.confirmButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.confirmButtonText}>Confirm Order</Text>
               </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#fff', alignItems: 'center' },
  topTitle: { fontSize: 20, fontWeight: '500', color: '#334155', flex: 1, textAlign: 'center', marginLeft: 40 },
  headerIcons: { flexDirection: 'row' },
  iconBlue: { fontSize: 22, color: '#00ACC1', marginRight: 15 },
  iconRed: { fontSize: 22, color: '#E57373' },
  
  tabContainer: { flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  tab: { flex: 1, paddingVertical: 15, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#00ACC1' },
  tabText: { color: '#94A3B8', fontWeight: '500' },
  activeTabText: { color: '#00ACC1' },

  overviewCard: { margin: 15, backgroundColor: '#009688', borderRadius: 25, padding: 20, elevation: 5 },
  overviewTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  overviewSub: { color: 'rgba(255,255,255,0.8)', marginTop: 8, fontSize: 13, lineHeight: 18 },
  overviewStats: { flexDirection: 'row', marginTop: 20, gap: 15 },
  statBox: { flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 15, padding: 15 },
  statIcon: { color: '#fff', marginBottom: 5 },
  statNumber: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },

  mainCard: { backgroundColor: '#fff', marginHorizontal: 15, marginBottom: 15, borderRadius: 20, padding: 15, elevation: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 45, height: 45, borderRadius: 23, backgroundColor: '#E0F7FA', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#00838F', fontWeight: 'bold' },
  headerInfo: { flex: 1, marginLeft: 12 },
  customerName: { fontSize: 16, fontWeight: 'bold', color: '#334155' },
  subText: { fontSize: 12, color: '#94A3B8' },
  statusBadge: { backgroundColor: '#FFF3E0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  statusText: { color: '#F57C00', fontSize: 12, fontWeight: 'bold' },
  
  statsRow: { flexDirection: 'row', marginVertical: 15, gap: 10 },
  statPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 15, borderWidth: 1, borderColor: '#F1F5F9' },
  pillText: { fontSize: 12, color: '#64748B' },

  priceContainer: { backgroundColor: '#F1F5F9', borderRadius: 15, padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  groceryTitle: { fontSize: 14, fontWeight: '600', color: '#475569' },
  scannedText: { fontSize: 12, color: '#94A3B8' },
  priceText: { fontSize: 18, fontWeight: 'bold', color: '#009688' },
  chevron: { fontSize: 24, color: '#CBD5E1' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, height: '90%', padding: 20 },
  modalHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 15 },
  modalIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#E8F5E9', justifyContent: 'center', alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#334155' },
  modalSub: { fontSize: 13, color: '#94A3B8' },
  closeBtn: { marginLeft: 'auto', padding: 5 },
  modalPills: { flexDirection: 'row', gap: 10, marginBottom: 15 },
  verifyBanner: { backgroundColor: '#E8F5E9', padding: 12, borderRadius: 12, marginBottom: 20 },
  verifyText: { color: '#2E7D32', fontSize: 13, fontWeight: '500' },

  itemRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  itemIcon: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#F1F5F9' },
  itemName: { fontSize: 14, fontWeight: '600', color: '#334155' },
  itemPrice: { fontSize: 12, color: '#94A3B8' },
  itemQty: { fontSize: 14, fontWeight: 'bold', color: '#334155' },
  itemTotal: { fontSize: 14, fontWeight: 'bold', color: '#009688' },

  modalFooter: { borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 15 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  totalLabel: { fontSize: 16, color: '#64748B' },
  totalAmount: { fontSize: 20, fontWeight: 'bold', color: '#009688' },
  confirmButton: { backgroundColor: '#00BFA5', paddingVertical: 15, borderRadius: 15, alignItems: 'center' },
  confirmButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default CashierDashboardScreen;
