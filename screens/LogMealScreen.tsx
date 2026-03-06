import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    ScrollView
} from 'react-native';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../components/Card';

interface Ingredient {
    id: string;
    name: string;
    calories: number; // per 100g
    protein: number;
    carbs: number;
    fat: number;
}

const INGREDIENTS_DB: Ingredient[] = [
    { id: '1', name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { id: '2', name: 'Brown Rice', calories: 111, protein: 2.6, carbs: 23, fat: 0.9 },
    { id: '3', name: 'Eggs (Boiled)', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
    { id: '4', name: 'Avocado', calories: 160, protein: 2, carbs: 9, fat: 15 },
    { id: '5', name: 'Paneer', calories: 265, protein: 18, carbs: 1.2, fat: 20 },
    { id: '6', name: 'Oats', calories: 389, protein: 16.9, carbs: 66, fat: 6.9 },
    { id: '7', name: 'Greek Yogurt', calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
    { id: '8', name: 'Peanuts', calories: 567, protein: 25.8, carbs: 16.1, fat: 49.2 },
];

export const LogMealScreen = () => {
    const navigation = useNavigation<any>();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);

    const filteredIngredients = INGREDIENTS_DB.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleIngredient = (ingredient: Ingredient) => {
        const index = selectedIngredients.findIndex(i => i.id === ingredient.id);
        if (index > -1) {
            setSelectedIngredients(prev => prev.filter(i => i.id !== ingredient.id));
        } else {
            setSelectedIngredients(prev => [...prev, ingredient]);
        }
    };

    const isSelected = (id: string) => selectedIngredients.some(i => i.id === id);

    const totals = selectedIngredients.reduce(
        (acc, curr) => ({
            calories: acc.calories + curr.calories,
            protein: acc.protein + curr.protein,
            carbs: acc.carbs + curr.carbs,
            fat: acc.fat + curr.fat,
        }),
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    const renderIngredient = ({ item }: { item: Ingredient }) => (
        <Card style={styles.ingredientCard}>
            <View style={styles.ingredientInfo}>
                <Text style={styles.ingredientName}>{item.name}</Text>
                <Text style={styles.ingredientDetails}>{item.calories} kcal / 100g</Text>
            </View>
            <TouchableOpacity
                style={[styles.addBtn, isSelected(item.id) && styles.removeBtn]}
                onPress={() => toggleIngredient(item)}
            >
                <Text style={styles.addBtnText}>{isSelected(item.id) ? '−' : '+'}</Text>
            </TouchableOpacity>
        </Card>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.backLink}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Log Meal</Text>
                    <View style={{ width: 40 }} />
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search ingredients..."
                        placeholderTextColor={colors.textMuted}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                <View style={styles.mainContent}>
                    {/* Ingredient List */}
                    <FlatList
                        data={filteredIngredients}
                        keyExtractor={item => item.id}
                        renderItem={renderIngredient}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={<Text style={styles.sectionTitle}>Ingredients Library</Text>}
                        contentContainerStyle={styles.listPadding}
                    />

                    {/* Meal Builder Card (Fixed at bottom or separate view) */}
                    {selectedIngredients.length > 0 && (
                        <Card style={styles.builderCard}>
                            <Text style={styles.builderTitle}>Meal Builder</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.builderScroll}>
                                {selectedIngredients.map(item => (
                                    <View key={item.id} style={styles.ingChip}>
                                        <Text style={styles.ingChipText}>{item.name}</Text>
                                        <TouchableOpacity onPress={() => toggleIngredient(item)}>
                                            <Text style={styles.ingChipClose}>×</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </ScrollView>

                            <View style={styles.summaryGrid}>
                                <View style={styles.summaryItem}>
                                    <Text style={styles.summaryVal}>{totals.calories}</Text>
                                    <Text style={styles.summaryLabel}>kcal</Text>
                                </View>
                                <View style={styles.summaryItem}>
                                    <Text style={[styles.summaryVal, { color: colors.primary }]}>{totals.protein}g</Text>
                                    <Text style={styles.summaryLabel}>Protein</Text>
                                </View>
                                <View style={styles.summaryItem}>
                                    <Text style={[styles.summaryVal, { color: colors.accent }]}>{totals.carbs}g</Text>
                                    <Text style={styles.summaryLabel}>Carbs</Text>
                                </View>
                                <View style={styles.summaryItem}>
                                    <Text style={[styles.summaryVal, { color: '#FACC15' }]}>{totals.fat}g</Text>
                                    <Text style={styles.summaryLabel}>Fat</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.saveBtn}
                                onPress={() => navigation.goBack()}
                            >
                                <Text style={styles.saveBtnText}>Save Meal</Text>
                            </TouchableOpacity>
                        </Card>
                    )}
                </View>
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
        paddingVertical: 16,
        backgroundColor: colors.white,
    },
    backLink: {
        fontSize: 14,
        color: colors.textMuted,
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.textDark,
    },
    searchContainer: {
        padding: 20,
    },
    searchInput: {
        backgroundColor: colors.white,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 15,
        color: colors.textDark,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    mainContent: {
        flex: 1,
    },
    listPadding: {
        paddingHorizontal: 20,
        paddingBottom: 250,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.textDark,
        marginBottom: 16,
    },
    ingredientCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 8,
    },
    ingredientInfo: {
        flex: 1,
    },
    ingredientName: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.textDark,
        marginBottom: 4,
    },
    ingredientDetails: {
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
    removeBtn: {
        backgroundColor: '#FEE2E2',
    },
    addBtnText: {
        fontSize: 20,
        color: colors.primary,
        fontWeight: '600',
        lineHeight: 24,
    },
    // Builder Card (Persistent Overlay)
    builderCard: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        margin: 0,
        borderRadius: 0,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        backgroundColor: colors.white,
    },
    builderTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.textDark,
        marginBottom: 16,
    },
    builderScroll: {
        marginBottom: 20,
    },
    ingChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 100,
        marginRight: 8,
    },
    ingChipText: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.primary,
        marginRight: 6,
    },
    ingChipClose: {
        fontSize: 16,
        color: colors.primary,
        fontWeight: 'bold',
    },
    summaryGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    summaryItem: {
        alignItems: 'center',
        flex: 1,
    },
    summaryVal: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.textDark,
    },
    summaryLabel: {
        fontSize: 10,
        color: colors.textMuted,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginTop: 2,
    },
    saveBtn: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    saveBtnText: {
        color: colors.white,
        fontSize: 15,
        fontWeight: '800',
    }
});
