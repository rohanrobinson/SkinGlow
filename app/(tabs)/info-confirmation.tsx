import { router, useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function InfoConfirmationScreen() {

  const params = useLocalSearchParams();
  const { name, age, routine, goal, image, image2 } = params;
  
  console.log("Image URI received:", image); // Add this to debug

  return (
  
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    <ThemedView style={styles.container}>

    <TouchableOpacity
     onPress={() => router.push('/')}
    >
      <Image 
        source={require('@/assets/images/skinglow-logo.png')} 
      />
    </TouchableOpacity>

      <ThemedText style={styles.defaultText}>Here's what we've learned about you!</ThemedText>

      <ThemedText style={styles.defaultText}>Is this correct?</ThemedText>

        <ThemedText style={styles.defaultText}>Your name &rarr; {name}</ThemedText>
        <ThemedText style={styles.defaultText}>You are {age} years old</ThemedText>
        <ThemedText style={styles.defaultText}>Your current routine &rarr; {routine}</ThemedText>
        <ThemedText style={styles.defaultText}>Your skincare goal &rarr; {goal}</ThemedText>
        <ThemedText style={styles.defaultText}>Here are the awesome pictures we got of you!</ThemedText>
  

      <View style={{ width: 150, height: 150 }}>
          <Image
              source={{uri: typeof image === 'string' ? image : Array.isArray(image) ? image[0] : ''}}
              resizeMode="contain"
              style={{ width: '100%', height: '100%' }}
          />
      </View>

      <View style={{ width: 150, height: 150 }}>
          <Image
              source={{uri: typeof image2 === 'string' ? image2 : Array.isArray(image2) ? image2[0] : ''}}
              resizeMode="contain"
              style={{ width: '100%', height: '100%' }}
          />
      </View>

      <TouchableOpacity onPress={() => router.push('/') }>
           <ThemedText style={styles.defaultText}>No</ThemedText> 
      </TouchableOpacity>

      <TouchableOpacity 
                  onPress={() => router.push({
                    pathname: '/routine-analysis',
                    params: {
                       name: name,
                            }
                          })}
        >
           <ThemedText style={styles.defaultText}>Yes!</ThemedText> 
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
    flexGrow: 1, // Ensures scroll works with flex
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
  defaultText: {
    color: 'black'
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
  }, 
  photo: {
    width: 300,
    height: 300,
    borderRadius: 10,
},
});
