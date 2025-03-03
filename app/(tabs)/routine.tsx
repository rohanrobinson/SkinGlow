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
          <p>This is your peronalized SkinCare Routine</p>
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

            <Image 
              source={require('@/assets/images/skinglow-logo.png')} 
            />
            
            {
              analysisOrRoutine === 'analysis'
              ?
            <TouchableOpacity
              style={styles.selectedButton}
              onPress={() => toggleAnalysisOrRoutine('analysis')}
            >
              Skin Analysis
            </TouchableOpacity>
            :
            <TouchableOpacity
              style={styles.button}
              onPress={() => toggleAnalysisOrRoutine('analysis')}
            >
              Skin Analysis
            </TouchableOpacity>

            }

            <TouchableOpacity
              style={styles.button}
              onPress={() => toggleAnalysisOrRoutine('routine')}
            >
              Recommended Routine
            </TouchableOpacity>

            {
               analysisOrRoutine === 'analysis'
               
               ?
               
               <div>
                  <ThemedText><b>{name} - Here is your Recommended Routine</b></ThemedText> <br />
                  {displaySkinCareRoutine()}   
               </div>
              
              :
              
              <div>
                  <ThemedText><b>{name} - Here is your Personalized Skin Analysis</b></ThemedText> <br />
                  {displaySkinCareAnalysis()}
               </div>
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
      backgroundColor: 'pink',
      height: 60,
      width: 200,
      justifyContent: 'center',
      alignItems: 'center',
    },

    button: {
      backgroundColor: 'gray',
      height: 60,
      width: 200,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
