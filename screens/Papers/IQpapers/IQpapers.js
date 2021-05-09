import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default function IQpapers(props){
    const gkPaper = [
        {id: 1,name: 'Age Related', icon : 'md-sync', route : 'IQ Age Related'},
        {id: 2,name: 'Number Sequence', icon : 'md-infinite-sharp', route : 'IQ Number Sequence'},
        {id: 3,name: 'Time Related', icon : 'md-hourglass', route : 'IQ Time Related'},
        {id: 4,name: 'Speed Related', icon : 'md-speedometer-outline', route : 'IQ Speed Related'},
        {id: 5,name: 'Logical', icon : 'md-logo-electron', route : 'IQ Logic'}
      ]


    const navigationHandler = (route) =>{
        props.navigation.navigate(route)
    }

    return(
        <View style={styles.container}>
            <FlatList 
                numColumns={2}
                data={gkPaper}
                keyExtractor={(item)=> item.id}
                renderItem={({item})=>(
                    <TouchableOpacity onPress={()=>{navigationHandler(item.route)}} style={styles.items} >
                        <View style={styles.inner}>
                                <Icon 
                                    name={item.icon}
                                    color={'#0000ff'}
                                    size={50}
                                />
                            <Text>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      width : '100%',
      height : '85%',
      padding : 2,
      flexDirection : 'row',
      flexWrap : 'wrap',
      marginTop : 5,
      flex : 1
    },
    items : {
      padding : 5,
      width : '50%',
      justifyContent : 'center'
      
    },
    inner : {
        flex : 1,
        height : 200,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : 'white',
        fontSize : 24,
        borderRadius : 20,
        elevation : 3
    }
  });