import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Query1 from './screens/Query1';
import Query2StackScreen from './screens/Query2StackScreen';
import Query3StackScreen from './screens/Query3StackScreen';

const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{labelStyle: {fontSize: 25, marginBottom: 15}}}>
          <Tab.Screen name="Query 1" component={Query1} />
          <Tab.Screen name="Query 2" component={Query2StackScreen} />
          <Tab.Screen name="Query 3" component={Query3StackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: '#5084b8', width: '100%', height: '100%'},
});

export default App;
