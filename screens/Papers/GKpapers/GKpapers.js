import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


export default function GKpapers(props){

    const [gkPaper, setGkPaper] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getPapers = () =>{
        setGkPaper(paper);
        setIsLoading(false);
    }

    useEffect(()=>{
        getPapers();
    },[]);

    const paper = [
        {id: 1,name: 'Politics', icon : 'people', route : 'GK Politics'},
        {id: 2,name: 'Health', icon : 'heart', route : 'GK Health'},
        {id: 3,name: 'International', icon : 'globe-sharp', route : 'GK International'},
        {id: 4,name: 'Sports', icon : 'ios-baseball-sharp', route : 'GK Sports'},
        {id: 5,name: 'History', icon : 'play-back', route : 'GK History'}
      ]

    const navigationHandler = (route) =>{
        props.navigation.navigate(route)
    }

    return(
        <View style={styles.container}>
            {isLoading?false : 
                <FlatList 
                numColumns={2}
                data={gkPaper}
                keyExtractor={(item)=> item.id}
                renderItem={({item})=>(
                    <TouchableOpacity onPress={()=>{navigationHandler(item.route)}} style={styles.items}>
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
            }
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
      flex : 1,
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