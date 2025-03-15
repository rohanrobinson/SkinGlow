import { router, useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function InfoConfirmationScreen() {

  const params = useLocalSearchParams();
  const { name, age, routine, goal, image, image2 } = params;
  
  console.log("Image URI received:", image); // Add this to debug

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
        <p>Your name &rarr; <b>{name}</b></p> <br />
        <p>You are <b>{age} years old </b> </p> <br />
        <p>Your current routine &rarr; <b>{routine}</b></p> <br />
        <p>Your skincare goal &rarr; <b>{goal}</b></p>
        <p>Here are the awesome pictures we got of you!</p>
      </ThemedText>

      <View style={{ width: 300, height: 300 }}>
          <Image
              source={{uri: typeof image === 'string' ? image : Array.isArray(image) ? image[0] : ''}}
              resizeMode="contain"
              style={{ width: '100%', height: '100%' }}
          />
      </View>

      <View style={{ width: 300, height: 300 }}>
          <Image
              source={{uri: typeof image2 === 'string' ? image2 : Array.isArray(image2) ? image2[0] : ''}}
              resizeMode="contain"
              style={{ width: '100%', height: '100%' }}
          />
      </View>

      <TouchableOpacity onPress={() => router.push('/') }>
           <ThemedText style={styles.buttonText}>No</ThemedText> 
      </TouchableOpacity>

      <TouchableOpacity 
                  onPress={() => router.push({
                    pathname: '/routine',
                    params: {
                       name: name,
                            }
                          })}
        >
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
  }, 
  photo: {
    width: 300,
    height: 300,
    borderRadius: 10,
},
});
