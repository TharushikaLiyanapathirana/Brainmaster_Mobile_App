import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default function About(props){
    return(
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.about}>About </Text>
                <Text style={styles.barainMaster}>Brain Master</Text>
            </View>
            <View>
                <Text style={styles.ideasBorn} >Where ideas born... </Text>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>
                Technology services are professional services
                 designed to facilitate the use of technology 
                 by enterprises and end users. Technology services 
                 provide specialized technology-oriented solutions 
                 by combining the processes and functions of software, 
                 hardware, networks, telecommunications, and electronics
                </Text>
                <Text style={styles.whoeverContainer}>
                    “Whoever you are .. we have the solution you need ..’’
                </Text>
            </View>
            <View style={styles.socialContainer}>
                <Icon 
                    name={'md-logo-facebook'}
                    color={'#000000'}
                    size={30}
                />
                <Icon 
                    name={'md-logo-linkedin'}
                    color={'#000000'}
                    size={30}
                />
                <Icon 
                    name={'md-logo-youtube'}
                    color={'#000000'}
                    size={30}
                />
                <Icon 
                    name={'md-mail'}
                    color={'#000000'}
                    size={30}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : 20,
        paddingTop : 100,
        backgroundColor : 'white'
    },
    headingContainer : {
        display : 'flex',
        flexDirection : 'row'
    },  
    about : {
        fontSize : 45,
        color : '#757575',
    },
    barainMaster : {
        fontSize : 40,
        color : '#ff0000',
    },
    ideasBorn : {
        fontSize : 25
    },
    descriptionContainer : {
        marginTop : 20
    },
    description : {
        fontSize : 18
    },
    whoeverContainer : {
        marginTop : 20,
        fontSize : 25
    },  
    socialContainer : {
        marginTop : 50,
        display: 'flex',
        flexDirection : 'row',
        justifyContent : 'space-around'
    }
})