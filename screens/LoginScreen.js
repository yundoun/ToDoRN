import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import ListIcon from '../assets/list.svg'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('onAuthStateChanged', user);
      if (user) {
        navigation.replace('Main');
      }
    });
  }, []);

  const handleSignUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log('user', user);
      Toast.show({
        type: 'success',
        position: 'top',
        text1: '회원가입 성공',
        text2: '${email} 계정으로 회원가입이 완료되었습니다.'
      });
    } catch (error) {
      console.log(error.message);
      Alert.alert(
        "회원가입 도중에 문제가 발생했습니다.",
        error.message,
        [{ text: '닫기', onPress: () => console.log('닫기') }],
        { cancelable: true }
      )
    }
  };

  const handleLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      console.log('user', user);
      Toast.show({
        type: 'success',
        position: 'top',
        text1: '로그인 성공',
        text2: '${email} 계정으로 로그인이 완료되었습니다.'
      });
    } catch (error) {
      Alert.alert(
        "로그인 도중에 문제가 발생했습니다.",
        error.message,
        [{ text: '닫기', onPress: () => console.log('닫기') }],
        { cancelable: true }
      )
    }

  }

  return (
    <View
      style={styles.container}
    >
      <Toast />
      <ListIcon />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="이메일"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="비밀번호"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={handleSignUp}
        >
          <Text styles={styles.buttonOutlineText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>

  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    marginTop: 15
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5
  },
  buttonContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  button: {
    backgroundColor: 'black',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16
  }
})