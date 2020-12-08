import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback as Touch, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { addComment } from '../store/actions/posts';

class AddComment extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            comment: '',
            editMode: false
        }
    }

    handleAddComment = () => {
        const { postId, nickname } = this.props;

        this.props.onAddcomment({ 
            postId, 
            comment: { nickname, comment: this.state.comment } 
        });
        
        this.setState({ comment: '', editMode: false });
    }

    render() {
        let commentArea = null;

        if (this.state.editMode) {
            commentArea = (
                <View style={styles.container}>
                    <TextInput 
                        placeholder="Can Comment..." 
                        style={styles.input} 
                        autoFocus={true} 
                        value={this.state.comment}
                        onChangeText={text => this.setState({ comment: text })}
                        onSubmitEditing={this.handleAddComment} // Submeter ao apertar [ENTER]
                    />
                    <Touch onPress={() => this.setState({ editMode: false })}>
                        <Icon name="times" size={15} color="#555" />
                    </Touch>
                </View>
            );
        } else {
            commentArea = (
                <Touch onPress={() => this.setState({ editMode: true })}>
                    <View style={styles.container}>
                        <Icon name="comment-o" size={25} color="#555" />
                        <Text style={styles.caption}>
                            Type a comment...
                        </Text>
                    </View>
                </Touch>
            );
        }

        return (
            <View style={{ flex: 1 }}>
                {commentArea}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },

    caption: {
        marginLeft: 10,
        fontSize: 12,
        color: "#CCC"
    },

    input: {
        width: '90%'
    }
});

const mapStateToProps = state => ({ nickname: state.user.name });

const mapDispatchToProps = dispatch => ({ onAddcomment: payload => dispatch(addComment(payload)) });

const add_comment = connect(mapStateToProps, mapDispatchToProps)(AddComment);

export default add_comment;