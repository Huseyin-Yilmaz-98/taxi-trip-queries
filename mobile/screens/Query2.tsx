import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Pressable, Alert} from 'react-native';
import Spinner from '../components/Spinner';
import Form from '../components/Form';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {StackNavigationProp} from '@react-navigation/stack';
import {Trip, Zone} from '../types';
import {API_URL} from 'react-native-dotenv';

type Props = {
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
  navigation: StackNavigationProp<any, any>;
};

const Query2 = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [zones, setZones] = useState<Zone[]>([]);
  const [locationId, setLocationId] = useState<null | number>(null);
  const [startDate, setStartDate] = useState(new Date(1606770000000));
  const [endDate, setEndDate] = useState(new Date(1609448399000));
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const {setTrips} = props;

  const onStartDateChange = (_event: Event, selectedDate: Date | undefined) => {
    const date = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(date);
  };

  const onEndDateChange = (_event: Event, selectedDate: Date | undefined) => {
    const date = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(date);
  };

  const submit = () => {
    setLoading(true);
    fetch(`${API_URL}/trips/trips-by-dates-and-location`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: startDate.getTime(),
        endDate: endDate.getTime(),
        locationId,
      }),
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw `Status Code: ${res.status}`;
        }
      })
      .then((data: Trip[]) => {
        if (data.length > 0) {
          setTrips(data);
          props.navigation.navigate('Trips');
        } else {
          Alert.alert('No trips found!');
        }
      })
      .catch(err => {
        Alert.alert(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/zones`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw `Status Code: ${res.status}`;
        }
      })
      .then((data: Zone[]) => {
        setZones(data);
        setLocationId(data[0].id);
      })
      .catch(err => {
        Alert.alert(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          onChange={onStartDateChange}
          minimumDate={new Date(1606770000000)}
          maximumDate={new Date(1609448399000)}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          onChange={onEndDateChange}
          minimumDate={new Date(1606770000000)}
          maximumDate={new Date(1609448399000)}
        />
      )}
      {loading ? (
        <Spinner />
      ) : (
        <Form
          title="Query 2"
          subTitle="Trips By Dates And Location"
          submit={submit}>
          <Text style={styles.inputTitle}>Location</Text>
          <Picker
            itemStyle={styles.pickerItem}
            style={styles.picker}
            selectedValue={locationId}
            onValueChange={id => setLocationId(id)}>
            {zones?.map(zone => (
              <Picker.Item
                style={styles.pickerItem}
                key={zone.id}
                label={zone.zone}
                value={zone.id}
              />
            ))}
          </Picker>
          <Text style={styles.inputTitle}>Interval</Text>
          <Pressable
            style={styles.button}
            onPress={() => setShowStartDatePicker(true)}>
            <Text style={styles.buttonText}>
              From {startDate.toLocaleDateString()}
            </Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => setShowEndDatePicker(true)}>
            <Text style={styles.buttonText}>
              To {endDate.toLocaleDateString()}
            </Text>
          </Pressable>
        </Form>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5084b8',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: '80%',
    padding: 0,
    color: '#5084b8',
    fontSize: 20,
    fontWeight: 'bold',
  },
  pickerItem: {
    color: '#5084b8',
    fontWeight: 'bold',
  },
  inputTitle: {
    color: '#5084b8',
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  button: {
    padding: 3,
    backgroundColor: '#536c75',
    width: 180,
    borderRadius: 12,
    marginBottom: 18,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default Query2;
