import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Vibration } from 'react-native';

import { TextInput } from 'react-native-paper';

import { AuthContext } from '../../components/Context';

const axios = require('axios');

import config from '../../config/config.js';

export default function ForgotPassword(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isValidUser, setIsValidUser] = useState(true);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const[passwordConfirm, setPasswordConfirm] = useState(true);
    const [isvalidPassword, setISValidPassword] =useState(true);
    

    const { login } = React.useContext(AuthContext);

    const signInHandler = ()=>{
        props.navigation.navigate('Login');
    }

    const submitHandler = (email, password)=>{

        Vibration.vibrate(100);

        let requestBody = {
            email : email,
            password : password
        }

        axios.post(config.API_URL+'/login/forgot_pw', requestBody)
          .then(function (response) {
              console.log(response);
            if(response.status===200){
                props.navigation.goBack();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
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
        
        let pass = value.trim();
        let reg = /.{8,}/;

        if(reg.test(pass)){
            setISValidPassword(true);
        }else{
            setISValidPassword(false);
        }
    }

    const handlePasswordConfirm = (value)=>{
        if(value === password){
            setConfirmPassword(value);
            setPasswordConfirm(true);
        }
        else{
            setPasswordConfirm(false);
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.text1}>FOGOT PASSWORD</Text>
                <Text style={styles.text2}>Reset your password here to use your account</Text>
            </View>
            <TextInput
                label="Email"
                value={email}
                mode={'outlined'}
                onChangeText={(value)=>setEmail(value)}
                style={styles.input1}
                onEndEditing={(e)=>{handleValidEmail(e.nativeEvent.text)}}
            />
            {isValidEmail?null: <Text style={styles.errorMessage}>Provide a valid email address</Text>}
            
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

            <TextInput
                label="Confirm Password"
                value={confirmPassword}
                mode={'outlined'}
                onChangeText={(value)=>setConfirmPassword(value)}
                secureTextEntry={true}
                style={styles.input1}
                onEndEditing={(e)=>{handlePasswordConfirm(e.nativeEvent.text)}}
            />

            {passwordConfirm? false: <Text style={styles.errorMessage}>Password does not match !</Text>}
            {isValidUser? null: <Text style={styles.errorMessage}>Invalid Details</Text>}
            
            <TouchableOpacity style={styles.btn1} onPress={()=>{submitHandler(email,password)}}>
                <Text style={styles.btn1text}>Submit</Text>
            </TouchableOpacity>

            <View style={styles.bottomContainer}>
                <Text>Rememeber your password?</Text>
                <Text style={{color: 'blue',marginLeft : 10}} onPress={signInHandler}>Sign In</Text>
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
    }
});