import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

// Define the structure of a Workout and its Exercises
interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: number;
    weight: number;
}

interface Workout {
    id: string;
    date: string;
    title: string;
    exercises: Exercise[];
}

// Initial Mock Data
const initialWorkouts: Workout[] = [
    {
        id: '1',
        date: 'Today, 8:30 AM',
        title: 'Push Day',
        exercises: [
            { id: 'e1', name: 'Bench Press', sets: 3, reps: 10, weight: 65 },
            { id: 'e2', name: 'Incline Dumbbell Press', sets: 3, reps: 12, weight: 20 },
            { id: 'e3', name: 'Tricep Pushdown', sets: 4, reps: 15, weight: 25 },
        ]
    },
    {
        id: '2',
        date: 'Mar 4, 7:15 AM',
        title: 'Leg Day',
        exercises: [
            { id: 'e4', name: 'Squats', sets: 4, reps: 8, weight: 80 },
            { id: 'e5', name: 'Leg Press', sets: 3, reps: 12, weight: 150 },
            { id: 'e6', name: 'Calf Raises', sets: 4, reps: 20, weight: 40 },
        ]
    }
];

export const WorkoutHistoryScreen = () => {
    const [workouts, setWorkouts] = useState<Workout[]>(initialWorkouts);

    const navigation = useNavigation<any>();

    // Function to handle the deletion of a specific workout card
    const handleDelete = (id: string) => {
        setWorkouts(prevWorkouts => prevWorkouts.filter(w => w.id !== id));
    };

    // Component to render individual exercises inside a workout card
    const renderExercise = (exercise: Exercise) => (
        <View key={exercise.id} style={styles.exerciseRow}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseDetails}>
                {exercise.sets}x{exercise.reps} @{exercise.weight}kg
            </Text>
        </View>
    );

    // Component to render the main Workout Card
    const renderWorkoutCard = ({ item }: { item: Workout }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDate}>{item.date}</Text>
                </View>
                <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDelete(item.id)}
                >
                    <Text style={styles.deleteBtnText}>Delete</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.exercisesList}>
                {item.exercises.map(renderExercise)}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Workouts</Text>
                    <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('LogWorkout')}>
                        <Text style={styles.addBtnText}>+ Log</Text>
                    </TouchableOpacity>
                </View>

                {/* Workout List */}
                <FlatList
                    data={workouts}
                    keyExtractor={(item) => item.id}
                    renderItem={renderWorkoutCard}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No workouts logged yet!</Text>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    // Header Styles
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 16,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.textDark,
        letterSpacing: -0.5,
    },
    addBtn: {
        backgroundColor: colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 100,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    addBtnText: {
        color: colors.white,
        fontWeight: '800',
        fontSize: 14,
    },

    // FlatList Styles
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 100, // accommodate bottom nav if present
        paddingTop: 8,
    },

    // Card Styles
    card: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 18,
        marginBottom: 16,
        // Shadow Implementation
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.textDark,
        marginBottom: 4,
    },
    cardDate: {
        fontSize: 13,
        color: colors.textMuted,
        fontWeight: '600',
    },
    deleteBtn: {
        backgroundColor: 'rgba(2ef, 68, 68, 0.1)', // Light Red Background
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    deleteBtnText: {
        color: '#ef4444',
        fontSize: 12,
        fontWeight: '700',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        marginVertical: 14,
    },

    // Exercise Row Styles
    exercisesList: {
        gap: 10,
    },
    exerciseRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    exerciseName: {
        fontSize: 14,
        color: colors.textDark,
        fontWeight: '600',
        flex: 1,
    },
    exerciseDetails: {
        fontSize: 14,
        color: colors.accent,
        fontWeight: '700',
    },

    // Empty State
    emptyContainer: {
        paddingTop: 60,
        alignItems: 'center',
    },
    emptyText: {
        color: colors.textMuted,
        fontSize: 16,
        fontWeight: '600',
    }
});
