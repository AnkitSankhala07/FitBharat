import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { colors } from '../theme/colors';

interface CardProps extends ViewProps {
    children: React.ReactNode;
    variant?: 'light' | 'dark';
}

export const Card = ({ children, style, variant = 'light', ...rest }: CardProps) => {
    return (
        <View
            style={[
                styles.card,
                variant === 'dark' ? styles.dark : styles.light,
                style
            ]}
            {...rest}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
    },
    light: {
        backgroundColor: colors.card,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 3,
    },
    dark: {
        backgroundColor: colors.primary,
    }
});
