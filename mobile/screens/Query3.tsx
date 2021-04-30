import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable, Alert} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Trip} from '../types';
import Spinner from '../components/Spinner';
import DateTimePicker from '@react-native-community/datetimepicker';
import Form from '../components/Form';
import {API_URL} from 'react-native-dotenv';

type Props = {
  setTrip: React.Dispatch<React.SetStateAction<Trip | undefined>>;
  navigation: StackNavigationProp<any, any>;
  trip: Trip | undefined;
};

const Query3 = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date(1606770000000));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {setTrip} = props;

  const onDateChange = (_event: Event, selectedDate: Date | undefined) => {
    const newDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(newDate);
  };

  const submit = () => {
    setLoading(true);
    fetch(`${API_URL}/trips/longest-trip-by-day`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: date.valueOf(),
      }),
    })
      .then(async res => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 400) {
          throw await res.json();
        } else {
          throw `Status Code: ${res.status}`;
        }
      })
      .then((data: {trip: Trip; polylinePoints: string}) => {
        setTrip(data.trip);
        console.log(data.trip);
        props.navigation.navigate('Route');
      })
      .catch(err => {
        Alert.alert(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          onChange={onDateChange}
          minimumDate={new Date(1606770000000)}
          maximumDate={new Date(1609448399000)}
        />
      )}
      <Form
        title="Query 3"
        subTitle="Longest Trip By Date"
        submit={submit}
        buttonText="Search">
        <Text style={styles.inputTitle}>Date</Text>
        <Pressable
          style={styles.button}
          onPress={() => setShowDatePicker(true)}>
          <Text style={styles.buttonText}>{date.toLocaleDateString()}</Text>
        </Pressable>
      </Form>
      {loading && <Spinner />}
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

export default Query3;
