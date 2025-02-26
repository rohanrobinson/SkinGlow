import { router, useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function SkincareKnowledgeScreen() {
  
  const params = useLocalSearchParams();
  const { name, age } = params;

  
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const knowledgeOptions = ['I know nothing.', 'I am a novice. ', 'I am an expert!'];
  const [userSCRoutine, setSCRoutine] = useState('');
  const [skinImprovementGoal, setSkinImprovementGoal] = useState('');


  return (
    <ThemedView style={styles.container}>

    <TouchableOpacity
     onPress={() => router.push('/')}
    >
      <Image 
        source={require('@/assets/images/skinglow-logo.png')} 
      />
    </TouchableOpacity>
     
      <ThemedText>Help us Get to Know You!</ThemedText>
      <br />
      <ThemedText>How much do you Know about Skincare?</ThemedText>
      {knowledgeOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selectedOption === option && styles.selectedOption
            ]}
            onPress={() => setSelectedOption(option)}
           >
            <ThemedText style={[
              styles.optionText,
              selectedOption === option && styles.selectedOptionText
            ]}>
              {option}
            </ThemedText>
          </TouchableOpacity>
        ))}

        <br />
        <ThemedText>What is your current Skincare Routine if you have one?</ThemedText>
        <TextInput
        style={styles.input}
        onChangeText={setSCRoutine}
        value={userSCRoutine}
        placeholder="What do you put on yourself"
        placeholderTextColor="#666"
        // Optional props:
        autoCorrect={false}
        autoCapitalize="none"
      /> 


        <br />

    <ThemedText>How do you want to improve your skin?</ThemedText>
        <TextInput
        style={styles.input}
        onChangeText={setSkinImprovementGoal}
        value={skinImprovementGoal}
        placeholder="What are your skincare goals?"
        placeholderTextColor="#666"
        // Optional props:
        autoCorrect={false}
        autoCapitalize="none"
      />
    <TouchableOpacity
       onPress={() => router.push('/user-info') }
      >
           <ThemedText style={styles.buttonText}>&larr;</ThemedText> 
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push({
          pathname: '/info-confirmation',
          params: {
            name: name,
            age: age,
            routine: userSCRoutine,
            goal: skinImprovementGoal,
            knowledgeLevel: selectedOption, 
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
  },
  button: {
    backgroundColor: '#E57BFF',
    height: 60,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButton: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E57BFF',
    backgroundColor: 'white',
  },
  selectedOption: {
    backgroundColor: '#E57BFF',  // Pink background for selected option
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  selectedOptionText: {
    color: 'white',  // White text for better contrast on pink background
  }
});
