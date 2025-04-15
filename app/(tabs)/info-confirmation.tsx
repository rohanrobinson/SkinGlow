import { router, useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function InfoConfirmationScreen() {

  const params = useLocalSearchParams();
  const { name, age, routine, goal, skinType, knowledgeLevel } = params;
  

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

        <ThemedText style={styles.userInfoText}>Your beautiful name is {name}!</ThemedText>
        <ThemedText style={styles.userInfoText}>You are {age} years old</ThemedText>
        <ThemedText style={styles.userInfoText}>Your skin type is {skinType}</ThemedText>
        <ThemedText style={styles.userInfoText}>Your skincare knowledge level is {knowledgeLevel}</ThemedText>
        <ThemedText style={styles.userInfoText}>Your skincare goal &rarr; {goal}</ThemedText>
  
      <ThemedView
        style={styles.rowContainer}
      >
        <ThemedView
          style={styles.columnContainerNav}
        >
            <TouchableOpacity onPress={() => router.push('/take-pics') }
                style={styles.noButton}
              >
                <ThemedText style={styles.defaultText}>No</ThemedText> 
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.yesButton} 
                        onPress={() => router.push({
                          pathname: '/routine-analysis',
                          params: {
                            name: name,
                            knowledgeLevel: knowledgeLevel,
                            age: age,
                            skinGoal: goal,
                            skinType: skinType,
                                  }
                                })}
              >
                <ThemedText style={styles.defaultText}
                >Yes</ThemedText> 
            </TouchableOpacity>
        </ThemedView>
      </ThemedView>

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
  userInfoText: {
    color: 'black',
    marginTop: 15
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '15%',
    paddingHorizontal: 10,
    backgroundColor: '#EFE0F2',
  },
  columnContainer: {
    flex: 0.4,
    marginHorizontal: 5,
    backgroundColor: '#E57BFF',
    alignItems: 'center',
},
columnContainerNav: {
  flex: 0.4,
  marginHorizontal: 5,
  backgroundColor: '#EFE0F2',
  alignItems: 'center',
},
nextButton:{
  backgroundColor: 'white',
  padding: 15,
  borderRadius: 50,
  marginVertical: 20,
},
yesButton:{
  backgroundColor: 'lightgreen',
  padding: 15,
  borderRadius: 50,
  marginVertical: 20,
},
noButton:{
  backgroundColor: 'lightpink',
  padding: 15,
  borderRadius: 50,
  marginVertical: 20,
},
});
