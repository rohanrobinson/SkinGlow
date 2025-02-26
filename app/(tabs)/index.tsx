import { router } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
      <ThemedView style={styles.container}>
            <Image 
              source={require('@/assets/images/skinglow-logo.png')} 
             />
            <ThemedText type="title">Skin Glow</ThemedText>
              <ThemedText type="subtitle">Glow into your best self!</ThemedText>
              <ThemedText type="subtitle">Easy as <b>1-2-3</b></ThemedText> <br />
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">(1) Take some Pictures of Yourself</ThemedText>
          </ThemedView> 
           <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">(2) Answer a Few Questions about Yourself</ThemedText>
          </ThemedView> 
           <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">(3) Checkout your Personalized Skin Analysis and Reccomended Routine</ThemedText>
          </ThemedView> <br />
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/user-info') }
          >
           <ThemedText style={styles.buttonText}>Start</ThemedText>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    fontWeight: 'normal',
  },
  stepContainer: {
    alignItems: 'center',
    backgroundColor: '#EFE0F2'
  },
  button: {
    backgroundColor: '#E57BFF',
    height: 60,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', 
  }
});
