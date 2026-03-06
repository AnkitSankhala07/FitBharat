import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface ProgressBarProps {
    progress: number; // 0 to 1
    color?: string;
    backgroundColor?: string;
    height?: number;
}

export const ProgressBar = ({
    progress,
    color = colors.accent,
    backgroundColor = 'rgba(255, 255, 255, 0.2)',
    height = 3
}: ProgressBarProps) => {
    return (
        <View style={[styles.background, { backgroundColor, height }]}>
            <View style={[
                styles.fill,
                {
                    backgroundColor: color,
                    height,
                    width: `${Math.min(100, Math.max(0, progress * 100))}%`
                }
            ]} />
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        width: '100%',
        borderRadius: 100,
        overflow: 'hidden',
    },
    fill: {
        borderRadius: 100,
    }
});
