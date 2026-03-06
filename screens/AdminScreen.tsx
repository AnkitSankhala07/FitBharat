import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../components/Card';

export const AdminScreen = () => {
    const navigation = useNavigation<any>();

    const stats = [
        { label: 'Total Users', value: '1,284', icon: '👥', color: colors.primary },
        { label: 'Active Today', value: '458', icon: '🟢', color: '#10B981' },
        { label: 'Workouts', value: '8,432', icon: '💪', color: colors.accent },
        { label: 'Meals Logged', value: '12,050', icon: '🥗', color: '#FACC15' },
    ];

    const topExercises = [
        { id: '1', name: 'Bench Press', count: '1,420 logs', trend: '+12%' },
        { id: '2', name: 'Squats', count: '1,150 logs', trend: '+5%' },
        { id: '3', name: 'Push Ups', count: '980 logs', trend: '+18%' },
    ];

    const topFoods = [
        { id: '1', name: 'Chicken Breast', count: '2,100 logs', kcal: '165 kcal/100g' },
        { id: '2', name: 'Eggs', count: '1,850 logs', kcal: '155 kcal/100g' },
        { id: '3', name: 'Greek Yogurt', count: '1,200 logs', kcal: '59 kcal/100g' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Text style={styles.backBtnText}>← Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Admin Dashboard</Text>
                    <TouchableOpacity style={styles.refreshBtn}>
                        <Text style={styles.refreshIcon}>🔄</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Overall Health Score Card */}
                    <Card style={styles.avgScoreCard}>
                        <Text style={styles.avgScoreLabel}>AVG. COMMUNITY HEALTH SCORE</Text>
                        <View style={styles.scoreRow}>
                            <Text style={styles.scoreValue}>78</Text>
                            <Text style={styles.scoreMax}>/100</Text>
                        </View>
                        <View style={styles.scoreStatus}>
                            <Text style={styles.statusText}>Trending up this week 📈</Text>
                        </View>
                    </Card>

                    {/* Stats Grid */}
                    <View style={styles.statsGrid}>
                        {stats.map((stat, index) => (
                            <Card key={index} style={styles.statCard}>
                                <Text style={styles.statIcon}>{stat.icon}</Text>
                                <Text style={styles.statVal}>{stat.value}</Text>
                                <Text style={styles.statLabel}>{stat.label}</Text>
                            </Card>
                        ))}
                    </View>

                    {/* Top Exercises */}
                    <Text style={styles.sectionTitle}>Top Exercises</Text>
                    <Card style={styles.listCard}>
                        {topExercises.map((ex, idx) => (
                            <View key={ex.id} style={[styles.listItem, idx === topExercises.length - 1 && { borderBottomWidth: 0 }]}>
                                <View style={styles.listInfo}>
                                    <Text style={styles.listName}>{ex.name}</Text>
                                    <Text style={styles.listSub}>{ex.count}</Text>
                                </View>
                                <Text style={styles.trendText}>{ex.trend}</Text>
                            </View>
                        ))}
                    </Card>

                    {/* Top Foods */}
                    <Text style={styles.sectionTitle}>Top Foods</Text>
                    <Card style={styles.listCard}>
                        {topFoods.map((food, idx) => (
                            <View key={food.id} style={[styles.listItem, idx === topFoods.length - 1 && { borderBottomWidth: 0 }]}>
                                <View style={styles.listInfo}>
                                    <Text style={styles.listName}>{food.name}</Text>
                                    <Text style={styles.listSub}>{food.count}</Text>
                                </View>
                                <Text style={styles.foodMeta}>{food.kcal}</Text>
                            </View>
                        ))}
                    </Card>

                    {/* System Management */}
                    <TouchableOpacity style={styles.manageBtn}>
                        <Text style={styles.manageBtnText}>Manage User Permissions</Text>
                    </TouchableOpacity>

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
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    backBtn: {
        padding: 4,
    },
    backBtnText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.textMuted,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.textDark,
    },
    refreshBtn: {
        padding: 4,
    },
    refreshIcon: {
        fontSize: 20,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 16,
    },
    // Avg Score Card
    avgScoreCard: {
        backgroundColor: colors.primary,
        padding: 24,
        borderRadius: 24,
        alignItems: 'center',
        marginBottom: 20,
    },
    avgScoreLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    scoreRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    scoreValue: {
        fontSize: 56,
        fontWeight: '900',
        color: colors.white,
    },
    scoreMax: {
        fontSize: 20,
        color: 'rgba(255,255,255,0.4)',
        fontWeight: '700',
        marginLeft: 4,
    },
    scoreStatus: {
        marginTop: 12,
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 100,
    },
    statusText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: '600',
    },
    // Stats Grid
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 24,
    },
    statCard: {
        width: '48%',
        padding: 16,
        borderRadius: 20,
        backgroundColor: colors.white,
        alignItems: 'center',
    },
    statIcon: {
        fontSize: 24,
        marginBottom: 8,
    },
    statVal: {
        fontSize: 20,
        fontWeight: '900',
        color: colors.textDark,
    },
    statLabel: {
        fontSize: 11,
        color: colors.textMuted,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginTop: 2,
    },
    // List Items
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.textDark,
        marginBottom: 16,
    },
    listCard: {
        padding: 8,
        borderRadius: 20,
        marginBottom: 24,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.03)',
    },
    listInfo: {
        flex: 1,
    },
    listName: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.textDark,
        marginBottom: 2,
    },
    listSub: {
        fontSize: 12,
        color: colors.textMuted,
        fontWeight: '600',
    },
    trendText: {
        color: '#10B981',
        fontSize: 13,
        fontWeight: '800',
    },
    foodMeta: {
        color: colors.accent,
        fontSize: 11,
        fontWeight: '700',
    },
    // Manage Btn
    manageBtn: {
        backgroundColor: colors.white,
        paddingVertical: 18,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        borderStyle: 'dashed',
    },
    manageBtnText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: '800',
    },
});
