import React, { Component } from 'react';
import { View, FlatList, Text} from 'react-native';
import { Avatar, ListItem , Tile} from 'react-native-elements';
import  { Loading }  from './LoadingComponent';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      favorites: state.favorites
    }
  }

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 

        const renderMenuItem = ({ item, index}) => {
            return(
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
 
export default connect(mapStateToProps)(Favorites) ;