import React, { Component } from 'react';
import { View, FlatList, Text} from 'react-native';
import { Avatar, ListItem , Tile} from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import  { Loading }  from './LoadingComponent';


import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

//animated table 
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
      dishes: state.dishes
    }
  }

class Menu extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     dishes: DISHES
        // }
    }
    
    render() {

        const  renderMenuItem = ({item, index}) => {
        return(
            // <ListItem
            //     key={index}
            //     title={item.name}
            //     subtitle={item.description}
            //     leftAvatar={{ source: require('./images/uthappizza.png')}}
            // />
            // <ListItem key={index} bottomDivider onPress={() => navigate('Dishdetail', { dishId: item.id })}>
            //     <Avatar rounded source={{uri: baseUrl + item.image}} />
            //     <ListItem.Content>
            //         <ListItem.Title>{item.name}</ListItem.Title>
            //         <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            //     </ListItem.Content>
            //     <ListItem.Chevron/>
            // </ListItem>
            <Animatable.View animation="fadeInRightBig" duration={2000}>
                <Tile
                key={index}
                title={item.name}
                caption={item.description}
                featured
                onPress={() => navigate('Dishdetail', { dishId: item.id })}
                imageSrc={{ uri: baseUrl + item.image}}
                />
            </Animatable.View>

        );
    }

    const { navigate } = this.props.navigation;

    if (this.props.dishes.isLoading) {
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
            return(
        <FlatList 
            data={this.props.dishes.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
        />
        );
    }
  }
}

export default connect(mapStateToProps)(Menu);