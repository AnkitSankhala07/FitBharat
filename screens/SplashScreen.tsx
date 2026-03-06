import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';

export const SplashScreen = () => {
    const navigation = useNavigation<any>();
    const scale = useRef(new Animated.Value(0)).current;

    const dotWidths = [
        useRef(new Animated.Value(6)).current,
        useRef(new Animated.Value(6)).current,
        useRef(new Animated.Value(6)).current,
    ];
    const dotOpacities = [
        useRef(new Animated.Value(0.4)).current,
        useRef(new Animated.Value(0.4)).current,
        useRef(new Animated.Value(0.4)).current,
    ];

    useEffect(() => {
        // 1. Logo bounce animation
        Animated.spring(scale, {
            toValue: 1,
            friction: 5,
            tension: 40,
            useNativeDriver: true,
        }).start();

        // 2. Loading dots animation
        const animateDot = (index: number, delay: number) => {
            const loop = Animated.loop(
                Animated.sequence([
                    Animated.parallel([
                        Animated.timing(dotWidths[index], {
                            toValue: 18,
                            duration: 400,
                            delay,
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: false,
                        }),
                        Animated.timing(dotOpacities[index], {
                            toValue: 1,
                            duration: 400,
                            delay,
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: false,
                        }),
                    ]),
                    Animated.parallel([
                        Animated.timing(dotWidths[index], {
                            toValue: 6,
                            duration: 400,
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: false,
                        }),
                        Animated.timing(dotOpacities[index], {
                            toValue: 0.4,
                            duration: 400,
                            easing: Easing.inOut(Easing.ease),
                            useNativeDriver: false,
                        }),
                    ]),
                ])
            );
            loop.start();
            return loop;
        };

        const anim0 = animateDot(0, 0);
        const anim1 = animateDot(1, 200);
        const anim2 = animateDot(2, 400);

        // 3. Navigation transition after splash
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 2000);

        return () => {
            anim0.stop();
            anim1.stop();
            anim2.stop();
            clearTimeout(timer);
        };
    }, []);

    return (
        <View style={styles.container}>
            {/* Background Blobs */}
            <View style={styles.blob1} />
            <View style={styles.blob2} />
            <View style={styles.blob3} />

            {/* Pulsing and Bouncing Logo */}
            <Animated.View style={[styles.logoWrap, { transform: [{ scale }] }]}>
                <View style={styles.logo}>
                    <Text style={styles.logoIcon}>❤</Text>
                    <View style={styles.logoDot} />
                    <View style={styles.logoAccent} />
                </View>
            </Animated.View>

            <Text style={styles.appName}>FitBharat</Text>
            <Text style={styles.tagline}>YOUR FITNESS, YOUR WAY — BUILT FOR INDIA</Text>

            {/* Subtle Animated Loading Indicator */}
            <View style={styles.dotsContainer}>
                {dotWidths.map((animWidth, index) => (
                    <Animated.View
                        key={index}
                        style={[
                            styles.loadingDot,
                            {
                                width: animWidth,
                                opacity: dotOpacities[index],
                                backgroundColor: dotOpacities[index].interpolate({
                                    inputRange: [0.4, 1],
                                    outputRange: [colors.textMuted, colors.accent],
                                }),
                            },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    blob1: {
        position: 'absolute',
        top: -40,
        right: -30,
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: colors.primary,
        opacity: 0.1,
    },
    blob2: {
        position: 'absolute',
        bottom: -50,
        left: -30,
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: colors.primary,
        opacity: 0.08,
    },
    blob3: {
        position: 'absolute',
        top: 80,
        right: 10,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.accent,
        opacity: 0.15,
    },
    logoWrap: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.35,
        shadowRadius: 40,
        elevation: 8,
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    logoIcon: {
        fontSize: 28,
        color: colors.white,
    },
    logoDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: colors.white,
        position: 'absolute',
        top: 12,
        right: 12,
    },
    logoAccent: {
        position: 'absolute',
        top: -4,
        right: -4,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.accent,
        borderWidth: 3,
        borderColor: colors.background,
    },
    appName: {
        fontSize: 36,
        fontWeight: '800',
        color: colors.primary,
        marginTop: 24,
        letterSpacing: 1,
    },
    tagline: {
        fontSize: 11,
        color: colors.textMuted,
        letterSpacing: 2.5,
        textTransform: 'uppercase',
        marginTop: 6,
        textAlign: 'center',
        paddingHorizontal: 30,
        lineHeight: 18,
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 48,
        height: 6,
    },
    loadingDot: {
        height: 6,
        borderRadius: 3,
    },
});
