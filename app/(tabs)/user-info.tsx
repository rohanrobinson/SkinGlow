import { router, useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, TextInput, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { Console } from 'console';

export default function UserInfoScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');


  const params = useLocalSearchParams();
  const { image, image2 } = params;
  
  console.log("Image URI received:", image); // Add this to debug

  return (
    <ThemedView style={styles.container}>

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
    


    <TouchableOpacity
     onPress={() => router.push('/')}
    >
      <Image 
        source={require('@/assets/images/skinglow-logo.png')} 
      />
    </TouchableOpacity>
      <ThemedText>Help Us Get to Know You!</ThemedText>

      <p>Name</p>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="What's your name?"
        placeholderTextColor="#666"
        // Optional props:
        autoCorrect={false}
        autoCapitalize="none"
      /> <br />

      <p>Age</p>
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
