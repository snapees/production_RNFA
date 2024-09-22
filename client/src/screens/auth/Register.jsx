import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import InputBox from '../../components/Forms/InputBox';
import SubmitButton from '../../components/Forms/SubmitButton';
import axios from 'axios';

export default function Register({navigation}) {
  // states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // function
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert('Please fill all fields');
        setLoading(false);
        return;
      }
      setLoading(false);
      const {data} = await axios.post('/auth/register', {
        name,
        email,
        password,
      });
      alert(data && data.message);
      navigation.navigate('Login');
      console.log('Got Register Data: ', {name, email, password});
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={{marginHorizontal: 20}}>
        <InputBox
          title={'Username'}
          keyboardType={'name-address'}
          autoComplete={'name'}
          value={name}
          setValue={setName}
        />
        <InputBox
          title={'Email'}
          keyboardType={'email-address'}
          autoComplete={'email'}
          value={email}
          setValue={setEmail}
        />
        <InputBox
          title={'Password'}
          keyboardType={'passwprd-address'}
          autoComplete={'password'}
          secureTextEntry={true}
          value={password}
          setValue={setPassword}
        />
      </View>
      {/* <Text>{JSON.stringify({name, email, password}, null, 4)}</Text> */}
      <SubmitButton
        btnTitle={'Register'}
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}>
        Allready Registered!{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'lightgrey',
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  inputBox: {
    width: '100%',
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 10,
    // marginTop: 10,
    color: 'black',
    marginVertical: 10,
  },
  linkText: {
    textAlign: 'center',
    fontSize: 18,
  },
  link: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
});
