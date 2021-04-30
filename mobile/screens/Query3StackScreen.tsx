import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Trip} from '../types';
import Query3 from './Query3';
import Route from './Route';

const Query3Stack = createStackNavigator();

const Query3StackScreen = () => {
  const [trip, setTrip] = useState<Trip>();
  return (
    <Query3Stack.Navigator>
      <Query3Stack.Screen name="Query 3">
        {props => <Query3 {...props} setTrip={setTrip} trip={trip} />}
      </Query3Stack.Screen>
      <Query3Stack.Screen
        name="Route"
        options={{
          title: trip
            ? `${trip.distance.toFixed(1)} - ${trip.pickUpZone.zone} - ${
                trip.dropOffZone.zone
              }`
            : 'Route',
        }}>
        {props => <Route {...props} trip={trip} />}
      </Query3Stack.Screen>
    </Query3Stack.Navigator>
  );
};

export default Query3StackScreen;
