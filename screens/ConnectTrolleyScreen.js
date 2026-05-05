import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const ConnectTrolleyScreen = ({ navigation }) => {
  const [trolleyId, setTrolleyId] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* HEADER */}
      <View style={styles.header}>
       <TouchableOpacity onPress={() => navigation.goBack()}>
  <Ionicons name="arrow-back" size={26} color="#455A64" />
</TouchableOpacity>
        <Text style={styles.headerTitle}>Connect Trolley</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="lightning-bolt" size={26} color="#B0BEC5" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* SCANNER VIEW */}
      <View style={styles.scannerWrapper}>
  <Image 
    // Yahan apne folder ka sahi path dein
    // Maslan agar file assets folder mein 'scanner.jpg' ke naam se hai:
    source={require('../assets/QRcode.png')} 
    style={styles.cameraFeed}
    resizeMode="cover"
  />
</View>

        <Text style={styles.infoText}>
          Scan the QR code on the trolley to connect and start your shopping session.
        </Text>
        

        {/* ACTION ROW */}
        <View style={styles.actionRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter Trolley ID"
            placeholderTextColor="#90A4AE"
            value={trolleyId}
            onChangeText={setTrolleyId}
          />
         <TouchableOpacity 
  style={styles.connectBtn} 
  onPress={() => navigation.navigate('TrolleyDashboardScreen')} // Dashboard aapki agli screen ka naam hona chahiye
>
    <Text style={styles.connectBtnText}>Connect</Text>
</TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFB' },
  header: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    elevation: 2,
  },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#455A64' },
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 25, paddingTop: 40 },
  scannerWrapper: {
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#1CB5A3',
    overflow: 'hidden',
    marginBottom: 40,
  },
  cameraFeed: { width: '100%', height: '100%' },
  infoText: { fontSize: 16, color: '#455A64', textAlign: 'center', marginBottom: 50 },
  actionRow: { flexDirection: 'row', width: '100%' },
  input: {
    flex: 1,
    height: 55,
    backgroundColor: '#F1F5F7',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginRight: 10,
    color: '#455A64',
  },
  connectBtn: {
    backgroundColor: '#1CB5A3',
    paddingHorizontal: 25,
    borderRadius: 15,
    justifyContent: 'center',
  },
  connectBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});

export default ConnectTrolleyScreen;
