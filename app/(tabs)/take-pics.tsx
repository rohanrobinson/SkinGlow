import { router } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export default function TakePics() {
    const [image, setImage] = useState<string | null>(null);
    const [imageDisplayed, toggleImageDisplayed] = useState(false);

    const [image2, setImage2] = useState<string | null>(null);
    const [image2Displayed, toggleImage2Displayed] = useState(false);


    const takePhoto = async () => 
      {
        // Request camera permissions
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        
        console.log("permission result", permissionResult);

        if (permissionResult.granted === false) {
            alert("You need to enable camera permissions to take a photo!");
            return;
          }

        // Launch camera
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            toggleImageDisplayed(true);
          };
      }

    
    const takePhoto2 = async () => {

        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
          alert("You need to enable camera permissions to take a photo!");
          return;
        }

        // Launch camera
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

        if (!result.canceled) {
            setImage2(result.assets[0].uri);
            toggleImage2Displayed(true);
          };


    }

    

    return (    
      <ScrollView style={styles.scrollContainer}>
        <ThemedView style={styles.container}>

            <Image 
              source={require('@/assets/images/skinglow-logo.png')} 
             />


            <ThemedText style={styles.defaultText}>We'll take some pictures to get started</ThemedText>




        <ThemedView style={styles.rowContainer}>
            <ThemedView style={styles.columnContainer}>
              {
                imageDisplayed === false
                  ?
                <TouchableOpacity
                  onPress={takePhoto}
                  style={styles.cameraButton}
                >
                  <MaterialIcons 
                      name="camera-alt" 
                      size={24} 
                      color="black" 
                  />
              </TouchableOpacity>
                :

                <TouchableOpacity
                onPress={takePhoto}
                style={styles.cameraButton}
              >
                <ThemedText style={styles.defaultText}>Retake?</ThemedText>  
              </TouchableOpacity>
            }

                <ThemedView style={styles.photoContainer}>
                  {
                    
                    
                    image ? (
                          <Image
                            source={{uri: image}}
                            style={styles.photo}
                          />
                    )
                    :
                    ""
                  }
                </ThemedView>

            </ThemedView>


          <ThemedView style={styles.columnContainer}>
                  {
                    image2Displayed === false 
                      ?
                    <TouchableOpacity
                      onPress={takePhoto2}
                      style={styles.cameraButton}
                    >
                        <MaterialIcons 
                            name="camera-alt" 
                            size={24} 
                            color="black" 
                        />
                    </TouchableOpacity>
                      :
                    <TouchableOpacity
                      onPress={takePhoto2}
                      style={styles.cameraButton}
                    >
                      <ThemedText style={styles.defaultText}>Retake?</ThemedText>  
                    </TouchableOpacity>
                  }


                    <ThemedView style={styles.photoContainer}>
                      {
                        image2 ? (
                          <Image
                            source={{uri: image2}}
                            style={styles.photo}
                          />
                        )
                        :
                        <ThemedText></ThemedText>
                    }
                    </ThemedView>

          </ThemedView>
        </ThemedView>
           
            {
              imageDisplayed === true && image2Displayed === true
                  
                  ?
                  
              <TouchableOpacity
              style={styles.nextButton}

              onPress={ () => router.push({
                pathname: '/user-info',
                params: {
                    image: image,
                    image2: image2
                }
            })}
            >
              <ThemedText style={styles.defaultText}>Next</ThemedText>
            </TouchableOpacity>
              :

              <ThemedView style={styles.rowContainer}>
                  <TouchableOpacity

                  style={styles.nextButton}

                  onPress= {
                    () => router.push({
                      pathname: '/',
                  })
                  }
                  >
                    <ThemedText style={styles.defaultText}>Back</ThemedText>
                  </TouchableOpacity>

                  <TouchableOpacity

                      style={styles.nextButton}

                      onPress= {
                        () => router.push({
                          pathname: '/user-info',
                      })
                      }
                      >
                        <ThemedText style={styles.defaultText}>Skip</ThemedText>
                      </TouchableOpacity>
              </ThemedView>

              // <ThemedView style={styles.container}>
              //       <ThemedText style={styles.defaultText }> Tap the camera icons!</ThemedText>   
              // </ThemedView>
            }

        </ThemedView>

    </ScrollView>
    )
  }


const styles = StyleSheet.create({
    container:{
      flex: 1, 
      backgroundColor: '#EFE0F2',
      alignItems: 'center', 
    },
    
    defaultText: {
      color: 'black'
    },
    scrollContainer: {
       flexGrow: 1,
       backgroundColor: '#EFE0F2',
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center', 
      fontWeight: 'normal',
    },
    stepContainer: {
      alignItems: 'center',
      backgroundColor: '#EFE0F2',
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
    },
    cameraButton: {
        backgroundColor: '#E57BFF',
        padding: 15,
        borderRadius: 50,
        marginVertical: 20,
    },
    nextButton:{
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 50,
        marginVertical: 20,
    },
    photoContainer: {
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    photo: {
      width: 300,
      height: 300,
      borderRadius: 10,
  },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      paddingHorizontal: 10,
      backgroundColor: '#EFE0F2',
},
  columnContainer: {
    flex: 0.4,
    marginHorizontal: 5,
    backgroundColor: '#E57BFF',
    alignItems: 'center',
},
  });

