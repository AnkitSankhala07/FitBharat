import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

interface ExerciseDef {
    id: string;
    name: string;
    muscleGroup: string;
    difficulty: string;
    icon: string;
}

// Sample Dictionary of Exercises
const exercisesDb: ExerciseDef[] = [
    { id: '1', name: 'Bench Press', muscleGroup: 'Chest', difficulty: 'Intermediate', icon: '🏋️' },
    { id: '2', name: 'Squats', muscleGroup: 'Legs', difficulty: 'Advanced', icon: '🦵' },
    { id: '3', name: 'Deadlift', muscleGroup: 'Back', difficulty: 'Advanced', icon: '🦾' },
    { id: '4', name: 'Push Up', muscleGroup: 'Chest', difficulty: 'Beginner', icon: '🏃' },
    { id: '5', name: 'Bicep Curl', muscleGroup: 'Arms', difficulty: 'Beginner', icon: '💪' },
    { id: '6', name: 'Pull Up', muscleGroup: 'Back', difficulty: 'Intermediate', icon: '🦾' },
    { id: '7', name: 'Shoulder Press', muscleGroup: 'Shoulders', difficulty: 'Intermediate', icon: '🏋️' },
    { id: '8', name: 'Lunges', muscleGroup: 'Legs', difficulty: 'Beginner', icon: '🦵' },
];

export const LogWorkoutScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [loggedExercises, setLoggedExercises] = useState<ExerciseDef[]>([]);

    // Toggles adding/removing an exercise from the logged list
    const handleToggleExercise = (exercise: ExerciseDef) => {
        const isAlreadyAdded = loggedExercises.some(e => e.id === exercise.id);
        if (isAlreadyAdded) {
            setLoggedExercises(prev => prev.filter(e => e.id !== exercise.id));
        } else {
            setLoggedExercises(prev => [...prev, exercise]);
        }
    };

    const isAdded = (id: string) => loggedExercises.some(e => e.id === id);

    const filteredExercises = exercisesDb.filter(e =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Renders the horizontal list of selected exercises at the top
    const renderLoggedExercise = ({ item }: { item: ExerciseDef }) => (
        <View style={styles.loggedChip}>
            <Text style={styles.loggedChipIcon}>{item.icon}</Text>
            <Text style={styles.loggedChipText}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleToggleExercise(item)} style={styles.removeChipBtn}>
                <Text style={styles.removeChipText}>×</Text>
            </TouchableOpacity>
        </View>
    );

    // Renders the main catalogue list of exercises
    const renderExerciseCard = ({ item }: { item: ExerciseDef }) => {
        const added = isAdded(item.id);
        return (
            <TouchableOpacity
                style={[styles.exerciseCard, added && styles.exerciseCardActive]}
                onPress={() => handleToggleExercise(item)}
                activeOpacity={0.7}
            >
                <View style={[styles.exerciseIconContainer, added && styles.exerciseIconContainerActive]}>
                    <Text style={styles.exerciseIcon}>{item.icon}</Text>
                </View>
                <View style={styles.exerciseInfo}>
                    <Text style={styles.exerciseName}>{item.name}</Text>
                    <Text style={styles.exerciseMeta}>{item.muscleGroup} • {item.difficulty}</Text>
                </View>
                <View style={[styles.addBtn, added && styles.addBtnActive]}>
                    <Text style={[styles.addBtnText, added && styles.addBtnTextActive]}>
                        {added ? '✓' : '+'}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Text style={styles.backBtnText}>← Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Log Workout</Text>
                    <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.goBack()}>
                        <Text style={styles.saveBtnText}>Save</Text>
                    </TouchableOpacity>
                </View>

                {/* Logged Exercises (Horizontal List) */}
                {loggedExercises.length > 0 && (
                    <View style={styles.loggedSection}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={loggedExercises}
                            keyExtractor={(item) => item.id}
                            renderItem={renderLoggedExercise}
                            contentContainerStyle={styles.loggedList}
                        />
                    </View>
                )}

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search exercises..."
                        placeholderTextColor={colors.textMuted}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* Exercise List */}
                <FlatList
                    data={filteredExercises}
                    keyExtractor={(item) => item.id}
                    renderItem={renderExerciseCard}
                    contentContainerStyle={styles.exerciseList}
                    showsVerticalScrollIndicator={false}
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
    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    backBtn: {
        paddingVertical: 8,
        paddingRight: 10,
    },
    backBtnText: {
        color: colors.textMuted,
        fontSize: 16,
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.textDark,
    },
    saveBtn: {
        backgroundColor: colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 100,
    },
    saveBtnText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '700',
    },

    // Logged Section
    loggedSection: {
        paddingVertical: 14,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    loggedList: {
        paddingHorizontal: 16,
        gap: 8,
    },
    loggedChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        paddingVertical: 6,
        paddingLeft: 12,
        paddingRight: 8,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#0D9488', // Teal accent for selected items
    },
    loggedChipIcon: {
        fontSize: 14,
        marginRight: 6,
    },
    loggedChipText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#0D9488', // Teal
        marginRight: 8,
    },
    removeChipBtn: {
        backgroundColor: 'rgba(13, 148, 136, 0.15)',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeChipText: {
        fontSize: 12,
        color: '#0D9488',
        fontWeight: '800',
        lineHeight: 14,
    },

    // Search Bar
    searchContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    searchInput: {
        backgroundColor: colors.white,
        height: 48,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 15,
        color: colors.textDark,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },

    // Exercise List
    exerciseList: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        gap: 12,
    },
    exerciseCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: 16,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    exerciseCardActive: {
        borderColor: '#0D9488', // Teal border highlight
        backgroundColor: '#F0FDFA', // Light teal background
    },
    exerciseIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    exerciseIconContainerActive: {
        backgroundColor: 'rgba(13, 148, 136, 0.1)',
    },
    exerciseIcon: {
        fontSize: 24,
    },
    exerciseInfo: {
        flex: 1,
    },
    exerciseName: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.textDark,
        marginBottom: 4,
    },
    exerciseMeta: {
        fontSize: 12,
        color: colors.textMuted,
        fontWeight: '600',
    },
    addBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addBtnActive: {
        backgroundColor: '#0D9488',
    },
    addBtnText: {
        fontSize: 20,
        color: colors.textMuted,
        lineHeight: 22,
    },
    addBtnTextActive: {
        color: colors.white,
        fontSize: 16,
    }
});
