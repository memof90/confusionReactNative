import React, { Component } from 'react';
import { View, FlatList, Text, Animated, StyleSheet, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Avatar, Icon, ListItem , Tile} from 'react-native-elements';
import  { Loading }  from './LoadingComponent';

import { deleteFavorite } from '../redux/ActionCreators';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';


import Swipeable from 'react-native-gesture-handler/Swipeable';



const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      favorites: state.favorites
    }
  }

  const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }




    
    render() { 

        const renderMenuItem = ({ item, index}) => {
    
            const items = item;
            const renderLefActions = ( progess, dragX)  => {
                const trans = dragX.interpolate({
                    inputRange: [0, 50, 100, 101],
                    outputRange: [-20, 0, 0, 1],
                });
                return (
                    <RectButton style={styles.leftAction} onPress={() => Alert.alert(
                        'Delete Favorite?',
                        'Are you sure you wish to delete the favorite dish ' + items.name + '?',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log(items.name + 'Not Delete'),
                                style: 'cancel'
                            },
                            {
                                text: 'Ok',
                                onPress:() => this.props.deleteFavorite(items.id)
                            }
                        ],
                        { cancelable: false}
                    )}>
                      <Animated.Text
                        style={[
                          styles.actionText,
                          {
                            transform: [{ translateX: trans }],
                            color: 'white',
                            fontWeight: 'bold'
                          },
                        ]}>
                        Delete
                      </Animated.Text>
                    </RectButton>
                  );
                };
                
            return(
                <Swipeable renderLeftActions={renderLefActions}>
                <ListItem key={index}
                onPress={() => navigate('Dishdetail', { dishId: item.id })}
                >
                <Avatar rounded source={{uri: baseUrl + item.image }} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />

                </ListItem>
                </Swipeable>

            );
        }

        const { navigate } = this.props.navigation;


        if (this.props.dishes.isLoading){
            return(
                <Loading />
            );
        }
        
        else if (this.props.dishes.errMess) {
            return(
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            );
        }
        else {
        return ( 
            <FlatList 
                data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id ))}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
            />
         );
        }

    }
}

const styles = StyleSheet.create({

    leftAction:{
        backgroundColor:'red',
        justifyContent:'center',
        flex:1
      }
  });
 
export default connect(mapStateToProps, mapDispatchToProps)(Favorites) ;