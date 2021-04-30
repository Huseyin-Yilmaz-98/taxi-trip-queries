import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Form from '../components/Form';
import Spinner from '../components/Spinner';
import {Row, Table, TableWrapper, Rows} from 'react-native-table-component';
import {API_URL} from 'react-native-dotenv';

type DayData = {
  count: {id: number};
  sum: {passengerCount: number};
  tripDate: string;
};

const Query1 = () => {
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState<DayData[] | null>(null);

  const submit = () => {
    setLoading(true);
    fetch(`${API_URL}/trips/days-with-most-passengers`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
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
      .then((data: DayData[]) => {
        setDays(data);
      })
      .catch(err => {
        Alert.alert(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      {days ? (
        <ScrollView style={styles.tableContainer}>
          <Table borderStyle={styles.tableBorder}>
            <Row
              textStyle={styles.headerText}
              style={styles.header}
              flexArr={[1.45, 1.3, 1.4]}
              data={['Date', 'Trip Count', 'Passengers']}
            />
            <TableWrapper>
              <Rows
                textStyle={styles.rowText}
                style={styles.row}
                flexArr={[1.45, 1.3, 1.4]}
                data={days.map(dayData => [
                  new Date(dayData.tripDate).toLocaleDateString(),
                  dayData.count.id,
                  dayData.sum.passengerCount,
                ])}
              />
            </TableWrapper>
          </Table>
        </ScrollView>
      ) : (
        <Form
          title="Query 1"
          subTitle="List Days With Most Passengers"
          submit={submit}
        />
      )}
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
  tableContainer: {
    width: '80%',
    marginTop: 180,
  },
  tableBorder: {
    borderWidth: 2,
    borderColor: '#bebba2',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5084b8',
    margin: 3,
  },
  header: {
    backgroundColor: '#c4c8ca',
  },
  rowText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#5084b8',
    margin: 3,
  },
  row: {
    backgroundColor: '#ebebeb',
  },
});

export default Query1;
