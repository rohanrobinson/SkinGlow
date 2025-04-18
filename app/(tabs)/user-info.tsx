import { router, useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');
const scale = Math.min(width, height) / 375; // Using 375 as base width (this came from Claude)

export default function UserInfoScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const params = useLocalSearchParams();
  const { image, image2 } = params;
  
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
      <ThemedText style={styles.defaultText}>Help Us Get to Know You!</ThemedText>

      <ThemedText style={styles.defaultText}>Name</ThemedText>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="What's your name?"
        placeholderTextColor="#666"
        // Optional props:
        autoCorrect={false}
        autoCapitalize="none"
      /> 

      <ThemedText style={styles.defaultText}>Age</ThemedText>
      <TextInput
        style={styles.input}
        onChangeText={setAge}
        value={age}
        placeholder="How old are you?"
        placeholderTextColor="#666"
        // Optional props:
        autoCorrect={false}
        autoCapitalize="none"
      />

      <TouchableOpacity
            onPress={() => router.push('/') }
      >
           <ThemedText style={styles.buttonText}>&larr;</ThemedText> 

      </TouchableOpacity>

      <TouchableOpacity
          onPress={() => router.push({
            pathname: '/skincare-knowledge',
            params: {
              name: name,
              age: age,
              image: image,
              image2: image2
                    }
                  })}
      >
           <ThemedText style={styles.buttonText}>&rarr;</ThemedText> 
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
  defaultText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: Math.max(14 * scale, 12), // Minimum size of 12
  },
});
