import React, { Component } from 'react';
import {View, StyleSheet,  Text, ScrollView, Image } from 'react-native';
import { Card, Icon, Input, CheckBox, Button, } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { baseUrl } from '../shared/baseUrl';

// import { LoginNavigator, RegisterNavigator } from './MainComponent';

class LoginTab extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password: '',
            remember: false
         }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
        .then((userdata) => {
            const userinfo = JSON.parse(userdata);
            if (userinfo) {
                this.setState({ username: userinfo.username});
                this.setState({ password: userinfo.password});
                this.setState({ remember: true});
            }
        })
    }

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo', 
            JSON.stringify({ username: this.state.username, password: this.state.password})
            )
            .catch((error) => console.log('cloud not save user info', error));
        }
        else {
            SecureStore.deleteItemAsync('userinfo')
            .catch((error) => console.log('cloud not delete user info', error));
        }
    }

    render() { 
        return ( 
            <ScrollView>
                           <View style={styles.container}>
                <Input 
                    placeholder= 'Username'
                    leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                    onChangeText={(username) => this.setState({ username }) }
                    value={this.state.username}
                    containerStyle={styles.formInput}
                />
                <Input 
                    placeholder= 'Password'
                    leftIcon={{ type: 'font-awesome', name: 'key'}}
                    onChangeText={(password) => this.setState({ password }) }
                    value={this.state.password}
                    containerStyle={styles.formInput}
                />
                <CheckBox 
                title='Remenber Me'
                center
                checked={this.state.remember}
                onPress={() => this.setState({remember: !this.state.remember})}
                containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                <Button 
                    onPress={() => this.handleLogin()}
                    title='Login'
                    icon={{
                            name: "sign-in",
                            size: 24,
                            type: 'font-awesome',
                            color: "white"
                        }}
                    buttonStyle={{backgroundColor: "#512da8"}}
                />
                </View>
                <View style={styles.formButton}>
                <Button 
                    onPress={() => this.props.navigation.navigate('Register')}
                    title='Register'
                    type="clear"
                    icon={{
                            name: "user-plus",
                            size: 24,
                            type: 'font-awesome',
                           
                        }}
                        
                />
                </View>
            </View>
            </ScrollView>
 

         );
    }
}

class ResgiterTab extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
         }
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted'){
            let captureImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4,3]
            });

            if ( !captureImage.cancelled){
                this.setState({ imageUrl: captureImage.uri })
            }
        }
    }

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) 
            SecureStore.setItemAsync('userinfo', 
            JSON.stringify({ username: this.state.username, password: this.state.password})
            )
            .catch((error) => console.log('cloud not save user info', error));
        

    }

    render() { 
        return ( 
            <ScrollView>
            <View style={styles.container}>
            <View  style={styles.imageContainer}>
                <Image 
                    source={{ uri: this.state.imageUrl}}
                    loadingIndicatorSource={require('./images/logo.png')}
                    style={styles.image}
                />
                <Button 
                    title='Camera'
                    onPress={this.getImageFromCamera}
                />
            </View>
                <Input 
                    placeholder= 'Username'
                    leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                    onChangeText={(username) => this.setState({ username }) }
                    value={this.state.username}
                    containerStyle={styles.formInput}
                />
                <Input 
                    placeholder= 'Password'
                    leftIcon={{ type: 'font-awesome', name: 'key'}}
                    onChangeText={(password) => this.setState({ password }) }
                    value={this.state.password}
                    containerStyle={styles.formInput}
                />
                <Input 
                    placeholder= 'Firstname'
                    leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                    onChangeText={(firstname) => this.setState({ firstname }) }
                    value={this.state.firstname}
                    containerStyle={styles.formInput}
                />
                <Input 
                    placeholder= 'Lastname'
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o'}}
                    onChangeText={(lastname) => this.setState({ lastname }) }
                    value={this.state.lastname}
                    containerStyle={styles.formInput}
                />
                <Input 
                    placeholder= 'Email'
                    leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                    onChangeText={(email) => this.setState({ email }) }
                    value={this.state.email}
                    containerStyle={styles.formInput}
                />

                <CheckBox 
                title='Remenber Me'
                center
                checked={this.state.remember}
                onPress={() => this.setState({remember: !this.state.remember})}
                containerStyle={styles.formCheckbox}
                />

                <View style={styles.formButton}>
                <Button 
                    onPress={() => this.handleRegister()}
                    title='Register'
                    icon={{
                            name: "user-plus",
                            size: 24,
                            type: 'font-awesome',
                            color: "white"
                        }}
                    buttonStyle={{backgroundColor: "#512da8"}}
                />
                </View>
            </View>
            </ScrollView>
 
         );
    }
}

const LoginTabs = createBottomTabNavigator();

const Login = () => {
    return (
      <LoginTabs.Navigator 
      screenOptions={({route}) => ({
        tabBarIcon: ({ focused, color, size, }) => {
            let iconName;

            if (route.name === 'Login') {
            iconName = focused
                ? 'sign-in'
                : 'sign-in';
            } else if (route.name === 'Register') {
            iconName = focused ? 'user-plus' : 'user-plus';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} type='font-awesome'/>;
        },
      })}
      tabBarOptions={{
        

      }}>
        <LoginTabs.Screen name="Login" component={LoginTab} />
        <LoginTabs.Screen name="Register" component={ResgiterTab} />
      </LoginTabs.Navigator>
    );
  };


  export default Login;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20,
    },
    image: {
        margin: 10,
        width: 80,
        height: 60
    },  
    formInput: {
        margin: 10,
    },
    formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    },

})
 



 
