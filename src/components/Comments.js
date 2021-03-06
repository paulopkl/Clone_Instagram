import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class Comments extends Component {

    render() {
        let view = null;
        if (this.props.comments) {
            view = this.props.comments.map((comment, i) => (
                <View style={styles.commentContainer} key={i}>
                    <Text style={styles.nickname}>{comment.nickname}: </Text>
                    <Text style={styles.comment}>{comment.comment}</Text>
                </View>
            ));
        }

        return (
            <View style={styles.container}>
                {view}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    },

    commentContainer: {
        flexDirection: 'row',
        marginTop: 5
    },

    nickname: {
        marginLeft: 5,
        fontWeight: 'bold',
        color: '#444'
    },

    comment: {
        color: '#555'
    }
});

export default Comments;