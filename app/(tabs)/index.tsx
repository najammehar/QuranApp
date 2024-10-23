import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useQuranData } from '../../hooks/useQuranData';
import { SurahItem } from '../../components/SurahItem';
import { Surah } from '../../types';

const App = () => {
  const { surahs, loading, error } = useQuranData();

  const renderItem = ({ item }: { item: Surah }) => <SurahItem surah={item} />;

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6b3fa0" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <Text style={styles.greeting}>Asslamualaikum</Text>
        <Text style={styles.userName}>Najam Ul Hassan</Text>
      </View>
      <View style={styles.lastReadCard}>
        <Text style={styles.lastReadLabel}>Last Read</Text>
        <Text style={styles.surahName}>Al-Fatiah</Text>
        <Text style={styles.ayahLabel}>Ayah No. 1</Text>
      </View>
      <FlatList
        data={surahs}
        renderItem={renderItem}
        keyExtractor={(item) => item.number.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  lastReadCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#6b3fa0',
    borderRadius: 12,
  },
  lastReadLabel: {
    color: '#fff',
    opacity: 0.8,
  },
  surahName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 4,
  },
  ayahLabel: {
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default App;