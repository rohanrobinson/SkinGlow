import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, TextInput, Image,
    StyleSheet, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';

export default function RoutineAnalysis() {

    const params = useLocalSearchParams();
    const { name, age, routine, goal } = params;
    const [infoType, toggleAnalysisOrRoutine] = useState('analysis');
    const [isLoading, setIsLoading] = useState(true);

    const [modalVisible, setModalVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');



    function displaySkinCareRoutine() {
      return (
        <ThemedView style={styles.container}>

          <ThemedText style={{ fontWeight: 'bold' }}> Hey { name }! Here's a routine to get started with!</ThemedText>
          <ThemedText>
              Use a gentle, hydrating cleanser to remove impurities and prepare your skin for the day.
          </ThemedText>
          <ThemedText>
              Example Products: Cetaphil Daily Facial Cleanser or CeraVe Hydrating Cleanser.  
          </ThemedText>

        </ThemedView>
      )
    }

    function displaySkinCareAnalysis() {
      return(
        <ThemedView style={styles.container}>
          <ThemedText style={{ fontWeight: 'bold' }}>{name}! Here's your skin analysis</ThemedText>
          <ThemedText>
              Skin texture appears smooth and well-maintained, indicating good hydration levels.
          </ThemedText>
          <ThemedText>
              The skin shows minimal signs of dryness or flakiness, suggesting that regular moisturizing.  
          </ThemedText>
        </ThemedView>
      )
    }

    useEffect(() => {
      setTimeout(() => {
          setIsLoading(false);
      }, 1500); // 2000 milliseconds = 2 seconds
    }, []);

    if (isLoading) {
      return (
          <ThemedView style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#E57BFF" />
              <ThemedText style={styles.loadingText}>Loading...</ThemedText>
          </ThemedView>
      );
    }



    return (
        <ThemedView style={styles.container}>

          <TouchableOpacity
              onPress={() => router.push('/')}
          >
                <Image 
                  source={require('@/assets/images/skinglow-logo.png')} 
                />
          </TouchableOpacity>

          <ThemedView style={styles.buttonContainer}>
              <ThemedView>
                    { infoType === 'routine' ? 
                    <Pressable onPress={() => toggleAnalysisOrRoutine('routine')}
                        style={styles.selectedButton}
                    >
                      <Text>Routine</Text>
                    </Pressable>
                    : 
                    <Pressable onPress={() => toggleAnalysisOrRoutine('routine')}
                    style={styles.unselectedButton}
                    >
                      <Text>Routine</Text>
                    </Pressable>
                   }
              </ThemedView>
              <ThemedView>
                        { infoType === 'analysis' ? 

                        <Pressable onPress={() => toggleAnalysisOrRoutine('analysis')}
                            style={styles.selectedButton}
                        >
                          <Text>Analysis</Text>
                        </Pressable>
                        : 
                        <Pressable onPress={() => toggleAnalysisOrRoutine('analysis')}
                        style={styles.unselectedButton}
                        >
                          <Text>Analysis</Text>
                        </Pressable>
                        }
              </ThemedView>
          </ThemedView>

          <ThemedView>
            {
                infoType === 'analysis'
                
                ?

                <Text>
                      {displaySkinCareAnalysis()}
                </Text>

                :

                <Text>
                      {displaySkinCareRoutine()}  
                </Text>
            }
            
          </ThemedView>

              <ThemedView style={styles.callToAction}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setModalVisible(true)}
                  >
                      <ThemedText style={styles.buttonText}>Want More?</ThemedText>
                  </TouchableOpacity>
                
                <Modal
                      animationType="slide"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => setModalVisible(false)}
                  >
                    <ThemedView style={styles.modalBackground}>
                        <ThemedView style={styles.modalContent}>
                            <ThemedText style={styles.modalTitle}>Unlock the Best Skincare Knowledge by making a Free Skin Glow Account!</ThemedText>
                            
                            <ThemedText style={styles.inputLabel}>Username</ThemedText>
                            <TextInput
                                style={styles.input}
                                onChangeText={setUsername}
                                value={username}
                                placeholder="Enter your username"
                                placeholderTextColor="#999"
                            />
                            
                            <ThemedText style={styles.inputLabel}>Password</ThemedText>
                            <TextInput
                                style={styles.input}
                                onChangeText={setPassword}
                                value={password}
                                placeholder="Enter your password"
                                secureTextEntry={false}
                                placeholderTextColor="#999"
                            />
                            
                            <ThemedView style={styles.buttonRow}>
                                <TouchableOpacity 
                                    style={styles.buttonCancel}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <ThemedText>Cancel</ThemedText>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={styles.buttonSubmit}
                                    onPress={() => {
                                        // Handle login logic here
                                        console.log("Username:", username, "Password:", password);
                                        console.log("thanks " + {name} + " skinglow is ready to assist with all your skincare needs");
                                        setModalVisible(false);
                                    }}
                                >
                                    <ThemedText>Submit</ThemedText>
                                </TouchableOpacity>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>
                  </Modal>
            </ThemedView>

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container:{
      flex: 1, 
      backgroundColor: '#EFE0F2',
      alignItems: 'center', 
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
    justifyContent: 'space-between',
    width: '100%',
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
//   columnContainer: {
//     flex: 0.2,
//     marginHorizontal: 5,
//     backgroundColor: '#E57BFF',
//     alignItems: 'center',
// },
  loadingText: {
      marginTop: 10,
      fontSize: 16,
  }, 
  selectedButton: {
    padding: 10,
    width: 50,
    alignItems: 'center',
    backgroundColor: '#E57BFF',
    borderRadius: 5,
  },
  unselectedButton: {
    padding: 10,
    width: 50,
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
modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
},
modalContent: {
    width: '80%',
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
inputLabel: {
    alignSelf: 'flex-start',
    marginBottom: 5,
},
input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
},
buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
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
