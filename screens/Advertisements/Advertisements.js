import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Platform,
  } from 'react-native';

import Carousel, {ParallaxImage} from 'react-native-snap-carousel';

const {width: screenWidth} = Dimensions.get('window');

const axios = require('axios');

import config from '../../config/config.js';

export default function Advertisements(props){

    const [advertisements, setAdvertisements] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getAdvertisements = () =>{
      axios.get(config.API_URL+'/ad/approved/dash/ads_panel/get_all').then((res)=>{
        if(res.data != null){
          setAdvertisements (res.data);
          setIsLoading(false);
        }
      })
    }

    const carouselRef = useRef(null);

    const goForward = () => {
        carouselRef.current.snapToNext();
    };

    useEffect(() => {
        getAdvertisements();
    }, []);

    const renderItem = ({item, index}, parallaxProps) => {
        return (
          <View style={styles.item}>
            {isLoading?false : <ParallaxImage
              source={{uri: config.ADS_API+item.ad_img}}
              containerStyle={styles.imageContainer}
              style={styles.image}
              parallaxFactor={0}
              {...parallaxProps}
            />}
          </View>
        );
      };

    return(
        <View style={styles.container}>
            {isLoading?false : <Carousel
                ref={carouselRef}
                layout={'stack'} 
                layoutCardOffset={18}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth-60}
                data={advertisements}
                renderItem={renderItem}
                hasParallaxImages={true}
            />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
        marginTop : 20
      },
      imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
      },
      image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'stretch',
      },
})