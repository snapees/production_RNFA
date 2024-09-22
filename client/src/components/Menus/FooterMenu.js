import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function FooterMenu() {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <FontAwesome5
          name="home"
          size={20}
          style={styles.iconStyle}
          color={route.name === 'Home' && 'blue'}
        />
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Post')}>
        <FontAwesome5
          name="plus-circle"
          size={20}
          style={styles.iconStyle}
          color={route.name === 'Post' && 'blue'}
        />
        <Text>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Myposts')}>
        <FontAwesome5
          name="list"
          size={20}
          style={styles.iconStyle}
          color={route.name === 'Myposts' && 'blue'}
        />
        <Text>My Posts</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Account')}>
        <FontAwesome5
          name="user"
          size={20}
          style={styles.iconStyle}
          color={route.name === 'Account' && 'blue'}
        />
        <Text>Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
  },
  iconStyle: {
    marginBottom: 3,
    alignSelf: 'center',
    // fontSize: 25,
  },
});
