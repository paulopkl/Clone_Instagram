import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions, Platform, Alert,
    ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { addPost } from '../store/actions/posts';

const noUser = "You need be logged to add images!";

class AddPhoto extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            image: null, // { uri: '', base64: 'aDddACCAsAAadCVFasFglççvADF' }
            comment: ''
        }
    }

    componentDidUpdate = prevProps => {
        if (prevProps.loading && !this.props.loading) {
            this.setState({ image: null, comment: '' });

            this.props.navigation.navigate('Feed');
        }
    }

    pickImage = () => {
        if (!this.props.name) {
            Alert.alert('Fail!', noUser);
            return;
        }

        ImagePicker.showImagePicker({ 
            title: 'Choose a image', 
            maxHeight: 600, 
            maxWidth: 800 
        }, res => {
            if (!res.didCancel) {
                this.setState({ 
                    image: {
                        uri: res.uri, 
                        base64: res.data 
                    }
                });
            }
        });
    }

    save = async () => {
        if (!this.props.name) {
            Alert.alert('Fail!', noUser);
            return;
        }

        await this.props.onAddPost({
            id: Math.random() * 10,
            nickname: this.props.name,
            email: this.props.email,
            image: this.state.image, // image: { uri: res.uri, base64: res.data }
            comments: [{
                nickname: this.props.name,
                comment: this.state.comment
            }]
        });

        // this.setState({ image: null, comment: '' });
        // this.props.navigation.navigate('Feed');
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Share a image!</Text>
                    <View style={styles.imageContainer}>
                        <Image source={this.state.image} style={styles.image} />
                    </View>
                    <TouchableOpacity onPress={this.pickImage} style={styles.button}>
                        <Text style={styles.buttonText}>Choose the image</Text>
                    </TouchableOpacity>
                    <TextInput 
                        placeholder="Any comments for the photo?" 
                        style={styles.input} 
                        value={this.state.comment}
                        onChangeText={text => this.setState({ comment: text })}
                        editable={this.props.name ? true : false}
                    />
                    <TouchableOpacity onPress={this.save} 
                    // disabled={this.props.loading  != 'false'}
                        style={[styles.button, this.props.loading ? styles.buttonDisabled : null]}>
                            <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

    title: {
        fontSize: 20,
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        fontWeight: 'bold',
    },

    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width * 3/4,
        backgroundColor: '#EEE',
        marginTop: 10,
    },
    
    image: { 
        width: '100%',
        height: Dimensions.get('window').width * 3/4,
        resizeMode: 'center',
    },

    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },

    buttonText: {
        fontSize: 20,
        color: '#FFF'
    },

    input: {
        marginTop: 20,
        width: '90%',
    },

    buttonDisabled: {
        backgroundColor: '#AAA'
    }
});


const mapStateToProps = state => ({
    name: state.user.name,
    email: state.user.email,
    loading: state.posts.isUploading
});

const mapDispatchToProps = dispatch => ({
    onAddPost: post => dispatch(addPost(post))
});

const addPhoto = connect(mapStateToProps, mapDispatchToProps)(AddPhoto);

export default addPhoto;