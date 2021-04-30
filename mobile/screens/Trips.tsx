import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Row, Table, TableWrapper, Rows} from 'react-native-table-component';
import {ScrollView} from 'react-native-gesture-handler';
import {Trip} from '../types';

type Props = {
  trips: Trip[];
};

const Trips = (props: Props) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.tableContainer}>
        <Table borderStyle={styles.tableBorder}>
          <Row
            textStyle={styles.headerText}
            style={styles.header}
            //flexArr={[1.45, 1.3, 1.4]}
            data={[
              'Date',
              'Pick Up Zone',
              'Drop Off Zone',
              'Distance',
              'Total Amount',
            ]}
          />
          <TableWrapper>
            <Rows
              textStyle={styles.rowText}
              style={styles.row}
              //flexArr={[1.45, 1.3, 1.4]}
              data={props.trips.map(trip => [
                new Date(trip.tripDate).toLocaleDateString(),
                trip.pickUpZone.zone,
                trip.dropOffZone.zone,
                trip.distance,
                trip.totalAmount,
              ])}
            />
          </TableWrapper>
        </Table>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableContainer: {
    width: '95%',
    marginVertical: 20,
  },
  tableBorder: {
    borderWidth: 2,
    borderColor: '#bebba2',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#5084b8',
    margin: 3,
  },
  header: {
    backgroundColor: '#c4c8ca',
  },
  rowText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#5084b8',
    margin: 3,
  },
  row: {
    backgroundColor: '#ebebeb',
  },
});
export default Trips;
