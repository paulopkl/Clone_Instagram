import React, { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import Header from './src/components/Header';
import Post from './src/components/Post';

class App extends Component {
 
  render() {
    const comments = [
      { nickname: 'Joana Elena Silva', comment: 'Excelente Foto!' },
      { nickname: 'Rafael Gustavo Pereira', comment: 'Muito ruim! faço melhor...' },
      // { nickname: 'Joana Elena Silva', comment: 'Excelente Foto!' },
    ]

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <Post image={require('./assets/imgs/fence.jpg')} comments={comments} />
      </SafeAreaView>
    );
  }

};

export default App;