module.exports = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}", "./src/hooks/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#3FBB97",
                "secondary": "#245F40",
                "secondary-light": "#1B755E",
                "primary-gray": "#656369",
                "secondary-gray": "#A8A3AD",
                "primary-light": "#F5F0FB",
                "second-light": "#EEE2F6",
                "tertiary": "#F7784D",
                "tertiary-light": "#f7784d71",
                "primary-light": "#EFE8F8",
                "dark-color": "#3A3F42",
                "red-color": "#D24545"
            },
            screens: {
                "xs": "420px"
            },
            animation: {
                "gradient-x": "gradientX 10s ease infinite",
                "gradient-y": "gradientY 10s ease infinite",
                "gradient-xy": "gradientXY 10s ease infinite",
                "fade-down": "fadeDown 1s ease-in-out",
                "fade-down-fast": "fadeDown 0.5s ease-in-out",
                "fade-up-fast": "fadeUp 0.5s ease-in-out",
                "fade-up": "fadeUp 1s ease-in-out",
                "fade-left": "fadeLeft 1s",
                "fade-right": "fadeRight 1s",
                "fade-in": "fadeIn 3s",
                "fade-out": "fadeOut 3s",
                "fade-in-fast": "fadeIn 1s",
                "fade-in-slow": "fadeIn 5s",
                "ping-one": "ping 1s cubic-bezier(0, 0, 0.2, 1)",
                "border-pulse": "neonBlink 2s ease-in-out infinite alternate"
            },
            backgroundImage: {
                login: "url(/login.jpeg)"
            },
            width: {
                login: "466px",
                "30": "120px",
                "39.5": "158px",
                "51.5": "206px"
            },
            margin: {
                "4.5": "18px",
                "7.5": "30px",
            },
            height: {
                "0.25": "1px",
                "22": "88px",
                "30": "120px",
                "34.5": "138px",
                "108.5": "434px",
                "0.5/10": "95%",
                "1/10": "90%"
            },
            borderRadius: {
                "2sm": "4px",
                "2.5xl": "20px"
            },
            boxShadow: {
                "3xl": "0px 4px 4px rgba(0, 0, 0, 0.35)",
                neon: [
                    '0 0 5px #31d0a3',
                    '0 0 10px #31d0a3',
                    '0 0 20px #31d0a3',
                    '0 0 30px #079640',
                    '0 0 40px #079640',
                ].join(', '),
                neonDim: [
                    '0 0 2px #31d0a3',
                    '0 0 4px #31d0a3',
                    '0 0 8px #31d0a3',
                    '0 0 15px #079640',
                ].join(', '),
            },
            fontSize: {
                "1.5xl": "22px"
            },
            keyframes: {
                gradientY: {
                    "0%, 100%": {
                        "background-size": "400% 400%",
                        "background-position": "center top",
                    },
                    "50%": {
                        "background-size": "200% 200%",
                        "background-position": "center center",
                    },
                },
                gradientX: {
                    "0%, 100%": {
                        "background-size": "200% 200%",
                        "background-position": "left center",
                    },
                    "50%": {
                        "background-size": "200% 200%",
                        "background-position": "right center",
                    },
                },
                gradientXY: {
                    "0%, 100%": {
                        "background-size": "400% 400%",
                        "background-position": "left center",
                    },
                    "50%": {
                        "background-size": "200% 200%",
                        "background-position": "right center",
                    },
                },
                fadeDown: {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(-25%)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                fadeUp: {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(25%)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                fadeLeft: {
                    "0%": {
                        opacity: "0",
                        transform: "translateX(-25%)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateX(0)",
                    },
                },
                fadeRight: {
                    "0%": {
                        opacity: "0",
                        transform: "translateX(25%)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateX(0)",
                    },
                },
                fadeIn: {
                    "0%": {
                        opacity: "0",
                    },
                    "100%": {
                        opacity: "1",
                    },
                },
                fadeOut: {
                    "0%": {
                        opacity: "1",
                    },
                    "100%": {
                        opacity: "0",
                    },
                },
                neonBlink: {
                    '0%': {
                        boxShadow: [
                            '0 0 2px #31d0a3',
                            '0 0 4px #31d0a3',
                            '0 0 8px #31d0a3',
                            '0 0 15px #079640',
                        ].join(', '),
                    },
                    '100%': {
                        boxShadow: [
                            '0 0 5px #31d0a3',
                            '0 0 10px #31d0a3',
                            '0 0 20px #31d0a3',
                            '0 0 30px #079640',
                            '0 0 40px #079640',
                        ].join(', '),
                    },
                },
            },
        },
    },
    plugins: [],
};