import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AuthProvider} from './context/authContext';
import ScreenMenu from './components/Menus/ScreenMenu';
import {PostProvider} from './context/postContext';

export default function RootNavigation() {
  return (
    <AuthProvider>
      <PostProvider>
        <ScreenMenu />
      </PostProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});
