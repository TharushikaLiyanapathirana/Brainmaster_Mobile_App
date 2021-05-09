import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, BackHandler } from 'react-native';
import { Button, Divider , RadioButton, Paragraph, Dialog, Portal } from 'react-native-paper';
import CountDown from 'react-native-countdown-component';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
import config from '../../../config/config.js';

export default function GKExam(props){

    const [participantUser, setParticipantUser] = useState(null);
    const [selectedPaper, setSelectedPaper] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState(null);
    const [marking, setMarking] = useState(null);
    const [grade, setGrade] = useState(null);
    const [mark, setMark] = useState(null);

    const [answer_1, setAnswer_1] = useState(null);
    const [answer_2, setAnswer_2] = useState(null);
    const [answer_3, setAnswer_3] = useState(null);
    const [answer_4, setAnswer_4] = useState(null);
    const [answer_5, setAnswer_5] = useState(null);
    const [answer_6, setAnswer_6] = useState(null);
    const [answer_7, setAnswer_7] = useState(null);
    const [answer_8, setAnswer_8] = useState(null);
    const [answer_9, setAnswer_9] = useState(null);
    const [answer_10, setAnswer_10] = useState(null);

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const getGKExam = async () =>{
        try{
            const userId = await AsyncStorage.getItem('user_id');
            const selectedPaperId = await AsyncStorage.getItem('selected_paper_id');

            let requestBody = {
                paper_id : selectedPaperId
            }

            await axios.get(config.API_URL+'/paper/'+ selectedPaperId.toString())
            .then((paper)=>{
                setSelectedPaper(paper.data);
            })
            .catch((error)=>{
                console.log(error);
            });

            await axios.get(config.API_URL+'/user/'+userId)
            .then((user)=>{
                setParticipantUser(user.data);
            })
            .catch((error)=>{
                console.log(error);
            });

            await axios.post(config.API_URL+'/paper2', requestBody)
            .then((res)=>{
                setQuestions(res.data.result.rows);
                setIsLoading(false);
            })
            .catch((error)=>{
                console.log(error);
            });

        }catch(e){
            console.log(e.message);
        }
    }

    const startExam = ()=>{
        props.navigation.navigate('Signin');
    }

    const getAnswer = (index)=>{
        switch (index) {
            case 0:
                return answer_1;
                break;
            case 1:
                return answer_2;
                break;
            case 2:
                return answer_3;
                break;
            case 3:
                return answer_4;
                break;
            case 4:
                return answer_5;
                break;
            case 5:
                return answer_6;
                break;
            case 6:
                return answer_7;
                break;
            case 7:
                return answer_8;
                break;
            case 8:
                return answer_9;
                break;
            case 9:
                return answer_10;
                break;
        }
    }

    const setAnswer = (index, value)=>{
        switch (index) {
            case 0:
                setAnswer_1(value);
                break;
            case 1:
                setAnswer_2(value);
                break;
            case 2:
                setAnswer_3(value);
                break;
            case 3:
                setAnswer_4(value);
                break;
            case 4:
                setAnswer_5(value);
                break;
            case 5:
                setAnswer_6(value);
                break;
            case 6:
                setAnswer_7(value);
                break;
            case 7:
                setAnswer_8(value);
                break;
            case 8:
                setAnswer_9(value);
                break;
            case 9:
                setAnswer_10(value);
                break;
        }
    }

    const submitExam = async () =>{
        let markings = [];
        let marks = 0;

        questions.map((question, index)=>{
            switch(index){
                case 0:
                    if(answer_1){
                        if(answer_1.localeCompare(question.answer) === 0){
                            markings.push("Correct");
                            marks++;
                        }else{
                            markings.push("Incorrect");
                        }
                    }else{
                        markings.push("Not Answered");
                    }
                    break;
                case 1:
                    if(answer_2){
                        if(answer_2.localeCompare(question.answer) === 0){
                            markings.push("Correct");
                            marks++;
                        }else{
                            markings.push("Incorrect");
                        }
                    }else{
                        markings.push("Not Answered");
                    }
                    break;
                case 2:
                    if(answer_3){
                        if(answer_3.localeCompare(question.answer) === 0){
                            markings.push("Correct");
                            marks++;
                        }else{
                            markings.push("Incorrect");
                        }
                    }else{
                        markings.push("Not Answered");
                    }
                    break;
                case 3:
                    if(answer_4){
                        if(answer_4.localeCompare(question.answer) === 0){
                            markings.push("Correct");
                            marks++;
                        }else{
                            markings.push("Incorrect");
                        }
                    }else{
                        markings.push("Not Answered");
                    }
                    break;
                case 4:
                    if(answer_5){
                        if(answer_5.localeCompare(question.answer) === 0){
                            markings.push("Correct");
                            marks++;
                        }else{
                            markings.push("Incorrect");
                        }
                    }else{
                        markings.push("Not Answered");
                    }
                    break;
                case 5:
                    if(answer_6){
                        if(answer_6.localeCompare(question.answer) === 0){
                            markings.push("Correct");
                            marks++;
                        }else{
                            markings.push("Incorrect");
                        }
                    }else{
                        markings.push("Not Answered");
                    }
                    break;
                case 6:
                    if(answer_7){
                        if(answer_7.localeCompare(question.answer) === 0){
                            markings.push("Correct");
                            marks++;
                        }else{
                            markings.push("Incorrect");
                        }
                    }else{
                        markings.push("Not Answered");
                    }
                    break;
                case 7:
                    if(answer_8){
                        if(answer_8.localeCompare(question.answer) === 0){
                            markings.push("Correct");
                            marks++;
                        }else{
                            markings.push("Incorrect");
                        }
                    }else{
                        markings.push("Not Answered");
                    }
                    break;
                case 8:
                    if(answer_9){
                        if(answer_9.localeCompare(question.answer) === 0){
                            markings.push("Correct");
                            marks++;
                        }else{
                            markings.push("Incorrect");
                        }
                    }else{
                        markings.push("Not Answered");
                    }
                    break;
                case 9:
                    if(answer_10){
                        if(answer_10.localeCompare(question.answer) === 0){
                            markings.push("Correct");
                            marks++;
                        }else{
                            markings.push("Incorrect");
                        }
                    }else{
                        markings.push("Not Answered");
                    }
                    break;
            }
        }
        )

        try{
            await AsyncStorage.setItem("gkExamMarking", JSON.stringify(markings));
        }catch(e){
            console.log(e.message);
        }

        setMarking(markings);
        setMark(marks);

            
        let requestBody = {
            paper_id: selectedPaper.paper_id,
            participant_user: participantUser.user_id,
            marks: marks,
            grade: updateGrade(marks),
        }

        axios.post(config.API_URL+'/exam', requestBody)
        .then((response) => {

            let newMarks = participantUser.total_marks + marks;

            let newRequestBody = {
                total_marks: newMarks,
            }

            axios.post(config.API_URL+"/user/"+participantUser.user_id, newRequestBody).then((res)=>{
                props.navigation.navigate('GK Result');
            })
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }

    const updateGrade=(marks)=>{
        if ( marks <= 3 ){
            return "D";
        }else if (marks <= 6 ){
            return "C";
        }else if (marks <= 8 ){
            return "B";
        }else if (marks <= 10 ){
            return "A";
        }
        else {
            return "invalid";
        }
    }

    const backAction = ()=>{
        showDialog();
        return true;
    }

    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    useEffect(()=>{
        getGKExam();
        backHandler;
    },[userId]);

    return(
        <View style={styles.container}>
        {isLoading?false : <View>

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Warning</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Can't perform the action</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

            <View style={styles.detailsContainer}>
                <Text style={styles.detailsHeadingText}> {selectedPaper.paper_name}</Text>
                <View style={styles.detailsInfoWrapper}>
                    <View>
                    <Text>Participant : {participantUser.f_name} {participantUser.l_name}</Text>
                    <Text>Age : {participantUser.age}</Text>
                    </View>

                    <CountDown
                        until={600}
                        onFinish={() => submitExam()}
                        onPress={() => alert('hello')}
                        digitStyle={{backgroundColor: '#eeeeee', borderWidth: 2, borderColor: '#757575'}}
                        timeToShow={['M', 'S']}
                        timeLabels={{m: 'min', s: 'sec'}}
                        size={15}
                    />
                </View>
            </View>

            <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    questions.map((question, index)=>{
                        return(
                            <View key={question.question_id} style={styles.newsContainer}>

                                <View style={styles.newsWrapper}>
                                    <Text style={styles.newsTitle}>Question {index+1}</Text>
                                </View>

                                <Divider style={styles.divider1} />

                                <View style={styles.newsDetailsWrapper}>
                                    <Text style={styles.newsHeading} >{question.question}</Text>
                                    <View>
                                        <View style={styles.radioWrapper}>
                                            <RadioButton
                                                value={question.option_1}
                                                status={ getAnswer(index) === question.option_1 ? 'checked' : 'unchecked' }
                                                onPress={() => setAnswer(index, question.option_1)}
                                                color={'blue'}
                                            />
                                            <Text style={styles.radioText}>{"1. "+ question.option_1}</Text>
                                        </View>

                                        <View style={styles.radioWrapper}>
                                            <RadioButton
                                                value={question.option_2}
                                                status={ getAnswer(index) === question.option_2 ? 'checked' : 'unchecked' }
                                                onPress={() => setAnswer(index, question.option_2)}
                                                color={'blue'}
                                            />
                                            <Text style={styles.radioText}>{"2. "+ question.option_2}</Text>
                                        </View>

                                        <View style={styles.radioWrapper}>
                                            <RadioButton
                                                value={question.option_3}
                                                status={ getAnswer(index) === question.option_3 ? 'checked' : 'unchecked' }
                                                onPress={() => setAnswer(index, question.option_3)}
                                                color={'blue'}
                                            />
                                            <Text style={styles.radioText}>{"3. "+ question.option_3}</Text>
                                        </View>

                                        <View style={styles.radioWrapper}>
                                            <RadioButton
                                                value={question.option_4}
                                                status={ getAnswer(index) === question.option_4 ? 'checked' : 'unchecked' }
                                                onPress={() => setAnswer(index, question.option_4)}
                                                color={'blue'}
                                            />
                                            <Text style={styles.radioText}>{"4. "+ question.option_4}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
                <View style={styles.btnContainer}>
                    <Button mode="contained" onPress={() => submitExam()} style={styles.btn}>
                        Submit Answers
                    </Button>
                </View>
                <View style={styles.temp}></View>
            </ScrollView>
            </View>
        </View>
        }
        </View>
    );
}

const styles = StyleSheet.create({
    detailsContainer : {
        backgroundColor : '#90a4ae'
    },
    detailsHeadingText:{
        fontSize : 18,
        fontWeight : 'bold',
        margin : 15
    },
    detailsInfoWrapper : {
        marginBottom : 10,
        flexDirection : 'row',
        justifyContent : 'space-evenly'
    },

    newsContainer : {
        backgroundColor : '#cfd8dc',
        marginLeft : 15,
        marginRight : 15,
        //width: scrollViewWidth ? parseFloat(styles.width) / 100 * scrollViewHeight : styles.width,
        height : 'auto',
        marginTop : 15,
        borderRadius : 15
    },
    newsWrapper : {
        justifyContent : 'center',
        alignItems : 'center',
        height : 50
    },
    newsDetailsWrapper : {
        padding : 10,
        flexDirection : 'column',
    },
    newsHeading : {
        fontSize : 18,
        color : 'black',
        padding : 5
    },
    newsTitle : {
        fontSize : 18,
        color : 'black'
    },
    newsDetails : {
        fontSize : 14,
        color : 'black',
        fontWeight : 'bold'
    },
    radioWrapper : {
        flexDirection : 'row',
        alignItems : 'center'
    },
    radioText : {
        fontSize : 16,
        marginLeft : 10
    },
    scrollStyle : {
        flex : 1,
        flexDirection : 'row'
    },
    btn:{
        width : 180
    },
    temp : {
        height : 400
    },
    btnContainer : {
        flexDirection : 'row',
        justifyContent: 'center',
        paddingTop : 30
    },
})