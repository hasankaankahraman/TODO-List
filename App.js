import React, { useState } from "react";
import { View,Text,StyleSheet, TextInput, FlatList, TouchableOpacity, Alert} from "react-native";
const COLOR = {blue:'#00001F',white:'#fff'};

const App = () => {

  const [textinput,setTextinput] = useState("")
  const [todos,setTodos] = useState([{id:1,task:'First Todo',completed:true},{id:2,task:'Second Todo',completed:false}])

  const ListItem = ({todo}) => {
    return <View style={styles.listitem}>
      <View style={{flex:1}}>
        <Text style={{fontWeight:'bold',color:COLOR.blue,textDecorationLine:todo.completed? 'line-through':'none',}}> {todo.task} </Text>
      </View>

      {!todo.completed && (
        <TouchableOpacity style={styles.actionicon} onPress={()=>Completetodo(todo.id)} >
        <Text style={{color:COLOR.white,fontWeight:'bold'}} >✓</Text>
      </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.deleteicon} onPress={()=>Deletetodo(todo.id)} >
        <Text style={{color:COLOR.white,fontWeight:'bold'}} >X</Text>
      </TouchableOpacity>
    </View>
  }

const addtodo = () => {
  if (textinput == ''){
    Alert.alert('Hata','Lütfen Bir Görev Giriniz.')
  }
  else{
    const newtodo = {
      id: Math.random(),
      task: textinput,
      completed:false,
    }
    setTodos([...todos,newtodo]);
    setTextinput('');
  } 
}

// const Completetodo = (todoid) =>{
//   console.log(todoid)
//   const newTodos = todos.map(item =>{
//     if(item.id == todoid){
//       return{...item,completed:true}
//     }
//     return item;
//   })
//   setTodos(newTodos)
// }

// const Completetodoooooo = (todoid) => {
//   console.log(todoid);
//   const completedTodo = todos.find(item => item.id === todoid);
//   const incompleteTodos = todos.filter(item => item.id !== todoid);
//   const newTodos = [...incompleteTodos, completedTodo];
//   setTodos(newTodos);
// };

const Completetodo = (todoid) => {
  console.log(todoid);
  const updatedTodos = todos.map(item => {
    if (item.id === todoid) {
      return { ...item, completed: true };
    }
    return item;
  });
  const completedTodo = updatedTodos.find(item => item.id === todoid);
  const incompleteTodos = updatedTodos.filter(item => item.id !== todoid);
  const newTodos = [...incompleteTodos, completedTodo];
  setTodos(newTodos);
};



const Deletetodo = (todoid) => {
  Alert.alert(
    "Uyarı!",
    "Bu ToDo'yu silmek istediğine emin misin?",
    [
      {
        text: 'HAYIR',
      },
      {
        text: 'EVET',
        onPress: () => {
          const newTodos = todos.filter(item => item.id !== todoid);
          setTodos(newTodos);
        },
      },
    ]
  );
}



  return(
    <View style={{flex :1,backgroundColor:COLOR.white}}>
      <View style={styles.header} >
        <Text style={{color:COLOR.blue,fontWeight:'bold'}}>TODO APP</Text>
      </View>
      <FlatList 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{padding:20,paddingBottom:100}}
      data={todos}
      renderItem={({item}) => <ListItem todo={item}/>}
      />
      <View style={styles.inputrow}>
        <View style={styles.input} >
        <TextInput
         placeholder='Add TODO'
         onChangeText={setTextinput} 
         value={textinput}/>
        </View>
        <TouchableOpacity style={styles.icon} onPress={addtodo}>
          <Text style={{color:COLOR.white, fontSize:20}}>+</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default App;

const styles = StyleSheet.create({
  deleteicon:{
    height:25,
    width:25,
    backgroundColor:'darkred',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:5,
    borderRadius:3,
  },
  actionicon:{
    height:25,
    width:25,
    backgroundColor:'green',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:5,
    borderRadius:3
  },
  listitem:{
    padding:10,
    backgroundColor:COLOR.white,
    flexDirection:'row',
    elevation:12,
    borderRadius:3,
    marginVertical:5,
    justifyContent:'center',
    alignItems:'center',
  },
  header:{
    padding:20,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  inputrow:{
    position:'absolute',
    bottom:0,
    color:COLOR.blue,
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
  },
  input:{
    backgroundColor:COLOR.white,
    elevation:10,
    flex:1,
    height:50,
    marginVertical:20,
    marginRight:20,
    borderRadius:3,
    paddingHorizontal:20,
  },
  icon:{
    height:50,
    width:50,
    backgroundColor:COLOR.blue,
    borderRadius:3,
    elevation:10,
    justifyContent:'center',
    alignItems:'center'
  }
})