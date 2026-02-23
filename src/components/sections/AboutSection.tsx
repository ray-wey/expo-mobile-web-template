import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, font, radius } from '../../theme';

export default function AboutSection() {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name="information-circle-outline" size={48} color={colors.primary} />
      </View>
      <Text style={styles.title}>About</Text>
      <Text style={styles.body}>
        This template demonstrates a cross-platform shell that adapts its navigation to the
        current platform — a horizontal menu on web and a native app bar on mobile — while
        sharing the same content and animation system.
      </Text>
      <View style={styles.techRow}>
        {['Expo Router', 'Reanimated', 'TypeScript'].map((t) => (
          <View key={t} style={styles.badge}>
            <Text style={styles.badgeText}>{t}</Text>
          </View>
        ))}
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
  title: { fontSize: font.size.xxl, fontWeight: font.weight.bold, color: colors.text, marginBottom: spacing.md },
  body: { fontSize: font.size.md, color: colors.textSecondary, textAlign: 'center', maxWidth: 480, lineHeight: 24, marginBottom: spacing.xl },
  techRow: { flexDirection: 'row', gap: spacing.sm },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  badgeText: { fontSize: font.size.sm, fontWeight: font.weight.semibold, color: colors.white },
});
