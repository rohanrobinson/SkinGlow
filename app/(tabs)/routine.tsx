import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, Button,  StyleSheet, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';

export default function Routine() {

    const params = useLocalSearchParams();
    const { name, age, routine, goal } = params;
    const [infoType, toggleAnalysisOrRoutine] = useState('analysis');
    const [isLoading, setIsLoading] = useState(true);

    function displaySkinCareRoutine() {
      return (
        <ThemedView style={styles.container}>
          <ThemedText style={{ fontWeight: 'bold' }}> Morning </ThemedText>
          <ThemedText>
              Use a gentle, hydrating cleanser to remove impurities and prepare your skin for the day.
              Example Products: Cetaphil Daily Facial Cleanser or CeraVe Hydrating Cleanser.  
          </ThemedText>
        </ThemedView>
      )
    }

    function displaySkinCareAnalysis() {
      return(
        <ThemedView style={styles.container}>
          <ThemedText style={{ fontWeight: 'bold' }}>Skin Analysis Summary</ThemedText>
          <ThemedText>
              Skin texture appears smooth and well-maintained, indicating good hydration levels. The skin shows minimal signs of dryness or flakiness, suggesting that regular moisturizing.  
          </ThemedText>
        </ThemedView>
      )
    }

  

    // loading screen fun 
    useEffect(() => {
      setTimeout(() => {
          setIsLoading(false);
      }, 1500); // 2000 milliseconds = 2 seconds
    }, []);

    if (isLoading) {
      return (
          <ThemedView style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#E57BFF" />
              <ThemedText style={styles.loadingText}>Loading...</ThemedText>
          </ThemedView>
      );
  }



    return (
        <ThemedView style={styles.container}>

          <ThemedView style={styles.rowContainer}>
              <ThemedView style={styles.columnContainer}>
                  <Pressable onPress={() => toggleAnalysisOrRoutine('routine')}
                    
                      style={styles.pressableButton}
                    
                    >
                      <Text>Routine</Text>
                  </Pressable>
              </ThemedView>

              <ThemedView style={styles.columnContainer}>
                  <Pressable onPress={() => toggleAnalysisOrRoutine('analysis')}
                    
                      style={styles.pressableButton}
                    >
                      <Text>Analysis</Text>
                  </Pressable>            
              </ThemedView>
          </ThemedView>

          <ThemedView style={styles.container}>
            {
                infoType === 'analysis'
                
                ?

                <Text>
                      {displaySkinCareAnalysis()}
                </Text>

                :

                <Text>
                      {displaySkinCareRoutine()}  
                </Text>
            }
            
          </ThemedView>

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container:{
      flex: 1, 
      backgroundColor: '#EFE0F2',
      alignItems: 'center', 
    },
    selectedButton: {
      backgroundColor: '#6f42c1',
      height: 60,
      width: 200,
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: '#add8e6',
      height: 60,
      width: 200,
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EFE0F2', // Match your app's background color
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#EFE0F2',
  },
  columnContainer: {
    flex: 0.3,
    marginHorizontal: 5,
    backgroundColor: '#E57BFF',
    alignItems: 'center',
},
  loadingText: {
      marginTop: 10,
      fontSize: 16,
  }, 
  pressableButton: {
    padding: 10,
    width: 50,
    alignItems: 'center',
    backgroundColor: '#E57BFF',
    borderRadius: 5,
  }
  });
