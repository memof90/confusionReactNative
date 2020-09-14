import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { Card } from 'react-native-elements';


function RenderDish(props) {
    const dish = props.dish;

    if (dish != null) {
        return(
            <Card>
                <Card.Image source={require('./images/uthappizza.png')}>
                    <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
                </Card.Image>
                <Text style={{margin: 10}}>{dish.description}</Text>
            </Card>
            // <Card 
            // featuredTitle={dish.name}
            // image={require('./images/uthappizza.png')}>
            //     <Text style={{margin: 10}}>{dish.description}</Text>
            // </Card>
        );
    }
    else {
        return(
            <View></View>
        );
    }
}


function Dishdetail(props) {
    return(<RenderDish dish={props.dish} />);
}

export default Dishdetail;

