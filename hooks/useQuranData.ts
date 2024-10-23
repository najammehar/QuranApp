import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Surah } from '../types';

const STORAGE_KEY = '@quran_data';
const API_URL = 'https://api.alquran.cloud/v1/quran/en.asad';

export const useQuranData = () => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAndStoreQuranData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const fetchedSurahs = data.data.surahs;
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(fetchedSurahs));
      setSurahs(fetchedSurahs);
    } catch (err) {
      setError('Failed to fetch Quran data');
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setSurahs(JSON.parse(storedData));
      }
    } finally {
      setLoading(false);
    }
  };

  const loadStoredData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setSurahs(JSON.parse(storedData));
      }
      fetchAndStoreQuranData();
    } catch (err) {
      setError('Failed to load stored data');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStoredData();
  }, []);

  return { surahs, loading, error };
};