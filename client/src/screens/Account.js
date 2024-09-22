import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../context/authContext';
import FooterMenu from '../components/Menus/FooterMenu';
import axios from 'axios';

export default function Account() {
  // global state
  const [state, setState] = useContext(AuthContext);
  const {user, token} = state;
  // local state
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [email] = useState(user?.email);
  const [loading, setLoading] = useState(false);

  // handle update user data
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const {data} = await axios.put(
        '/auth/update-user',
        {
          name,
          password,
          email,
        },
        // {
        //   headers: {
        //     Authorization: `Bearer ${token && token}`,
        //   },
        // },
      );
      setLoading(false);
      let updatedData = JSON.stringify(data);
      setState({...state, user: updatedData?.updatedUser});
      alert(data && data.message);
      console.log('updated user: ', {name, password});
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageBox}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png',
            }}
            style={styles.image}
          />
        </View>

        <Text style={styles.warningText}>
          Currently You can only update name and password*
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Name</Text>
          <TextInput
            value={name}
            style={styles.inputBox}
            onChangeText={text => {
              setName(text);
              // console.log('updated text got: ', text);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput value={email} style={styles.inputBox} editable={false} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Role</Text>
          <TextInput
            value={state?.user.role}
            style={styles.inputBox}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Password</Text>
          <TextInput
            value={password}
            style={styles.inputBox}
            onChangeText={pass => {
              setPassword(pass);
              // console.log('updated text got: ', pass);
            }}
            secureTextEntry={true}
          />
        </View>

        <View
          style={{
            alignItems: 'center',
          }}>
          <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
            <Text style={styles.updateBtnText}>
              {loading ? 'Please Wait' : 'Update Profile'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* <Text>Name: {state?.user.name}</Text>
      <Text>Email: {state?.user.email}</Text>
      <Text>Role: {state?.user.role}</Text> */}
      </ScrollView>

      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <FooterMenu />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: 'space-between',
  },
  imageBox: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  warningText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    flexWeight: 'bold',
    width: 70,
    color: 'grey',
  },
  inputBox: {
    width: 300,
    backgroundColor: '#ddd',
    marginLeft: 10,
    fontSize: 16,
    paddingLeft: 10,
    borderRadius: 20,
  },
  updateBtn: {
    backgroundColor: 'black',
    height: 35,
    width: 200,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateBtnText: {
    color: 'white',
    fontSize: 16,
  },
});
