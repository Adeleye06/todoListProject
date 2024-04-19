import React from 'react';
import { Modal, View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';

const DetailedViewModal = ({ isVisible, onClose, entry }) => {
    const { url, description } = entry;

    // Check if the URL is an image based on its extension
    const isImageUrl = (url) => {
        return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <Text style={styles.description}>{description}</Text>

                {isImageUrl(url) ? (
                    <Image source={{ uri: url }} style={styles.image} resizeMode="contain" />
                ) : (
                    <WebView source={{ uri: url }} style={styles.webview} />
                )}

                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 22,
    },
    description: {
        fontSize: 16,
        padding: 10,
        textAlign: 'center'
    },
    image: {
        flex: 1,
        width: null,
        height: 300, // or adjust according to your style needs
        marginVertical: 10,
    },
    webview: {
        flex: 1,
        marginVertical: 10,
    },
    closeButton: {
        padding: 10,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default DetailedViewModal;
