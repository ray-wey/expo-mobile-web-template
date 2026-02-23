import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, font, radius } from '../../theme';

const contactItems = [
  { icon: 'mail-outline' as const, label: 'hello@example.com' },
  { icon: 'logo-github' as const, label: 'github.com/example' },
  { icon: 'location-outline' as const, label: 'Istanbul, Turkey' },
];

export default function ContactSection() {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name="chatbubble-ellipses-outline" size={48} color={colors.primary} />
      </View>
      <Text style={styles.title}>Contact</Text>
      <Text style={styles.subtitle}>Get in touch — we would love to hear from you.</Text>

      <View style={styles.list}>
        {contactItems.map((item) => (
          <View key={item.label} style={styles.row}>
            <Ionicons name={item.icon} size={22} color={colors.accent} />
            <Text style={styles.rowText}>{item.label}</Text>
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
  title: { fontSize: font.size.xxl, fontWeight: font.weight.bold, color: colors.text, marginBottom: spacing.sm },
  subtitle: { fontSize: font.size.md, color: colors.textSecondary, textAlign: 'center', maxWidth: 400, marginBottom: spacing.xl },
  list: { gap: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 280,
  },
  rowText: { fontSize: font.size.md, color: colors.text },
});
