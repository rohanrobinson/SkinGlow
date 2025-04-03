import { router } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

// import { signInWithEmailAndPassword } from 'firebase/auth';

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
          return null;
      }

      // Get the first matching document
      const userDoc = querySnapshot.docs[0];
      console.log("Found matching user:", userDoc.id);
      
      // Return the document data and id
      return {
          id: userDoc.id,
          ...userDoc.data()
      };

  } catch (error) {
      console.error("Error checking user in database:", error);
      throw error;
  }
};

export default function HomeScreen() {

  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (username: string) => {
    try {
        const user = await checkIfUserInDb(username);
        if (user) {
          console.log("User found - output is below");
          
          console.log(user['skinProfile']);
          
          const name = user['skinProfile'].name;
          const age = user['skinProfile'].age;
          const knowledgeLevel = user['skinProfile'].knowledgeLevel;
          const skinGoal = user['skinProfile'].skinGoal;
          const skinType = user['skinProfile'].skinType;
          
          setLoginModalVisible(false);
          
          // take user to profile screen 
          router.push({
            pathname: '/profile',
            params: {
              name: name,
              age: age,
              knowledgeLevel: knowledgeLevel,
              skinGoal: skinGoal,
              skinType: skinType,
            },
          });
          
          return true;
        }
        else {
          console.log("User found: ", user);
          alert("User not found");
          return false;
        }
      }
    catch (error) {
          console.error("Error during login: ", error);
          alert("Login error occurred");
          return false;
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
            <Image style={styles.logoFun}
              source={require('@/assets/images/skinglow-logo.png')} 
             />
            <ThemedText style={styles.defaultText} type="title" >Skin Glow</ThemedText>
              <ThemedText style={styles.defaultText} type="subtitle">Look your Best in 3 Easy Steps</ThemedText> 
          <ThemedView style={styles.stepContainer}>
            <ThemedText  style={styles.defaultText} type="subtitle">(1) Take 2 Pictures</ThemedText>
          </ThemedView> 
           <ThemedView style={styles.stepContainer}>
            <ThemedText  style={styles.defaultText} type="subtitle">(2) Answer a Few Questions</ThemedText>
          </ThemedView> 
           <ThemedView style={styles.stepContainer}>
            <ThemedText style={styles.defaultText}  type="subtitle"> (3) View your Personalized Routine</ThemedText>
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
                                  
                                  <ThemedText style={styles.defaultText}>Password</ThemedText>
                                  <TextInput
                                      style={styles.input}
                                      onChangeText={setPassword}
                                      value={password}
                                      secureTextEntry={true}
                                      placeholder="Enter your password"
                                      placeholderTextColor="#999"
                                  />
                                  
                                  <ThemedView style={styles.buttonRow}>
                                      <TouchableOpacity 
                                          style={styles.buttonCancel}
                                          onPress={() => setLoginModalVisible(false)}
                                      >
                                          <ThemedText style={styles.defaultText}>Cancel</ThemedText>
                                      </TouchableOpacity>
                                      
                                      <TouchableOpacity 
                                          style={styles.buttonSubmit}
                                          onPress={() => {
                                              // Handle login logic here
                                              console.log("Login attempt:", username);
                                              handleLogin(username);
                                          }}
                                      >
                                          <ThemedText style={styles.defaultText}>Login</ThemedText>
                                      </TouchableOpacity>
                                  </ThemedView>
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
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  accountButton:{
    backgroundColor: 'lightpink',
    marginTop: 30,
    height: 60,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
},     modalContent: {
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
