import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {createContext, useEffect, useState} from 'react';

// context
const AuthContext = createContext();

// provider
const AuthProvider = ({children}) => {
  // global state
  const [state, setState] = useState({user: null, token: ''});

  // initial local storage data
  useEffect(() => {
    const loadLoaclStorageData = async () => {
      let data = await AsyncStorage.getItem('@auth');
      let loginData = JSON.parse(data);
      setState({...state, user: loginData?.user, token: loginData?.token});
    };
    loadLoaclStorageData();
  }, []);

  let token = state && state?.token;

  // default axios setting
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  // axios.defaults.baseURL = 'http://192.168.1.35:8080/api/v1';
  axios.defaults.baseURL = 'https://production-rnfa-twhp.onrender.com/api/v1';

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
