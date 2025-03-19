import { router } from 'expo-router';
import { Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
            <Image 
              source={require('@/assets/images/skinglow-logo.png')} 
             />
            <ThemedText style={styles.defaultText} type="title" >Skin Glow</ThemedText>
              <ThemedText style={styles.defaultText} type="subtitle">In 3 minutes you'll be put on the path to looking your best!</ThemedText> 
              <ThemedText style={styles.defaultText} type="subtitle">Easy as <ThemedText style={styles.defaultText}>1-2-3</ThemedText></ThemedText>
          <ThemedView style={styles.stepContainer}>
            <ThemedText  style={styles.defaultText} type="subtitle">(1) Take some Pictures</ThemedText>
          </ThemedView> 
           <ThemedView style={styles.stepContainer}>
            <ThemedText  style={styles.defaultText} type="subtitle">(2) Answer a Few Questions </ThemedText>
          </ThemedView> 
           <ThemedView style={styles.stepContainer}>
            <ThemedText style={styles.defaultText}  type="subtitle"> (3) Checkout a Report and Routine Personalized for You!</ThemedText>
          </ThemedView> 
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/take-pics') }
          >
           <ThemedText style={styles.buttonText}>Start</ThemedText>
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
  defaultText: {
    color: 'black',
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
