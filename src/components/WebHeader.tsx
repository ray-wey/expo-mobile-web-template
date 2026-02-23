import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors, spacing, font, radius } from '../theme';

export type SectionKey = 'home' | 'about' | 'contact';

const MENU_ITEMS: { key: SectionKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About' },
  { key: 'contact', label: 'Contact' },
];

interface Props {
  active: SectionKey;
  onSelect: (key: SectionKey) => void;
}

function MenuItem({ item, isActive, onPress }: { item: typeof MENU_ITEMS[number]; isActive: boolean; onPress: () => void }) {
  const textStyle = useAnimatedStyle(() => ({
    color: withTiming(isActive ? colors.text : colors.textSecondary, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    }),
    opacity: withTiming(isActive ? 1 : 0.75, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    }),
  }));

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={styles.menuItem}>
        <Animated.Text style={[styles.menuText, isActive && styles.menuTextActive, textStyle]}>
          {item.label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

export default function WebHeader({ active, onSelect }: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>template</Text>
      <View style={styles.nav}>
        {MENU_ITEMS.map((item) => (
          <MenuItem
            key={item.key}
            item={item}
            isActive={active === item.key}
            onPress={() => onSelect(item.key)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logo: {
    fontSize: font.size.xl,
    fontWeight: font.weight.bold,
    color: colors.text,
    letterSpacing: -0.5,
  },
  nav: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  menuItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
  },
  menuText: {
    fontSize: font.size.md,
    fontWeight: font.weight.medium,
  },
  menuTextActive: {
    fontWeight: font.weight.semibold,
  },
});
