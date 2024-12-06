import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DatePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

const DatePickerExample = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(dayjs(date).format('YYYY-MM-DD'));
  };

  return (
    <View style={styles.container}>
      <Text allowFontScaling={false} style={styles.label}>Select Date of Birth:</Text>
      <DatePicker
        onDateChange={handleDateChange}
        mode="single"
        style={styles.datePicker}
      />
      {/* {selectedDate ? (
        <Text style={styles.selectedDate}>Selected Date: {selectedDate}</Text>
      ) : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Dark background color
    borderWidth: 1, // Debug border
  },
  label: {
    fontSize: 18,
    marginBottom: 12,
    color: '#fff', // White text color
    borderWidth: 1, // Debug border
    borderColor: 'blue', // Debug border color
  },
  datePicker: {
    width: 300,
    height: 50,
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 16,
    color: '#ff0', // Bright yellow text color
    borderWidth: 1, // Debug border
  },
});

export default DatePickerExample;
