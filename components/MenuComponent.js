import React, { Component } from 'react';
import { View, FlatList} from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

function Menu(props) {
    const  renderMenuItem = ({item, index}) => {
        return(
            // <ListItem
            //     key={index}
            //     title={item.name}
            //     subtitle={item.description}
            //     leftAvatar={{ source: require('./images/uthappizza.png')}}
            // />
            <ListItem key={index} bottomDivider onPress={() => props.onPress(item.id)}>
                <Avatar rounded source={require('./images/uthappizza.png')} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron/>
            </ListItem>
        );
    }

    return(
        <FlatList 
            data={props.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
        />
    );
}

export default Menu;