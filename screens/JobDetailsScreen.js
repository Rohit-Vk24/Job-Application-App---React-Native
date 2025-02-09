import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { useBookmarks } from '../context/BookmarkContext';
import Icon from 'react-native-vector-icons/Ionicons';

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
    <ScrollView style={{ flex: 1, backgroundColor: '#f4f4f8', padding: 20 }}>
      {hasValidDetails ? (
        <View style={styles.card}>
          <Text style={styles.title}>{job.title}</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Title:</Text>
            <Text style={styles.detailValue}>{job.title}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Vacancy:</Text>
            <Text style={styles.detailValue}>{job.job_tags ? job.job_tags[0].value : 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Salary:</Text>
            <Text style={styles.detailValue}>{job.primary_details ? job.primary_details.Salary : 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Experience:</Text>
            <Text style={styles.detailValue}>{job.primary_details ? job.primary_details.Experience : 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Address:</Text>
            <Text style={styles.detailValue}>{job.primary_details ? job.primary_details.Place : 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Job Type:</Text>
            <Text style={styles.detailValue}>{job.primary_details ? job.primary_details.Job_Type : 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Qualification:</Text>
            <Text style={styles.detailValue}>{job.primary_details ? job.primary_details.Qualification : 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Contact:</Text>
            <Text style={styles.detailValue}>{job.whatsapp_no || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Views:</Text>
            <Text style={styles.detailValue}>{job.views}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Shares:</Text>
            <Text style={styles.detailValue}>{job.shares}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>WhatsApp:</Text>
            <Text style={styles.detailValue}>{job.whatsapp_no}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Other Details:</Text>
            <Text style={styles.detailValue}>{job.other_details || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Job Category:</Text>
            <Text style={styles.detailValue}>{job.job_category || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Openings:</Text>
            <Text style={styles.detailValue}>{job.openings_count || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Job Role:</Text>
            <Text style={styles.detailValue}>{job.job_role || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Job Hours:</Text>
            <Text style={styles.detailValue}>{job.job_hours || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Premium Till:</Text>
            <Text style={styles.detailValue}>{job.premium_till || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Created On:</Text>
            <Text style={styles.detailValue}>{job.created_on || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Expire On:</Text>
            <Text style={styles.detailValue}>{job.expire_on || 'N/A'}</Text>
          </View>
          <TouchableOpacity style={styles.callButton} onPress={handleCallPress}>
            <Text style={styles.callButtonText}>Call Now</Text>
            <Icon name="call" size={20} color="white" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
          <View style={{ marginVertical: 10 }} />
          <Button title={isBookmarked ? 'Remove Bookmark' : 'Bookmark'} onPress={toggleBookmark} />
        </View>
      ) : (
        <Text style={styles.noDetailsText}>No job details available.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    width: '40%',
  },
  detailValue: {
    fontSize: 16,
    color: '#777',
    width: '60%',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  callButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  noDetailsText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default JobDetailsScreen;
