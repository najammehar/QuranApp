import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Surah } from '../types';
import { ExpandableAyahs } from './ExpandableAyahs';

interface SurahItemProps {
  surah: Surah;
}

export const SurahItem: React.FC<SurahItemProps> = ({ surah }) => {
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const maxHeight = surah.ayahs ? surah.ayahs.length * 80 : 0;

  const toggleExpand = () => {
    if (expanded) {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setExpanded(false));
    } else {
      setExpanded(true);
      Animated.timing(animatedHeight, {
        toValue: maxHeight,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand} activeOpacity={0.7}>
        <View style={styles.header}>
          <View style={styles.numberContainer}>
            <Text style={styles.number}>{surah.number}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.englishName}>{surah.englishName}</Text>
            <Text style={styles.details}>
              {surah.revelationType.toUpperCase()} • {surah.numberOfAyahs} VERSES
            </Text>
          </View>
          <Text style={styles.arabicName}>{surah.name}</Text>
        </View>
      </TouchableOpacity>
      {surah.ayahs && (
        <ExpandableAyahs
          ayahs={surah.ayahs}
          animatedHeight={animatedHeight}
          expanded={expanded}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  numberContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0e6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  number: {
    fontSize: 16,
    color: '#6b3fa0',
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
  },
  englishName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  details: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  arabicName: {
    fontSize: 18,
    color: '#6b3fa0',
    marginLeft: 8,
  },
});