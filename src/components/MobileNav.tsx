import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { colors, spacing, font, radius } from '../theme';
import type { SectionKey } from './WebHeader';

const TABS: { key: SectionKey; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'home', label: 'Home', icon: 'home-outline' },
  { key: 'about', label: 'About', icon: 'information-circle-outline' },
  { key: 'contact', label: 'Contact', icon: 'chatbubble-outline' },
];

interface Props {
  active: SectionKey;
  onSelect: (key: SectionKey) => void;
}

function Tab({ tab, isActive, onPress }: { tab: typeof TABS[number]; isActive: boolean; onPress: () => void }) {
  const iconColor = useAnimatedStyle(() => ({
    opacity: withTiming(isActive ? 1 : 0.5, { duration: 200, easing: Easing.out(Easing.cubic) }),
  }));

  return (
    <Pressable onPress={onPress} style={styles.tab} hitSlop={8}>
      <Animated.View style={iconColor}>
        <Ionicons name={tab.icon} size={22} color={isActive ? colors.primary : colors.textSecondary} />
      </Animated.View>
      <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
    </Pressable>
  );
}

export default function MobileNav({ active, onSelect }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
      <View style={styles.bar}>
        {TABS.map((tab) => (
          <Tab key={tab.key} tab={tab} isActive={active === tab.key} onPress={() => onSelect(tab.key)} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: spacing.sm + 4,
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  tab: {
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: spacing.md,
  },
  tabLabel: {
    fontSize: font.size.xs,
    color: colors.textSecondary,
    fontWeight: font.weight.medium,
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: font.weight.semibold,
  },
});
