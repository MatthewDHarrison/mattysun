import React, { useState } from "react";
import { Box, Collapse, IconButton, Link } from "@mui/material";
import { Scene } from "../components/SunClouds";
import {
  Instagram,
  Email,
  Apple,
  GraphicEq,
  MusicNote,
} from "@mui/icons-material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { TwoPMScene } from "../components/TwoPMScene";

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
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };
  return (
    <>
      <Box
        height={"100vh"}
        width="100vw"
        position="relative"
        display="flex"
        alignItems="end"
        justifyContent="center"
      >
        <Box zIndex={1} position="absolute" height="100vh" width="100%">
          <TwoPMScene width={width} />
        </Box>
        <Box
          zIndex={3}
          textAlign="center"
          display="flex"
          flexDirection="column"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <IconButton onClick={handleToggle} sx={{ color: "#fff" }}>
              {expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
            <Box
              display="flex"
              backgroundColor={"#000000aa"}
              sx={{ p: 2, pb: width < 800 ? 10 : 1 }}
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap={2}
            >
              <Box display="inline-flex">
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
                          color="#ff0000ff"
                          key={link.name}
                          href={link.href}
                          underline="hover"
                          sx={{ display: "block" }}
                          className="sixtyfour-red"
                        >
                          {link.name}
                        </Link>
                      )}
                    </Box>

                    {index < LINKS.length - 1 && (
                      <Box height="100%" sx={{ width: "2px", mx: 3 }} />
                    )}
                  </Box>
                ))}
              </Box>

              <Box width="100%">
                <Collapse in={expanded} timeout="auto">
                  <iframe
                    data-testid="embed-iframe"
                    src="https://open.spotify.com/embed/track/5UjGGvOWnGhIr6ACu6jLx1?utm_source=generator"
                    width="100%"
                    height="120"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                </Collapse>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
