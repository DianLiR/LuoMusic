module.exports = {
  // purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.2rem',
      tiny_1l: '.3rem',
      tiny_2l: '.4rem',
      qs: '.45rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem'
    },
    backgroundPosition: {
      'top-5': '50%'
    },
    animation: {
      none: 'none',
      spin: 'spin 1s linear infinite',
      ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;',
      'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;',
      'spin-slow': 'spin 8s linear infinite'
    }
  },
  enabled: true,
  variants: {
    extend: {}
  },
  plugins: []
  // important: true
}
