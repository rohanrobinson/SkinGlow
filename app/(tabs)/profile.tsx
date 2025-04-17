import { useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, ActivityIndicator, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

const { width, height } = Dimensions.get('window');
const scale = Math.min(width, height) / 375; // Using 375 as base width (this came from Claude)

export default function ProfileScreen() {
    const params = useLocalSearchParams();
    const { username } = params;
    const [isLoading, setIsLoading] = useState(true);
    const [goal, setGoal] = useState("");
    const [age, setAge] = useState("");
    const [type, setSkinType] = useState("");
    const [knowledgeLevel, setKnowledgeLevel] = useState("");
    const [name, setName] = useState("");
    const [routine, setRecRoutine] = useState<string[]>([]);

    const setProperties  = (userData: any) => {
        setGoal(userData.skinProfile.skinGoal);
        setAge(userData.skinProfile.age);
        setSkinType(userData.skinProfile.skinType);
        setKnowledgeLevel(userData.skinProfile.knowledgeLevel);
        setName(userData.skinProfile.name);
    };

    const fetchUserProfile = async () => {
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where("username", "==", username));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                setProperties(userData);
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        } finally {
            setIsLoading(false);
        }
    };


    function generateRoutine() {
        let routine = [];
        if (knowledgeLevel == 'I know nothing.') {
               const morningRoutine = '🌞 In the morning use a gentle cleanser to remove oil and sweat from overnight. Also use a moisturizer that will keep your skin hydrated and protected';
               const eveningRoutine = '🌙 In the evening use the same gentle cleanser from the morning to wash off dirt, oil, and sunscreen';
        
               routine.push(morningRoutine);
               routine.push(eveningRoutine);
              }

        else if (knowledgeLevel == 'I am a novice' || knowledgeLevel == 'I am an expert!' ) {
              const morningRoutine = '🌞 In the morning use a gentle cleanser to remove oil and sweat from overnight. Also use a moisturizer that will keep your skin hydrated and protected. And last use a Sunscreen with SPF 30, daily sunscreen use prevents the visual effects of aging.';
              const eveningRoutine = '🌙 In the evening use the same gentle cleanser from the morning to wash off dirt, oil, and sunscreen. Also use that moisturizer if your skin feels a bit dry.';
   
              routine.push(morningRoutine);
              routine.push(eveningRoutine);      
        }
        setRecRoutine(routine);
    }

    useEffect(() => {
        fetchUserProfile();
    }, [username]);

    if (isLoading) {
        return (
            <ThemedView style={styles.container}>
                <ActivityIndicator size="large" color="#E57BFF" />
                <ThemedText>Loading profile...</ThemedText>
            </ThemedView>
        );
    }


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            
            <ThemedView style={styles.container}>
            
                <ThemedView style={styles.profileCard}>
                    <ThemedText style={styles.headerText}>Welcome, {name}!</ThemedText>
                    <ThemedView style={styles.infoSection}>
                        <ThemedText style={styles.label}>Age</ThemedText>
                        <ThemedText style={styles.value}>{age}</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.infoSection}>
                        <ThemedText style={styles.label}>Skin Type</ThemedText>
                        <ThemedText style={styles.value}>{type}</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.infoSection}>
                        <ThemedText style={styles.label}>Knowledge Level</ThemedText>
                        <ThemedText style={styles.value}>{knowledgeLevel}</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.goalSection}>
                        <ThemedText style={styles.label}>Your Skincare Goal</ThemedText>
                        <ThemedText style={styles.goalText}>{goal}</ThemedText>
                    </ThemedView>
                </ThemedView>

                <ThemedView style={styles.analysisCard}>
                    <ThemedText style={styles.headerText}>Reccomended Skincare Routine</ThemedText>
        
                    <ThemedView style={styles.analysisSection}>
                        <ThemedText style={styles.label}>Your Skincare Plan</ThemedText>
                        <ThemedText style={styles.goalText}>Youe skin analysis is a thing!</ThemedText>
                    </ThemedView>
                </ThemedView>

                <ThemedView style={styles.analysisCard}>
                    <ThemedText style={styles.headerText}>Skin Analysis Results</ThemedText>
        
                    <ThemedView style={styles.analysisSection}>
                        <ThemedText style={styles.label}>Your Skincare Analysis</ThemedText>
                        <ThemedText style={styles.goalText}>I think this is cool</ThemedText>
                    </ThemedView>
                </ThemedView>



            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFE0F2',
        alignItems: 'center',
        padding: 20 * scale,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    profileCard: {
        width: '40%',
        backgroundColor: 'white',
        borderRadius: 20 * scale,
        padding: 20 * scale,
        paddingLeft: 20,
        marginTop: 20 * scale,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },    
    analysisCard: {
        width: '40%',
        backgroundColor: 'white',
        borderRadius: 20 * scale,
        padding: 20 * scale,
        paddingLeft: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 20 * scale
    },
    analysisSection: {
        marginTop: 15 * scale,
        padding: 15 * scale,
        backgroundColor: '#F8E8FA',
        borderRadius: 10 * scale,
    },
    headerText: {
        fontSize: Math.max(24 * scale, 18),
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 15 * scale,
        textAlign: 'center',
    },
    infoSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12 * scale,
        borderBottomWidth: 1,
        borderBottomColor: '#E57BFF',
        backgroundColor: 'white',  // Add this to explicitly set background color
    },
    goalSection: {
        marginTop: 15 * scale,
        padding: 15 * scale,
        backgroundColor: '#F8E8FA',
        borderRadius: 10 * scale,
    },
    label: {
        fontSize: Math.max(16 * scale, 14),
        color: '#666',
        fontWeight: '500',
    },
    value: {
        fontSize: Math.max(16 * scale, 14), // Minimum size of 14,
        color: 'black',
        fontWeight: 'bold',
    },
    goalText: {
        fontSize: Math.max(16 * scale, 14),
        color: 'black',
        marginTop: 8 * scale,
        fontStyle: 'italic',
        lineHeight: 24 * scale,
    }
});