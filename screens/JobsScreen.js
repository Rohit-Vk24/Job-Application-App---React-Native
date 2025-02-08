// screens/JobsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBookmarks } from '../context/BookmarkContext';

const JobsScreen = ({ navigation }) => {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const response = await fetch(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      const data = await response.json();
      console.log("API Response:", data); // Log the full response
  
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

  return (
    <View style={{ flex: 1, backgroundColor: '#e9ecef' }}>
      {loading ? <ActivityIndicator size="large" /> : (
        error ? (
          <Text style={{ color: 'red', textAlign: 'center', margin: 20 }}>{error}</Text>
        ) : (
          <FlatList
            data={jobs}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            onEndReached={() => {
              if (jobs.length > 0) {
                setJobs(prevJobs => [...prevJobs, ...prevJobs]); // Append the entire list to itself
              }
            }}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('JobDetails', { job: item })}>
                <View style={{
                  padding: 15,
                  marginVertical: 8,
                  marginHorizontal: 16,
                  borderRadius: 10,
                  backgroundColor: '#ffffff',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                  elevation: 5,
                }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#007BFF', marginBottom: 10 }}>{item.title}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                    <Text style={{ fontSize: 14, color: '#555' }}>Location:</Text>
                    <Text style={{ fontSize: 14, color: '#333' }}>{item.primary_details ? item.primary_details.Place : 'N/A'}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                    <Text style={{ fontSize: 14, color: '#555' }}>Salary:</Text>
                    <Text style={{ fontSize: 14, color: '#333' }}>{item.primary_details ? item.primary_details.Salary : 'N/A'}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 14, color: '#555' }}>Phone:</Text>
                    <Text style={{ fontSize: 14, color: '#333' }}>{item.whatsapp_no || 'N/A'}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )
      )}
    </View>
  );
};

export default JobsScreen;
