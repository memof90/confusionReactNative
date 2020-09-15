import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { DISHES } from '../shared/dishes';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';

// routes 
import { createStackNavigator } from '@react-navigation/stack';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

const Stack = createStackNavigator();

function MenuNavigatior() {
    return(
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Menu" screenOptions={{ 
        headerStyle: { backgroundColor: '#512DA8' }, 
        headerTintColor: '#ffffff', 
        headerTitleStyle: {color: '#ffffff'}}} >
        <Stack.Screen name="Menu" component={Menu} options={{title: 'Menu'}} />
        <Stack.Screen name="Dishdetail" component={Dishdetail}  options={{title: 'Dish Details'}}/>
        </Stack.Navigator>
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
            <MenuNavigatior />
            </View>
        );
    }
}
 
export default Main;

