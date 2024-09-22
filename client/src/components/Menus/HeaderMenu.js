import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../../context/authContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HeaderMenu() {
  const [state, setState] = useContext(AuthContext);
  //logout
  const handleLogout = async () => {
    setState({token: '', user: null});
    await AsyncStorage.removeItem('@auth');
    alert('logout Successfully');
  };
  return (
    <View>
      <TouchableOpacity onPress={handleLogout}>
        <FontAwesome5
          name="sign-out-alt"
          color={'black'}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    marginBottom: 3,
    alignSelf: 'center',
    fontSize: 25,
  },
});
