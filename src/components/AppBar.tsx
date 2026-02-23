import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors, spacing, font } from '../theme';
import type { SectionKey } from './WebHeader';

const SECTION_TITLES: Record<SectionKey, string> = {
  home: 'Home',
  about: 'About',
  contact: 'Contact',
};

const SECTIONS: SectionKey[] = ['home', 'about', 'contact'];

interface Props {
  active: SectionKey;
  onSelect: (key: SectionKey) => void;
}

export default function AppBar({ active, onSelect }: Props) {
  const insets = useSafeAreaInsets();

  const currentIndex = SECTIONS.indexOf(active);
  const canGoBack = currentIndex > 0;

  const handleBack = () => {
    if (canGoBack) onSelect(SECTIONS[currentIndex - 1]);
  };

  const handleNext = () => {
    if (currentIndex < SECTIONS.length - 1) onSelect(SECTIONS[currentIndex + 1]);
  };

  const titleStyle = useAnimatedStyle(() => ({
    opacity: withTiming(1, { duration: 200, easing: Easing.out(Easing.cubic) }),
  }));

  return (
    <View style={[styles.bar, { paddingTop: insets.top + spacing.sm }]}>
      <Pressable onPress={handleBack} style={styles.action} hitSlop={12}>
        {canGoBack ? (
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        ) : (
          <View style={{ width: 24 }} />
        )}
      </Pressable>

      <Animated.Text style={[styles.title, titleStyle]} key={active}>
        {SECTION_TITLES[active]}
      </Animated.Text>

      <Pressable onPress={handleNext} style={styles.action} hitSlop={12}>
        {currentIndex < SECTIONS.length - 1 ? (
          <Ionicons name="chevron-forward" size={24} color={colors.text} />
        ) : (
          <View style={{ width: 24 }} />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  action: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: font.size.lg,
    fontWeight: font.weight.semibold,
    color: colors.text,
  },
});
