import React, { Component, useState } from 'react';
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, TouchableHighlight, TextInput} from 'react-native';
import { Card, Icon, Rating, AirbnbRating } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postComment, postFavorite } from '../redux/ActionCreators';
import {Picker} from '@react-native-community/picker';



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

    
        // function handleReservation() {
        //     console.log(JSON.stringify('rating is :' + ' ' +  rating + ', ' + 'author is :' + ' ' +  author + ', ' + 'comment is :' + ' ' + comment));
            
        // }
    
        //   onValueChange={(itemValue, itemIndex) => 
        //     setRating({rating: itemValue})
            
      

    if (dish != null) {
        return(
            <Card>
                <Card.Image source={{uri: baseUrl + dish.image}}>
                    <Card.FeaturedTitle>{dish.name}</Card.FeaturedTitle>
                </Card.Image>
                <Text style={{margin: 10}}>{dish.description}</Text>
                <View style={{ flex: 1,
                               flexDirection: 'row',
                               alignItems: 'center',
                               justifyContent: 'center'}}>
                <View>
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
                onPress={() => props.showModal ? console.log('Alredy modal'): props.onPress() }
                />
                </View> 
                </View>

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


function RenderComments(props) {
    const comments = props.comments;

   const  rating = props.rating;
   const author = props.author;
   const comment = props.comment;
   const date = props.date;



    const renderCommentItem = ({item, index}) => {

        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Starts</Text>
                <Text style={{fontSize: 12}}>{'--' + item.author+ ', ' + item.date}</Text>
            </View>
        );
    }  

    const renderCommentTwo = () => {
        return(
            <View>
               <Text>{props.postComment.rating}</Text>
            </View>
        );
    }
    return(
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
            rating: Number,
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
        return(
            <ScrollView>
              <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                 favorite={this.props.favorites.some(el => el === dishId)}
                 showModal={this.state.showModal}
                onPress={() => {this.markFavorite(dishId); this.toggleModal()}}
               /> 
              <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} 
                  postComment={this.props.postComment}
                  rating={this.state.rating}
                  author={this.state.author}
                  comment={this.state.comment}
                  dishId={this.state.dishId}
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
            </ScrollView>
            
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

