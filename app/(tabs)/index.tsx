import { router } from 'expo-router';
import { Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// import { auth, db } from '../../firebaseConfigfirebase';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { collection, getDocs } from 'firebase/firestore';

// Example auth usage
// function login(email, password) {
//   return signInWithEmailAndPassword(auth, email, password);
// }

// Example Firestore usage
// async function getUsers() {
//   const usersCollection = collection(db, 'users');
//   const usersSnapshot = await getDocs(usersCollection);
//   return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// }


export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
            <Image style={styles.logoFun}
              source={require('@/assets/images/skinglow-logo.png')} 
             />
            <ThemedText style={styles.defaultText} type="title" >Skin Glow</ThemedText>
              <ThemedText style={styles.defaultText} type="subtitle">Look your Best in 2 Easy Steps</ThemedText> 
          {/* <ThemedView style={styles.stepContainer}>
            <ThemedText  style={styles.defaultText} type="subtitle">(1) Take 2 Pictures</ThemedText>
          </ThemedView>  */}
           <ThemedView style={styles.stepContainer}>
            <ThemedText  style={styles.defaultText} type="subtitle">(1) Answer a Few Questions</ThemedText>
          </ThemedView> 
           <ThemedView style={styles.stepContainer}>
            <ThemedText style={styles.defaultText}  type="subtitle"> (2) View your Personalized Routine and Analysis</ThemedText>
          </ThemedView>  
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/user-info') }
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
  logoFun: {
    marginTop: 100,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    fontWeight: 'normal',
  },
  stepContainer: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#EFE0F2'
  },
  button: {
    marginTop: 30,
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
