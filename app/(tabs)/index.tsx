import { router } from 'expo-router';

import { Image, Modal, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from './authContext';


import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

// Example Firestore usage
async function getUsers() {
  const usersCollection = collection(db, 'users');
  const usersSnapshot = await getDocs(usersCollection);
  return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

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
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
            <Image style={styles.logoFun}
              source={require('@/assets/images/skinglow-logo.png')} 
             />
            <ThemedText style={styles.defaultText} type="title" >Skin Glow</ThemedText>
              <ThemedText style={styles.defaultText} type="subtitle">Look your Best in 2 Easy Steps</ThemedText> 
          {/* <ThemedView style={styles.stepContainer}>
            <ThemedText  style={styles.defaultText} type="subtitle">(1) Take 2 Pictures</ThemedText>
          </ThemedView>  */}
           <ThemedView style={styles.stepContainer}>
            <ThemedText  style={styles.defaultText} type="subtitle">(1) Answer a Few Questions</ThemedText>
          </ThemedView> 
           <ThemedView style={styles.stepContainer}>
            <ThemedText style={styles.defaultText}  type="subtitle"> (2) View your Personalized Skincare Routine</ThemedText>
          </ThemedView>  
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/user-info') }
          >
           <ThemedText style={styles.buttonText}>Start</ThemedText>
          </TouchableOpacity>
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
  }
});
