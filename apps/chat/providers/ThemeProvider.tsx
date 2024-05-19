// import useTheme, { ThemeContext } from '@/hooks/useTheme';
// import { ConfigProvider, theme } from 'antd';
// import locale from 'antd/locale/zh_CN';
// import 'dayjs/locale/zh-cn';
// import React from 'react';

// export interface ThemeProviderProps {
//   children: React.ReactNode;
// }

// export function ThemeProvider(props: ThemeProviderProps) {
//   const [value, toggleTheme] = useTheme();

//   return (
//     <ThemeContext.Provider value={{ theme: value, toggleTheme }}>
//       <ConfigProvider
//         locale={locale}
//         theme={{
//           algorithm:
//             value === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
//         }}
//       >
//         {props.children}
//       </ConfigProvider>
//     </ThemeContext.Provider>
//   );
// }
