import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { colors, spacing, font, radius } from '../../theme';
import { useServerConnection, ConnectionStatus } from '../../hooks/useServerConnection';

const STATUS_META: Record<ConnectionStatus, { color: string; icon: string; label: string }> = {
  connected: { color: '#22C55E', icon: 'checkmark-circle', label: 'Server Connected' },
  disconnected: { color: '#EF4444', icon: 'close-circle', label: 'Server Disconnected' },
  checking: { color: '#FACC15', icon: 'sync-circle', label: 'Connecting...' },
};

function ConnectionBadge() {
  const { status, latency, retry } = useServerConnection();
  const pulse = useSharedValue(1);
  const meta = STATUS_META[status];

  useEffect(() => {
    if (status === 'connected') {
      pulse.value = withRepeat(
        withTiming(0.4, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      );
    } else if (status === 'checking') {
      pulse.value = withRepeat(
        withTiming(0.2, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      );
    } else {
      pulse.value = 0;
    }
  }, [status, pulse]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: pulse.value,
  }));

  return (
    <Pressable onPress={retry} style={styles.badge}>
      <View style={styles.badgeInner}>
        <View style={styles.dotWrap}>
          <Animated.View style={[styles.glow, { backgroundColor: meta.color }, glowStyle]} />
          <View style={[styles.dot, { backgroundColor: meta.color }]} />
        </View>
        <Ionicons name={meta.icon as any} size={18} color={meta.color} />
        <Text style={[styles.badgeLabel, { color: meta.color }]}>{meta.label}</Text>
        {status === 'connected' && latency !== null && (
          <Text style={styles.latency}>{latency}ms</Text>
        )}
      </View>
    </Pressable>
  );
}

export default function HomeSection() {
  return (
    <View style={styles.container}>
      <ConnectionBadge />

      <View style={styles.iconWrap}>
        <Ionicons name="home-outline" size={48} color={colors.primary} />
      </View>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>
        A modern cross-platform template built with Expo Router and Reanimated.
      </Text>

      <View style={styles.cardRow}>
        <View style={styles.card}>
          <Ionicons name="phone-portrait-outline" size={28} color={colors.accent} />
          <Text style={styles.cardTitle}>Mobile</Text>
          <Text style={styles.cardText}>Native feel with smooth transitions</Text>
        </View>
        <View style={styles.card}>
          <Ionicons name="globe-outline" size={28} color={colors.accent} />
          <Text style={styles.cardTitle}>Web</Text>
          <Text style={styles.cardText}>Responsive layout, no scroll needed</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: { fontSize: font.size.xxl, fontWeight: font.weight.bold, color: colors.text, marginBottom: spacing.sm },
  subtitle: { fontSize: font.size.md, color: colors.textSecondary, textAlign: 'center', maxWidth: 400, marginBottom: spacing.xl },
  cardRow: { flexDirection: 'row', gap: spacing.md },
  card: {
    backgroundColor: colors.surfaceLight,
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
    width: 160,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: { fontSize: font.size.lg, fontWeight: font.weight.semibold, color: colors.text, marginTop: spacing.sm },
  cardText: { fontSize: font.size.sm, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xs },

  badge: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
    zIndex: 10,
  },
  badgeInner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dotWrap: {
    width: 10,
    height: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  glow: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  badgeLabel: {
    fontSize: font.size.sm,
    fontWeight: font.weight.semibold,
  },
  latency: {
    fontSize: font.size.xs,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
});
