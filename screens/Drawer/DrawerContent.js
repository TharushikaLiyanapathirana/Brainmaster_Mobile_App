import React, { useEffect, useState } from 'react';

import { View, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';

const axios = require('axios');

import config from '../../config/config.js';

import {
    Avatar,
    Title,
    Caption,
    Drawer
} from 'react-native-paper'

import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import { AuthContext } from '../../components/Context';

export function DrawerContent(props) {

    const { signout } = React.useContext(AuthContext);
    const [username, setUsername] = useState('');

    const getUser = async () => {
        const val = await AsyncStorage.getItem("user_id");
        console.log("ValUe : "+val)
        axios.get(config.API_URL+'/user/'+val).then((res)=>{
            setUsername(res.data.f_name+" "+res.data.l_name); 
        })
      }

    useEffect(()=>{
        getUser()
    },[])

    return(
        <View style={{flex: 1}}>
             <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View>
                            <Avatar.Image
                                source={require('../../assets/author/avatar.png')}
                                size={100}
                            />
                            <View>
                                <Title style={styles.title}>{username}</Title>
                                <Caption style={styles.caption}>User</Caption>
                            </View>
                        </View>

                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            label="DashBoard"
                            icon={({color,size})=>(
                                <Icon 
                                    name="md-speedometer-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            onPress={()=>{props.navigation.navigate('DashBoard')}}
                        />

                        <DrawerItem 
                            label="GK Papers"
                            icon={({color,size})=>(
                                <Icon 
                                    name="layers-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            onPress={()=>{props.navigation.navigate('GK Papers')}}
                        />

                        <DrawerItem 
                            label="IQ Papers"
                            icon={({color,size})=>(
                                <Icon 
                                    name="bulb-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            onPress={()=>{props.navigation.navigate('IQ Papers')}}
                        />

                        <DrawerItem 
                            label="Ask Question"
                            icon={({color,size})=>(
                                <Icon 
                                    name="chatbubble-ellipses-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            onPress={()=>{props.navigation.navigate('Ask Questions')}}
                        />

                        <DrawerItem 
                            label="Advertisements"
                            icon={({color,size})=>(
                                <Icon 
                                    name="tv-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            onPress={()=>{props.navigation.navigate('PublishAdvertisements')}}
                        />

                        <DrawerItem 
                            label="Knowledge"
                            icon={({color,size})=>(
                                <Icon 
                                    name="school-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            onPress={()=>{props.navigation.navigate('UploadKnowledge')}}
                        />

                        <DrawerItem 
                            label="Profile"
                            icon={({color,size})=>(
                                <Icon 
                                    name="person-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            onPress={()=>{props.navigation.navigate('Profile')}}
                        />

                        <DrawerItem 
                            label="Summary Report"
                            icon={({color,size})=>(
                                <Icon 
                                    name="documents-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            onPress={()=>{props.navigation.navigate('Summary Report')}}
                        />

                    </Drawer.Section>

                </View>
             </DrawerContentScrollView>
             <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    label="Sign Out"
                    icon={({color,size})=>(
                        <Icon 
                            name="exit-outline"
                            color={color}
                            size={size}
                        />
                    )}
                    onPress={()=>{signout()}}
                />

                <DrawerItem 
                    label="About"
                    icon={({color,size})=>(
                        <Icon 
                            name="help-circle-outline"
                            color={color}
                            size={size}
                        />
                    )}
                    onPress={()=>{props.navigation.navigate('About')}}
                />

             </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent : {
        flex : 1
    },
    userInfoSection : {
        paddingLeft: 20
    },
    title : {
        fontSize : 16,
        marginTop : 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    row : {
        marginTop: 20,
        flexDirection : 'row',
        alignItems: 'center'
    },
    section : {
        marginRight : 15,
        flexDirection : 'row',
        alignItems: 'center'
    },
    paragraph : {
        fontWeight: 'bold',
        marginRight: 3
    },
    drawerSection : {
        marginTop : 15,
    },
    bottomDrawerSection:{
        borderTopColor : '#eeeeee',
        borderTopWidth: 1
    },
    preferences : {
        flexDirection : 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})
