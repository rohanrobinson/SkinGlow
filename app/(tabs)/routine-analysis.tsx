import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, TextInput, Image,
    StyleSheet, ActivityIndicator, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';

import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';


export default function RoutineAnalysis() {

    const params = useLocalSearchParams();
    const { name, age, skinGoal, skinType, knowledgeLevel } = params;
    const [infoType, toggleAnalysisOrRoutine] = useState('analysis');
    const [isLoading, setIsLoading] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [reccomendedRoutine, setRecRoutine] = useState<string[]>([]);    


    const [modalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState('enter username');
    const [password, setPassword] = useState('enter password');


    function generateRoutine() {
        let routine = [];
        const morningRoutine = '🌞 In the morning use a gentle cleanser to remove oil and sweat from overnight. Also use a moisturizer that will keep your skin hydrated and protected';
        const eveningRoutine = '🌙 In the evening use the same gentle cleanser from the morning to wash off dirt, oil, and sunscreen. Also use that moisturizer if your skin feels a bit dry.';

        routine.push(morningRoutine);
        routine.push(eveningRoutine);

        setRecRoutine(routine);
    }

    function generateAnalysis() {
        console.log('asdf');
    }


    function displaySkinCareRoutine() {
      return (
        <ThemedView style={styles.container}>
          <ThemedText style={styles.defaultText}> Hey { name }! Here's a routine to get started with!</ThemedText>
            <ThemedText style={styles.defaultText}>
                  <ThemedText style={styles.defaultText}>{reccomendedRoutine[0]}{'\n'}{reccomendedRoutine[1]}</ThemedText>
            </ThemedText>
        </ThemedView>
      )
    }

    function displaySkinCareAnalysis() {
      return(
        <ThemedView style={styles.container}>
          <ThemedText style={styles.defaultText}>{name}! Here's Your Skin Analysis</ThemedText>
          <ThemedText style={styles.defaultText}>
                  Your skin is awesome there is no need for you to use this app! 😆   
          </ThemedText>
        </ThemedView>
      )
    }


  // Get all users
  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersRef);
      
      querySnapshot.forEach((doc) => {
        console.log({
          id: doc.id,
          ...doc.data()
        });
      });

      // setMessage(`Fetched ${userList.length} users`);
    } catch (error) {
      postMessage(`Error fetching users: ${error}`);
    }
  };

  // Add new user to database
  const addUser = async (userData: any) => {
    try {
      const usersRef = collection(db, 'users');

      try {
        const newUserDoc = await addDoc(usersRef, userData);
        console.log("Document successfully added:", newUserDoc.id);
        setShowConfirmation(true);
        return newUserDoc;
      } 
      
      catch (error: any) {
        console.error("Detailed error:", {
            message: error.message,
            code: error.code,
            details: error
        });
      throw error;
    }         

    }
    catch (error) {
      postMessage(`Error adding user: ${error}`);
    }
  }

    // this function sends user data to firebase
    function makeUserObject() {
        const userObject = {
          username: username || '',
          createdAt: serverTimestamp(),
          skinProfile: {
              skinType: skinType || '',
              skinGoal: skinGoal || '',
              age: age || '',
              name: name || '', 
              knowledgeLevel: knowledgeLevel || '',
        }
      };
        return userObject;
    }

    useEffect(() => {
      setTimeout(() => {
          setIsLoading(false);
      }, 1500); // 1500 milliseconds = 1.5 seconds
      generateRoutine();
      generateAnalysis();
    }, [],
  );

    if (isLoading) {
      return (
          <ThemedView style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#E57BFF" />
              <ThemedText style={styles.defaultText}>Loading...</ThemedText>
          </ThemedView>
      );
    }

    return (

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.container}>
          <TouchableOpacity
              style={styles.logoFun}
              onPress={() => router.push('/')}
          >
                <Image 
                  source={require('@/assets/images/skinglow-logo.png')} 
                />
          </TouchableOpacity>

          <ThemedView style={styles.rowContainer}>

                    { infoType === 'routine' ? 
                    <Pressable onPress={() => toggleAnalysisOrRoutine('routine')}
                        style={styles.selectedButton}
                    >
                      <ThemedText style={styles.defaultText}>Routine</ThemedText>
                    </Pressable>
                    : 
                    <Pressable onPress={() => toggleAnalysisOrRoutine('routine')}
                    style={styles.unselectedButton}
                    >
                      <ThemedText style={styles.defaultText}>Routine</ThemedText>
                    </Pressable>
                   }
                        { infoType === 'analysis' ? 

                        <Pressable onPress={() => toggleAnalysisOrRoutine('analysis')}
                            style={styles.selectedButton}
                        >
                          <ThemedText style={styles.defaultText}>Analysis</ThemedText>
                        </Pressable>
                        : 
                        <Pressable onPress={() => toggleAnalysisOrRoutine('analysis')}
                        style={styles.unselectedButton}
                        >
                          <ThemedText style={styles.defaultText}>Analysis</ThemedText>
                        </Pressable>
                        }
          </ThemedView>

          <ThemedView>
            {
                infoType === 'analysis'
                
                ?
                displaySkinCareAnalysis()
                :
               displaySkinCareRoutine()  // Remove Text wrapper since the function already returns ThemedText
            }
            
          </ThemedView>

        <ThemedView style={styles.container}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setModalVisible(true)}
                  >
                      <ThemedText style={styles.buttonText}>Want More?</ThemedText>
                  </TouchableOpacity>
                
                <Modal
                      animationType="fade"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => setModalVisible(false)}
                  >
                    <ThemedView style={styles.modalBackground}>
                        <ThemedView style={styles.modalContent}>
                            <ThemedText style={styles.defaultText}>Unlock your Best Skin by making a Free Skin Glow Account!</ThemedText>
                            
                            <ThemedText style={styles.defaultText}>Username</ThemedText>
                            <TextInput
                                style={styles.input}
                                onChangeText={setUsername}
                                value={username}
                                placeholder="Enter your username"
                                placeholderTextColor="#999"
                            />
                            
                            {/* <ThemedText style={styles.defaultText}>Password</ThemedText>
                            <TextInput
                                style={styles.input}
                                onChangeText={setPassword}
                                value={password}
                                placeholder="Enter your password"
                                secureTextEntry={false}
                                placeholderTextColor="#999"
                            /> */}
                            <ThemedView style={styles.buttonRow}>
                                
                                <TouchableOpacity 
                                    style={styles.buttonSubmit}
                                    onPress={() => {
                                        // Handle login logic here
                                        setModalVisible(false);
                                        const userData = makeUserObject();
                                        addUser(userData);
                                    }}
                                >
                                    <ThemedText style={styles.defaultText}>Sign Up</ThemedText>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={styles.buttonCancel}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <ThemedText style={styles.defaultText}>Cancel</ThemedText>
                                </TouchableOpacity>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>
                  </Modal>     

              <Modal
                  animationType="slide"
                  transparent={true}
                  visible={showConfirmation}
                  onRequestClose={() => setShowConfirmation(false)}
              >
                  <ThemedView style={styles.modalBackground}>
                      <ThemedView style={styles.modalContent}>
                          <ThemedText style={styles.defaultText}>Welcome to SkinGlow! 🎉</ThemedText>
                          <ThemedText style={styles.defaultText}>Your account has been created successfully!</ThemedText>
                          
                          <TouchableOpacity 
                              style={styles.buttonSubmit}
                              onPress={() => {
                                  setShowConfirmation(false);
                                  router.push({
                                    pathname: '/profile',
                                    params: {
                                      username: username,
                                    }
                                  });
                              }}
                          >
                              <ThemedText style={styles.defaultText}>{username}! Check out your profile!</ThemedText>
                          </TouchableOpacity>
                      </ThemedView>
                  </ThemedView>
              </Modal>     
        </ThemedView>
      </ThemedView>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
      flex: 1, 
      backgroundColor: '#EFE0F2',
      alignItems: 'center', 
    },
    scrollContainer: {
      flexGrow: 1,
    }, 
    button: {
      height: 60,
      width: 200,
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      backgroundColor: '#E57BFF',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EFE0F2', // Match your app's background color
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '6%',
    paddingHorizontal: 10,
    backgroundColor: '#EFE0F2',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  callToAction: {
    marginTop: 10,
  },
  defaultText: {
    color: 'black',
  },
  // loadingText: {
  //     marginTop: 10,
  //     fontSize: 16,
  // },
  selectedButton: {
    padding: 10,
    width: 60,
    alignItems: 'center',
    backgroundColor: '#E57BFF',
    borderRadius: 5,
  },
  unselectedButton: {
    padding: 10,
    width: 60,
    alignItems: 'center',
    backgroundColor: '#EFE0F2',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20, // Adds space between the buttons
    backgroundColor: '#EFE0F2', 
  },
  wantMoreButton: {
    backgroundColor: '#E57BFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
},
logoFun: {
  marginTop: 30,
},
modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
},
modalContent: {
    width: '60%',
    backgroundColor: '#EFE0F2',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
},
modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
},
modalText: {
    // alignSelf: 'flex-start', 
    color: 'black'
},
inputLabel: {
    alignSelf: 'flex-start',
    marginBottom: 5,
},
input: {
    width: '60%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
},
buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 10,
    backgroundColor: '#EFE0F2',
},
buttonCancel: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
},
buttonSubmit: {
    backgroundColor: '#E57BFF',
    padding: 15,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
}
  });
