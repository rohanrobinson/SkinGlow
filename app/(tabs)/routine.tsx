import { router, useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function Routine() {

    const params = useLocalSearchParams();
    const { name, age, routine, goal } = params;
    const [analysisOrRoutine, toggleAnalysisOrRoutine] = useState('analysis');


    function displaySkinCareRoutine() {
      return(
        <div>
          <p>This is your personalized SkinCare Routine</p>
        </div>
      )
    }

    function displaySkinCareAnalysis() {
      return(
        <div>
          <p>This is your personalized SkinCare Analaysis</p>
        </div>
      )
    }

    return (
        <ThemedView style={styles.container}>
          
          
          { 
            analysisOrRoutine === 'routine'
            ? (

                  <ThemedText style={styles.selectedButton}>
                    Recommended Routine
                  </ThemedText>

              )
            : (
                <ThemedText 
                  style={styles.button}
                  onPress={() => toggleAnalysisOrRoutine('routine')}
                >
                  Recommended Routine
                </ThemedText>
              )
          }

          { 
            analysisOrRoutine === 'analysis'
            ? (
                  <ThemedText style={styles.selectedButton}>
                    Skin Analysis
                  </ThemedText>
              )
            : (
                <ThemedText 
                  style={styles.button}
                  onPress={() => toggleAnalysisOrRoutine('analysis')}
                >
                  Skin Analysis
                </ThemedText>
              )
          }

        {
          analysisOrRoutine === 'analysis'
          ?
          (
            <ThemedText>
                 {displaySkinCareAnalysis()}
            </ThemedText>
          )
          :
          (
            <ThemedText>
                 {displaySkinCareRoutine()}
            </ThemedText>
          )
         }
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
      backgroundColor: '#E57BFF',
      height: 60,
      width: 200,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: 'pink',
      height: 60,
      width: 200,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });
