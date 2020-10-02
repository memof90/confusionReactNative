import React, { Component } from 'react';
import { Text,  View, ScrollView, StyleSheet, Switch, Button } from 'react-native';
import {Card } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
// import DateTimePickerModal from "react-native-modal-datetime-picker";

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            guests: 1,
            smoking: false,
            date: new Date(),
            
         }
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
        });
    }


 
    render() { 
        return ( 
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker 
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => 
                        this.setState({guests: itemValue})
                    }>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smokig/Non-Smoking</Text> 
                    <Switch 
                        
                        value={this.state.smoking}
                        ios_backgroundColor='#512DA8'
                        onValueChange={(value) =>
                        this.setState({smoking: value})}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
                <DateTimePicker 
                    value={this.state.date}
                    date={this.state.date}
                    style={{flex:2, marginRight: 20}}
                    dateFormat=''
                    minimumDate={Date.UTC(2019, 2, 18)}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                },
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {
                                this.setState({date: date})
                            }}
                >

                </DateTimePicker>
                </View>
                <View style={styles.formRow}>
                    <Button
                    onPress={() => this.handleReservation()}
                    title="Reserve"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                    >
                        
                    </Button>
                </View>
            </ScrollView>
         );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
})
 
export default Reservation;