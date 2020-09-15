import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text} from 'react-native';
import { Card } from 'react-native-elements';

 function RenderContact(item) {
     if (item != null ) {
          return(
            <Card>
            <Card.Title>Contact Information</Card.Title>
            <Card.Divider></Card.Divider>
            <Text style={{marginBottom: 10}}>121, Clear Water Bay Road</Text>
            <Text style={{marginBottom: 10}}>Clear Water Bay, Kowloon</Text>
            <Text style={{marginBottom: 10}}>HONG KONG</Text>
            <Text style={{marginBottom: 10}}>Tel: +852 1234 5678</Text>
            <Text style={{marginBottom: 10}}>Fax: +852 8765 4321</Text>
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
        this.state = {  }
    }
    render() { 
        return ( 
          
            // <Card>
            //     <Card.Title>Contact Information</Card.Title>
            //     <Card.Divider></Card.Divider>
            //     <Text style={{marginBottom: 10}}>121, Clear Water Bay Road</Text>
            //     <Text style={{marginBottom: 10}}>Clear Water Bay, Kowloon</Text>
            //     <Text style={{marginBottom: 10}}>HONG KONG</Text>
            //     <Text style={{marginBottom: 10}}>Tel: +852 1234 5678</Text>
            //     <Text style={{marginBottom: 10}}>Fax: +852 8765 4321</Text>
            // </Card>
            <RenderContact />
           
         );
    }
}
 
export default About;