import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Alert, Keyboard, Image } from 'react-native';
import { Stack } from 'expo-router';
import Task from '../components/Task';
import ModalTask from '../components/ModalTask';
import React, { useState } from 'react';

import { COLORS, icons, images } from '../constants';
import { ScreenHeader } from '../components';

const Home = () => {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [taskId, setTaskId] = useState(0)
  const [taskColor, setTaskColor] = useState("#FFF");

  const addTask = () => {
    Keyboard.dismiss();
    if (task === "" || task === null || task === undefined) {
      Alert.alert('Error', 'Task can not be empty.');
    } else {
      setTaskId(prev => prev + 1);
      setTaskList([...taskList, { taskId: taskId, taskName: task, taskColor: taskColor }]);
      setTask(null);
      setSelectedColor(null);
      setModalVisible(false);
    }
  }

  const deleteTask = async (taskId) => {
    const updatedArray = taskList.filter((obj) => obj.taskId !== taskId);
    setTaskList(updatedArray);
    setTask(null);
    setSelectedColor(null);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.coolGrey }}>
      <Stack.Screen options={{
        headerStyle: { 
          backgroundColor: COLORS.coolGrey, 
          paddingHorizontal: 20, 
          paddingVertical: 20 },
        headerShadowVisible: false, 
        headerLeft: () => (
          <ScreenHeader iconUrl={icons.light} dimension="60%" />
        ),
        headerRight: () => (
          <ScreenHeader iconUrl={images.profile} dimension="100%" />
        ), 
        headerTitle: ""
      }} />

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.tasksWraper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>

          <View style={styles.items}>
            {taskList.map((item, index) => {
              return (
              <TouchableOpacity key={index}>
                <Task 
                  taskId={item.taskId}
                  taskText={item.taskName} 
                  taskColor={item.taskColor}
                  setTaskColor={setTaskColor} 
                  onDelete={() => deleteTask(item.taskId)} 
                  taskList={taskList}
                  setTaskList={setTaskList}/>
              </TouchableOpacity>)
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.writeTaskWrapper}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.addWrapper}>
            <Image source={icons.plus} resizeMode="cover" style={styles.btnImg}/>
          </View>
        </TouchableOpacity>
      </View>

      <ModalTask 
        handleAddTask={addTask} 
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor} 
        isModalVisible={isModalVisible}
        closeModal={() => setModalVisible(false)}
        task={task} 
        setTask={setTask}
        setTaskColor={setTaskColor}
        newTask={true}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    background: '#fff'
  }, 
  scrollContainer: {
    flexGrow: 1
  },
  tasksWraper: {
    paddingTop: 50, 
    paddingHorizontal: 20, 
  }, 
  sectionTitle: {
    fontSize: 24, 
    fontWeight: 'bold'
  }, 
  items: {
    marginTop: 30
  }, 
  writeTaskWrapper: {
    position: 'absolute', 
    bottom: 30, 
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
  }, 
  textInput: {
    paddingVertical: 15, 
    paddingHorizontal: 15,
    width: 250, 
    backgroundColor: "#fff", 
    borderRadius: 15, 
    borderColor: "#C0C0C0", 
    borderWidth: 1, 
  }, 
  addWrapper: {
    width: 50, 
    height: 50, 
    backgroundColor: "#FFF", 
    borderRadius: 60, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderColor: "#C0C0C0", 
    borderWidth: 0.5, 
  }, 
  btnImg: {
    width: 25,
    height: 25,
  },
})

export default Home;