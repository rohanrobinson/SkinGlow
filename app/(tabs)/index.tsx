import { router } from 'expo-router';
import { Image, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

// import { auth, db } from '../../firebaseConfigfirebase';
// import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

const { width, height } = Dimensions.get('window');
const scale = Math.min(width, height) / 375; // Using 375 as base width (this came from Claude)


// Example auth usage
// function login(email, password) {
//   return signInWithEmailAndPassword(auth, email, password);
// }

// Example Firestore usage
// async function getUsers() {
//   const usersCollection = collection(db, 'users');
//   const usersSnapshot = await getDocs(usersCollection);
//   return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// }

const checkIfUserInDb = async (usernameToCheck: string) => {
  try {
      console.log("Checking for username:", usernameToCheck);
      
      // Create a query against the users collection
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where("username", "==", usernameToCheck));
      
      // Execute the query
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
          console.log("No matching user found");
          return "failure";
      }

      // Get the first matching document
      const userDoc = querySnapshot.docs[0];
      console.log("Found matching user:", userDoc.id);
      
      // Return the document data and id
      return "success";

  } catch (error) {
      console.error("Error checking user in database:", error);
      throw error;
  }
};

export default function HomeScreen() {

  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  // const [password, setPassword] = useState('');

  const getUserProfile = async (usernameToCheck: string) => {
    const message = await checkIfUserInDb(usernameToCheck);

    if (message === "success" ) {
      router.push({
        pathname: '/profile',
        params: {
          username: username,
        }
      });
    }

    if (message === "failure") {
       setShowErrorModal(true);
    }

}
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
            <Image style={styles.logoFun}
              source={require('@/assets/images/skinglow-logo.png')} 
             />
            <ThemedText style={styles.defaultText} type="title" >Skin Glow</ThemedText>
              <ThemedText style={styles.defaultText} type="subtitle">Look your Best in 2 Easy Steps</ThemedText> 
           <ThemedView style={styles.stepContainer}>
            <ThemedText  style={styles.defaultText} type="subtitle">(1) Answer a Few Questions</ThemedText>
          </ThemedView> 
           <ThemedView style={styles.stepContainer}>
            <ThemedText style={styles.defaultText}  type="subtitle"> (2) View your Personalized Routine and Analysis</ThemedText>
          </ThemedView>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/user-info') }
          >
            <ThemedText style={styles.buttonText}>Start</ThemedText>
          </TouchableOpacity>

          
          <TouchableOpacity
                    style={styles.accountButton}
                    onPress={() => setLoginModalVisible(true)}
                >
                    <ThemedText style={styles.buttonText}>Have an account?</ThemedText>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={loginModalVisible}
                    onRequestClose={() => setLoginModalVisible(false)}
                >
                    <ThemedView style={styles.modalBackground}>
                        <ThemedView style={styles.modalContent}>
                            <ThemedText style={styles.defaultText}>Welcome Back!</ThemedText>
                            
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
                                secureTextEntry={true}
                                placeholder="Enter your password"
                                placeholderTextColor="#999"
                            /> */}
                            
                            <ThemedView style={styles.buttonRow}>
                                <TouchableOpacity 
                                    style={styles.buttonSubmit}
                                    onPress={() => {
                                        // Handle login logic here
                                        getUserProfile(username);
                                        setLoginModalVisible(false);
                                    }}
                                >
                                    <ThemedText style={styles.defaultText}>Login</ThemedText>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={styles.buttonCancel}
                                    onPress={() => setLoginModalVisible(false)}
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
                    visible={showErrorModal}
                    onRequestClose={() => setShowErrorModal(false)}
                >
                  <ThemedView style={styles.modalBackground}>
                      <ThemedView style={styles.modalContent}>
                          <ThemedText style={styles.defaultText}>Sorry 😕 We were not able to find {username} in our system!</ThemedText>
                          <ThemedText style={styles.defaultText}>Tap Start if you're new to Skin Glow!</ThemedText>
                          <TouchableOpacity 
                              style={styles.accountButton}
                              onPress={() => {
                                  setShowErrorModal(false);
                                  setLoginModalVisible(true); // Reopen login modal
                              }}
                          >
                              <ThemedText style={styles.buttonText}>Try Again</ThemedText>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                              setShowErrorModal(false);
                              router.push('/user-info')} }
                          >
            <ThemedText style={styles.buttonText}>Start</ThemedText>
          </TouchableOpacity>
                      </ThemedView>
                  </ThemedView>
                </Modal>
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
  defaultText: {
    color: 'black',
    fontSize: Math.max(14 * scale, 12), // Minimum size of 12
  },
  logoFun: {
    marginTop: 100,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    fontWeight: 'normal',
  },
  stepContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#EFE0F2'
  },
  button: {
    marginTop: 30,
    backgroundColor: '#E57BFF',
    height: 60,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountButton: {
    marginTop: 30,
    backgroundColor: 'lightblue',
    height: 60,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
},
modalContent: {
  width: width > 768 ? '30%' : '80%', // Wider on tablets/desktop, narrower on phones
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
  input: {
    width: '35%',
    height: 50 * scale,
    padding: 10 * scale,
    marginBottom: 15 * scale,
},
buttonRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '50%',
  marginTop: 10,
  backgroundColor: '#EFE0F2',
},
buttonCancel: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center', // Centers vertically
    height: 40,  
},
buttonSubmit: {
    backgroundColor: '#E57BFF',
    padding: 5,
    borderRadius: 10,
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center', // Centers vertically
    height: 40, 
}
});
