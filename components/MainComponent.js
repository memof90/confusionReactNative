import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoritesComponent';
import Login from './LoginComponent';

import { View, Platform, Image, StyleSheet,ScrollView , Text, ToastAndroid} from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import  { Icon, Button } from 'react-native-elements';

// routes 
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// netInfo 
import NetInfo from '@react-native-community/netinfo';


// redux 
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';




const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})


const Stack = createStackNavigator();

function MenuNavigatior( { navigation }) {
    return(
        <Stack.Navigator initialRouteName="Menu" screenOptions={{
        headerStyle: { backgroundColor: '#512DA8' }, 
        headerTintColor: '#ffffff', 
        headerTitleStyle: {color: '#ffffff'}}} >
        <Stack.Screen name="Menu" component={Menu} options={{title: 'Menu', headerLeft: () => (
          <Button
          type="clear"
            icon={
              <Icon 
                name="menu"
                size={24}
                color="white"
                backgroundColor='#512DA8'
              />
            }
            onPress={() => navigation.openDrawer() }
          />
        ), }} />
        <Stack.Screen name="Dishdetail" component={Dishdetail}  options={{title: 'Dish Details'}}/>
        </Stack.Navigator>
      
    );
}

const Stacks = createStackNavigator();

function HomeNavegatior({ navigation }) {
    return (
        <Stacks.Navigator screenOptions={{ 
          headerLeft: () => (
          <Button
          type="clear"
            icon={
              <Icon 
                name="menu"
                size={24}
                color="white"
                backgroundColor='#512DA8'
              />
            }
            onPress={() => navigation.openDrawer() }
          />
        ), 
    
            headerStyle: { backgroundColor: '#512DA8' }, 
            headerTintColor: '#ffffff', 
            headerTitleStyle: {color: '#ffffff'}}} >
        <Stacks.Screen name="Home" component={Home} options={{title: 'Home'}} />
      </Stacks.Navigator>
    );
  }

  const Stac = createStackNavigator();

function AboutNavegatior({ navigation }) {
    return (
        <Stac.Navigator screenOptions={{
          headerLeft: () => (
          <Button
          type="clear"
            icon={
              <Icon 
                name="menu"
                size={24}
                color="white"
                backgroundColor='#512DA8'
              />
            }
            onPress={() => navigation.openDrawer() }
          />
        ),  
            headerStyle: { backgroundColor: '#512DA8' }, 
            headerTintColor: '#ffffff', 
            headerTitleStyle: {color: '#ffffff'}}} >
        <Stac.Screen name="Aboutus" component={About} options={{title: 'About us'}} />
      </Stac.Navigator>
    );
  }

  const Sta = createStackNavigator();

  function ContactNavegatior({ navigation }) {
      return (
          <Sta.Navigator screenOptions={{
            headerLeft: () => (
          <Button
          type="clear"
            icon={
              <Icon 
                name="menu"
                size={24}
                color="white"
                backgroundColor='#512DA8'
              />
            }
            onPress={() => navigation.openDrawer() }
          />
        ),  
              headerStyle: { backgroundColor: '#512DA8' }, 
              headerTintColor: '#ffffff', 
              headerTitleStyle: {color: '#ffffff'}}} >
          <Sta.Screen name="Contactus" component={Contact} options={{title: 'Contact Us'}} />
        </Sta.Navigator>
      );
    }
    
    const StackReservantion = createStackNavigator();

    function ReservationNavigator({navigation}) {
      return(
        <StackReservantion.Navigator screenOptions={{
          headerLeft: () => (
        <Button
        type="clear"
          icon={
            <Icon 
              name="menu"
              size={24}
              color="white"
              backgroundColor='#512DA8'
            />
          }
          onPress={() => navigation.openDrawer() }
        />
      ),  
            headerStyle: { backgroundColor: '#512DA8' }, 
            headerTintColor: '#ffffff', 
            headerTitleStyle: {color: '#ffffff'}}} >
        <StackReservantion.Screen name="Reservation" component={Reservation} options={{title: 'Reserve Table'}} />
      </StackReservantion.Navigator>
      )
    }

    const StackFavirites = createStackNavigator();

    function FavoriteNavigator({navigation}){
      return(
        <StackFavirites.Navigator screenOptions={{
          headerLeft: () => (
        <Button
        type="clear"
          icon={
            <Icon 
              name="menu"
              size={24}
              color="white"
              backgroundColor='#512DA8'
            />
          }
          onPress={() => navigation.openDrawer() }
        />
      ),  
            headerStyle: { backgroundColor: '#512DA8' }, 
            headerTintColor: '#ffffff', 
            headerTitleStyle: {color: '#ffffff'}}} >
        <StackFavirites.Screen name="Favorites" component={Favorites} options={{title: 'My Favorites'}} />
      </StackFavirites.Navigator>
      )
    }

    const stackLogin = createStackNavigator();

    function LoginNavigator({navigation}) {
      return(
        <stackLogin.Navigator screenOptions={{
          headerLeft: () => (
        <Button
        type="clear"
          icon={
            <Icon 
              name="menu"
              size={24}
              color="white"
              backgroundColor='#512DA8'
            />
          }
          onPress={() => navigation.openDrawer() }
        />
      ),  
            headerStyle: { backgroundColor: '#512DA8' }, 
            headerTintColor: '#ffffff', 
            headerTitleStyle: {color: '#ffffff'}}} >
        <stackLogin.Screen name="login" component={Login} options={{title: 'Login'}} />
      </stackLogin.Navigator>
      )
    }

    const stackRegister = createStackNavigator();

    function RegisterNavigator({navigation}) {
      return(
        <stackRegister.Navigator screenOptions={{
          headerLeft: () => (
        <Button
        type="clear"
          icon={
            <Icon 
              name="menu"
              size={24}
              color="white"
              backgroundColor='#512DA8'
            />
          }
          onPress={() => navigation.openDrawer() }
        />
      ),  
            headerStyle: { backgroundColor: '#512DA8' }, 
            headerTintColor: '#ffffff', 
            headerTitleStyle: {color: '#ffffff'}}} >
        <stackRegister.Screen name="Register" component={LoginTab} options={{title: 'register'}} />
      </stackRegister.Navigator>
      )
    }

    export {LoginNavigator, RegisterNavigator}


    const CustomDrawerContentComponent = (props) => (
      <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </SafeAreaView>
    </ScrollView>
      
    );

  const Drawer = createDrawerNavigator();


function MainNavigator() {
  return (
    <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home" drawerStyle={{
        backgroundColor: '#D1C4E9'
      }} drawerContent={(props) => <CustomDrawerContentComponent {...props} />}>
      <Drawer.Screen name="login" component={LoginNavigator} options={{title: 'Login'}, {drawerLabel: 'Login'}, {drawerIcon: ({ tintColor}) => (
        <Icon name='sign-in' type='font-awesome' size={24} color={tintColor} />) }} />
      <Drawer.Screen name="Home" component={HomeNavegatior} options={{title: 'Home'}, {drawerLabel: 'Home'}, {drawerIcon: ({ tintColor}) => (
        <Icon name='home' type='font-awesome' size={24} color={tintColor} />) }} />
      <Drawer.Screen name="Menu" component={MenuNavigatior} options={{title: 'Menu'}, {drawerLabel: 'Menu'}, {drawerIcon: ({ tintColor}) => (
        <Icon name='list' type='font-awesome' size={24} color={tintColor} />) }} />
      <Drawer.Screen name="Aboutus" component={AboutNavegatior} options={{title: 'About Us'}, {drawerLabel: 'About Us'}, {drawerIcon: ({ tintColor}) => (
        <Icon name='info-circle' type='font-awesome' size={24} color={tintColor} />) }} />
      <Drawer.Screen name="Contactus" component={ContactNavegatior} options={{title: 'Contact Us'}, {drawerLabel: 'Contact Us'}, {drawerIcon: ({ tintColor}) => (
        <Icon name='address-card' type='font-awesome' size={24} color={tintColor} />) }} />
       <Drawer.Screen name="Reservation" component={ReservationNavigator} options={{title: 'Reservation Table'}, {drawerLabel: 'Reservation Table'}, {drawerIcon: ({ tintColor}) => (
        <Icon name='cutlery' type='font-awesome' size={24} color={tintColor} />) }} />
       <Drawer.Screen name="Favorites" component={FavoriteNavigator} options={{title: 'My Favorites'}, {drawerLabel: 'Favorites'}, {drawerIcon: ({ tintColor}) => (
        <Icon name='heart' type='font-awesome' size={24} color={tintColor} />) }} />
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
    componentDidMount() {
      this.props.fetchDishes();
      this.props.fetchComments();
      this.props.fetchPromos();
      this.props.fetchLeaders();

      // NetInfo.getConnectionInfo().then((connectionInfo) => {
      //   ToastAndroid.show('Initial Network Conectivity Type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType, 
      //     ToastAndroid.LONG
      //   )
      // });
      NetInfo.fetch().then(connectionInfo => {
        if (Platform.OS == 'android'){
          //ur android code here
          ToastAndroid.show('Initial Network Conectivity Type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.isConnected, 
          ToastAndroid.LONG
        )
      }

        console.log('Connection type', connectionInfo.type);
        console.log('Is connected?', connectionInfo.isConnected);
      });
    //  NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
     
    }

    componentWillUnmount(){
      const unsubscribe = NetInfo.addEventListener(connectionChange => {
        connectionChange.type,
        connectionChange.isConnected,
        this.handleConnectivityChange
        console.log('Connection type', connectionChange.type);
        console.log('Is connected?', connectionChange.isConnected);
      });
      // NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
      
      // To unsubscribe to these update, just use:
      unsubscribe();
    }

    handleConnectivityChange = (connectionInfo) => {
      switch (connectionInfo.type) {
        case 'none':
          ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
          break;
        case 'wifi':
          ToastAndroid.show('You are connected now wifi!', ToastAndroid.LONG);
          break;
        case 'cellular':
          ToastAndroid.show('You are now connected cellular!', ToastAndroid.LONG);
          break;
        case 'unknow':
          ToastAndroid.show('You now have an  unknow! connected', ToastAndroid.LONG);
          break;
        default:
          break;
      }
    }

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
 
export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: '#512AD8',
    height: 140,
    alignItems: "center",
    justifyContent: 'center',
    flex: 1,
    flexDirection: "row"
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
})