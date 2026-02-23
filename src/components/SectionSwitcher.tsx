import { useRef, useEffect, useState, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import type { SectionKey } from './WebHeader';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';

const SECTIONS: SectionKey[] = ['home', 'about', 'contact'];
const COMPONENTS: Record<SectionKey, () => ReactNode> = {
  home: HomeSection,
  about: AboutSection,
  contact: ContactSection,
};

interface Props {
  active: SectionKey;
}

export default function SectionSwitcher({ active }: Props) {
  const SectionComponent = COMPONENTS[active];

  return (
    <View style={styles.wrapper}>
      <Animated.View
        key={active}
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(180)}
        style={styles.content}
      >
        <SectionComponent />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, overflow: 'hidden' },
  content: { flex: 1 },
});
