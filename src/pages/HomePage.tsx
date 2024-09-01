import React from "react";
import { Box, CssBaseline, Link, ThemeProvider } from "@mui/material";
import { Scene } from "../components/SunClouds";
import {
  Instagram,
  Email,
  Apple,
  GraphicEq,
  MusicNote,
} from "@mui/icons-material";
import { theme } from "../Theme";

const LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/matty_sun/",
    icon: <Instagram />,
  },
  {
    name: "Spotify",
    href: "https://open.spotify.com/artist/5NkTV3veGmA5fN7wEWG0sE?si=3E7njdDjTp2L707CxmqS7A",
    icon: <GraphicEq />,
  },
  {
    name: "Apple Music",
    href: "https://music.apple.com/au/artist/matty-sun/1454097545",
    icon: <Apple />,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@matty_sunshine",
    icon: <MusicNote />,
  },
  {
    name: "Email",
    href: "mailto:matty@mattysun.com",
    icon: <Email />,
  },
];
export const HomePage = () => {
  const width = window.innerWidth;
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Box
          height={"100vh"}
          width="100vw"
          position="relative"
          display="flex"
          alignItems="end"
          justifyContent="center"
          padding={{ b: 3 }}
        >
          <Box zIndex={1} position="absolute" height="100vh" width="100%">
            <Scene width={width} />
          </Box>
          <Box
            zIndex={3}
            display="inline-flex"
            sx={{ mb: width < 800 ? 10 : 3 }}
          >
            {LINKS.map((link, index) => (
              <Box display="inline-flex" key={link.name}>
                <Box
                  display="inline-flex"
                  gap={1}
                  onClick={() => (window.location.href = link.href)}
                  justifyItems="center"
                >
                  {link.icon}

                  {width > 800 && (
                    <Link
                      color="#fff"
                      key={link.name}
                      href={link.href}
                      underline="hover"
                      sx={{ display: "block" }}
                    >
                      {link.name}
                    </Link>
                  )}
                </Box>

                {index < LINKS.length - 1 && (
                  <Box
                    height="100%"
                    sx={{ width: "2px", mx: 3, bgcolor: "#fff" }}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};
