import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { View, Platform } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';

// routes 
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Stack = createStackNavigator();

function MenuNavigatior() {
    return(
        <Stack.Navigator initialRouteName="Menu" screenOptions={{ 
        headerStyle: { backgroundColor: '#512DA8' }, 
        headerTintColor: '#ffffff', 
        headerTitleStyle: {color: '#ffffff'}}} >
        <Stack.Screen name="Menu" component={Menu} options={{title: 'Menu'}} />
        <Stack.Screen name="Dishdetail" component={Dishdetail}  options={{title: 'Dish Details'}}/>
        </Stack.Navigator>
      
    );
}

const Stacks = createStackNavigator();

function HomeNavegatior() {
    return (
        <Stacks.Navigator screenOptions={{ 
            headerStyle: { backgroundColor: '#512DA8' }, 
            headerTintColor: '#ffffff', 
            headerTitleStyle: {color: '#ffffff'}}} >
        <Stacks.Screen name="Home" component={Home} options={{title: 'Home'}} />
      </Stacks.Navigator>
    );
  }

  const Stac = createStackNavigator();

function AboutNavegatior() {
    return (
        <Stac.Navigator screenOptions={{ 
            headerStyle: { backgroundColor: '#512DA8' }, 
            headerTintColor: '#ffffff', 
            headerTitleStyle: {color: '#ffffff'}}} >
        <Stac.Screen name="Aboutus" component={About} options={{title: 'About us'}} />
      </Stac.Navigator>
    );
  }

  const Sta = createStackNavigator();

  function ContactNavegatior() {
      return (
          <Sta.Navigator screenOptions={{ 
              headerStyle: { backgroundColor: '#512DA8' }, 
              headerTintColor: '#ffffff', 
              headerTitleStyle: {color: '#ffffff'}}} >
          <Sta.Screen name="Contactus" component={Contact} options={{title: 'Contact Us'}} />
        </Sta.Navigator>
      );
    }

  const Drawer = createDrawerNavigator();

function MainNavigator() {
  return (
    <NavigationContainer>
    <Drawer.Navigator   drawerStyle={{
        backgroundColor: '#D1C4E9',
      }} >
      <Drawer.Screen name="Home" component={HomeNavegatior} options={{title: 'Home'}, {drawerLabel: 'Home'}} />
      <Drawer.Screen name="Menu" component={MenuNavigatior} options={{title: 'Menu'}, {drawerLabel: 'Menu'}} />
      <Drawer.Screen name="Aboutus" component={AboutNavegatior} options={{title: 'About Us'}, {drawerLabel: 'About Us'}} />
      <Drawer.Screen name="Contactus" component={ContactNavegatior} options={{title: 'Contact Us'}, {drawerLabel: 'Contact Us'}} />
    </Drawer.Navigator>
    </NavigationContainer>
  );
}



class Main extends Component {
    // constructor(props) {
    //     super(props);
    //    this.state = { 
    //         dishes: DISHES,
    //         selectedDish: null
    //      }
    // }

    // onDishSelect(dishId) {
    //     this.setState({selectedDish: dishId})
    // }
    render() { 
        return (  
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
            {/* <Menu dishes={this.state.dishes} onPress={(dishId) => this.onDishSelect(dishId)} />
            <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
            <MainNavigator />
            </View>
        );
    }
}
 
export default Main;

