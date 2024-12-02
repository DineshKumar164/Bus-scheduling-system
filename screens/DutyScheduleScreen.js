import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert, Platform } from 'react-native';
import Header from '../components/Header';
import BusCard from '../components/BusCard';
import { apiService } from '../services/apiService'; // Mock API
import SegmentedControl from '@react-native-segmented-control/segmented-control';

const DutyScheduleScreen = () => {
  const [selectedSegment, setSelectedSegment] = useState(0); // 0: Linked, 1: Unlinked
  const [linkedDuties, setLinkedDuties] = useState([]);
  const [unlinkedDuties, setUnlinkedDuties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDuties = async () => {
      setLoading(true);
      try {
        const duties = await apiService.getDuties();
        setLinkedDuties(duties.filter(duty => duty.linked));
        setUnlinkedDuties(duties.filter(duty => !duty.linked));
      } catch (error) {
        console.error("Error fetching duties:", error);
        Alert.alert('Error', 'Failed to fetch duties');
      } finally {
        setLoading(false);
      }
    };
    fetchDuties();
  }, []);

  const handleDutyStatusChange = async (dutyId, newStatus) => {
    setLoading(true);
    try {
      const response = await apiService.updateDutyStatus(dutyId, newStatus);
      if (response.success) {
        const duties = await apiService.getDuties();
        setLinkedDuties(duties.filter(duty => duty.linked));
        setUnlinkedDuties(duties.filter(duty => !duty.linked));
      } else {
        Alert.alert('Error', response.error || 'Failed to update duty status');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update duty status');
    } finally {
      setLoading(false);
    }
  };

  const segments = ['Linked Duties', 'Unlinked Duties'];

  return (
    <View style={styles.container}>
      {/* <Header title="Duty Schedule" /> */}
      <SegmentedControl
        values={segments}
        selectedIndex={selectedSegment}
        onChange={(event) => {
          setSelectedSegment(event.nativeEvent.selectedSegmentIndex);
        }}
        style={styles.segmentedControl}
      />
      {loading ? (
        <Text style={styles.loadingText}>Loading Duties...</Text>
      ) : (
        <ScrollView style={styles.content}>
          {(selectedSegment === 0 ? linkedDuties : unlinkedDuties).length > 0 ? (
            (selectedSegment === 0 ? linkedDuties : unlinkedDuties).map(duty => (
              <BusCard
                key={duty.id}
                {...duty}
                onStatusChange={(newStatus) => handleDutyStatusChange(duty.id, newStatus)}
                isSupervisor={true}
              />
            ))
          ) : (
            <Text style={styles.noDataText}>
              {selectedSegment === 0 ? 'No linked duties.' : 'No unlinked duties.'}
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  segmentedControl: {
    margin: 16,
  },
  loadingText: {
    textAlign: 'center',
    marginVertical: 20,
  },
  noDataText: {
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default DutyScheduleScreen;
