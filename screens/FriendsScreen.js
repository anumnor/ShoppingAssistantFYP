import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, StatusBar } from 'react-native';

const FriendsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Find'); // Default 'Find' rakha hai jesa aapne manga

  // Dummy Data - Inko aap bad mein backend se connect kar sakte hain
  const friends = [{ id: '1', name: 'Laiba zahra', phone: '03169493425' }];
  const requests = [{ id: '1', name: 'haika naveed' }];

  const renderContent = () => {
    if (activeTab === 'My Friends') {
      return (
        <View style={styles.tabContent}>
          {friends.map(item => (
            <View key={item.id} style={styles.card}>
              <View style={styles.avatarCircle}><Text style={styles.avatarText}>O</Text></View>
              <View style={styles.info}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.subText}>{item.phone}</Text>
              </View>
            </View>
          ))}
        </View>
      );
    } else if (activeTab === 'Requests') {
      return (
        <View style={styles.tabContent}>
          {requests.map(item => (
            <View key={item.id} style={styles.card}>
              <View style={[styles.avatarCircle, {backgroundColor: '#FFF7ED'}]}>
                <Text style={{fontSize: 18}}>ðŸ‘¤</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.subText}>Sent you a friend request</Text>
              </View>
              <View style={styles.actionButtonsRow}>
                <TouchableOpacity style={styles.checkBtn}><Text style={{color: 'white'}}>âœ“</Text></TouchableOpacity>
                <TouchableOpacity style={styles.crossBtn}><Text style={{color: 'white'}}>âœ•</Text></TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      );
    } else {
      // "Find" Tab Content - Exactly according to image_19fe3b.png
      return (
        <ScrollView style={styles.tabContent}>
          <View style={styles.findHeader}>
             <View style={styles.largeIcon}><Text style={{fontSize: 40}}>ðŸ‘¥</Text></View>
             <Text style={styles.findTitle}>Shopping is Better Together</Text>
             <Text style={styles.findSub}>Add friends to share lists and manage groceries effortlessly.</Text>
          </View>

          <Text style={styles.sectionHeader}>Registered on App</Text>
          <View style={styles.card}>
             <View style={styles.avatarCircle}><Text style={styles.avatarText}>O</Text></View>
             <View style={styles.info}>
                <Text style={styles.nameText}>Samia noor</Text>
                <Text style={styles.subText}>03169493425</Text>
             </View>
             <TouchableOpacity style={styles.addBtn}><Text style={styles.addBtnText}>Add</Text></TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionHeader}>Invite to App</Text>
          
          {/* Invite Item 1 */}
          <View style={styles.card}>
            <View style={styles.avatarCircle}><Text style={styles.avatarText}>*</Text></View>
            <View style={styles.info}>
              <Text style={styles.nameText}>*742#</Text>
              <Text style={styles.subText}>*742#</Text>
            </View>
            <View style={styles.inviteIcons}>
              <TouchableOpacity style={styles.iconButton}><Text style={{fontSize: 20}}>ðŸ’¬</Text></TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}><Text style={{fontSize: 20}}>ðŸŸ¢</Text></TouchableOpacity>
            </View>
          </View>

          {/* Invite Item 2 */}
          <View style={styles.card}>
            <View style={styles.avatarCircle}><Text style={styles.avatarText}>A</Text></View>
            <View style={styles.info}>
              <Text style={styles.nameText}>Amna noor</Text>
              <Text style={styles.subText}>Biit{"\n"}+92 331 7294446</Text>
            </View>
            <View style={styles.inviteIcons}>
              <TouchableOpacity style={styles.iconButton}><Text style={{fontSize: 20}}>ðŸ’¬</Text></TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}><Text style={{fontSize: 20}}>ðŸŸ¢</Text></TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>â†</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Friends</Text>
        <View style={{width: 40}} /> 
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        {['My Friends', 'Requests', 'Find'].map(tab => (
          <TouchableOpacity 
            key={tab} 
            onPress={() => setActiveTab(tab)}
            style={[styles.tabItem, activeTab === tab && styles.activeTabBorder]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    paddingVertical: 15 
  },
  backButton: { padding: 5 },
  backArrow: { fontSize: 28, color: '#2D3748' },
  headerTitle: { fontSize: 22, fontWeight: '600', color: '#2D3748' },
  
  tabBar: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  tabItem: { flex: 1, paddingVertical: 15, alignItems: 'center' },
  activeTabBorder: { borderBottomWidth: 3, borderBottomColor: '#147A44' },
  tabText: { color: '#718096', fontWeight: '500', fontSize: 16 },
  activeTabText: { color: '#147A44', fontWeight: 'bold' },
  
  tabContent: { flex: 1, padding: 20 },
  card: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 15, 
    padding: 15, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12, 
    borderWidth: 1,
    borderColor: '#F1F5F9',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  avatarCircle: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: '#E2F2F0', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  avatarText: { color: '#147A44', fontWeight: 'bold', fontSize: 18 },
  info: { flex: 1, marginLeft: 15 },
  nameText: { fontSize: 16, fontWeight: '600', color: '#2D3748' },
  subText: { color: '#718096', fontSize: 13, marginTop: 2 },
  
  actionButtonsRow: { flexDirection: 'row' },
  checkBtn: { backgroundColor: '#4CAF50', padding: 8, borderRadius: 20, marginRight: 10 },
  crossBtn: { backgroundColor: '#F44336', padding: 8, borderRadius: 20 },
  
  addBtn: { backgroundColor: '#2D9CDB', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
  addBtnText: { color: 'white', fontWeight: 'bold' },
  
  divider: { height: 1, backgroundColor: '#000', opacity: 0.1, marginVertical: 25 },
  
  findHeader: { alignItems: 'center', marginBottom: 30 },
  largeIcon: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    backgroundColor: '#F0F9F9', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  findTitle: { fontSize: 22, fontWeight: 'bold', color: '#2D3748', textAlign: 'center' },
  findSub: { textAlign: 'center', color: '#718096', marginTop: 10, lineHeight: 20 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: '#2D3748', marginBottom: 15 },
  
  inviteIcons: { flexDirection: 'row' },
  iconButton: { marginLeft: 15, padding: 5 }
});

export default FriendsScreen;
