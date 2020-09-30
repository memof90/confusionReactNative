import React from 'react';

import { ActivityIndicator, StyleSheet, Text, View,} from 'react-native';



export const Loading = () => {
    return ( 
        <View style={styles.loadingView}>
            <ActivityIndicator size="large" color="#512da8" />
            <Text style={styles.loadingText}>Loading ...</Text>
        </View>
     );
}


 


const styles = StyleSheet.create({
    loadingView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    loadingText: {
        color: '#512da8',
        fontSize: 12,
        fontWeight: 'bold'
    }
})