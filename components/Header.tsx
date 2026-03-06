import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

interface HeaderProps {
    title: string;
    subtitle?: string;
    onBack?: () => void;
    actionText?: string;
    onAction?: () => void;
    actionVariant?: 'primary' | 'accent';
}

export const Header = ({ title, subtitle, onBack, actionText, onAction, actionVariant = 'primary' }: HeaderProps) => {
    return (
        <View style={styles.container}>
            {onBack ? (
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.placeholder} />
            )}

            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>

            {actionText ? (
                <TouchableOpacity
                    style={[styles.actionButton, actionVariant === 'accent' && styles.actionAccent]}
                    onPress={onAction}
                >
                    <Text style={styles.actionText}>{actionText}</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.placeholder} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 44,
        paddingHorizontal: 18,
        paddingBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.background,
    },
    backButton: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 2,
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.primary,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.textDark,
    },
    subtitle: {
        fontSize: 11,
        color: colors.textMuted,
        marginTop: 2,
    },
    actionButton: {
        backgroundColor: colors.primary,
        borderRadius: 100,
        paddingVertical: 7,
        paddingHorizontal: 14,
    },
    actionAccent: {
        backgroundColor: colors.accent,
    },
    actionText: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.white,
    },
    placeholder: {
        width: 34,
    }
});
