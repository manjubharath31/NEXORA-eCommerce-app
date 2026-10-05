// import { useEffect, useState } from 'react';
// import { useColorScheme as useRNColorScheme } from 'react-native';
// import { Colors } from '@/constants/theme';
// import { useThemeStore } from '@/store/themeStore';


// /**
//  * To support static rendering, this value needs to be re-calculated on the client side for web
//  */
// export function useColorScheme() {
//   const [hasHydrated, setHasHydrated] = useState(false);

//   useEffect(() => {
//     setHasHydrated(true);
//   }, []);

//   const colorScheme = useRNColorScheme();

//   if (hasHydrated) {
//     return colorScheme;
//   }

//   return 'light';
// }
import { Colors } from '@/constants/theme';
import { useThemeStore } from '@/store/themeStore';
import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

type Scheme = keyof typeof Colors;

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useResolvedScheme(): Scheme {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const scheme = useRNColorScheme();
  const mode = useThemeStore((s) => s.mode);

  if (!hasHydrated) {
    return 'light';
  }

  return mode === 'system' ? (scheme === 'unspecified' ? 'light' : (scheme ?? 'light')) : mode;
}
