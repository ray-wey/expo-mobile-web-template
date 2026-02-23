import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, font, radius } from '../../theme';

export default function HomeSection() {
  return (
    <View style={styles.container}>
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
});
