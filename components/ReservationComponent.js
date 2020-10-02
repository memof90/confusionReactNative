import React, { Component } from 'react';
import { Text,  View, ScrollView, StyleSheet, Switch, Button, Modal } from 'react-native';
import {Card } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
const options = {month: 'short', day: '2-digit',year: 'numeric' };

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            guests: 1,
            smoking: false,
            date: new Date(1598051730000),
            showModal: false,
            
         }
    }


    handleReservation() {
        console.log(JSON.stringify(this.state));
        // this.setState({
        //     guests: 1,
        //     smoking: false,
        //     date: new Date(),
        // });
        this.toggleModal();
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(1598051730000),
            showModal: false
        });
    }

 
    render() {
        const state = this.state; 
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
                    dateFormat="dayofweek day month"
                    minimumDate={new Date(1950, 0, 1)}
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
                <Modal 
                animationType={'slide'}
                transparent={false}
                visible={this.state.showModal}
                onDismiss={() => {this.toggleModal(); this.resetForm(); }}
                onRequestClose={() => {this.toggleModal(); this.resetForm();}}
                >
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Your Reservation</Text>
                    <Text style={styles.modalText}> Number of Guests: {this.state.guests.toString()}</Text>
                    <Text style={styles.modalText}> Smoking?: {this.state.smoking ? 'yes' : 'No'.toString()}</Text>
                    <Text style={styles.modalText}> Date and Time: {this.state.date.toLocaleDateString("en-US",options)}</Text>
                    <Button 
                        onPress={() => {this.toggleModal(); this.resetForm();}}
                        color='#512da8'
                        title='Close'
                    />
                </View>
                </Modal>
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
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})
 
export default Reservation;