import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../components/Card';

export const ProfileScreen = () => {
    const navigation = useNavigation<any>();

    const userProfile = {
        name: 'Swayam Sharma',
        email: 'swayam@fitbharat.com',
        goal: 'Gain Muscle',
        age: '24',
        height: '175 cm',
        weight: '68 kg',
        bmi: '22.4',
        targets: {
            calories: '2200 kcal',
            protein: '160g',
            carbs: '250g',
            fat: '80g'
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Profile</Text>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Header Card */}
                    <Card style={styles.profileHeaderCard}>
                        <View style={styles.avatarContainer}>
                            <Text style={styles.avatarText}>S</Text>
                        </View>
                        <Text style={styles.profileName}>{userProfile.name}</Text>
                        <Text style={styles.profileEmail}>{userProfile.email}</Text>

                        <View style={styles.goalBadge}>
                            <Text style={styles.goalText}>🎯 {userProfile.goal}</Text>
                        </View>
                    </Card>

                    {/* Stats Grid */}
                    <Text style={styles.sectionTitle}>Physical Stats</Text>
                    <View style={styles.statsGrid}>
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>{userProfile.age}</Text>
                            <Text style={styles.statLabel}>Age</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>{userProfile.height}</Text>
                            <Text style={styles.statLabel}>Height</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>{userProfile.weight}</Text>
                            <Text style={styles.statLabel}>Weight</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statValue}>{userProfile.bmi}</Text>
                            <Text style={styles.statLabel}>BMI Score</Text>
                        </View>
                    </View>

                    {/* Daily Targets Section */}
                    <Text style={styles.sectionTitle}>Daily Targets</Text>
                    <Card style={styles.targetsCard}>
                        <View style={styles.targetRow}>
                            <View style={styles.targetItem}>
                                <Text style={styles.targetIcon}>🔥</Text>
                                <View>
                                    <Text style={styles.targetLabel}>Calories</Text>
                                    <Text style={styles.targetValue}>{userProfile.targets.calories}</Text>
                                </View>
                            </View>
                            <View style={styles.targetItem}>
                                <Text style={styles.targetIcon}>🥩</Text>
                                <View>
                                    <Text style={styles.targetLabel}>Protein</Text>
                                    <Text style={styles.targetValue}>{userProfile.targets.protein}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.targetRow, { marginBottom: 0, marginTop: 20 }]}>
                            <View style={styles.targetItem}>
                                <Text style={styles.targetIcon}>🍚</Text>
                                <View>
                                    <Text style={styles.targetLabel}>Carbs</Text>
                                    <Text style={styles.targetValue}>{userProfile.targets.carbs}</Text>
                                </View>
                            </View>
                            <View style={styles.targetItem}>
                                <Text style={styles.targetIcon}>🥑</Text>
                                <View>
                                    <Text style={styles.targetLabel}>Fat</Text>
                                    <Text style={styles.targetValue}>{userProfile.targets.fat}</Text>
                                </View>
                            </View>
                        </View>
                    </Card>

                    {/* Action Buttons */}
                    <View style={styles.actionContainer}>
                        <TouchableOpacity style={styles.editBtn}>
                            <Text style={styles.editBtnText}>Edit Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.logoutBtn}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.logoutBtnText}>Logout</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
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
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.textDark,
        letterSpacing: -0.5,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 110,
    },
    // Profile Card
    profileHeaderCard: {
        alignItems: 'center',
        paddingVertical: 32,
        borderRadius: 28,
        backgroundColor: colors.white,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 4,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: '800',
        color: colors.white,
    },
    profileName: {
        fontSize: 22,
        fontWeight: '800',
        color: colors.textDark,
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: 14,
        color: colors.textMuted,
        fontWeight: '600',
        marginBottom: 20,
    },
    goalBadge: {
        backgroundColor: 'rgba(232, 82, 10, 0.1)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 100,
    },
    goalText: {
        color: colors.accent,
        fontSize: 13,
        fontWeight: '800',
    },
    // Physical Stats
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.textDark,
        marginTop: 24,
        marginBottom: 16,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    statBox: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 16,
        width: '48%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.textDark,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 11,
        color: colors.textMuted,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    // Daily Targets
    targetsCard: {
        padding: 24,
        borderRadius: 24,
    },
    targetRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    targetItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    targetIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    targetLabel: {
        fontSize: 11,
        color: colors.textMuted,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    targetValue: {
        fontSize: 15,
        fontWeight: '800',
        color: colors.textDark,
    },
    // Buttons
    actionContainer: {
        marginTop: 32,
        gap: 12,
    },
    editBtn: {
        backgroundColor: colors.primary,
        paddingVertical: 18,
        borderRadius: 20,
        alignItems: 'center',
    },
    editBtnText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '800',
    },
    logoutBtn: {
        backgroundColor: '#FEE2E2',
        paddingVertical: 18,
        borderRadius: 20,
        alignItems: 'center',
    },
    logoutBtnText: {
        color: '#EF4444',
        fontSize: 16,
        fontWeight: '800',
    },
});
