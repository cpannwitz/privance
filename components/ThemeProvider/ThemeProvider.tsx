import {
  theme as baseTheme,
  Theme as BaseTheme,
  ChakraProvider,
  extendTheme,
  ThemeConfig,
  ThemeComponentProps,
} from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"

const config: ThemeConfig = {
  initialColorMode: "system",
}

export const theme = extendTheme(
  {
    config,
    components: {
      GeneralBadge: {
        baseStyle: (p: ThemeComponentProps<BaseTheme>) => ({
          boxSize: "1em",
          position: "absolute",
          right: "10%",
          bottom: "10%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          borderRadius: p.theme.radii.full,

          borderWidth: 1,
          borderStyle: "solid",
        }),
        variants: {
          default: (p: ThemeComponentProps<BaseTheme>) => ({
            borderColor: mode("white", "gray.800")(p),
            bgColor: mode("gray.400", "gray.500")(p),
          }),
        },
        // The default size and variant values
        defaultProps: {
          variant: "default",
        },
      },
      Dropzone: {
        baseStyle: (p: ThemeComponentProps<BaseTheme>) => ({
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: p.theme.space[4],
          borderRadius: p.theme.radii.md,
          borderWidth: 2,
          borderStyle: "dashed",
          outline: "none",
          transition: `all ${p.theme.transition.duration.normal} ${p.theme.transition.easing["ease-in-out"]}`,
          cursor: "pointer",
        }),
        variants: {
          default: (p: ThemeComponentProps<BaseTheme>) => ({
            borderColor: mode("gray.200", "gray.600")(p),
            bgColor: mode("gray.50", "gray.700")(p),
            _hover: {
              bgColor: mode("gray.100", "gray.900")(p),
            },
          }),
          active: (p: ThemeComponentProps<BaseTheme>) => ({
            borderColor: mode("blue.200", "blue.600")(p),
            bgColor: mode("blue.50", "blue.700")(p),
            _hover: {
              bgColor: mode("blue.100", "blue.900")(p),
            },
          }),
          accept: (p: ThemeComponentProps<BaseTheme>) => ({
            borderColor: mode("green.200", "green.600")(p),
            bgColor: mode("green.50", "green.700")(p),
            _hover: {
              bgColor: mode("green.100", "green.900")(p),
            },
          }),
          reject: (p: ThemeComponentProps<BaseTheme>) => ({
            borderColor: mode("red.200", "red.600")(p),
            bgColor: mode("red.50", "red.700")(p),
            _hover: {
              bgColor: mode("red.100", "red.900")(p),
            },
          }),
        },
        // The default size and variant values
        defaultProps: {
          variant: "default",
        },
      },
    },
  },
  baseTheme
)

interface ThemeProviderProps {
  children?: React.ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
export default ThemeProvider
