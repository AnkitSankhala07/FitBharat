import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { colors } from '../theme/colors';

// Internal Components
import { Card } from '../components/Card';
import { StatCard } from '../components/StatCard';
import { ProgressBar } from '../components/ProgressBar';
import { IconButton } from '../components/IconButton';
import { BottomNavigation } from '../components/BottomNavigation';

export const DashboardScreen = () => {
    return (
        <View style={styles.container}>
            {/* Dashboard Header */}
            <View style={styles.dashHeader}>
                <View>
                    <Text style={styles.dashGreeting}>Good morning,</Text>
                    <Text style={styles.dashName}>Swayam! 👋</Text>
                    <Text style={styles.dashSub}>here's your health snapshot for today!</Text>
                </View>
                <View style={styles.dashAvatar}>
                    <Text style={styles.avatarText}>S</Text>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Main Card: Health Score */}
                <Card variant="dark" style={styles.scoreCard}>
                    <Text style={styles.scoreLbl}>Today's Health Score</Text>
                    <View style={styles.scoreRow}>
                        <Text style={styles.scoreNum}>74</Text>
                        <View style={styles.scoreRight}>
                            <Text style={styles.scoreMax}>/100</Text>
                            <View style={styles.scoreBadge}>
                                <Text style={styles.scoreBadgeText}>Good</Text>
                            </View>
                        </View>
                    </View>
                    <ProgressBar progress={0.74} color={colors.accent} />
                    <Text style={styles.scoreBreakdown}>💪 Workout 32 · 🥗 Nutrition 28 · 😴 Sleep 14</Text>
                </Card>

                {/* Horizontal Stats Section */}
                <View style={styles.sectionRow}>
                    <Text style={styles.sectionLbl}>Today's stats</Text>
                    <Text style={styles.sectionMore}>View more</Text>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.statsScroll}
                    contentContainerStyle={styles.statsScrollContent}
                >
                    <StatCard variant="orange" icon="💪" value="Done" unit="✅" label="Workout" />
                    <StatCard icon="🥗" value="1,840" unit="/2,200 kcal" label="Calories" />
                    <StatCard icon="😴" value="7.5" unit="hours" label="Sleep" />
                    <StatCard icon="🔥" value="4" unit="days" label="Streak" />
                </ScrollView>

                {/* Weekly Progress Card */}
                <View style={styles.sectionRow}>
                    <Text style={styles.sectionLbl}>This week's progress</Text>
                </View>
                <Card style={styles.progressCard}>
                    <Text style={styles.progTitle}>Weekly Goals</Text>

                    <View style={styles.progRow}>
                        <Text style={styles.progLabel}>Workouts</Text>
                        <View style={styles.progBarWrap}>
                            <ProgressBar progress={0.6} color={colors.primary} backgroundColor={colors.background} height={6} />
                        </View>
                        <Text style={styles.progValPrimary}>3/5</Text>
                    </View>

                    <View style={styles.progRow}>
                        <Text style={styles.progLabel}>Calories</Text>
                        <View style={styles.progBarWrap}>
                            <ProgressBar progress={0.8} color={colors.accent} backgroundColor={colors.background} height={6} />
                        </View>
                        <Text style={styles.progValAccent}>80%</Text>
                    </View>

                    <View style={styles.progRow}>
                        <Text style={styles.progLabel}>Sleep</Text>
                        <View style={styles.progBarWrap}>
                            <ProgressBar progress={0.9} color={colors.primary} backgroundColor={colors.background} height={6} />
                        </View>
                        <Text style={styles.progValPrimary}>90%</Text>
                    </View>

                    <View style={[styles.progRow, { marginBottom: 0 }]}>
                        <Text style={styles.progLabel}>Score avg</Text>
                        <View style={styles.progBarWrap}>
                            <ProgressBar progress={0.74} color={colors.primary} backgroundColor={colors.background} height={6} />
                        </View>
                        <Text style={styles.progValPrimary}>74</Text>
                    </View>
                </Card>

                {/* Workout Suggestion Card */}
                <View style={styles.sectionRow}>
                    <Text style={styles.sectionLbl}>Today's workout</Text>
                    <Text style={styles.sectionMore}>View more</Text>
                </View>

                <View style={styles.suggestionCard}>
                    <View style={styles.sugLeft}>
                        <Text style={styles.sugTitle}>Push Day</Text>
                        <Text style={styles.sugSub}>Chest & Shoulders</Text>
                        <View style={styles.sugTags}>
                            <View style={styles.sugTag}><Text style={styles.tagText}>💪 6 exercises</Text></View>
                            <View style={styles.sugTag}><Text style={styles.tagText}>🔥 350 Cal</Text></View>
                        </View>
                    </View>
                    <IconButton icon="▶" variant="accent" size={38} />
                </View>

                {/* Quick Actions Grid */}
                <View style={styles.sectionRow}>
                    <Text style={styles.sectionLbl}>Quick log</Text>
                </View>
                <View style={styles.quickGrid}>
                    <TouchableOpacity style={styles.quickCard}>
                        <Text style={styles.quickIcon}>💪</Text>
                        <Text style={styles.quickLbl}>Log Workout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quickCard}>
                        <Text style={styles.quickIcon}>🥗</Text>
                        <Text style={styles.quickLbl}>Log Meal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quickCard}>
                        <Text style={styles.quickIcon}>😴</Text>
                        <Text style={styles.quickLbl}>Log Sleep</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quickCard}>
                        <Text style={styles.quickIcon}>📊</Text>
                        <Text style={styles.quickLbl}>My BMI</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    // Header
    dashHeader: {
        paddingTop: 56, // Extra padding for safe area since using absolute bottom nav
        paddingHorizontal: 18,
        paddingBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    dashGreeting: {
        fontSize: 12,
        color: colors.textMuted,
    },
    dashName: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.textDark,
        marginTop: 2,
    },
    dashSub: {
        fontSize: 10,
        color: colors.textMuted,
        marginTop: 3,
        maxWidth: 160,
        lineHeight: 14,
    },
    dashAvatar: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.white,
    },

    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 100, // Make room for absolute bottom navigation
    },

    // Main Score Card
    scoreCard: {
        padding: 18,
        marginBottom: 8,
    },
    scoreLbl: {
        fontSize: 10,
        color: 'rgba(255, 255, 255, 0.6)',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    scoreRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 10,
        marginTop: 4,
    },
    scoreNum: {
        fontSize: 48,
        fontWeight: '800',
        color: colors.white,
        lineHeight: 52,
        marginRight: 8,
    },
    scoreRight: {
        paddingBottom: 6,
    },
    scoreMax: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.5)',
        fontWeight: '600',
    },
    scoreBadge: {
        backgroundColor: colors.accent,
        borderRadius: 100,
        paddingVertical: 3,
        paddingHorizontal: 8,
        marginTop: 4,
        alignSelf: 'flex-start',
    },
    scoreBadgeText: {
        fontSize: 10,
        color: colors.white,
        fontWeight: '700',
    },
    scoreBreakdown: {
        fontSize: 9,
        color: 'rgba(255, 255, 255, 0.45)',
        marginTop: 8,
    },

    // Sections
    sectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 14,
        marginBottom: 10,
    },
    sectionLbl: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.textDark,
    },
    sectionMore: {
        fontSize: 11,
        color: colors.accent,
        fontWeight: '600',
    },

    // Horizontal Scroll
    statsScroll: {
        marginBottom: 4,
    },
    statsScrollContent: {
        paddingBottom: 4,
        flexDirection: 'row',
    },

    // Progress Card
    progressCard: {
        padding: 16,
        marginBottom: 12,
    },
    progTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.textDark,
        marginBottom: 12,
    },
    progRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    progLabel: {
        fontSize: 11,
        color: colors.textMuted,
        width: 55,
    },
    progBarWrap: {
        flex: 1,
        marginHorizontal: 10,
    },
    progValPrimary: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.primary,
        width: 30,
        textAlign: 'right',
    },
    progValAccent: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.accent,
        width: 30,
        textAlign: 'right',
    },

    // Suggestion Card
    suggestionCard: {
        backgroundColor: colors.primary,
        borderRadius: 20,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    sugLeft: {
        flex: 1,
    },
    sugTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.white,
    },
    sugSub: {
        fontSize: 11,
        color: 'rgba(255, 255, 255, 0.6)',
        marginTop: 3,
    },
    sugTags: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 6,
    },
    sugTag: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 100,
        paddingVertical: 4,
        paddingHorizontal: 9,
    },
    tagText: {
        fontSize: 9,
        color: colors.white,
        fontWeight: '600',
    },

    // Quick Action Grid
    quickGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 20,
    },
    quickCard: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 14,
        width: '48%',
        marginBottom: 4,
    },
    quickIcon: {
        fontSize: 24,
        marginBottom: 6,
    },
    quickLbl: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.textDark,
    },
});
