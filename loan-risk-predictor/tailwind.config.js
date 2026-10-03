export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {
    fontFamily: { sans: ["Manrope", "Inter", "system-ui", "sans-serif"] },
    colors: { bg: "#0D0F12", surface: "#171A1F", surface2: "#20242A", field: "#191C21",
      muted: "#9CA3AF", accent: "#8B93E8", good: "#7FC8A0", bad: "#E8856F" },
  } },
  plugins: [],
};
