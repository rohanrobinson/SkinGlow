import { router } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, ScrollView, Image, Pressable, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ProfileScreen(){ 
    const params = useLocalSearchParams();
    const { name, age, skinGoal, skinType, knowledgeLevel } = params;

    console.log(params);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedView style={styles.container}>
            <TouchableOpacity
                onPress={() => router.push('/')}
            >
                <Image 
                    source={require('@/assets/images/skinglow-logo.png')} 
                    style={styles.logo}
                />
            </TouchableOpacity>


            <ThemedView style={styles.profileCard}>
                <ThemedText style={styles.headerText}>Hey {name}! Here's Your Skin Glow Profile</ThemedText>
                
                <ThemedView style={styles.infoSection}>
                    <ThemedText style={styles.label}>Name</ThemedText>
                    <ThemedText style={styles.value}>{name}</ThemedText>
                </ThemedView>

                <ThemedView style={styles.infoSection}>
                    <ThemedText style={styles.label}>Age</ThemedText>
                    <ThemedText style={styles.value}>{age}</ThemedText>
                </ThemedView>

                <ThemedView style={styles.infoSection}>
                    <ThemedText style={styles.label}>Skin Type</ThemedText>
                    <ThemedText style={styles.value}>{skinType}</ThemedText>
                </ThemedView>

                <ThemedView style={styles.infoSection}>
                    <ThemedText style={styles.label}>Knowledge Level</ThemedText>
                    <ThemedText style={styles.value}>{knowledgeLevel}</ThemedText>
                </ThemedView>

                <ThemedView style={styles.infoSection}>
                    <ThemedText style={styles.label}>Skincare Goal</ThemedText>
                    <ThemedText style={styles.value}>{skinGoal}</ThemedText>
                </ThemedView>
            </ThemedView>
            <Pressable>
                Want to take a quiz?
            </Pressable>
        </ThemedView>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#EFE0F2',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        marginTop: 40,
        marginBottom: 20,
    },
    profileCard: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
        textAlign: 'center',
    },
    infoSection: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E57BFF',
        paddingBottom: 10,
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    value: {
        fontSize: 18,
        color: 'black',
        fontWeight: '500',
    }
});