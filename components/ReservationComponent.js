import React, { Component } from 'react';
import { Text,  View, ScrollView, StyleSheet, Switch, Button, Modal, Alert, Appearance } from 'react-native';
import {Card } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
//animated table 
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

const options = {month: 'short', day: '2-digit',year: 'numeric' };

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            guests: 1,
            smoking: false,
            date: new Date(1598051730000),
            showModal: false,
            show: false,
            mode: 'date',
            
         }
    }

    



    handleReservation() {
        console.log(JSON.stringify(this.state));
        // this.setState({
        //     guests: 1,
        //     smoking: false,
        //     date: new Date(),
        // });
 
        Alert.alert(
            'Your Reservation Ok?',
            'Number of Guest:' + this.state.guests + ' ' +  'smoking?: ' + this.state.smoking + ' ' +  'Date and Time:' + this.state.date,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel form'),
                    style: 'cancel'
                },
                {
                    text:'OK',
                    onPress: () =>  {
                        this.toggleModal();
                        this.addReservationToCalendar(this.state.date);
                        this.presentLocalNotification(this.state.date)}
                }
            ],
            {cancelable: false}
        )
       
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    datePicker = () => {
        this.setState({
          show: !this.state.show,
          mode: this.state.mode
        });
      }

      setDate = (event, date) => {
        date = date || this.state.date;
        if (this.state.mode == 'date') {
          this.setState({
            show: Platform.OS !== 'ios' ? true:false, //to show the picker again in time mode
            mode: 'time',
            date
          });
        } else {
          this.setState({
            show: Platform.OS === 'ios' ? true:false,
            mode: 'date',
            date
          });
        }
      }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(1598051730000),
            showModal: false
        });
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    // async presentLocalNotification(date) {
    //     await this.obtainNotificationPermission();
    //    Notifications.presentNotificationAsync({
    //         title: 'Your Reservation',
    //         body: 'Reservation for '+ date + ' requested',
    //         ios: {
    //             allowSound: true
    //         },
    //         android: {
    //             allowSound: true,
    //             // vibrate: true,
    //             // color: '#512DA8'
    //         }
    //     });
    // }

    // async obtainNotificationPermission() {
    //     let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
    //     if (permission.status !== 'granted') {
    //       permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
    //       if (permission.status !== 'granted') {
    //         Alert.alert('Permission not granted to show notifications');
    //       }
    //     }
    //     return permission;
    //   }
    
      async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
          }),
        });
        Notifications.scheduleNotificationAsync({
          content: {
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
          },
          trigger: null,
        });
      }


      async obtainCalendarPermission() {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
          permission = await Permissions.askAsync(Permissions.CALENDAR);
          if (permission.status !== 'granted') {
            Alert.alert('Permission not granted to access calendar')
          }
        }
        return permission;
      }

      async getDefaultCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        return defaultCalendars[0].source;
      }

      async addReservationToCalendar(date) {
        await this.obtainCalendarPermission();
    
        let dateMs = Date.parse(date);
        let startDate = new Date(dateMs);
        let endDate = new Date(dateMs + 2 * 60 * 60 * 1000);
    
        const defaultCalendarSource =
          Platform.OS === 'ios'
          ? await this.getDefaultCalendarSource()
          : { isLocalAccount: true, name: 'Expo Calendar' };
    
        let details = {
          title: 'Con Fusion Table Reservation',
          source: defaultCalendarSource,
          name: 'internalCalendarName',
          color: 'blue',
          entityType: Calendar.EntityTypes.EVENT,
          sourceId: defaultCalendarSource.id,
          ownerAccount: 'personal',
          accessLevel: Calendar.CalendarAccessLevel.OWNER,
        }
    
        const calendarId = await Calendar.createCalendarAsync(details);
    
        await Calendar.createEventAsync(calendarId , {
          title: 'Con Fusion Table Reservation',
          startDate: startDate,
          endDate: endDate,
          timeZone: 'Asia/Hong_Kong',
          location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        });
      }

 
    render() {
        const reservationDate = JSON.stringify(this.state.date.toGMTString('YYYY-MM-dd'));
        const colorScheme = Appearance.getColorScheme();
        return ( 
            <ScrollView>
            <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
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
            <View style={styles.formRow}>
              <Button
                title='Pick a Date'
                color='#512DA8'
                onPress={() => this.datePicker()}
                accessibilityLabel='Learn more about this purple button'
              />
            </View>
            {/*<TouchableOpacity onPress={this.datePicker} styles={styles.formItem}>
              <Icon name='calendar-plus' type='font-awesome-5' size={22} style={{margin:10, justifyContent: 'flex-start'}} />
              <Text>{reservationDate}</Text>
            </TouchableOpacity>*/}
          {this.state.show &&
            <DateTimePicker
              value={this.state.date}
              mode={this.state.mode}
              is24Hour={true}
              display='default'
              onChange={this.setDate}
              style={{width: 320, backgroundColor: "white"}} 
            />
            
          }
        </View>
                {/* <View style={styles.formRow}>
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
                </View> */}
                <View style={styles.formRow}>
                    <Button
                    onPress={() => this.handleReservation()}
                    title="Reserve"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                    >
                        
                    </Button>
                </View>
            </Animatable.View>

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