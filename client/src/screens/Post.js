import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import FooterMenu from '../components/Menus/FooterMenu';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {PostContext} from '../context/postContext';

export default function Post({navigation}) {
  // global states
  const [posts, setPosts] = useContext(PostContext);
  // local states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // handle form post Data
  const handlePost = async () => {
    // alert(`your post title is ${title} and post desc is ${description}`);
    try {
      setLoading(true);
      // validate
      if (!title || !description) {
        alert('Please fill all fields');
      }
      // post data to server
      const {data} = await axios.post('/post/create-post', {
        title,
        description,
      });
      setLoading(false);
      setPosts([...posts, data?.post]);
      alert(data?.message);
      console.log('got the post: ', data);
      navigation.push('Home');
    } catch (error) {
      alert(error.response.data.message || error.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.heading}>Create a post</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="add post title"
            placeholderTextColor={'gray'}
            value={title}
            onChangeText={text => setTitle(text)}
          />
          <TextInput
            style={[styles.inputBox, {marginTop: 20}]}
            placeholder="add post description"
            placeholderTextColor={'gray'}
            multiline={true}
            numberOfLines={6}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
            <Text style={styles.postBtnText}>
              <FontAwesome5 name="plus-circle" size={20} /> {'  '}
              Create Post
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View
        style={{
          // flex: 1,
          // justifyContent: 'flex-end',
          backgroundColor: '#ffffff',
        }}>
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
    marginTop: 40,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    // color: 'blue',
    textTransform: 'uppercase',
  },
  inputBox: {
    width: '90%',
    marginTop: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 15,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  postBtn: {
    backgroundColor: 'black',
    marginTop: 30,
    width: 200,
    height: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
