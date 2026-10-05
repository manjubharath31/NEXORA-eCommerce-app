// /**
//  * Learn more about light and dark modes:
//  * https://docs.expo.dev/guides/color-schemes/
//  */

// import { Colors } from '@/constants/theme';
// import { useResolvedScheme } from '@/hooks/use-color-scheme';
// // import { useThemeStore } from '@/store/themeStore';


// export function useTheme() {
//   // const scheme = useColorScheme();
//   // const theme = scheme === 'unspecified' ? 'light' : scheme;
//   // const mode = useThemeStore((s)=> s.mode);

//   // const resolved =
//   // mode === 'system'
//   //   ? scheme === 'unspecified'
//   //     ? 'light'
//   //     : scheme
//   //   : mode;


//   return Colors[useResolvedScheme()];
// }

import { Colors } from '@/constants/theme';
import { useResolvedScheme } from '@/hooks/use-color-scheme';

export function useTheme() {
  return Colors[useResolvedScheme()];
}


