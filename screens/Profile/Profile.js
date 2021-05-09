import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, BackHandler} from 'react-native';
import { Button, TextInput} from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

const axios = require('axios');

import config from '../../config/config.js';

export default function Profile(props){

    const [userId, setUserId] = useState(null);
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
    const [edit, setEdit] = useState(false);

    const getUser = async () => {
        
        const val = await AsyncStorage.getItem("user_id");
        setUserId(val);
        axios.get(config.API_URL+'/user/'+val).then((res)=>{
            setFirstName(res.data.f_name);
            setLastName(res.data.l_name);
            setEmail(res.data.email);
            setMobile(res.data.mobile_no);
            setAge(res.data.age.toString());
            setPassword(res.data.password);
        });
      }

    const editHandler=()=>{
        setEdit(true);
    }

    const updateUser = async () =>{

        handlePasswordConfirm(confirmPassword);

        let requestBody = {
            f_name : firstName,
            l_name : lastName,
            email : email,
            mobile_no : mobile,
            age : age,
            password : password
        }

        if(isValidEmail && passwordConfirm && isvalidPassword && firstName!=null && lastName!=null && email!=null && mobile!=null && password!=null ){
            await axios.post(config.API_URL+"/user/"+userId, requestBody).then((res)=>{
                if(res.status === 200){
                    Alert.alert(
                        "Your profile updated Succefully !",
                        "Done"
                        [
                            {
                                text : "Ok", onPress: ()=>console.log("Updated")
                            }
                        ]
                    );
                    setEdit(false);
                }
            })
        }else{
            setIsValidUser(false);
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
        console.log("Confirm : "+value +" Password : "+password);
        if(value === password){
            console.log("Equal");
            setConfirmPassword(value);
            setPasswordConfirm(true);
        }
        else{
            console.log("Different");
            setPasswordConfirm(false);
        }
    }

    const backAction = ()=>{
        setEdit(false);
    }

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    useEffect(()=>{
        getUser();
        backHandler;
    },[]);

    return(
        <View style={styles.container}>
            <View style={styles.btnContainer1}>
                <Button mode="contained" onPress={() => editHandler()} style={styles.btn}>
                    Edit Profile
                </Button>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.inputContainer}>
                <TextInput
                    label="First Name"
                    value={firstName}
                    mode={'outlined'}
                    editable={edit}
                    onChangeText={(value)=>setFirstName(value)}
                    style={styles.input1}
                />
                <TextInput
                    label="Last Name"
                    value={lastName}
                    mode={'outlined'}
                    editable={edit}
                    onChangeText={(value)=>setLastName(value)}
                    style={styles.input1}
                />
                <TextInput
                    label="Email"
                    value={email}
                    mode={'outlined'}
                    editable={false}
                    disabled={true}
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
                    editable={edit}
                    onChangeText={(value)=>setMobile(value)}
                    style={styles.input1}
                    onEndEditing={(e)=>{handleTelephoneNumber(e.nativeEvent.text)}}
                />

                {isValidTelephone?false: <Text style={styles.errorMessage}>Provide a valid telephone number</Text>}

                <TextInput
                    label="Age"
                    value={age}
                    mode={'outlined'}
                    keyboardType = {'number-pad'}
                    editable={edit}
                    onChangeText={(value)=>setAge(value)}
                    style={styles.input1}
                />

                <TextInput
                    label="Password"
                    value={password}
                    mode={'outlined'}
                    editable={edit}
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
                    editable={edit}
                    onChangeText={(value)=>setConfirmPassword(value)}
                    secureTextEntry={true}
                    style={styles.input1}
                    onEndEditing={(e)=>{handlePasswordConfirm(e.nativeEvent.text)}}
                />

                {passwordConfirm? false: <Text style={styles.errorMessage}>Password does not match !</Text>}
                {isValidUser? false: <Text style={styles.errorMessage}>Invalid Details</Text>}

                </View>

                <View style={styles.btnContainer2}>
                    <Button disabled={!edit} mode="contained" onPress={() => updateUser()} style={styles.btn}>
                        Update
                    </Button>
                </View>

                </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    btn:{
        width : 150
    },
    btnContainer1 : {
        flexDirection : 'row',
        justifyContent: 'flex-end',
        padding : 20
    },
    btnContainer2 : {
        flexDirection : 'row',
        justifyContent: 'center',
        padding : 20
    },
    inputContainer : {
        paddingLeft : 10,
        paddingRight : 10,
        justifyContent : 'space-between'
    },
    input1 : {
        marginTop : 10
    },
    errorMessage : {
        color : 'red'
    }
});