import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

interface IconButtonProps {
    icon: string;
    onPress?: () => void;
    variant?: 'primary' | 'accent' | 'outline' | 'ghost';
    size?: number;
}

export const IconButton = ({ icon, onPress, variant = 'primary', size = 38 }: IconButtonProps) => {
    const isOutline = variant === 'outline';
    const isGhost = variant === 'ghost';

    return (
        <TouchableOpacity
            style={[
                styles.button,
                { width: size, height: size, borderRadius: size / 2 },
                variant === 'primary' && styles.primary,
                variant === 'accent' && styles.accent,
                isOutline && styles.outline,
                isGhost && styles.ghost,
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={[
                styles.icon,
                isOutline && styles.iconOutline,
                isGhost && styles.iconGhost
            ]}>
                {icon}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    primary: {
        backgroundColor: colors.primary,
    },
    accent: {
        backgroundColor: colors.accent,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: colors.primary,
    },
    ghost: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    icon: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '700',
    },
    iconOutline: {
        color: colors.primary,
    },
    iconGhost: {
        color: colors.white,
    }
});
