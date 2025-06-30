import { React, useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import logo from '../assets/dumbell.jpg';
import { Box } from '@mui/material';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loginStatus === 'true');
  }, []);

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems="center"
      px={{ xs: '10px', sm: '20px', md: '40px' }}
      py={{ xs: '10px', sm: '20px' }}
      spacing={{ xs: 2, sm: 0 }}
    >
      {/* Logo */}
      <Link to="/">
        <Box
          component="img"
          src={logo}
          alt="logo"
          sx={{
            width: { xs: '50px', sm: '70px', md: '90px', lg: '100px' },
            height: { xs: '50px', sm: '70px', md: '90px', lg: '100px' },
            borderRadius: '50%',
          }}
        />
      </Link>

      {/* Navigation Links */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        gap={{ xs: '10px', sm: '40px' }}
        alignItems="center"
      >
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: '#3A1212',
            borderBottom: '3px solid #FF2625',
            fontSize: 'clamp(18px, 2.2vw, 28px)',
            fontWeight: 'bold',
          }}
        >
          Home
        </Link>
        <a
          href="#exercises"
          style={{
            textDecoration: 'none',
            color: '#3A1212',
            fontSize: 'clamp(18px, 2.2vw, 28px)',
            fontWeight: 'bold',
          }}
        >
          Exercises
        </a>
      </Stack>

      {/* Buttons */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        gap={{ xs: '10px', sm: '20px' }}
        alignItems="center"
      >
        <Link to="/workout">
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#FF2625',
              color: '#fff',
              textTransform: 'none',
              px: { xs: '16px', sm: '24px', md: '28px' },
              py: { xs: '8px', md: '10px' },
              fontSize: { xs: '14px', sm: '16px', md: '18px' },
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            WorkoutPlan
          </Button>
        </Link>

        {!isLoggedIn && (
          <Link to="/login">
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#FF2625',
                color: '#fff',
                textTransform: 'none',
                px: { xs: '16px', sm: '24px', md: '28px' },
                py: { xs: '8px', md: '10px' },
                fontSize: { xs: '14px', sm: '16px', md: '18px' },
               
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              Login
            </Button>
          </Link>
        )}
      </Stack>
    </Stack>
  );
};

export default Navbar;
