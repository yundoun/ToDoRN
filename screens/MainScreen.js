import { FlatList, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import InputForm from '../components/InputForm'
import TodoItem from '../components/TodoItem'
import { useSelector } from 'react-redux'
import { signOut, getAuth } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'

const MainScreen = () => {

  const todos = useSelector(state => state.todo.todos)
  const todoTasks = todos.filter((item) => item.state === 'todo');
  const completedTasks = todos.filter((item) => item.state === 'done');
  const auth = getAuth()
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
      Toast.show({
        type: 'success',
        position: 'top',
        text1: '로그아웃',
        text2: '로그아웃 되었습니다.'
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar barStyle={'default'} />
      <View style={{ zIndex: 1 }}>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.PageTitle}>ToDo App</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logOutText}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listView}>
        <Text style={styles.listTitle}>할 일</Text>
        {todoTasks.length !== 0 ? (
          <FlatList
            data={todoTasks}
            renderItem={({ item }) => <TodoItem {...item} />}
            keyExtractor={(item) => item.id}
          />
        ) :
          (<Text style={styles.emptyListText}>할 일이 없습니다.</Text>)
        }
      </View>
      <View style={styles.separator} />
      <View style={styles.listView}>
        <Text style={styles.listTitle}>완료된 일</Text>
        {completedTasks.length !== 0 ? (
          <FlatList
            data={completedTasks}
            renderItem={({ item }) => <TodoItem {...item} />}
            keyExtractor={(item) => item.id}
          />
        ) :
          (<Text style={styles.emptyListText}>완료된 일이 없습니다.</Text>)
        }
      </View>
      <InputForm />
    </SafeAreaView>

  )
}

export default MainScreen

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: '#f7f8fa',
  },
  PageTitle: {
    marginBottom: 35,
    paddingHorizontal: 15,
    fontSize: 54,
    fontWeight: '600'
  },
  separator: {
    marginHorizontal: 10,
    marginTop: 25,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)'
  },
  listView: {
    flex: 1,
  },
  listTitle: {
    marginBottom: 25,
    paddingHorizontal: 15,
    fontSize: 41,
    fontWeight: '500'
  },
  emptyListText: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
    fontSize: 15,
    lineHeight: 20,
    color: '#737373'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoutButton: {
    marginBottom: 25,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 42,
    height: 42,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 4
  },
  logOutText: {
    color: 'white',
    fontSize: 25,
  }
})