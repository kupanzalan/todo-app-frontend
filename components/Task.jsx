import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { icons } from '../constants';
import ModalTask from '../components/ModalTask';

import styles from './task.style';

const Task = ({ taskId, taskText, taskColor, setTaskColor, onDelete, taskList, setTaskList }) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(taskColor);
  const [taskDescription, setTaskDescription] = useState(taskText);
  const swipeableRef = useRef(null);

  const editTask = (taskId) => {
    setTaskList((previousTasks) => {
      return previousTasks.map((task) => {
        if (task.taskId === taskId) {
          return { taskId: taskId, taskName: taskDescription, taskColor: selectedColor }
        }
        return task;
      })
    })
    setIsModalVisible(false);
  };

  const leftSwipe = () => {
    return (
      <TouchableOpacity style={styles.deleteBox} onPress={handleDelete}>
        <View>
            <Image source={icons.trash} resizeMode="cover" style={styles.btnImg}/>        
        </View>
      </TouchableOpacity> 
    )
  }

  const handleDelete = () => {
    onDelete();
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  const rightSwipe = () => {
    return (
      <TouchableOpacity style={styles.editBox} onPress={handleEdit}>
        <View>
            <Image source={icons.edit} resizeMode="cover" style={styles.btnImg}/>
        </View>
      </TouchableOpacity>
    )
  }

  const handleEdit = () => {
    setSelectedColor(taskColor);
    setTaskDescription(taskText);
    setIsModalVisible(true);
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  }

  return (
    <>
      <Swipeable 
        ref={swipeableRef}
        renderLeftActions={leftSwipe}
        renderRightActions={rightSwipe}>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <View style={styles.square(taskColor)}></View>
            <Text style={styles.itemText}>{taskText}</Text>
          </View>
          <View style={styles.circular}></View>
        </View>
      </Swipeable>
      <ModalTask 
        handleAddTask={() => editTask(taskId)} 
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor} 
        isModalVisible={isModalVisible}
        closeModal={() => setIsModalVisible(false)}
        task={taskDescription} 
        setTask={setTaskDescription}
        setTaskColor={setTaskColor}
        newTask={false}/>
    </>
  )
}

export default Task
