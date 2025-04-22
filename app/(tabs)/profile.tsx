import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput,
         ActivityIndicator,
         Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import { collection, query, doc, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';

const { width, height } = Dimensions.get('window');
const scale = Math.min(width, height) / 375; // Using 375 as base width (this came from Claude)

export default function ProfileScreen() {

    const params = useLocalSearchParams();
    const { username } = params;
    const [userDocId, setUserDocId] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [goal, setGoal] = useState("");
    const [age, setAge] = useState("");
    const [type, setSkinType] = useState("");
    const [knowledgeLevel, setKnowledgeLevel] = useState("");
    const [name, setName] = useState("");
    
    // Replace multiple useState calls with a single one for user profile data
    const [userProfile, setUserProfile] = useState({
            name: "",
            goal: "",
            age: "",
            skinType: "",
            knowledgeLevel: "",
    });

    const [tempUserProfile, setTempUserProfile] = useState({
            name: "",
            goal: "",
            age: "",
            skinType: "",
            knowledgeLevel: "",
    });

    const [isEditMode, setIsEditMode] = useState(false);

    // Handler to toggle edit mode
    const toggleEditMode = () => {
        if (isEditMode) {
        // Save changes when exiting edit mode
        setUserProfile({...tempUserProfile});


        //add change to database
        updateUserProfile(tempUserProfile);

        } 
        else {
        // Initialize temp data with current values when entering edit mode
        setTempUserProfile({...userProfile});
        }
        setIsEditMode(!isEditMode);
    };

    // Handler to update temp values during editing
    const handleChange = (field: any, value: any) => {
        setTempUserProfile({
        ...tempUserProfile,
        [field]: value
        });
    };

      // Cancel edit without saving
    const handleCancel = () => {
        setIsEditMode(false);
        setUserProfile(userProfile);
    };

    const setProperties  = (userData: any) => {
        console.log("user goal is-");
        console.log(userData.skinProfile.skinGoal)
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

            const userDocId = querySnapshot.docs[0].id;
            setUserDocId(userDocId);
            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                setProperties(userData);
                
                // Update all user profile data at once
                setUserProfile({
                    name: userData.skinProfile.name || "",
                    goal: userData.skinProfile.skinGoal || "",
                    age: userData.skinProfile.age || "",
                    skinType: userData.skinProfile.skinType || "", 
                    knowledgeLevel: userData.skinProfile.knowledgeLevel || "",
                });
                
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateUserProfile = async (newProfileObj: any) => {
        try { 
            // Reference to the specific document
            const documentRef = doc(db, "users", userDocId);

            await updateDoc(documentRef,  {
                skinProfile: {
                    name: newProfileObj.name,
                    goal: newProfileObj.goal,
                    age: newProfileObj.age,
                    skinType: newProfileObj.skinType,
                    knowledgeLevel: newProfileObj.knowledgeLevel,
                }
            });
        }

        catch (error) {
            console.error("Error updating profile:", error);
            return false;
        }
    };


    // function generateRoutine() {
    //     let routine = [];
    //     if (knowledgeLevel == 'I know nothing.') {
    //            const morningRoutine = '🌞 In the morning use a gentle cleanser to remove oil and sweat from overnight. Also use a moisturizer that will keep your skin hydrated and protected';
    //            const eveningRoutine = '🌙 In the evening use the same gentle cleanser from the morning to wash off dirt, oil, and sunscreen';
        
    //            routine.push(morningRoutine);
    //            routine.push(eveningRoutine);
    //           }

    //     else if (knowledgeLevel == 'I am a novice' || knowledgeLevel == 'I am an expert!' ) {
    //           const morningRoutine = '🌞 In the morning use a gentle cleanser to remove oil and sweat from overnight. Also use a moisturizer that will keep your skin hydrated and protected. And last use a Sunscreen with SPF 30, daily sunscreen use prevents the visual effects of aging.';
    //           const eveningRoutine = '🌙 In the evening use the same gentle cleanser from the morning to wash off dirt, oil, and sunscreen. Also use that moisturizer if your skin feels a bit dry.';
   
    //           routine.push(morningRoutine);
    //           routine.push(eveningRoutine);      
    //     }
    //     setRecRoutine(routine);
    // }

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
                    <ThemedText style={styles.headerText}>{isEditMode ? 'Edit Profile' : `Welcome ${name}!`}</ThemedText>
                    
                    {/* AGE FIELD */}
                    <ThemedView style={styles.infoSection}>
                        <ThemedText style={styles.label}>Age</ThemedText>
                        {isEditMode ? (
                        <TextInput
                            style={styles.input}
                            value={tempUserProfile.age}
                            onChangeText={(text) => handleChange('age', text)}
                            keyboardType="numeric"
                        />
                        ) : (
                        <ThemedText style={styles.value}>{userProfile.age}</ThemedText>
                        )}
                    </ThemedView>
                   
                    {/* SKIN TYPE FIELD */}
                    <ThemedView style={styles.infoSection}>
                        <ThemedText style={styles.label}>Skin Type</ThemedText>
                        {isEditMode ? (
                        <TextInput
                            style={styles.input}
                            value={tempUserProfile.skinType}
                            onChangeText={(text) => handleChange('skinType', text)}
                        />
                        ) : (
                        <ThemedText style={styles.value}>{userProfile.skinType}</ThemedText>
                        )}
                    </ThemedView>

                    {/* KNOWLEDGE LEVEL FIELD */}
                    <ThemedView style={styles.infoSection}>
                        <ThemedText style={styles.label}>Knowledge Level</ThemedText>
                        {isEditMode ? (
                        <TextInput
                            style={styles.input}
                            value={tempUserProfile.knowledgeLevel}
                            onChangeText={(text) => handleChange('knowledgeLevel', text)}
                        />
                        ) : (
                        <ThemedText style={styles.value}>{userProfile.knowledgeLevel}</ThemedText>
                        )}
                    </ThemedView>

                    {/* GOAL FIELD */}
                    <ThemedView style={styles.goalSection}>
                        <ThemedText style={styles.label}>Your Skincare Goal</ThemedText>
                        {isEditMode ? (
                        <TextInput
                            style={[styles.input, styles.goalInput]}
                            value={tempUserProfile.goal}
                            onChangeText={(text) => handleChange('goal', text)}
                            multiline={true}
                        />
                        ) : (
                        <ThemedText style={styles.goalText}>{userProfile.goal}</ThemedText>
                        )}
                    </ThemedView>
                    
                    {/* BUTTONS */}
                    {isEditMode ? (
                        <ThemedView style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={toggleEditMode}
                            >
                                <ThemedText style={styles.defaultText}>Save</ThemedText>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={handleCancel}
                            >
                                <ThemedText style={styles.defaultText}>Cancel</ThemedText>
                            </TouchableOpacity>
                        </ThemedView>
                    ) : (
                        <ThemedView style={styles.buttonContainer}>
                        <TouchableOpacity
                        style={styles.editUserBtn}
                        onPress={toggleEditMode}
                        >
                        <ThemedText style={styles.defaultText}>Edit</ThemedText>
                        </TouchableOpacity>
                        </ThemedView>
                    )}
                </ThemedView>
                <ThemedView style={styles.analysisCard}>
                    <ThemedText style={styles.headerText}>Reccomended Skincare Routine</ThemedText>
                    <ThemedView style={styles.analysisSection}>
                        <ThemedText style={styles.label}>Your Skincare Plan</ThemedText>
                        <ThemedText style={styles.goalText}>With the right routine, you're gonna be looking **** soon!</ThemedText>
                    </ThemedView>
                </ThemedView>

                <ThemedView style={styles.analysisCard}>
                    <ThemedText style={styles.headerText}>Skin Analysis Results</ThemedText>
                    <ThemedView style={styles.analysisSection}>
                        <ThemedText style={styles.label}>Your Skincare Analysis</ThemedText>
                        <ThemedText style={styles.goalText}>Skin analysis is a cool concept</ThemedText>
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
        width: '80%',
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
        width: '80%',
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
    defaultText: {
        color: 'black',
        fontSize: Math.max(14 * scale, 12), // Minimum size of 12
      },
    saveText: {
        color: 'black',
        fontSize: Math.max(10 * scale, 12), // Minimum size of 12 
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
    input: {
        width: '35%',
        height: 30 * scale,
        padding: 10 * scale,
        marginBottom: 15 * scale,
        fontSize: 30,  
    }, 
    goalInput: {
        marginTop: 4,
        minHeight: 60,
        width: '100%',
    },
    button: {
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 4,
      },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        backgroundColor: 'white',
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
    },
    editUserBtn: {
        marginTop: 30,
        height: 75, 
        width: 75,
        backgroundColor: '#E57BFF',
        justifyContent: 'center',
        alignItems: 'center',
      },
    saveButton: {
        backgroundColor: '#E57BFF',
        height: 75, 
        width: 75,
        alignItems: 'center',
        padding: 12,
        borderRadius: 6,
        flex: 1,
        marginHorizontal: 4,
      },
    cancelButton: {
        backgroundColor: '#ccc',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 4,
        height: 75, 
        width: 75,
    }
});