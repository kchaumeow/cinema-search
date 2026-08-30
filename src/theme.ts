import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  ink: {
    bg: "#0e0e10",
    surface: "#151518",
    raised: "#1c1c21",
    border: "#26262b",
    borderHover: "#3a3a42",
    text: "#ededf0",
    muted: "#8a8a94",
  },
  brand: {
    50: "#eeeefb",
    100: "#d9d9f6",
    200: "#b8b7ee",
    300: "#9392e4",
    400: "#7472db",
    500: "#5b5bd6",
    600: "#4a49bd",
    700: "#3b3a97",
    800: "#2d2d73",
    900: "#212052",
  },
};

const fonts = {
  heading: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
  body: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
};

// Inputs, selects and the autocomplete field all need to read as the same
// control, so they share one style rather than repeating props per usage.
const field = {
  bg: "ink.surface",
  color: "ink.text",
  borderWidth: "1px",
  borderColor: "ink.border",
  borderRadius: "lg",
  _hover: { borderColor: "ink.borderHover" },
  _focusVisible: { borderColor: "brand.400", boxShadow: "none" },
  _placeholder: { color: "ink.muted" },
};

export const theme = extendTheme({
  config,
  colors,
  fonts,
  styles: {
    global: {
      body: { bg: "ink.bg", color: "ink.text" },
    },
  },
  components: {
    Heading: {
      baseStyle: { fontWeight: 600, letterSpacing: "-0.02em" },
    },
    Button: {
      baseStyle: { fontWeight: 500, borderRadius: "lg" },
      defaultProps: { colorScheme: "brand" },
      variants: {
        ghost: {
          color: "ink.muted",
          _hover: { bg: "ink.raised", color: "ink.text" },
          _active: { bg: "ink.raised" },
        },
        outline: {
          color: "ink.text",
          borderColor: "ink.border",
          _hover: { bg: "ink.raised", borderColor: "ink.borderHover" },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: "ink.surface",
          borderWidth: "1px",
          borderColor: "ink.border",
          borderRadius: "xl",
          boxShadow: "none",
        },
      },
    },
    Input: {
      variants: { outline: { field } },
      defaultProps: { variant: "outline" },
    },
    Select: {
      variants: { outline: { field, icon: { color: "ink.muted" } } },
      defaultProps: { variant: "outline" },
    },
    Modal: {
      baseStyle: {
        dialog: {
          bg: "ink.surface",
          borderWidth: "1px",
          borderColor: "ink.border",
          borderRadius: "xl",
        },
        overlay: { bg: "blackAlpha.700", backdropFilter: "blur(4px)" },
        closeButton: { color: "ink.muted" },
      },
    },
    Table: {
      variants: {
        simple: {
          th: {
            color: "ink.muted",
            borderColor: "ink.border",
            fontWeight: 500,
            letterSpacing: "0.04em",
          },
          td: { color: "ink.text", borderColor: "ink.border" },
        },
      },
    },
    FormLabel: {
      baseStyle: { color: "ink.muted", fontSize: "sm", fontWeight: 500 },
    },
  },
});
