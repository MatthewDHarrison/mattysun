import { Box, Container, Link, responsiveFontSizes, Typography } from '@mui/material'
import { SunClouds } from '../components/SunClouds'

const LINKS = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/matty_sun/'
  },
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/artist/5NkTV3veGmA5fN7wEWG0sE?si=3E7njdDjTp2L707CxmqS7A'
  },
  {
    name: 'Apple Music',
    href: 'https://music.apple.com/au/artist/matty-sun/1454097545'
  }
]
export const HomePage = () => {
  return (<>
    <Box height="100vh" position="relative" display="flex" alignItems="end" justifyContent="center">
      <Box position="absolute" height="100vh" width="100vw" >

        <SunClouds />
      </Box>
      <Box display="inline-flex" sx={{ mb: 3 }}>
        {LINKS.map((link, index) => (
          <Box display="inline-flex">
            <Link color="white" key={link.name} href={link.href} underline="hover" sx={{ display: 'block' }}>
              {link.name}
            </Link>
            {index < LINKS.length - 1 && <Box height="100%" sx={{ width: '2px', mx: 3, bgcolor: 'white' }} />}
          </Box>
        ))}
      </Box>
    </Box>
  </>
  )
}
