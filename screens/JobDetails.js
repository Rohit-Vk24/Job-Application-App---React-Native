import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JobDetails = ({ route }) => {
  const { job } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.detail}>Company: {job.company_name}</Text>
      <Text style={styles.detail}>Location: {job.primary_details ? job.primary_details.Place : 'N/A'}</Text>
      <Text style={styles.detail}>Salary: {job.primary_details ? job.primary_details.Salary : 'N/A'}</Text>
      <Text style={styles.detail}>Experience: {job.primary_details ? job.primary_details.Experience : 'N/A'}</Text>
      <Text style={styles.detail}>Job Type: {job.primary_details ? job.primary_details.Job_Type : 'N/A'}</Text>
      <Text style={styles.detail}>Contact: {job.whatsapp_no || 'N/A'}</Text>
      <Text style={styles.detail}>Other Details: {job.other_details || 'N/A'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default JobDetails; 