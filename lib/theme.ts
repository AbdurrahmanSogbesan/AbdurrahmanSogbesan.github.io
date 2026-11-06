// Shared between the pre-paint bootstrap script (app/layout.tsx) and hooks/useTheme.ts.
export const THEME_STORAGE_KEY = 'as-theme';

// Runs in <head> before first paint: stored choice ('dark' | 'light'), else prefers-color-scheme.
export const themeBootstrapScript = `(function(){var d=null;try{var v=localStorage.getItem('${THEME_STORAGE_KEY}');if(v==='dark'||v==='light')d=v==='dark'}catch(e){}if(d===null){try{d=matchMedia('(prefers-color-scheme: dark)').matches}catch(e){d=false}}if(d)document.documentElement.classList.add('dark')})()`;
