import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, Vibration } from 'react-native';
import { TextInput } from 'react-native-paper';
const axios = require('axios');

import config from '../../config/config.js';

export default function SignInScreen(props){
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidTelephone, setIsValidTelephone] = useState(true);
    const[passwordConfirm, setPasswordConfirm] = useState(true);
    const [isvalidPassword, setISValidPassword] =useState(true);
    const [isValidUser, setIsValidUser] = useState(true);

    const loginHandler = ()=>{
        setFirstName('');
        setLastName('');
        setEmail('');
        setMobile('');
        setAge('');
        setPassword('');
        setConfirmPassword('');
        setIsValidEmail(true);
        setPasswordConfirm(true);
        setIsValidTelephone(true);
        setIsValidUser(true);
        props.navigation.goBack();
    }

    const signUpHanlder=()=>{
        Vibration.vibrate(100);
        handlePasswordConfirm(confirmPassword);
        if(isValidEmail && passwordConfirm && isvalidPassword && firstName!=null && lastName!=null && email!=null && mobile!=null && password!=null ){
            let requestBody = {
                f_name: firstName,
                l_name: lastName,
                email: email,
                mobile_no: mobile,
                age: age,
                password: password,
                role: "user",
                total_marks: 0,
            }

            axios.post(config.API_URL+'/user', requestBody)
            .then(function (response) {
                if(response.status){
                    loginHandler();
                }
            })
            .catch(function (error) {
                setIsValidUser(false);
            });
        }
        setIsValidUser(false);
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

    const handleTelephoneNumber = (value) =>{
        let telephone = value.trim();
        let reg = /[0-9]{10}/;
        if(reg.test(telephone)===false){
            setIsValidTelephone(false);
        }else{
            setIsValidTelephone(true);
            setMobile(telephone);
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
        <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.container1}>
                    <Text style={styles.text1}>SIGN IN</Text>
                    <Text style={styles.text2}>Hello there, Sign in and start Using Brain Master</Text>
                </View>
                <TextInput
                    label="First Name"
                    value={firstName}
                    mode={'outlined'}
                    onChangeText={(value)=>setFirstName(value)}
                    style={styles.input1}
                />
                <TextInput
                    label="Last Name"
                    value={lastName}
                    mode={'outlined'}
                    onChangeText={(value)=>setLastName(value)}
                    style={styles.input1}
                />
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
                    label="Mobile Number"
                    value={mobile}
                    mode={'outlined'}
                    keyboardType = {'number-pad'}
                    onChangeText={(value)=>setMobile(value)}
                    style={styles.input1}
                    onEndEditing={(e)=>{handleTelephoneNumber(e.nativeEvent.text)}}
                />
                {isValidTelephone?false: <Text style={styles.errorMessage}>Provide a valid telephone number</Text>}
                <TextInput
                    label="Age"
                    value={age}
                    keyboardType = {'number-pad'}
                    mode={'outlined'}
                    onChangeText={(value)=>setAge(value)}
                    style={styles.input1}
                />
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
                {isValidUser? false: <Text style={styles.errorMessage}>Invalid Details</Text>}

                <TouchableOpacity style={styles.btn1} onPress={()=>{signUpHanlder()}}>
                    <Text style={styles.btn1text}>Submit</Text>
                </TouchableOpacity>

                <View style={styles.bottomContainer}>
                    <Text>Don't have an account?</Text>
                    <Text style={{color: 'blue',marginLeft : 10}}
                        onPress={loginHandler}>Sign up</Text>
                </View>
            </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles  = StyleSheet.create({
    containerMain : {
        flex : 1
    },
    container : {
        flex : 1,
        padding : 20,
        backgroundColor : '#ffffff',
    },
    container1 : {
        backgroundColor : 'blue',
        height : 150,
        marginTop : 50,
        marginBottom : 20,
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
        marginTop : 10
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