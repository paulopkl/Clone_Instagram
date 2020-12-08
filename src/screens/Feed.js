import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Post from '../components/Post';

import { fetchPosts } from '../store/actions/posts';

class Feed extends Component {

    componentDidMount = () => {
        this.props.onGetPosts();
    }

    render() {
        return (
            <View style={styles.container}>
                <Header />
                <FlatList
                    data={this.props.posts}
                    keyExtractor={item => `${item.id}`} // Can't be a Number
                    renderItem={render => <Post key={render.item.id} id={render.item.id}
                        comments={render.item.comments} {...render.item} />}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
});

const mapStateToProps = state => ({ posts: state.posts.posts });

const mapDispatchToProps = dispatch => ({ onGetPosts: () => dispatch(fetchPosts()) })

const feed = connect(mapStateToProps, mapDispatchToProps)(Feed);

export default feed;