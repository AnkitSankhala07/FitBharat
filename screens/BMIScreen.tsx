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

export const BMIScreen = () => {
    const navigation = useNavigation<any>();

    const bmiData = {
        value: '22.4',
        category: 'Normal weight',
        height: '175 cm',
        weight: '68 kg',
        rangeStart: 18.5,
        rangeEnd: 24.9,
    };

    const bodyShapes = [
        { id: '1', label: 'Underweight', range: '< 18.5', icon: '👤', active: false },
        { id: '2', label: 'Normal', range: '18.5 - 24.9', icon: '🚶', active: true },
        { id: '3', label: 'Overweight', range: '25.0 - 29.9', icon: '🏃', active: false },
        { id: '4', label: 'Obese', range: '≥ 30.0', icon: '🚶‍♂️', active: false },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Text style={styles.backBtnText}>← Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>BMI Analysis</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Top BMI Card */}
                    <Card style={styles.bmiCard}>
                        <Text style={styles.bmiLabel}>YOUR BODY MASS INDEX</Text>
                        <Text style={styles.bmiValue}>{bmiData.value}</Text>
                        <View style={styles.categoryBadge}>
                            <Text style={styles.categoryText}>{bmiData.category}</Text>
                        </View>
                        <View style={styles.rangeInfo}>
                            <Text style={styles.rangeText}>Healthy range: {bmiData.rangeStart} - {bmiData.rangeEnd}</Text>
                        </View>
                    </Card>

                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        <Card style={styles.statBox}>
                            <Text style={styles.statLabel}>Height</Text>
                            <Text style={styles.statValue}>{bmiData.height}</Text>
                        </Card>
                        <Card style={styles.statBox}>
                            <Text style={styles.statLabel}>Weight</Text>
                            <Text style={styles.statValue}>{bmiData.weight}</Text>
                        </Card>
                    </View>

                    {/* Body Shape Section */}
                    <Text style={styles.sectionTitle}>BMI Categories</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.shapeScroll}
                        contentContainerStyle={styles.shapeScrollContent}
                    >
                        {bodyShapes.map((shape) => (
                            <TouchableOpacity key={shape.id} activeOpacity={0.8}>
                                <Card style={[styles.shapeCard, shape.active && styles.activeShapeCard]}>
                                    <View style={[styles.shapeIconBg, shape.active && styles.activeShapeIconBg]}>
                                        <Text style={styles.shapeIcon}>{shape.icon}</Text>
                                    </View>
                                    <Text style={[styles.shapeLabel, shape.active && styles.activeShapeLabel]}>{shape.label}</Text>
                                    <Text style={[styles.shapeRange, shape.active && styles.activeShapeRange]}>{shape.range}</Text>
                                    {shape.active && <View style={styles.activeDot} />}
                                </Card>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Suggestions Section */}
                    <Text style={styles.sectionTitle}>Recommendations</Text>
                    <Card style={styles.suggestionCard}>
                        <View style={styles.suggestionHeader}>
                            <Text style={styles.suggestionIcon}>✅</Text>
                            <Text style={styles.suggestionTarget}>Goal: Maintain weight</Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.recItem}>
                            <View style={styles.recDot} />
                            <Text style={styles.recText}>Incorporate **Strength training** 3-4 times a week to improve muscle density.</Text>
                        </View>

                        <View style={styles.recItem}>
                            <View style={styles.recDot} />
                            <Text style={styles.recText}>Daily **Protein target: 125g** for optimal muscle recovery.</Text>
                        </View>

                        <View style={styles.recItem}>
                            <View style={styles.recDot} />
                            <Text style={styles.recText}>Maintain a balanced intake of complex carbohydrates and healthy fats.</Text>
                        </View>

                        <TouchableOpacity style={styles.actionBtn}>
                            <Text style={styles.actionBtnText}>Update Body Stats</Text>
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
    // BMI Card
    bmiCard: {
        backgroundColor: colors.primary,
        padding: 32,
        borderRadius: 28,
        alignItems: 'center',
    },
    bmiLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    bmiValue: {
        fontSize: 64,
        fontWeight: '900',
        color: colors.white,
    },
    categoryBadge: {
        backgroundColor: colors.accent,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 100,
        marginTop: 12,
        marginBottom: 16,
    },
    categoryText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '800',
    },
    rangeInfo: {
        marginTop: 4,
    },
    rangeText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 12,
        fontWeight: '600',
    },
    // Stats Row
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 16,
    },
    statBox: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 12,
        color: colors.textMuted,
        fontWeight: '700',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.textDark,
    },
    // Body Shape Selection
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.textDark,
        marginTop: 24,
        marginBottom: 16,
    },
    shapeScroll: {
        marginHorizontal: -20,
    },
    shapeScrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 4,
    },
    shapeCard: {
        width: 120,
        padding: 16,
        marginRight: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    activeShapeCard: {
        borderColor: colors.primary,
        backgroundColor: '#F0FDFA',
    },
    shapeIconBg: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    activeShapeIconBg: {
        backgroundColor: 'rgba(45, 90, 82, 0.1)',
    },
    shapeIcon: {
        fontSize: 24,
    },
    shapeLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.textDark,
        marginBottom: 2,
    },
    activeShapeLabel: {
        color: colors.primary,
    },
    shapeRange: {
        fontSize: 10,
        fontWeight: '600',
        color: colors.textMuted,
    },
    activeShapeRange: {
        color: colors.primary,
    },
    activeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.primary,
        position: 'absolute',
        top: 10,
        right: 10,
    },
    // Suggestion Card
    suggestionCard: {
        padding: 24,
        borderRadius: 24,
        marginBottom: 20,
    },
    suggestionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    suggestionIcon: {
        fontSize: 20,
        marginRight: 12,
    },
    suggestionTarget: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.textDark,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        marginBottom: 20,
    },
    recItem: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    recDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.accent,
        marginTop: 6,
        marginRight: 12,
    },
    recText: {
        flex: 1,
        fontSize: 14,
        color: colors.textDark,
        lineHeight: 20,
        fontWeight: '500',
    },
    actionBtn: {
        marginTop: 8,
        backgroundColor: colors.background,
        paddingVertical: 14,
        borderRadius: 16,
        alignItems: 'center',
    },
    actionBtnText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.primary,
    },
});
