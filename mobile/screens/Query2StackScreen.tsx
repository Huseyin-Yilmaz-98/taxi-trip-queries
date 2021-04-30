import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Query2 from './Query2';
import Trips from './Trips';
import {Trip} from '../types';

const Query2Stack = createStackNavigator();

const Query2StackScreen = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  return (
    <Query2Stack.Navigator>
      <Query2Stack.Screen name="Query 2">
        {props => <Query2 {...props} setTrips={setTrips} />}
      </Query2Stack.Screen>
      <Query2Stack.Screen
        name="Trips"
        options={{title: trips ? `Trips (${trips.length})` : trips}}>
        {props => <Trips {...props} trips={trips} />}
      </Query2Stack.Screen>
    </Query2Stack.Navigator>
  );
};

export default Query2StackScreen;
