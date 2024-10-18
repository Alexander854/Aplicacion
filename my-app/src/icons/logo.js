import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function Logo() {
    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require('../../assets/Logo.jpg')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1000, // Asegura que el logo esté por encima de otros elementos
    },
    img: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
});
