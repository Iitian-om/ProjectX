/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Industrial Dusk Palette
        background: '#1C1F24', // Charcoal-steel base
        surface: '#2A2F35',    // Slightly lighter panel color
        accent: '#C7A76C',     // Brass-gold accent
        border: '#3E4651',     // Graphite border
        highlight: '#3E4651',  // Graphite highlight
        textPrimary: '#EAEAEA', // Main readable text
        textSecondary: '#9FA6B2', // Muted text for subheads
        danger: '#FF6B6B',     // Subtle alert red
        highPriority: '#FF0000', // Bright red for high-priority items
        success: '#5DBB63',    // Calm green tone
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif', 'Apple Color Emoji', 'Roboto', 'Segoe UI Emoji', 'Segoe UI Symbol'],
      },
    },
  },
  plugins: [],
};
