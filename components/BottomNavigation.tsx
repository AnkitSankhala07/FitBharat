import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export const BottomNavigation = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const getIcon = (routeName: string) => {
                    switch (routeName) {
                        case 'Home': return '🏠';
                        case 'Workout': return '💪';
                        case 'Nutrition': return '🥗';
                        case 'Profile': return '👤';
                        default: return '📍';
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        style={[styles.navBtn, isFocused && styles.navBtnActive]}
                        onPress={onPress}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.navIcon}>{getIcon(route.name)}</Text>
                        {isFocused && (
                            <Text style={styles.navLabel}>{options.title || route.name}</Text>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 24,
        left: 16,
        right: 16,
        backgroundColor: '#1A1A1A',
        borderRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 10,
        paddingHorizontal: 8,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    navBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 100,
    },
    navBtnActive: {
        backgroundColor: colors.accent,
    },
    navIcon: {
        fontSize: 18,
    },
    navLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.white,
        marginLeft: 6,
    }
});
