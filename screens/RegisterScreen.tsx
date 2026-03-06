import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { colors } from '../theme/colors';

// Import our reusable components
import { Header } from '../components/Header';
import { Card } from '../components/Card';

interface RegisterScreenProps {
    navigation: any;
}

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
    // Personal Info
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Body Stats
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');

    // Selections
    const [selectedGoal, setSelectedGoal] = useState('Gain Muscle');
    const [selectedGender, setSelectedGender] = useState('Male');

    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const goals = [
        { id: 'Lose Weight', icon: '⬇️' },
        { id: 'Gain Muscle', icon: '💪' },
        { id: 'Stay Fit', icon: '✨' },
    ];

    const genders = [
        { id: 'Male', icon: '♂' },
        { id: 'Female', icon: '♀' },
    ];

    const handleRegister = () => {
        // Navigate to Dashboard after registering
        navigation.navigate('Splash'); // Routing to Dashboard will happen later
        console.log('Registering with data...', { name, selectedGoal, selectedGender });
    };

    return (
        <View style={styles.container}>
            {/* Background Decor */}
            <View style={styles.regBlob} />

            <Header
                title="Create Account"
                subtitle="Join FitBharat today"
                onBack={() => navigation.goBack()}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Section 1: Personal Info */}
                    <Card style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionDot} />
                            <Text style={styles.sectionName}>Personal Info</Text>
                        </View>

                        <Text style={styles.fieldLabel}>FULL NAME</Text>
                        <TextInput
                            style={[styles.input, focusedInput === 'name' && styles.inputFocused]}
                            placeholder="e.g. Swayam Gurjar"
                            placeholderTextColor={colors.textMuted}
                            value={name}
                            onChangeText={setName}
                            onFocus={() => setFocusedInput('name')}
                            onBlur={() => setFocusedInput(null)}
                        />

                        <Text style={styles.fieldLabel}>EMAIL</Text>
                        <TextInput
                            style={[styles.input, focusedInput === 'email' && styles.inputFocused]}
                            placeholder="e.g. swayam@gmail.com"
                            placeholderTextColor={colors.textMuted}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                            onFocus={() => setFocusedInput('email')}
                            onBlur={() => setFocusedInput(null)}
                        />

                        <Text style={styles.fieldLabel}>PASSWORD</Text>
                        <TextInput
                            style={[styles.input, focusedInput === 'password' && styles.inputFocused]}
                            placeholder="••••••••"
                            placeholderTextColor={colors.textMuted}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            onFocus={() => setFocusedInput('password')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </Card>

                    {/* Section 2: Body Stats */}
                    <Card style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionDot} />
                            <Text style={styles.sectionName}>Body Stats</Text>
                        </View>
                        <View style={styles.row3}>
                            <View style={styles.statCol}>
                                <Text style={styles.fieldLabel}>AGE</Text>
                                <TextInput
                                    style={[styles.input, styles.compactInput, focusedInput === 'age' && styles.inputFocused]}
                                    placeholder="20"
                                    placeholderTextColor={colors.textMuted}
                                    keyboardType="numeric"
                                    value={age}
                                    onChangeText={setAge}
                                    onFocus={() => setFocusedInput('age')}
                                    onBlur={() => setFocusedInput(null)}
                                />
                            </View>
                            <View style={styles.statCol}>
                                <Text style={styles.fieldLabel}>HT (cm)</Text>
                                <TextInput
                                    style={[styles.input, styles.compactInput, focusedInput === 'height' && styles.inputFocused]}
                                    placeholder="175"
                                    placeholderTextColor={colors.textMuted}
                                    keyboardType="numeric"
                                    value={height}
                                    onChangeText={setHeight}
                                    onFocus={() => setFocusedInput('height')}
                                    onBlur={() => setFocusedInput(null)}
                                />
                            </View>
                            <View style={styles.statCol}>
                                <Text style={styles.fieldLabel}>WT (kg)</Text>
                                <TextInput
                                    style={[styles.input, styles.compactInput, focusedInput === 'weight' && styles.inputFocused]}
                                    placeholder="70"
                                    placeholderTextColor={colors.textMuted}
                                    keyboardType="numeric"
                                    value={weight}
                                    onChangeText={setWeight}
                                    onFocus={() => setFocusedInput('weight')}
                                    onBlur={() => setFocusedInput(null)}
                                />
                            </View>
                        </View>
                    </Card>

                    {/* Section 3: Goal Selection */}
                    <Card style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionDot} />
                            <Text style={styles.sectionName}>Your Goal</Text>
                        </View>
                        <View style={styles.pillRow}>
                            {goals.map((goal) => (
                                <TouchableOpacity
                                    key={goal.id}
                                    style={[
                                        styles.selPill,
                                        selectedGoal === goal.id && styles.selPillActive
                                    ]}
                                    onPress={() => setSelectedGoal(goal.id)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[
                                        styles.selPillText,
                                        selectedGoal === goal.id && styles.selPillTextActive
                                    ]}>
                                        {goal.icon} {goal.id}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Card>

                    {/* Section 4: Gender Selection */}
                    <Card style={styles.sectionCard}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionDot} />
                            <Text style={styles.sectionName}>Gender</Text>
                        </View>
                        <View style={styles.pillRow}>
                            {genders.map((gender) => (
                                <TouchableOpacity
                                    key={gender.id}
                                    style={[
                                        styles.selPill,
                                        styles.flexPill,
                                        selectedGender === gender.id && styles.selPillActive
                                    ]}
                                    onPress={() => setSelectedGender(gender.id)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[
                                        styles.selPillText,
                                        selectedGender === gender.id && styles.selPillTextActive
                                    ]}>
                                        {gender.icon} {gender.id}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Card>

                    {/* Create Button */}
                    <TouchableOpacity
                        style={styles.regBtn}
                        onPress={handleRegister}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.regBtnText}>Create Account</Text>
                    </TouchableOpacity>

                    {/* Footer Link */}
                    <Text style={styles.regLink}>
                        Already have an account?{' '}
                        <Text
                            style={styles.regLinkHighlight}
                            onPress={() => navigation.navigate('Login')}
                        >
                            Log in
                        </Text>
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    regBlob: {
        position: 'absolute',
        top: -40,
        right: -30,
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: colors.primary,
        opacity: 0.09,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },

    // Sections
    sectionCard: {
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },
    sectionDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.accent,
        marginRight: 8,
    },
    sectionName: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.primary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

    // Form Inputs
    fieldLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.primary,
        letterSpacing: 1,
        marginBottom: 6,
    },
    input: {
        backgroundColor: colors.background,
        borderRadius: 12,
        paddingVertical: 11,
        paddingHorizontal: 13,
        fontSize: 13,
        color: colors.textDark,
        borderWidth: 1.5,
        borderColor: colors.border,
        marginBottom: 12,
    },
    inputFocused: {
        borderColor: colors.primary,
    },
    row3: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
    },
    statCol: {
        flex: 1,
    },
    compactInput: {
        fontSize: 11,
        textAlign: 'center',
        paddingHorizontal: 4,
    },

    // Pills Selection
    pillRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    selPill: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 100,
        borderWidth: 1.5,
        borderColor: colors.border,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexPill: {
        flex: 1,
    },
    selPillActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    selPillText: {
        fontSize: 11,
        fontWeight: '600',
        color: colors.textMuted,
    },
    selPillTextActive: {
        color: colors.white,
    },

    // Buttons
    regBtn: {
        backgroundColor: colors.primary,
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 6,
    },
    regBtnText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.white,
    },
    regLink: {
        textAlign: 'center',
        fontSize: 12,
        color: colors.textMuted,
    },
    regLinkHighlight: {
        color: colors.accent,
        fontWeight: '700',
    },
});
