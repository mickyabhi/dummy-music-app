import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { HomeScreen } from '../HomeScreen';
import { DrawerContent } from '../../components/DrawerContent';
import { scaledValue } from '../../utils/design.utils';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: { backgroundColor: '#0B173C', width: scaledValue(320) },
        headerShown: false,
      }}
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName="HomeScreen">
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};
export default AppDrawer;
