import { StyleSheet, Text, View, Modal, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { StatusBar } from 'react-native-web'
import color from '../misc/color'


const OptionModal = (visible,currentItem, onClose, onPlayPress,onPlayListPress) => {
    const {filename} = currentItem
  return <>
  <StatusBar hidden/>
  <Modal animationType='slide' transparent visible={visible}>
    <View style={styles.modal}>
        <Text style={styles.title} numberOfLines={2}>{filename}</Text>
        <View style={styles.optionContainer}>
            <TouchableNativeFeedback onPress={onPlayPress}>
                <Text style={styles.option}>Play</Text>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={onPlayListPress}>
                <Text style={styles.option}>Add to Playlist</Text>
            </TouchableNativeFeedback>
        </View>
    </View>
    <TouchableNativeFeedback onPress={onClose}>
        <View style={styles.modalBg}/>
    </TouchableNativeFeedback>
    
  </Modal>
  </>
}

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: color.APP_BG,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 1000,
    },
    optionContainer: {
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 20,
        paddingBottom: 0,
        color: color.FONT_MEDIUM,
    },
    option: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.FONT_MEDIUM,
        paddingVertical: 10,
        letterSpacing: 1,
    },
    modalBg: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: color.MODAL_BG,
    }
})

export default OptionModal;