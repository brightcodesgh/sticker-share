import React, { Component } from 'react';
import { Text, View } from 'react-native';

export class about extends Component {
  render() {
    return (
      <View className="flex-1 content-center bg-[#303030] justify-center">
        <Text className='text-white text-center'>THis is the about page</Text>
      </View>
    );
  }
}

export default about