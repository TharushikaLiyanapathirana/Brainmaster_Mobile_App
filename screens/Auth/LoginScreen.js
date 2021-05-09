import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Vibration } from 'react-native';

import { TextInput } from 'react-native-paper';

import { AuthContext } from '../../components/Context';

const axios = require('axios');

import config from '../../config/config.js';

export default function LoginScreen(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isValidUser, setIsValidUser] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isvalidPassword, setISValidPassword] =useState(true);

    const { login } = React.useContext(AuthContext);

    const signupHandler = ()=>{
        props.navigation.navigate('Signin');
    }

    const ForgotPasswordHandler=()=>{
        setEmail('');
        setPassword('');
        setIsValidUser(true);
        setIsValidEmail(true);
        setISValidPassword(true);
        props.navigation.navigate('Forgot Password')
    }

    const submitHandler = (email, password)=>{

        Vibration.vibrate(100);

        if(isValidEmail && isvalidPassword){
            let requestBody = {
                email : email,
                password : password
            }
    
            axios.post(config.API_URL+'/login', requestBody)
              .then(function (response) {
                if(response.status===200){
                    login(response.data,response.data.user_id);
                }
                if(response.status===404){
                    setIsValidUser(false);
                }
              })
              .catch(function (error) {
                setIsValidUser(false);
              });
        }
    }

    const handleValidEmail = (value)=>{
        let email = value.toLowerCase().trim();
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            setIsValidEmail(false);
            return false;
        }
        else {
            setIsValidEmail(true);
            setEmail(email);
        }
    }

    const handleValidPassword = (value)=>{
        if(password!=null){
            setISValidPassword(true);
        }else{
            setISValidPassword(false);
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.text1}>SIGN IN</Text>
                <Text style={styles.text2}>Hello there, Sign in and start Using Brain Master</Text>
            </View>
            <TextInput
                label="Email"
                value={email}
                mode={'outlined'}
                onChangeText={(value)=>setEmail(value)}
                style={styles.input1}
                onEndEditing={(e)=>{handleValidEmail(e.nativeEvent.text)}}
            />
            {isValidEmail?false: <Text style={styles.errorMessage}>Provide a valid email address</Text>}
            
            <TextInput
                label="Password"
                value={password}
                mode={'outlined'}
                onChangeText={(value)=>setPassword(value)}
                secureTextEntry={true}
                style={styles.input1}
                onEndEditing={(e)=>{handleValidPassword(e.nativeEvent.text)}}
            />
            
            {isvalidPassword? false: <Text style={styles.errorMessage}>Provide a valid password</Text>}

            {isValidUser? false: <Text style={styles.errorMessage}>Invalid Details</Text>}

            {/* <TouchableOpacity style={styles.btn1} onPress={()=>props.navigation.navigate('Home')}> */}
            <TouchableOpacity style={styles.btn1} onPress={()=>{submitHandler(email,password)}}>
                {/* <Text style={styles.btn1text} onPress={()=>props.navigation.navigate('Questions',{email : email})}>Submit</Text> */}
                <Text style={styles.btn1text}>Submit</Text>
            </TouchableOpacity>


            <Text style={styles.fogotPasswordText} onPress={()=>{ForgotPasswordHandler()}}>Forgot Password?</Text>

            <View style={styles.bottomContainer}>
                <Text>Don't have an account?</Text>
                <Text style={{color: 'blue',marginLeft : 10}} onPress={signupHandler}>Sign up</Text>
            </View>
        </View>
    )
}

const styles  = StyleSheet.create({
    container : {
        flex : 1,
        padding : 20,
        backgroundColor : '#ffffff'
    },
    container1 : {
        backgroundColor : 'blue',
        height : 150,
        marginTop : 100,
        marginBottom : 50,
        alignItems : 'center',
        justifyContent : 'center',
        width : '100%'
    },
    text1 : {
        color : '#ffffff',
        fontSize : 30,
        fontWeight : '600'
    },
    text2:{
        marginTop : 10,
        color : '#ffffff',
        fontSize : 15,
    },
    input1 : {
        marginTop : 20,
    },
    btn1 : {
        marginTop : 40,
        marginBottom : 20,
        alignItems : 'center',
        justifyContent : 'center',
        height : 70,
        backgroundColor : 'blue',
        borderRadius : 50,
        marginBottom : 50
    },
    btn1text : {
        color : '#ffffff',
        fontSize : 20
    },
    bottomContainer : {
        flexDirection : 'row',
        backgroundColor : '#eeeeee',
        height : 100,
        alignItems : 'center',
        justifyContent : 'center',
    },
    errorMessage : {
        color : 'red'
    },
    fogotPasswordText : {
        color : 'blue',
        fontSize : 18,
        fontWeight : '600'
    }
});