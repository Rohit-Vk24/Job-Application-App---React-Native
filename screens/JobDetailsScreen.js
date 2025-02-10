import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, Alert, StyleSheet, Image } from 'react-native';
import { useBookmarks } from '../context/BookmarkContext';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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

  const handleCallPress = () => {
    if (job && job.whatsapp_no) {
      Alert.alert('Call', `Would you like to call ${job.whatsapp_no}?`, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log(`Calling ${job.whatsapp_no}`) },
      ]);
    } else {
      Alert.alert('Error', 'No contact number available.');
    }
  };

  const hasValidDetails = job && (job.title || job.primary_details || job.whatsapp_no || job.views || job.shares);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.logo} />
          <Text style={styles.title}>{job.title}</Text>
          <Text style={styles.companyName}>{job.company_name}</Text>
        </View>
        <View style={styles.detailsSection}>
          <View style={styles.detailRow}>
            <MaterialIcons name="location-on" size={20} color="#007BFF" />
            <Text style={styles.detailValue}>{job.primary_details ? job.primary_details.Place : 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="attach-money" size={20} color="#007BFF" />
            <Text style={styles.detailValue}>{job.primary_details ? job.primary_details.Salary : 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="phone" size={20} color="#007BFF" />
            <Text style={styles.detailValue}>{job.whatsapp_no || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="work" size={20} color="#007BFF" />
            <Text style={styles.detailValue}>{job.primary_details ? job.primary_details.Job_Type : 'N/A'}</Text>
          </View>
        </View>
      </View>
      <Button title={isBookmarked ? 'Remove Bookmark' : 'Bookmark'} onPress={toggleBookmark} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
  },
  card: {
    margin: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  companyName: {
    fontSize: 18,
    color: '#777',
  },
  detailsSection: {
    padding: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailValue: {
    fontSize: 16,
    color: '#555',
    marginLeft: 8,
  },
  noDetailsText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default JobDetailsScreen;
