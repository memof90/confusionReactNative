import React, { Component, useState, useRef } from 'react';
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, TouchableHighlight, TextInput, Alert, PanResponder, Button, Share,SafeAreaView} from 'react-native';
import { Card, Icon, Rating, AirbnbRating } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postComment, postFavorite } from '../redux/ActionCreators';
import {Picker} from '@react-native-picker/picker';

//animated table 
import * as Animatable from 'react-native-animatable';



const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites,

    }
  }

  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})




function RenderDish(props) {
    // const [modalVisible, setModalVisible] = useState(false);
    // const [rating, setRating] = useState('');
    // const [author, setAuthor] = useState('');
    // const [comment, setComment] = useState('');
    const dish = props.dish;



//   handleViewRef = ref => this.view = ref;
 const viewRef = useRef(null);


    
   
    const recognizeDrag = ({moveX, moveY, dx, dy }) => {
        if ( dx < -200 ) 
            return true;
        else 
             return false;
        
           
        
        
    }

    const recognizeDragModal = ({moveX, moveY, dx, dy }) => {
        if (dx > 200)
        return true;
        else
            return false;
    }

    // const panResponderModal = PanResponder.create({
    //     onStartShouldSetPanResponder: (e, gestureState) => {
    //         return true;
    //     },
    //     onPanResponderEnd: (e, gestureState) => {
    //         if (recognizeDrag(gestureState))
    //         onPress: () => props.toggleModal()

    //         return true
    //     }

        
    // })

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            if(viewRef) {
                viewRef.current.rubberBand(1000)
                .then(endState => console.log(endState.finished  ? 'finished' : 'cancelled'));
            }
            // this.view.rubberBand(1000)
            // .then(endState => console.log(endState.finished  ? 'finished' : 'cancelled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add to Favorites?',
                    'Are you sure you wish to add' + dish.name + ' to your favorites?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel presed'),
                            style: 'cancel'
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ? console.log('Alredy favorite') : props.onPress()
                        }
                    ],
                    {cancelable: false}

                )
            if(recognizeDragModal(gestureState))
            props.toggleModal()

            return true;
        },
        // onPanResponderStart: (e, gestureState) => {
        //     if(recognizeDragModal(gestureState))
        //     props.toggleModal()

        //     return true;
        // }
    })

    
        // function handleReservation() {
        //     console.log(JSON.stringify('rating is :' + ' ' +  rating + ', ' + 'author is :' + ' ' +  author + ', ' + 'comment is :' + ' ' + comment));
            
        // }
    
        //   onValueChange={(itemValue, itemIndex) => 
        //     setRating({rating: itemValue})

        const shareDish = (title, message, url) => {
            Share.share({
                title: title,
                message: title + ': ' + message + ' ' + url,
                url: url
            }, {
                dialogTitle: 'Share ' + title
            })
        }

    if (dish != null) {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
            ref={viewRef}
            {...panResponder.panHandlers}
            >
            <Card>
                <Card.Image source={{uri: baseUrl + dish.image}}>
                    <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
                </Card.Image>
                <Text style={{margin: 10}}>{dish.description}</Text>
                <View style={{ 
                               flexDirection: 'row',
                               alignItems: 'center',
                               justifyContent: 'center'}}>
                <View >
                <Icon 
                raised   
                reverse
                name={props.favorite ? 'heart' : 'heart-o'}
                type='font-awesome'
                color='#f50'
                onPress={() => props.favorite ? console.log('Alredy favorite') : props.onPress()}
                />
                </View>
                <View >
                <Icon 
                raised   
                reverse
                name='edit'
                type='font-awesome'
                color='#512da8'
                onPress={() => props.toggleModal()}
                />
                </View> 
                <View >
                <Icon 
                raised   
                reverse
                name='share'
                type='font-awesome'
                color='#51d2a8'
                onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
                />
                </View> 
                </View>

            </Card>
            </Animatable.View>

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


function RenderComments(props) {
    const comments = props.comments;

   const  rating = props.rating;
   const author = props.author;
   const comment = props.comment;
   const date = props.date;



    const renderCommentItem = ({item, index}) => {

        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Starts</Text>
                <Text style={{fontSize: 12}}>{'--' + item.author+ ', ' + item.date}</Text>
            </View>
            </Animatable.View>

        );
    }  

    return(
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Card>
        <Card.Title>Comments</Card.Title>
            <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
            <Text>{comment}</Text>
            <Text>{rating}</Text>
            <Text>{author} {date}</Text>
        </Card> 
        </Animatable.View>

    );
}




class Dishdetail extends Component{

    constructor(props){
        super(props);
        this.state = {
            // dishes: DISHES,
            // comments: COMMENTS,
            // favorites: []
            showModal: false,
            rating: 4,
            author: '',
            comment: '',
            dishId: '',
        }
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
        // this.setState({
        //     favorites: this.props.favorites.concat(dishId)
        // })
    }


    handleReservation() {
        this.toggleModal();
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    resetForm(){
        console.log(JSON.stringify('rating is :' + ' ' +  this.state.rating + ', ' + 'author is :' + ' ' +  this.state.author + ', ' + 'comment is :' + ' ' + this.state.comment));
        this.props.postComment(this.state.dishId, this.state.rating, this.state.author, this.state.comment);
    }


    render(){
        const dishId = this.props.route.params.dishId;
        const renderDishes = () => {
            return(
              <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                 favorite={this.props.favorites.some(el => el === dishId)}
                 showModal={this.state.showModal}
                onPress={() => {this.markFavorite(dishId)}}
                toggleModal={() => {this.toggleModal()}}
               /> 
            )
        }

        const renderComments = () => {
            return (

                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} 
                  postComment={this.props.postComment}
                  rating={this.state.rating}
                  author={this.state.author}
                  comment={this.state.comment}
                  dishId={this.state.dishId}
              />
            )
        }
        return(
            <View>
            <FlatList 
                ListHeaderComponent={renderDishes}
                ListFooterComponent={renderComments}
            />

               <View >
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.showModal}
                onRequestClose={() => {
                    this.toggleModal(); this.resetForm();
                }}
                onRequestClose={() => {this.toggleModal(); this.resetForm();}}
            >
                <View>
                <View style={styles.modal} >
                <Text style={styles.modalTitle}>Your Comments</Text>
                <ScrollView>
                    <View style={styles.formRow}>
                    <Text style={styles.formLabel}> Your Rating</Text>
                    {/* <AirbnbRating
                        count={11}
                        reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
                        defaultRating={11}
                        size={20}
                        /> */}
                        <Rating showRating fractions="{1}" startingValue={this.state.rating}
                        onFinishRating={(rating) => this.setState({rating})}
                            
                            // onFinishRating={ratingCompleted}
                            />
                    {/* <Rating
                    showRating
                    onFinishRating={ratingCompleted}
                    style={{ paddingVertical: 10 }}
                    /> */}

                    </View>
                        {/* <View style={styles.formRow}>
                            <Text style={styles.formLabel}> Your Rating</Text>
                            <Picker 
                                style={styles.formItem}
                                selectedValue={rating}
                                onValueChange={(itemValue, itemIndex) => 
                            setRating({rating: itemValue})
                            }>
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            </Picker>
                        </View> */}
                        <View style={styles.modal}>
                            <TextInput
                            style={{ height: 40, borderBottomColor: '#000000',borderBottomWidth: 1 }}
                            value={this.state.author}
                            onChangeText={author => this.setState({ author}) }
                            numberOfLines={4}
                            placeholder="Author"
                            >
                            </TextInput>
                        </View>
                        <View style={styles.modal}>
                            <TextInput
                            style={{ height: 40, borderBottomColor: '#000000',borderBottomWidth: 1 }}
                            value={this.state.comment}
                            onChangeText={comment => this.setState({comment}) }
                            numberOfLines={4}
                            placeholder= "Comment"
                            >
                            </TextInput>
                        </View>
                    </ScrollView>
                    <View>
                    <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#512DA8", marginTop: 60 }}
                    onPress={() => {
                     this.resetForm(); ; this.toggleModal();
                    }}
                    >
                    <Text style={styles.textStyle}>Submit</Text>
                    </TouchableHighlight>
                    </View>
                    <View style={{marginTop: 20}}>
                    <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "gray" }}
                    onPress={() => {
                       this.handleReservation(); this.toggleModal();
                    }}
                    >
                    <Text style={styles.textStyle}>Close</Text>
                    </TouchableHighlight>
                    </View>
                </View>
                </View>
            </Modal>
                </View>
            </View>
            
        );
    }
    
}

const styles = StyleSheet.create({
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
    },
    openButton: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      }
  });

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);

