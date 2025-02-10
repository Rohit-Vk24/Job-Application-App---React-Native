// screens/JobsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Button, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBookmarks } from '../context/BookmarkContext';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const JobsScreen = ({ navigation }) => {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      console.log("Fetching jobs...");
      const response = await fetch(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("API Response:", data);

      if (Array.isArray(data.results)) { // Ensure it's an array
        setJobs(prevJobs => [...prevJobs, ...data.results]);
      } else {
        console.error("Unexpected API response format:", data);
        setError("Unexpected response format.");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to fetch jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async (job) => {
    try {
      const storedJobs = await AsyncStorage.getItem('bookmarkedJobs');
      const currentBookmarks = storedJobs ? JSON.parse(storedJobs) : [];
      let updatedBookmarks;

      if (currentBookmarks.some(bookmarkedJob => bookmarkedJob.id === job.id)) {
        updatedBookmarks = currentBookmarks.filter(bookmarkedJob => bookmarkedJob.id !== job.id);
      } else {
        updatedBookmarks = [...currentBookmarks, job];
      }

      await AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));
      setBookmarkedJobs(updatedBookmarks);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  useEffect(() => {
    const loadBookmarkedJobs = async () => {
      try {
        const storedJobs = await AsyncStorage.getItem('bookmarkedJobs');
        if (storedJobs) {
          setBookmarkedJobs(JSON.parse(storedJobs));
        }
      } catch (error) {
        console.error('Error loading bookmarked jobs:', error);
      }
    };
    loadBookmarkedJobs();
  }, []);

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching new data
    setError(null); // Clear previous errors
    fetchJobs();
  }, [page]);

  const isBookmarked = (job) => bookmarks.some(bookmarkedJob => bookmarkedJob.id === job.id);

  const hasValidDetails = (job) => job && (job.title || job.primary_details || job.whatsapp_no || job.views || job.shares);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={jobs.filter(hasValidDetails)}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onEndReached={() => {
            if (jobs.length > 0) {
              setJobs(prevJobs => [...prevJobs, ...prevJobs]);
            }
          }}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('JobDetails', { job: item })}>
              <View style={styles.card}>
                <Image source={{ uri: 'https://via.placeholder.com/300x150' }} style={styles.image} />
                <View style={styles.cardContent}>
                  <Text style={styles.jobTitle}>{item.title}</Text>
                  <View style={styles.detailRow}>
                    <MaterialIcons name="location-on" size={20} color="#007BFF" />
                    <Text style={styles.detailValue}>{item.primary_details ? item.primary_details.Place : 'N/A'}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MaterialIcons name="attach-money" size={20} color="#007BFF" />
                    <Text style={styles.detailValue}>{item.primary_details ? item.primary_details.Salary : 'N/A'}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MaterialIcons name="phone" size={20} color="#007BFF" />
                    <Text style={styles.detailValue}>{item.whatsapp_no || 'N/A'}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
    padding: 10,
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 15,
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    color: '#555',
    marginLeft: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    margin: 20,
    fontSize: 16,
  },
});

export default JobsScreen;
