import { useColorScheme as useRNColorScheme } from 'react-native';
import { useThemeStore } from '@/store/themeStore';
import { Colors } from '@/constants/theme';

type Scheme = keyof typeof Colors;
export function useResolvedScheme() {
  const scheme = useRNColorScheme();
  const mode = useThemeStore((s) => s.mode);
  return mode === 'system' ? (scheme === 'unspecified' ? 'light' : scheme) : mode;
}
