// screens/BookmarksScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useBookmarks } from '../context/BookmarkContext';

const BookmarksScreen = ({ navigation }) => {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <View>
      {bookmarks.length === 0 ? (
        <Text>No bookmarks yet.</Text>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('JobDetails', { job: item })}>
              <View style={{
                padding: 15,
                marginVertical: 8,
                marginHorizontal: 16,
                borderRadius: 10,
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 3,
              }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{item.title}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                  <Text style={{ fontSize: 14, color: '#555' }}>Location:</Text>
                  <Text style={{ fontSize: 14, color: '#555' }}>{item.primary_details ? item.primary_details.Place : 'N/A'}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                  <Text style={{ fontSize: 14, color: '#555' }}>Salary:</Text>
                  <Text style={{ fontSize: 14, color: '#555' }}>{item.primary_details ? item.primary_details.Salary : 'N/A'}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 14, color: '#555' }}>Phone:</Text>
                  <Text style={{ fontSize: 14, color: '#555' }}>{item.whatsapp_no || 'N/A'}</Text>
                </View>
                <Text style={{ color: 'red', marginTop: 10 }} onPress={() => removeBookmark(item.id)}>Remove</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default BookmarksScreen;
