import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import AddComment from './AddComment';

import Author from './Author';
import Comments from './Comments';

class Post extends Component {

    render() {
        const addComment = this.props.name ? <AddComment postId={this.props.id} /> : null;
        return (
            <View style={styles.container}>
                <Image source={this.props.image} style={styles.image} />
                <Author email={this.props.email} nickname={this.props.nickname} />
                <Comments comments={this.props.comments} />
                {addComment}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 3 / 4,
        resizeMode: 'contain'
    }
});

const mapStateToProps = state => ({
    name: state.user.name
});

const post = connect(mapStateToProps)(Post);

export default post;