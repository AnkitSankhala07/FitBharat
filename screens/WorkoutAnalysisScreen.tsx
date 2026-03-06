import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../components/Card';

export const WorkoutAnalysisScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Text style={styles.backBtnText}>← Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Workout Analysis</Text>
                    <View style={{ width: 40 }} /> {/* Spacer to center title */}
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* 1. Personal Record Card (Orange Background) */}
                    <Card style={styles.prCard}>
                        <View style={styles.prBadge}>
                            <Text style={styles.prBadgeText}>🏆 NEW PR</Text>
                        </View>
                        <Text style={styles.prTitle}>Bench Press</Text>
                        <View style={styles.prValueRow}>
                            <Text style={styles.prCurrentValue}>65</Text>
                            <Text style={styles.prUnit}>kg</Text>
                        </View>
                        <View style={styles.prDivider} />
                        <View style={styles.prFooter}>
                            <Text style={styles.prFooterLabel}>Previous best</Text>
                            <Text style={styles.prFooterValue}>60kg</Text>
                        </View>
                    </Card>

                    {/* 2. Comparison Card */}
                    <Text style={styles.sectionLabel}>Performance Comparison</Text>
                    <Card style={styles.comparisonCard}>
                        <View style={styles.compHeader}>
                            <Text style={styles.compExercise}>Bench Press</Text>
                            <View style={styles.compChangeBadge}>
                                <Text style={styles.compChangeText}>+8%</Text>
                            </View>
                        </View>

                        <View style={styles.compRow}>
                            <View style={styles.compCol}>
                                <Text style={styles.compLabel}>LAST SESSION</Text>
                                <Text style={styles.compValue}>3x10 @60kg</Text>
                            </View>
                            <View style={styles.compVS}>
                                <Text style={styles.compVSText}>VS</Text>
                            </View>
                            <View style={styles.compCol}>
                                <Text style={styles.compLabelTarget}>TODAY</Text>
                                <Text style={styles.compValueTarget}>3x10 @65kg</Text>
                            </View>
                        </View>
                    </Card>

                    {/* 3. Rest Suggestion Card */}
                    <Text style={styles.sectionLabel}>Recovery Status</Text>
                    <Card style={styles.restCard}>
                        <View style={styles.restHeader}>
                            <Text style={styles.restIcon}>🔋</Text>
                            <View>
                                <Text style={styles.restMuscleLabel}>MUSCLES TRAINED</Text>
                                <Text style={styles.restMuscleList}>Chest, Shoulders, Triceps</Text>
                            </View>
                        </View>

                        <View style={styles.suggestionBox}>
                            <Text style={styles.suggestionTitle}>Rest Suggestion</Text>
                            <Text style={styles.suggestionBigNum}>48</Text>
                            <Text style={styles.suggestionUnit}>Hours</Text>
                            <Text style={styles.suggestionDesc}>Recommended rest for full muscle fiber recovery.</Text>
                        </View>

                        <TouchableOpacity style={styles.restBtn}>
                            <Text style={styles.restBtnText}>Set Recovery Reminder</Text>
                        </TouchableOpacity>
                    </Card>

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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: colors.white,
    },
    backBtn: {
        padding: 4,
    },
    backBtnText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textMuted,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.textDark,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 16,
    },
    sectionLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.textDark,
        marginTop: 24,
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },

    // 1. PR Card Styles
    prCard: {
        backgroundColor: colors.accent, // Using the orange/accent color from theme
        padding: 24,
        borderRadius: 24,
        alignItems: 'center',
    },
    prBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 100,
        marginBottom: 16,
    },
    prBadgeText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: '800',
    },
    prTitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    prValueRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    prCurrentValue: {
        fontSize: 64,
        fontWeight: '900',
        color: colors.white,
        lineHeight: 64,
    },
    prUnit: {
        fontSize: 20,
        color: colors.white,
        fontWeight: '700',
        marginLeft: 4,
        marginBottom: 10,
    },
    prDivider: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.15)',
        marginBottom: 16,
    },
    prFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    prFooterLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
        fontWeight: '500',
    },
    prFooterValue: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '700',
    },

    // 2. Comparison Card Styles
    comparisonCard: {
        padding: 20,
        borderRadius: 24,
    },
    compHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    compExercise: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.textDark,
    },
    compChangeBadge: {
        backgroundColor: '#DCFCE7',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    compChangeText: {
        color: '#166534',
        fontSize: 14,
        fontWeight: '700',
    },
    compRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    compCol: {
        flex: 1,
    },
    compLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.textMuted,
        marginBottom: 4,
    },
    compLabelTarget: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.accent,
        marginBottom: 4,
        textAlign: 'right',
    },
    compValue: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.textDark,
    },
    compValueTarget: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.textDark,
        textAlign: 'right',
    },
    compVS: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    compVSText: {
        fontSize: 10,
        fontWeight: '900',
        color: colors.textMuted,
    },

    // 3. Rest Suggestion Card Styles
    restCard: {
        padding: 20,
        borderRadius: 24,
    },
    restHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    restIcon: {
        fontSize: 32,
        marginRight: 16,
    },
    restMuscleLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.textMuted,
        letterSpacing: 0.5,
    },
    restMuscleList: {
        fontSize: 14,
        fontWeight: '800',
        color: colors.textDark,
        marginTop: 2,
    },
    suggestionBox: {
        backgroundColor: colors.background,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    suggestionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.primary,
        marginBottom: 12,
    },
    suggestionBigNum: {
        fontSize: 48,
        fontWeight: '900',
        color: colors.primary,
        lineHeight: 48,
    },
    suggestionUnit: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.primary,
        marginBottom: 8,
    },
    suggestionDesc: {
        fontSize: 12,
        color: colors.textMuted,
        textAlign: 'center',
        lineHeight: 18,
    },
    restBtn: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 16,
        alignItems: 'center',
    },
    restBtnText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '700',
    }
});
