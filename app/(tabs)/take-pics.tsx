import { router } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export default function TakePics() {
    const [image, setImage] = useState<string | null>(null);
    const [imageTaken, setImageTaken] = useState(false);

    const takePhoto = async () => {
        // Request camera permissions
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        
        console.log("permission result", permissionResult);

        if (permissionResult.granted === false) {
            alert("You need to enable camera permissions to take a photo!");
            return;
        }

        // Launch camera
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setImageTaken(true);
        };
    }

    return (    
        <ScrollView style={styles.scrollContainer}>
            <ThemedView style={styles.container}>
                <Image 
                    source={require('@/assets/images/skinglow-logo.png')} 
                    style={styles.logo}
                />

                <ThemedText style={styles.defaultText}>Take a picture to get started</ThemedText>

                <View style={styles.cameraContainer}>
                    {!imageTaken ? (
                        <TouchableOpacity
                            onPress={takePhoto}
                            style={[styles.navButton, { backgroundColor: '#007AFF' }]}
                        >
                            <MaterialIcons 
                                name="camera-alt" 
                                size={24} 
                                color="white" 
                                style={{ marginRight: 8 }}
                            />
                            <ThemedText style={styles.buttonText}>Take Photo</ThemedText>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.photoAndButtonContainer}>
                            {image && (
                                <View style={styles.photoContainer}>
                                    <Image
                                        source={{ uri: image }}
                                        style={styles.photo}
                                    />
                                </View>
                            )}
                            <TouchableOpacity
                                onPress={takePhoto}
                                style={[styles.navButton, { backgroundColor: '#87CEFA' }]}
                            >
                                <ThemedText style={styles.buttonText}>Retake Photo</ThemedText>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={[styles.navButton, styles.backButton]}
                        onPress={() => router.push('/')}
                    >
                        <ThemedText style={styles.buttonText}>Back</ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.navButton, styles.nextButton, !imageTaken && styles.disabledButton]}
                        disabled={!imageTaken}
                        onPress={() => router.push({
                            pathname: '/user-info',
                            params: { image: image }
                        })}
                    >
                        <ThemedText style={styles.buttonText}>Next</ThemedText>
                    </TouchableOpacity>
                </View>
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#EFE0F2',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#EFE0F2',
    },
    logo: {
        width: 200,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 30,
    },
    defaultText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    cameraContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
    },
    photoAndButtonContainer: {
        alignItems: 'center',
        width: '100%',
    },
    photoContainer: {
        width: 300,
        height: 300,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
    },
    navButton: {
        padding: 15,
        borderRadius: 10,
        minWidth: 200,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    backButton: {
        backgroundColor: '#8E8E93',
    },
    nextButton: {
        backgroundColor: '#34C759',
    },
    disabledButton: {
        opacity: 0.5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
