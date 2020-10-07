import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList} from 'react-native';
import { Card,ListItem, Avatar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LEADERS } from '../shared/leaders';

//loading
import  { Loading }  from './LoadingComponent';

//redux
import { connect } from 'react-redux';
import {  baseUrl } from '../shared/baseUrl';

//animated table 
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

function History(item) {
    if (item != null ) {
         return(
           <Card>
           <Card.Title>Our History</Card.Title>
           <Card.Divider></Card.Divider>
           <Text style={{marginBottom: 10}}>
            Started in 2010, Ristorante con Fusion quickly established itself as a culinary 
            icon par excellence in Hong Kong.
            With its unique brand of world fusion cuisine that can be found nowhere else, 
            it enjoys patronage from the A-list clientele in Hong Kong.
            Featuring four of the best three-star Michelin chefs in the world, 
            you never know what will arrive on your plate the next time you visit us.
            The restaurant traces its humble beginnings to The Frying Pan,
            a successful chain started by our CEO, Mr. Peter Pan, 
            that featured for the first time the world's best cuisines in a pan.
            </Text>
       </Card>
      
       );
    }
    else {
        return(
           <View></View>
        );
    }
      
};



class About extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            // leaders: LEADERS
         }
    }


    render() { 
        const renderAboutItem = ({item, index}) => {
            return (
            
            <ListItem key={index} bottomDivider>
                <Avatar rounded source={{uri: baseUrl + item.image }} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            </ListItem.Content>
            </ListItem>
            
            );

        }
        if(this.props.leaders.isLoading){
            return(
            <ScrollView >
                <View>
                     <History />
                     <Card>
                     <Card.Title>Corporated Leadership</Card.Title>
                        <Loading />
                    </Card>
                </View>
            </ScrollView>
            );
        }

        else if (this.props.leaders.errMess){
            return(
                <ScrollView >
                <View>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <History />
                     <Card>
                     <Card.Title>Corporated Leadership</Card.Title>
                      <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                    </Animatable.View>
                </View>
            </ScrollView>
            );
        }

        else {
            return (
            <ScrollView >
           <View>
           <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <History />
                <Card>
                <Card.Title>Corporated Leadership</Card.Title>
                <Card.Divider></Card.Divider>
                    <FlatList 
                        data={this.props.leaders.leaders}
                        renderItem={renderAboutItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
           </Animatable.View>
            </View>
            </ScrollView>
        );
        
        }
        
        
    }
}


 
export default connect(mapStateToProps)(About);