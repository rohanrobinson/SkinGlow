import { router, useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
1
export default function SkinAnalysis() {

    const params = useLocalSearchParams();

    
    return (
        <ThemedView style={styles.container}>

            <TouchableOpacity>
                <ThemedText>Skin Analysis</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity>
                <ThemedText>Reccomended Routine</ThemedText>
            </TouchableOpacity>


          <b>Morning</b>
          <b>Afternoon</b>
          <b>Evening</b>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container:{
      flex: 1, 
      backgroundColor: '#EFE0F2',
      alignItems: 'center', 
    },
  });
