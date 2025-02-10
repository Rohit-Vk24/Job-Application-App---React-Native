// screens/BookmarksScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useBookmarks } from '../context/BookmarkContext';
import { MaterialIcons } from '@expo/vector-icons';

const BookmarksScreen = ({ navigation }) => {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="bookmark" size={30} color="#007BFF" />
        <Text style={styles.headerTitle}>Bookmarks</Text>
      </View>
      {bookmarks.length === 0 ? (
        <View style={styles.noBookmarksContainer}>
          <Text style={styles.noBookmarksText}>You have no bookmarks yet.</Text>
          <Text style={styles.noBookmarksSubText}>Start adding jobs to your bookmarks to see them here.</Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('JobDetails', { job: item })}>
              <View style={styles.card}>
                <Text style={styles.jobTitle}>{item.title}</Text>
                <View style={styles.detailRow}>
                  <MaterialIcons name="location-on" size={20} color="#007BFF" />
                  <Text style={styles.detailValue}>{item.primary_details ? item.primary_details.Place : 'N/A'}</Text>
                </View>
                <View style={styles.detailRow}>
                  <MaterialIcons name="attach-money" size={20} color="#007BFF" />
                  <Text style={styles.detailValue}>{item.primary_details ? item.primary_details.Salary : 'N/A'}</Text>
                </View>
                <TouchableOpacity onPress={() => removeBookmark(item.id)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  card: {
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 20,
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
  removeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  removeButtonText: {
    color: 'red',
    fontSize: 16,
  },
  noBookmarksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noBookmarksText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  noBookmarksSubText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
});

export default BookmarksScreen;
