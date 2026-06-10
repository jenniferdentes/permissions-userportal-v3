import { createTheme } from '@mui/material/styles';

const portalTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'class' },

  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },

  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        primary: { main: '#3a3e75', dark: '#272a4a', light: '#6a6faf', contrastText: '#ffffff' },
        secondary: { main: '#323767', dark: '#e8e9f2', light: '#f7f8fc', contrastText: '#ffffff' },
        error:   { main: '#de5243', dark: '#c83e2e', light: '#fcf4f2', contrastText: '#ffffff' },
        warning: { main: '#ef6c00', dark: '#e65100', light: '#ff9800', contrastText: '#ffffff' },
        info:    { main: '#0288d1', dark: '#01579b', light: '#03a9f4', contrastText: '#ffffff' },
        success: { main: '#16b364', dark: '#084c2e', light: '#d3f8df', contrastText: '#ffffff' },
        text:       { primary: '#202938', secondary: '#616a7e', disabled: '#9aa2b2' },
        background: { default: '#ffffff', paper: '#fcfbfd' },
        divider: '#eaecf0',
        action: {
          active: '#667085',
          hover: 'rgba(0,0,0,0.04)',
          selected: 'rgba(0,0,0,0.08)',
          disabled: 'rgba(0,0,0,0.38)',
          disabledBackground: 'rgba(0,0,0,0.12)',
          focus: 'rgba(0,0,0,0.12)',
        },
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        primary: { main: '#3c91ff', dark: '#3365af', light: '#f7f8fc', contrastText: '#f7f8fc' },
        secondary: { main: '#e8e9f2', dark: '#f7f8fc', light: '#f7f8fc', contrastText: 'rgba(0,0,0,0.87)' },
        error:   { main: '#de5243', dark: '#e8786c', light: '#f0a69e', contrastText: '#ffffff' },
        warning: { main: '#ffa726', dark: '#f57c00', light: '#ffb74d', contrastText: 'rgba(0,0,0,0.87)' },
        info:    { main: '#29b6f6', dark: '#0288d1', light: '#4fc3f7', contrastText: 'rgba(0,0,0,0.87)' },
        success: { main: '#3ccb7f', dark: '#087443', light: '#73e2a3', contrastText: 'rgba(0,0,0,0.87)' },
        text:       { primary: '#f2f4f7', secondary: '#dae1ef', disabled: '#98a1b2' },
        background: { default: '#222629', paper: '#2e3234' },
        divider: '#313538',
        action: {
          active: '#d0d5dd',
          hover: 'rgba(255,255,255,0.08)',
          selected: 'rgba(255,255,255,0.16)',
          disabled: 'rgba(255,255,255,0.38)',
          disabledBackground: 'rgba(255,255,255,0.12)',
          focus: 'rgba(255,255,255,0.12)',
        },
      },
    },
  },

  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',
    fontSize: 14,
    fontWeightLight: 300, fontWeightRegular: 400, fontWeightMedium: 500, fontWeightBold: 600,
    h1: { fontSize: '2rem',     fontWeight: 600, lineHeight: 1.2 },
    h2: { fontSize: '1.5rem',   fontWeight: 600, lineHeight: 1.3 },
    h3: { fontSize: '1.25rem',  fontWeight: 600, lineHeight: 1.4 },
    h4: { fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.4 },
    h5: { fontSize: '1rem',     fontWeight: 500, lineHeight: 1.5 },
    h6: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.5 },
    body1:    { fontSize: '0.875rem',  lineHeight: 1.6 },
    body2:    { fontSize: '0.8125rem', lineHeight: 1.6 },
    caption:  { fontSize: '0.75rem',   lineHeight: 1.5 },
    overline: { fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' },
    subtitle1: { fontSize: '1rem',      fontWeight: 600, lineHeight: 1.75, letterSpacing: '0.15px' },
    subtitle2: { fontSize: '0.875rem',  fontWeight: 600, lineHeight: 1.57, letterSpacing: '0.1px' },
  },

  shape: { borderRadius: 8 },

  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        ':root': {
          '--portal-elevation-1':                   '#f7f8fc',
          '--portal-bg-strong':                     '#f0f2f9',
          '--portal-icon-base':                     '#667085',
          '--portal-icon-strong':                   '#1d2939',
          '--portal-icon-subtle':                   '#98a1b2',
          '--portal-divider-dark':                  '#d0d5dd',
          '--portal-ai-bg':                         '#7582eb',
          '--portal-ai-text':                       '#ffffff',
          '--portal-bg-alpha-85':                   'rgba(255,255,255,0.847)',
          '--portal-bg-alpha-70':                   'rgba(255,255,255,0.698)',
          '--portal-primary-text-outline':          '#333764',
          '--portal-primary-states-hover':          'rgba(50,55,103,0.04)',
          '--portal-primary-states-selected':       'rgba(50,55,103,0.08)',
          '--portal-primary-states-focus':          'rgba(50,55,103,0.12)',
          '--portal-primary-states-focus-visible':  'rgba(50,55,103,0.298)',
          '--portal-primary-states-outlined-border':'rgba(50,55,103,0.298)',
          '--portal-secondary-outlined-border':     '#d0d3e8',
          '--portal-accent1':       '#e1d8f1',
          '--portal-accent2':       '#d2f7df',
          '--portal-accent3':       '#d8f1ff',
          '--portal-accent4':       '#fffbe0',
          '--portal-accent1-dark':  '#dd7b00',
          '--portal-accent1-light': '#f8e5cc',
          '--portal-accent2-dark':  '#e2333c',
          '--portal-accent2-light': '#f9d6d8',
          '--portal-accent3-dark':  '#ef0078',
          '--portal-accent3-light': '#fccce4',
          '--portal-accent4-dark':  '#d129a3',
          '--portal-accent4-light': '#f6d4ed',
          '--portal-accent5-dark':  '#6267e6',
          '--portal-accent5-light': '#e0e1fa',
          '--portal-accent6-dark':  '#0071ba',
          '--portal-accent6-light': '#cce3f1',
          '--portal-accent7-dark':  '#008491',
          '--portal-accent7-light': '#cce6e9',
          '--portal-accent8-dark':  '#73a200',
          '--portal-accent8-light': '#e3eccc',
          '--portal-accent9-dark':  '#9b58d6',
          '--portal-accent9-light': '#ebdef7',
          '--portal-accent10-dark': '#5e7b89',
          '--portal-accent10-light':'#dfe5e7',
          '--portal-color-new-blue':'#3c91ff',
        },
        '.dark': {
          '--portal-elevation-1':                   '#15191c',
          '--portal-bg-strong':                     '#0f1214',
          '--portal-icon-base':                     '#98a1b2',
          '--portal-icon-strong':                   '#eaecf0',
          '--portal-icon-subtle':                   '#667085',
          '--portal-divider-dark':                  '#475467',
          '--portal-bg-alpha-85':                   'rgba(34,38,41,0.847)',
          '--portal-bg-alpha-70':                   'rgba(34,38,41,0.698)',
          '--portal-primary-text-outline':          '#f7f8fc',
          '--portal-primary-states-hover':          'rgba(51,101,175,0.08)',
          '--portal-primary-states-selected':       'rgba(51,101,175,0.157)',
          '--portal-primary-states-focus':          'rgba(51,101,175,0.118)',
          '--portal-primary-states-focus-visible':  'rgba(51,101,175,0.298)',
          '--portal-primary-states-outlined-border':'#5a5d5f',
          '--portal-secondary-outlined-border':     '#5a5d5f',
        },
        '*::-webkit-scrollbar': { width: '6px', height: '6px' },
        '*::-webkit-scrollbar-track': { background: 'transparent' },
        '*::-webkit-scrollbar-thumb': {
          background: theme.palette.mode === 'dark' ? '#616161' : '#eeeeee',
          borderRadius: '3px',
          '&:hover': { background: theme.palette.mode === 'dark' ? '#757575' : '#d0d5dd' },
        },
      }),
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 500, boxShadow: 'none', '&:hover': { boxShadow: 'none' } },
      },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: 'none',
          backgroundColor: '#fcfbfd',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: 'none',
          ...theme.applyStyles('dark', { backgroundColor: '#2e3234' }),
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: ({ theme }) => ({
          borderColor: '#d0d5dd',
          ...theme.applyStyles('dark', { borderColor: 'rgba(255,255,255,0.227)' }),
        }),
        root: ({ theme }) => ({
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#667085',
            ...theme.applyStyles('dark', { borderColor: '#ffffff' }),
          },
        }),
      },
    },
    MuiTooltip: {
      styleOverrides: { tooltip: { backgroundColor: 'rgba(97,97,97,0.9)', fontSize: '0.75rem' } },
    },
  },
});

export default portalTheme;
