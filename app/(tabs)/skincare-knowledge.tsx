import { router, useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function SkincareKnowledgeScreen() {
  
  const params = useLocalSearchParams();
  const { name, age, image, image2 } = params;

  
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
     
      <ThemedText style={styles.defaultText}>We want to Know more About You!</ThemedText>
      <ThemedText style={styles.defaultText}>How much do you Know about Skincare?</ThemedText>
      <ThemedView style={styles.optionsRow}>
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
                      styles.defaultText,
                      selectedOption === option && styles.selectedOptionText
                  ]}>
                      {option}
                  </ThemedText>
              </TouchableOpacity>
          ))}
      </ThemedView>

        <ThemedText style={styles.defaultText}>What is your current Skincare Routine if you have one?</ThemedText>
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

    <ThemedText style={styles.defaultText}>How do you want to improve your skin?</ThemedText>
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
           <ThemedText style={styles.defaultText}>&larr;</ThemedText> 
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
            image: image,
            image2: image2,
          }
        })}
      >
           <ThemedText style={styles.defaultText}>&rarr;</ThemedText> 
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
  defaultText: {
    color: 'black'
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,  // Space between buttons
    flexWrap: 'wrap',  // In case buttons need to wrap
    backgroundColor: '#EFE0F2', 
  },
  selectedOptionText: {
    color: 'white',  // White text for better contrast on pink background
  }
});
