import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const InputBox = ({
  title,
  autoComplete,
  keyboardType,
  secureTextEntry = false,
  value,
  setValue,
}) => {
  return (
    <View>
      <Text>{title}</Text>
      <TextInput
        style={styles.inputBox}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={text => setValue(text)}
      />
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  inputBox: {
    width: '100%',
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 10,
    // marginTop: 10,
    color: 'black',
    marginVertical: 10,
  },
});
