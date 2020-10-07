import React, { Component } from 'react';
import { View, Text, ScrollView, Animated, Easing, YellowBox} from 'react-native';

import { Card } from 'react-native-elements'
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

import  { Loading }  from './LoadingComponent';




const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }


function RenderItem(props) {
    const item = props.item;

    if (props.isLoading) {
        return(
            <Loading />
        );
    } 
    else if (props.errMess) {
        return(
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    } 
    else {
                if (item != null) {
            return(
                <Card>
                    <Card.Image source={{uri: baseUrl + item.image}}>
                    <Card.FeaturedTitle>{item.name}</Card.FeaturedTitle>
                    <Card.FeaturedSubtitle>{item.designation}</Card.FeaturedSubtitle>  
                    </Card.Image>
                    <Text style={{margin: 10}}>{item.description}</Text>
                </Card>
            );
        }
        else {
            return(
                <View></View>
            );
        }
    }
    

}


class Home extends Component {
    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
        this.state = { 
            // dishes:DISHES,
            // promotions: PROMOTIONS,
            // leaders: LEADERS
         }
    }

    componentDidMount() {
        this.animated();
        YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);
    }

    animated() {
        this.animatedValue.setValue(0);
        Animated.timing(
            this.animatedValue,
            {
                toValue: 8,
                duration: 8000,
                useNativeDriver: false,
                easing: Easing.linear
            }
        ).start(() => this.animated())
    }

    render() {
        
        const xpos1 = this.animatedValue.interpolate({
            inputRange: [0, 1, 3, 5, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        });
        const xpos2 = this.animatedValue.interpolate({
            inputRange: [0, 2, 5, 6, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        });
        const xpos3 = this.animatedValue.interpolate({
            inputRange: [0, 3, 5, 7, 8],
            outputRange: [1200, 600, 0, -600, -1200]
        });


        return ( 
            
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <Animated.View onVie  style={{width: '100%', transform: [{translateX: xpos1}]}}>
                    <RenderItem item={this.props.dishes.dishes.filter((dish)=> dish.featured)[0]}
                        isLoading={this.props.dishes.isLoading}
                        erreMess={this.props.dishes.erreMess} 
                        />
                </Animated.View>
                <Animated.View style={{width: '100%', transform: [{translateX: xpos2}]}}>
                        <RenderItem item={this.props.promotions.promotions.filter((promo)=> promo.featured)[0]}
                                    isLoading={this.props.promotions.isLoading}
                                    erreMess={this.props.promotions.erreMess} 
                        />
                </Animated.View>
                <Animated.View style={{width: '100%', transform: [{translateX: xpos3}]}}>
                                   <RenderItem item={this.props.leaders.leaders.filter((leader)=> leader.featured)[0]}
                                               isLoading={this.props.leaders.isLoading}
                                                erreMess={this.props.leaders.erreMess}         
                                     />
                </Animated.View>

            </View>

            // {/* <ScrollView>
            // <RenderItem item={this.props.dishes.dishes.filter((dish)=> dish.featured)[0]}
            //         isLoading={this.props.dishes.isLoading}
            //         erreMess={this.props.dishes.erreMess} 
            //    />
            //    <RenderItem item={this.props.promotions.promotions.filter((promo)=> promo.featured)[0]}
            //         isLoading={this.props.promotions.isLoading}
            //         erreMess={this.props.promotions.erreMess} 
            //    />
            //    <RenderItem item={this.props.leaders.leaders.filter((leader)=> leader.featured)[0]}
            //         isLoading={this.props.leaders.isLoading}
            //         erreMess={this.props.leaders.erreMess}
                            
            //    />
            // </ScrollView> */}
           
         );
    }
}
 
export default  connect(mapStateToProps)(Home);