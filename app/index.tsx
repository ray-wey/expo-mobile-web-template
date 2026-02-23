import { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WebHeader from '../src/components/WebHeader';
import AppBar from '../src/components/AppBar';
import MobileNav from '../src/components/MobileNav';
import SectionSwitcher from '../src/components/SectionSwitcher';
import type { SectionKey } from '../src/components/WebHeader';
import { colors } from '../src/theme';

const isWeb = Platform.OS === 'web';

export default function ShellScreen() {
  const [active, setActive] = useState<SectionKey>('home');

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        {isWeb ? (
          <WebHeader active={active} onSelect={setActive} />
        ) : (
          <AppBar active={active} onSelect={setActive} />
        )}
        <SectionSwitcher active={active} />
        {!isWeb && <MobileNav active={active} onSelect={setActive} />}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
});
