import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text} from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as MailComposer from 'expo-mail-composer';

//animated table 
import * as Animatable from 'react-native-animatable';

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


class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    sendMail(){
        MailComposer.composeAsync({

            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern: '
        })
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
            <View>
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
             <RenderContact />
             <Button 
                 title="send Email"
                 buttonStyle={{backgroundColor: "#512da8"}}
                 icon={{
                            name: "envelope-o",
                            size: 15,
                            type: 'font-awesome',
                            color: "white"
                        }}
                    onPress={this.sendMail}
             />
         </Animatable.View>
            </View>
       
           
         );
    }
}
 
export default Contact;


