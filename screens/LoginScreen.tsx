import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { colors } from '../theme/colors';

// Assuming we receive navigation props from React Navigation
interface LoginScreenProps {
    navigation: any;
}

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFocused, setIsFocused] = useState<string | null>(null);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = () => {
        // Basic validation / navigation to Main Dashboard would happen here
        navigation.navigate('Main');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.innerContainer}>

                    {/* Backgound Decorative Elements from Prototype */}
                    <View style={styles.blob1} />
                    <View style={styles.blob2} />
                    <View style={styles.blob3} />

                    {/* Top Section: Top Illustration Mockup */}
                    <View style={styles.headerSection}>
                        <View style={styles.illustrationWrap}>
                            <Text style={styles.illustrationIcon}>🏃‍♂️💨🏋️‍♀️</Text>
                        </View>
                        <Text style={styles.appName}>FitBharat</Text>
                        <Text style={styles.tagline}>YOUR FITNESS, YOUR WAY</Text>
                    </View>

                    {/* Middle Section: Login Form Card */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Welcome back 👋</Text>
                        <Text style={styles.cardSub}>Log in to continue your journey</Text>

                        {/* Email Input */}
                        <Text style={styles.fieldLabel}>EMAIL</Text>
                        <TextInput
                            style={[
                                styles.input,
                                isFocused === 'email' && styles.inputFocused
                            ]}
                            placeholder="Enter your email"
                            placeholderTextColor={colors.textMuted}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                            onFocus={() => setIsFocused('email')}
                            onBlur={() => setIsFocused(null)}
                        />

                        {/* Password Input */}
                        <Text style={styles.fieldLabel}>PASSWORD</Text>
                        <TextInput
                            style={[
                                styles.input,
                                isFocused === 'password' && styles.inputFocused
                            ]}
                            placeholder="••••••••"
                            placeholderTextColor={colors.textMuted}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            onFocus={() => setIsFocused('password')}
                            onBlur={() => setIsFocused(null)}
                        />

                        {/* Extra Features: Remember Me & Forgot Password */}
                        <View style={styles.extrasRow}>
                            <TouchableOpacity
                                style={styles.rememberRow}
                                onPress={() => setRememberMe(!rememberMe)}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                                    {rememberMe && <Text style={styles.checkIcon}>✓</Text>}
                                </View>
                                <Text style={styles.rememberText}>Remember me</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text style={styles.forgotText}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Primary Button */}
                        <TouchableOpacity
                            style={styles.loginBtn}
                            onPress={handleLogin}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.loginBtnText}>Log In</Text>
                        </TouchableOpacity>

                        {/* Secondary Link */}
                        <Text style={styles.registerPrompt}>
                            New to FitBharat?{' '}
                            <Text
                                style={styles.registerLink}
                                onPress={() => navigation.navigate('Register')}
                            >
                                Create account
                            </Text>
                        </Text>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        position: 'relative',
    },

    // Background Orbs
    blob1: {
        position: 'absolute',
        top: -50,
        right: -40,
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: colors.primary,
        opacity: 0.1,
    },
    blob2: {
        position: 'absolute',
        bottom: -60,
        left: -40,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: colors.primary,
        opacity: 0.08,
    },
    blob3: {
        position: 'absolute',
        top: 60,
        right: 15,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.accent,
        opacity: 0.12,
    },

    // Top header elements
    headerSection: {
        alignItems: 'center',
        marginBottom: 28,
    },
    illustrationWrap: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 8,
    },
    illustrationIcon: {
        fontSize: 26,
    },
    appName: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.primary,
    },
    tagline: {
        fontSize: 11,
        color: colors.textMuted,
        marginTop: 4,
        letterSpacing: 1.5,
    },

    // Form Card
    card: {
        backgroundColor: colors.white,
        borderRadius: 24,
        padding: 22,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 32,
        elevation: 4,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.textDark,
    },
    cardSub: {
        fontSize: 12,
        color: colors.textMuted,
        marginBottom: 24,
        marginTop: 4,
    },
    fieldLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.primary,
        letterSpacing: 1,
        marginBottom: 6,
        textTransform: 'uppercase',
    },
    input: {
        backgroundColor: colors.background,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 14,
        color: colors.textDark,
        borderWidth: 1.5,
        borderColor: colors.border,
        marginBottom: 16,
    },
    inputFocused: {
        borderColor: colors.primary,
    },

    // Extra features
    extrasRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    rememberRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: colors.border,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    checkboxActive: {
        borderColor: colors.primary,
        backgroundColor: colors.primary,
    },
    checkIcon: {
        color: colors.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
    rememberText: {
        fontSize: 12,
        color: colors.textDark,
        fontWeight: '600',
    },
    forgotText: {
        fontSize: 12,
        color: colors.accent,
        fontWeight: '700',
    },

    // Buttons
    loginBtn: {
        backgroundColor: colors.primary,
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 6,
    },
    loginBtnText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.white,
    },
    registerPrompt: {
        textAlign: 'center',
        fontSize: 12,
        color: colors.textMuted,
        marginTop: 20,
    },
    registerLink: {
        color: colors.accent,
        fontWeight: '700',
    },
});
