import { router, useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function InfoConfirmationScreen() {

  const params = useLocalSearchParams();
  const { name, age, routine, goal } = params;
  
    // Now you can use name and age in this component
    console.log('Name:', name);
    console.log('Age:', age);
    console.log('Routine:', routine);
    console.log('Goal:', goal);

  return (
    <ThemedView style={styles.container}>
 
    <TouchableOpacity
     onPress={() => router.push('/')}
    >
      <Image 
        source={require('@/assets/images/skinglow-logo.png')} 
      />
    </TouchableOpacity>

      <ThemedText><b>Here's what we've learned about you!</b></ThemedText>

      <ThemedText>Is this correct?</ThemedText>

      <ThemedText>
        <p>Your name is <b>{name}</b></p> <br />
        <p>You are <b>{age} years old </b> </p> <br />
        <p>Your current routine is <b>{routine}</b></p> <br />
        <p>Your skincare goal is <b>{goal}</b></p>
      </ThemedText>

      <TouchableOpacity onPress={() => router.push('/') }>
           <ThemedText style={styles.buttonText}>No Go Back</ThemedText> 
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/skincare-knowledge') }>
           <ThemedText style={styles.buttonText}>Yep!</ThemedText> 
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: '#EFE0F2',
    alignItems: 'center', 
  },
  input: {
    width: '25%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', 
    marginVertical: 2,
  },
  button: {
    backgroundColor: '#E57BFF',
    height: 60,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
