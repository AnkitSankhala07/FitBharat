import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { Card } from '../components/Card';

export const SleepScreen = () => {
    const navigation = useNavigation<any>();

    // States for time selection (simulating a picker for better UI control)
    const [bedHour, setBedHour] = useState(22);
    const [bedMin, setBedMin] = useState(30);
    const [wakeHour, setWakeHour] = useState(6);
    const [wakeMin, setWakeMin] = useState(30);
    const [quality, setQuality] = useState('Good');
    const [duration, setDuration] = useState('8h 00m');

    // Calculate duration whenever times change
    useEffect(() => {
        let start = bedHour * 60 + bedMin;
        let end = wakeHour * 60 + wakeMin;

        // If end is before start, it means we slept past midnight
        if (end < start) {
            end += 24 * 60;
        }

        const diff = end - start;
        const h = Math.floor(diff / 60);
        const m = diff % 60;
        setDuration(`${h}h ${m < 10 ? '0' : ''}${m}m`);
    }, [bedHour, bedMin, wakeHour, wakeMin]);

    const qualityOptions = [
        { label: 'Poor', icon: '😫', color: '#EF4444' },
        { label: 'Okay', icon: '😐', color: '#F59E0B' },
        { label: 'Good', icon: '😊', color: colors.primary },
        { label: 'Great', icon: '🤩', color: '#10B981' },
    ];

    const TimeAdjuster = ({ label, hour, min, onHourChange, onMinChange }: any) => (
        <Card style={styles.timeCard}>
            <Text style={styles.timeLabel}>{label}</Text>
            <View style={styles.timeRow}>
                <View style={styles.timeDisplay}>
                    <TouchableOpacity onPress={() => onHourChange((hour + 1) % 24)}><Text style={styles.adjustArrow}>▲</Text></TouchableOpacity>
                    <Text style={styles.timeText}>{hour < 10 ? '0' : ''}{hour}</Text>
                    <TouchableOpacity onPress={() => onHourChange((hour + 23) % 24)}><Text style={styles.adjustArrow}>▼</Text></TouchableOpacity>
                </View>
                <Text style={styles.timeSeparator}>:</Text>
                <View style={styles.timeDisplay}>
                    <TouchableOpacity onPress={() => onMinChange((min + 5) % 60)}><Text style={styles.adjustArrow}>▲</Text></TouchableOpacity>
                    <Text style={styles.timeText}>{min < 10 ? '0' : ''}{min}</Text>
                    <TouchableOpacity onPress={() => onMinChange((min + 55) % 60)}><Text style={styles.adjustArrow}>▼</Text></TouchableOpacity>
                </View>
            </View>
        </Card>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Text style={styles.backBtnText}>← Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Sleep Log</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Top Sleep Score Card */}
                    <Card style={styles.scoreCard}>
                        <Text style={styles.scoreTitle}>LAST NIGHT'S SCORE</Text>
                        <Text style={styles.scoreValue}>84</Text>
                        <View style={styles.scoreBadge}>
                            <Text style={styles.scoreBadgeText}>RESTFUL SLEEP</Text>
                        </View>
                        <Text style={styles.durationText}>Total Duration: {duration}</Text>
                    </Card>

                    <Text style={styles.sectionTitle}>When did you sleep?</Text>
                    <View style={styles.adjustersRow}>
                        <TimeAdjuster
                            label="BEDTIME"
                            hour={bedHour}
                            min={bedMin}
                            onHourChange={setBedHour}
                            onMinChange={setBedMin}
                        />
                        <TimeAdjuster
                            label="WAKE UP"
                            hour={wakeHour}
                            min={wakeMin}
                            onHourChange={setWakeHour}
                            onMinChange={setWakeMin}
                        />
                    </View>

                    {/* Quality Selection */}
                    <Text style={styles.sectionTitle}>How was your sleep quality?</Text>
                    <View style={styles.qualityContainer}>
                        {qualityOptions.map((opt) => (
                            <TouchableOpacity
                                key={opt.label}
                                style={[
                                    styles.qualityBtn,
                                    quality === opt.label && { backgroundColor: opt.color, borderColor: opt.color }
                                ]}
                                onPress={() => setQuality(opt.label)}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.qualityIcon}>{opt.icon}</Text>
                                <Text style={[
                                    styles.qualityLabel,
                                    quality === opt.label && { color: colors.white }
                                ]}>
                                    {opt.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Summary Info */}
                    <Card style={styles.infoCard}>
                        <Text style={styles.infoTitle}>Expert Insight</Text>
                        <Text style={styles.infoDesc}>
                            Consistent sleep schedules help regulate your circadian rhythm. You are currently averaging **7.8 hours** this week.
                        </Text>
                    </Card>

                    <TouchableOpacity
                        style={styles.saveBtn}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.saveBtnText}>Save Sleep Log</Text>
                    </TouchableOpacity>

                </ScrollView>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: colors.white,
    },
    backBtn: {
        padding: 4,
    },
    backBtnText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textMuted,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.textDark,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 16,
    },
    // Score Card
    scoreCard: {
        backgroundColor: '#4C1D95', // Rich Purple for Sleep theme
        padding: 32,
        borderRadius: 28,
        alignItems: 'center',
        marginBottom: 24,
    },
    scoreTitle: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 2,
        marginBottom: 8,
    },
    scoreValue: {
        fontSize: 64,
        fontWeight: '900',
        color: colors.white,
    },
    scoreBadge: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 100,
        marginTop: 12,
        marginBottom: 16,
    },
    scoreBadgeText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: '800',
    },
    durationText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
        fontWeight: '600',
    },
    // Adjusters
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: colors.textDark,
        marginBottom: 16,
        marginTop: 8,
    },
    adjustersRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        gap: 12,
    },
    timeCard: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    timeLabel: {
        fontSize: 10,
        color: colors.textMuted,
        fontWeight: '800',
        letterSpacing: 1,
        marginBottom: 12,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeDisplay: {
        alignItems: 'center',
    },
    timeText: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.textDark,
        marginVertical: 4,
    },
    timeSeparator: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.textDark,
        marginHorizontal: 8,
        marginTop: 20,
    },
    adjustArrow: {
        fontSize: 12,
        color: colors.primary,
        fontWeight: '900',
    },
    // Quality
    qualityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    qualityBtn: {
        width: '23%',
        backgroundColor: colors.white,
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    qualityIcon: {
        fontSize: 24,
        marginBottom: 8,
    },
    qualityLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.textDark,
    },
    // Info Card
    infoCard: {
        padding: 20,
        marginBottom: 32,
        borderLeftWidth: 4,
        borderLeftColor: colors.primary,
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: colors.textDark,
        marginBottom: 8,
    },
    infoDesc: {
        fontSize: 13,
        color: colors.textMuted,
        lineHeight: 20,
        fontWeight: '500',
    },
    // Save
    saveBtn: {
        backgroundColor: colors.primary,
        paddingVertical: 18,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    saveBtnText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '800',
    }
});
