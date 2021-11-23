const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
    theme: {
        boxShadow: {
            default:
                "1px 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .6)",
            md:
                "2px 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .6)",
            lg:
                "4px 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .5)",
            xl:
                "8px 20px 25px -5px rgba(0, 0, 0, .1), 0 10px 10px -5px rgba(0, 0, 0, .04)",
            "2xl": "0 15px 50px -12px rgba(0, 0, 0, .45)"
        },
        rotate: {
            "45": "45deg"
        },
        container: {
            center: true
        },
        extend: {
            colors: {
                blue: "#3196BE",
                agua: "#00ffae"
            },
            screens: {
                sm: { max: "639px" },
                // => @media (max-width: 639px) { ... }

                md: { max: "767px" },
                // => @media (max-width: 767px) { ... }
                lg: { max: "1023px" },
                // => @media (max-width: 1023px) { ... }

                xl: { max: "1279px" }
                // => @media (max-width: 1279px) { ... }
            }
        },
        gradients: theme => ({
            // Array definition (defaults to linear gradients).
            topaz: [
                "30deg",
                theme("colors.orange.500"),
                theme("colors.pink.400")
            ],
            "topaz-dark": [
                "30deg",
                theme("colors.orange.700"),
                theme("colors.pink.600")
            ],
            emerald: [
                "to right",
                theme("colors.green.400"),
                theme("colors.teal.500")
            ],
            cyan: ["30deg", "#3196BE", "#2FA6AE"],
            whiteFade: [
                "-30deg",
                "rgba(255,255,255,0)",
                "rgba(255,255,255,0.87)",
                "rgba(255,255,255,1)"
            ],
            fireopal: ["to right", "#40E0D0", "#FF8C00", "#FF0080"],
            relay: ["to top left", "#3A1C71", "#D76D77", "#FFAF7B"],
            grayWhite: ["30deg", "#bbbbbb", "#ffffff"],
            // Object definition.
            "mono-circle": {
                type: "radial",
                colors: ["circle", "#CCC", "#000"]
            }
        })
    },
    purge: false,
    variants: {
        gradients: ["responsive", "hover"],
        boxShadow: ["hover"]
    },
    plugins: [require("tailwindcss-plugins/gradients")]
};
