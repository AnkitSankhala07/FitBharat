import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface StatCardProps {
    icon: string;
    value: string;
    unit: string;
    label: string;
    variant?: 'light' | 'orange';
}

export const StatCard = ({ icon, value, unit, label, variant = 'light' }: StatCardProps) => {
    const isOrange = variant === 'orange';

    return (
        <View style={[styles.card, isOrange && styles.orangeCard]}>
            <Text style={[styles.icon, isOrange && styles.whiteText]}>{icon}</Text>
            <Text style={[styles.value, isOrange && styles.whiteText]}>{value}</Text>
            <Text style={[styles.unit, isOrange && styles.transparentWhite]}>{unit}</Text>
            <Text style={[styles.label, isOrange && styles.transparentWhite]}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 13,
        minWidth: 88,
        marginRight: 10,
    },
    orangeCard: {
        backgroundColor: colors.accent,
    },
    icon: {
        fontSize: 18,
        marginBottom: 6,
    },
    value: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.textDark,
    },
    unit: {
        fontSize: 9,
        color: colors.textMuted,
        marginTop: 1,
    },
    label: {
        fontSize: 9,
        fontWeight: '700',
        color: colors.textMuted,
        marginTop: 5,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    whiteText: {
        color: colors.white,
    },
    transparentWhite: {
        color: 'rgba(255, 255, 255, 0.7)',
    }
});
