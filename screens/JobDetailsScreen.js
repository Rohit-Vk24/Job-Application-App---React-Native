import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { useBookmarks } from '../context/BookmarkContext';

const JobDetailsScreen = ({ route }) => {
  const { job } = route.params;
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setIsBookmarked(bookmarks.some(bookmarkedJob => bookmarkedJob.id === job.id));
  }, [bookmarks, job]);

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(job.id);
    } else {
      addBookmark(job);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f4f4f8', padding: 20 }}>
      <View style={{
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
      }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 15 }}>{job.title}</Text>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#555', marginBottom: 10 }}>Company: {job.company_name}</Text>
        <Text style={{ fontSize: 16, color: '#777', marginBottom: 5 }}>Location: {job.primary_details ? job.primary_details.Place : 'N/A'}</Text>
        <Text style={{ fontSize: 16, color: '#777', marginBottom: 5 }}>Salary: {job.primary_details ? job.primary_details.Salary : 'N/A'}</Text>
        <Text style={{ fontSize: 16, color: '#777', marginBottom: 5 }}>Experience: {job.primary_details ? job.primary_details.Experience : 'N/A'}</Text>
        <Text style={{ fontSize: 16, color: '#777', marginBottom: 5 }}>Job Type: {job.primary_details ? job.primary_details.Job_Type : 'N/A'}</Text>
        <Text style={{ fontSize: 16, color: '#777', marginBottom: 5 }}>Contact: {job.whatsapp_no || 'N/A'}</Text>
        <Text style={{ fontSize: 16, color: '#777', marginBottom: 5 }}>Other Details: {job.other_details || 'N/A'}</Text>
        <Button title={isBookmarked ? 'Remove Bookmark' : 'Bookmark'} onPress={toggleBookmark} />
      </View>
    </ScrollView>
  );
};

export default JobDetailsScreen;
