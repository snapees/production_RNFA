import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function SubmitButton({handleSubmit, btnTitle, loading}) {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
      <Text style={styles.btnText}>
        {loading ? 'Please Wait...' : btnTitle}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  submitBtn: {
    backgroundColor: '#1e2225',
    height: 50,
    marginHorizontal: 50,
    borderRadius: 80,
    justifyContent: 'center',
    // alignItems: 'center',
    marginVertical: 15,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '400',
  },
});
