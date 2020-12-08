import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native'

class Splash extends Component {

    componentDidMount = () => {
        setTimeout(() => {
            this.props.navigation.navigate('App');
        }, 3000);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../assets/imgs/icon.png')} style={styles.image} />
                <Text style={styles.title}>Lambe-Lambe Art</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Allows the container to grow
        alignItems: 'center',
        justifyContent: 'center'
    },

    image: {
        height: 200,
        width: 200,
        resizeMode: 'contain'
    },

    title: {
        marginTop: Dimensions.get('window').height * 1 / 20,
        fontSize: 48,
        fontFamily: 'shelter',
    }
});

export default Splash;