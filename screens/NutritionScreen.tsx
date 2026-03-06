import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';

export const NutritionScreen = () => {
    const navigation = useNavigation<any>();
    const macroGoals = {
        calories: { current: 1840, target: 2200 },
        protein: { current: 120, target: 160, color: colors.primary },
        carbs: { current: 210, target: 250, color: colors.accent },
        fat: { current: 65, target: 80, color: '#FACC15' },
        fiber: { current: 22, target: 30, color: '#10B981' }
    };

    const meals = [
        {
            id: '1',
            type: 'Breakfast',
            name: 'Oatmeal with Berries',
            calories: 420,
            macros: 'P: 15g • C: 65g • F: 10g',
            icon: '🥣'
        },
        {
            id: '2',
            type: 'Lunch',
            name: 'Grilled Chicken Salad',
            calories: 580,
            macros: 'P: 45g • C: 15g • F: 25g',
            icon: '🥗'
        },
        {
            id: '3',
            type: 'Dinner',
            name: 'Salmon with Quinoa',
            calories: 640,
            macros: 'P: 40g • C: 50g • F: 30g',
            icon: '🥩'
        }
    ];

    const renderMacro = (label: string, current: number, target: number, color: string) => (
        <View style={styles.macroRow}>
            <View style={styles.macroHeader}>
                <Text style={styles.macroLabel}>{label}</Text>
                <Text style={styles.macroValue}>{current}g / {target}g</Text>
            </View>
            <ProgressBar
                progress={current / target}
                color={color}
                backgroundColor="rgba(0,0,0,0.05)"
                height={6}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Nutrition</Text>
                    <TouchableOpacity
                        style={styles.logBtn}
                        onPress={() => navigation.navigate('LogMeal')}
                    >
                        <Text style={styles.logBtnText}>+ Log Meal</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Calories Summary Card */}
                    <Card style={styles.caloriesCard}>
                        <Text style={styles.caloriesLabel}>CALORIES REMAINING</Text>
                        <View style={styles.caloriesRow}>
                            <View>
                                <Text style={styles.caloriesCurrent}>{macroGoals.calories.target - macroGoals.calories.current}</Text>
                                <Text style={styles.kcalUnit}>kcal left</Text>
                            </View>
                            <View style={styles.caloriesDivider} />
                            <View>
                                <Text style={styles.caloriesTarget}>{macroGoals.calories.current} / {macroGoals.calories.target}</Text>
                                <Text style={styles.kcalUnit}>consumed</Text>
                            </View>
                        </View>
                        <ProgressBar
                            progress={macroGoals.calories.current / macroGoals.calories.target}
                            color={colors.primary}
                            backgroundColor="rgba(255,255,255,0.2)"
                            height={10}
                        />
                    </Card>

                    {/* Macros Section */}
                    <Text style={styles.sectionTitle}>Macros & Micronutrients</Text>
                    <Card style={styles.macrosCard}>
                        {renderMacro('Protein', macroGoals.protein.current, macroGoals.protein.target, macroGoals.protein.color)}
                        {renderMacro('Carbs', macroGoals.carbs.current, macroGoals.carbs.target, macroGoals.carbs.color)}
                        {renderMacro('Fat', macroGoals.fat.current, macroGoals.fat.target, macroGoals.fat.color)}
                        {renderMacro('Fiber', macroGoals.fiber.current, macroGoals.fiber.target, macroGoals.fiber.color)}
                    </Card>

                    {/* Meals Section */}
                    <Text style={styles.sectionTitle}>Daily Meals</Text>
                    {meals.map((meal) => (
                        <Card key={meal.id} style={styles.mealCard}>
                            <View style={styles.mealTop}>
                                <View style={styles.mealIconBg}>
                                    <Text style={styles.mealIcon}>{meal.icon}</Text>
                                </View>
                                <View style={styles.mealInfo}>
                                    <View style={styles.mealHeaderRow}>
                                        <Text style={styles.mealType}>{meal.type}</Text>
                                        <Text style={styles.mealKcal}>{meal.calories} kcal</Text>
                                    </View>
                                    <Text style={styles.mealName}>{meal.name}</Text>
                                    <Text style={styles.mealMacros}>{meal.macros}</Text>
                                </View>
                            </View>
                        </Card>
                    ))}
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.textDark,
        letterSpacing: -0.5,
    },
    logBtn: {
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
    logBtnText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '700',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    // Calories Card
    caloriesCard: {
        backgroundColor: colors.primary,
        padding: 24,
        borderRadius: 24,
        marginBottom: 20,
    },
    caloriesLabel: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: 8,
    },
    caloriesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    caloriesCurrent: {
        fontSize: 42,
        fontWeight: '900',
        color: colors.white,
    },
    kcalUnit: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.5)',
        fontWeight: '600',
        marginTop: -4,
    },
    caloriesDivider: {
        width: 1,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.15)',
        marginHorizontal: 24,
    },
    caloriesTarget: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.white,
    },
    // Section Title
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.textDark,
        marginTop: 10,
        marginBottom: 16,
    },
    // Macros Card
    macrosCard: {
        padding: 20,
        marginBottom: 24,
    },
    macroRow: {
        marginBottom: 16,
    },
    macroHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    macroLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.textDark,
    },
    macroValue: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.textMuted,
    },
    // Meal Card
    mealCard: {
        padding: 16,
        marginBottom: 12,
    },
    mealTop: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mealIconBg: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    mealIcon: {
        fontSize: 24,
    },
    mealInfo: {
        flex: 1,
    },
    mealHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    mealType: {
        fontSize: 11,
        fontWeight: '800',
        color: colors.accent,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    mealKcal: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.textDark,
    },
    mealName: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.textDark,
        marginBottom: 2,
    },
    mealMacros: {
        fontSize: 12,
        color: colors.textMuted,
        fontWeight: '600',
    }
});
