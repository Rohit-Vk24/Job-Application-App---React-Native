import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, Alert, StyleSheet, Image, Linking, TouchableOpacity, Animated } from 'react-native';
import { useBookmarks } from '../context/BookmarkContext';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Initialize animated values
const headerOpacity = new Animated.Value(0);
const buttonScale = new Animated.Value(1);
const keyDetailsOpacity = new Animated.Value(0);
const jobDescOpacity = new Animated.Value(0);
const additionalInfoOpacity = new Animated.Value(0);
const contactInfoOpacity = new Animated.Value(0);
const detailsScale = new Animated.Value(0.95);

const JobDetailsScreen = ({ route }) => {
  const { job } = route.params;
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setIsBookmarked(bookmarks.some(bookmarkedJob => bookmarkedJob.id === job.id));
  }, [bookmarks, job]);

  // Animate UI elements on mount with sequence
  useEffect(() => {
    Animated.sequence([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(detailsScale, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(keyDetailsOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(jobDescOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(additionalInfoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(contactInfoOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(job.id);
    } else {
      addBookmark(job);
    }
  };

  // Function to animate button press
  const animateButtonPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
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
        <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.headerGradient}
          >
            <Image source={{ uri: job.creatives && job.creatives[0] ? job.creatives[0].file : 'https://via.placeholder.com/300x150' }} style={styles.logo} />
            <View style={styles.headerTextContainer}>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{job.title}</Text>
              <Text style={styles.companyName}>{job.company_name}</Text>
            </View>
            <MaterialIcons
              name={isBookmarked ? 'bookmark' : 'bookmark-border'}
              size={35}
              color={isBookmarked ? '#ffd700' : 'white'}
              onPress={toggleBookmark}
              style={styles.bookmarkIcon}
            />
          </LinearGradient>
        </Animated.View>
        <Animated.View style={[styles.detailsSection, { transform: [{ scale: detailsScale }] }]}>
          {/* Key Details */}
          <View style={styles.boxContainer}>
            <LinearGradient
              colors={['#43cea2', '#185a9d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.boxTitleGradient}
            >
              <Text style={styles.boxTitle}>Key Details</Text>
            </LinearGradient>
            <View style={styles.boxContent}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Location:</Text>
                <Text style={styles.detailValue}>{job.primary_details ? job.primary_details.Place : 'N/A'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Salary:</Text>
                <Text style={styles.detailValue}>{job.primary_details ? job.primary_details.Salary : 'N/A'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Job Type:</Text>
                <Text style={styles.detailValue}>{job.primary_details ? job.primary_details.Job_Type : 'N/A'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Experience:</Text>
                <Text style={styles.detailValue}>{job.primary_details ? job.primary_details.Experience : 'N/A'}</Text>
              </View>
            </View>
          </View>

          {/* Job Description */}
          <View style={styles.boxContainer}>
            <LinearGradient
              colors={['#ff7e5f', '#feb47b']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.boxTitleGradient}
            >
              <Text style={styles.boxTitle}>Job Description</Text>
            </LinearGradient>
            <View style={styles.boxContent}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Job Role:</Text>
                <Text style={styles.detailValue}>{job.job_role || 'N/A'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Job Hours:</Text>
                <Text style={styles.detailValue}>{job.job_hours || 'N/A'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Other Details:</Text>
              </View>
              <Text style={styles.detailValue}>{job.other_details || 'N/A'}</Text>
            </View>
          </View>

          {/* Additional Info */}
          <View style={styles.boxContainer}>
            <LinearGradient
              colors={['#6a3093', '#a044ff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.boxTitleGradient}
            >
              <Text style={styles.boxTitle}>Additional Info</Text>
            </LinearGradient>
            <View style={styles.boxContent}>
              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <MaterialIcons name="visibility" size={22} color="#555" />
                  <Text style={styles.infoValue}>{job.views || 0}</Text>
                  <Text style={styles.infoLabel}>Views</Text>
                </View>
                <View style={styles.infoItem}>
                  <MaterialIcons name="share" size={22} color="#555" />
                  <Text style={styles.infoValue}>{job.shares || 0}</Text>
                  <Text style={styles.infoLabel}>Shares</Text>
                </View>
                <View style={styles.infoItem}>
                  <MaterialIcons name="work" size={22} color="#555" />
                  <Text style={styles.infoValue}>{job.openings_count || 0}</Text>
                  <Text style={styles.infoLabel}>Openings</Text>
                </View>
              </View>
              <View style={styles.separator} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Number of Applications:</Text>
                <Text style={styles.detailValue}>{job.num_applications || 'N/A'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Posted On:</Text>
                <Text style={styles.detailValue}>{job.created_on || 'N/A'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Expires On:</Text>
                <Text style={styles.detailValue}>{job.expire_on || 'N/A'}</Text>
              </View>
            </View>
          </View>

          {/* Contact Info */}
          <View style={styles.boxContainer}>
            <LinearGradient
              colors={['#00b09b', '#96c93d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.boxTitleGradient}
            >
              <Text style={styles.boxTitle}>Contact Info</Text>
            </LinearGradient>
            <View style={styles.boxContent}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Contact:</Text>
                <Text style={styles.detailValue}>{job.whatsapp_no || 'N/A'}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Company Name:</Text>
                <Text style={styles.detailValue}>{job.company_name || 'N/A'}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  onPress={() => { 
                    animateButtonPress(); 
                    Linking.openURL(job.contact_preference ? job.contact_preference.whatsapp_link : '#'); 
                  }} 
                  style={styles.whatsappButton}
                >
                  <Text style={styles.buttonText}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => { 
                    animateButtonPress(); 
                    Linking.openURL(`tel:${job.whatsapp_no}`); 
                  }} 
                  style={styles.callButton}
                >
                  <Text style={styles.buttonText}>Call Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f8fb',
  },
  card: {
    margin: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  headerGradient: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
    paddingBottom: 25,
    width: '100%',
    position: 'relative',
  },
  header: {
    overflow: 'hidden',
    borderBottomWidth: 0,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  headerTextContainer: {
    flex: 1,
    marginRight: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    lineHeight: 24,
  },
  companyName: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  bookmarkIcon: {
    position: 'absolute',
    bottom: 10,
    right: 15,
  },
  detailsSection: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'left',
    width: 120,
    marginRight: 10,
  },
  detailValue: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  callButton: {
    backgroundColor: '#4287f5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
  statText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 5,
  },
  boxContainer: {
    marginVertical: 12,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  boxTitleGradient: {
    padding: 12,
    width: '100%',
  },
  boxTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  boxContent: {
    padding: 15,
    backgroundColor: '#fff',
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    paddingVertical: 10,
  },
  infoItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 5,
  },
  infoLabel: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
});

export default JobDetailsScreen;
