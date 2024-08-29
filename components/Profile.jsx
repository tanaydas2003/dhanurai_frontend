'use client';
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Drawer, List, ListItem, ListItemText, Divider, Box, TextField, Button, Grid, Hidden, MenuItem, LinearProgress } from '@mui/material';
import { PhotoCamera, Menu as MenuIcon } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;

export default function ProfilePage() {
  const [profilePic, setProfilePic] = useState(''); // Empty avatar initially
  const [mobileOpen, setMobileOpen] = useState(false); // For controlling mobile drawer
  const [userType, setUserType] = useState(''); // Empty user type initially
  const [dob, setDob] = useState(''); // Empty date of birth
  const [adminName, setAdminName] = useState(''); // Empty admin name
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    city: '',
    stateCounty: '',
    postcode: '',
    country: '',
    bio: '', // Adding bio field
  });
  const [points, setPoints] = useState(120); // Example points balance
  const [level, setLevel] = useState(3); // Example current level
  const [levelProgress, setLevelProgress] = useState(60); // Example level progress in percentage

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Function to handle profile picture upload
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  // Function to handle drawer toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const drawerContent = (
    <Box>
      {/* Profile Section */}
      <List>
        <ListItem>
          <Avatar sx={{ width: 100, height: 100 }} src={profilePic || '/static/images/avatar-placeholder.png'} /> {/* Placeholder if no image */}
        </ListItem>
        <ListItem>
          <ListItemText primary={formData.firstName + ' ' + formData.lastName} secondary={userType === 'organization' ? 'Organization' : 'Individual'} />
        </ListItem>
        <Divider />

        {/* Personal Information Section */}
        <ListItem>
          <Typography variant="body2">Bio: {formData.bio || 'No bio available'}</Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2">Email: {formData.email || 'Not provided'}</Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2">Phone: {formData.phoneNumber || 'Not provided'}</Typography>
        </ListItem>
        <Divider />

        {/* Points and Levels Section */}
        <ListItem>
          <Typography variant="body2">Points: {points}</Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2">Level: {level}</Typography>
        </ListItem>
        <ListItem>
          <LinearProgress variant="determinate" value={levelProgress} />
        </ListItem>
        <ListItem>
          <Button variant="contained" sx={{ mt: 1 }}>Redeem Points</Button>
        </ListItem>
        <Divider />

        {/* Achievements Section */}
        <ListItem>
          <Typography variant="body2">Achievements: No badges earned yet</Typography>
        </ListItem>
        <Divider />

        {/* Account Management Section */}
        <ListItem>
          <Typography variant="body2">Subscription: Free Plan</Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2">Renewal: N/A</Typography>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Security Settings" />
        </ListItem>
        <Divider />

        <ListItem button>
          <ListItemText primary="View Public Profile" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Responsive Sidebar */}
      <Hidden smDown>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          {drawerContent}
        </Drawer>
      </Hidden>

      {/* Mobile Drawer */}
      <Hidden smUp>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Hidden>

      {/* Top Navigation Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Profile
          </Typography>
          <IconButton color="inherit">
            <Avatar src={profilePic || '/static/images/avatar-placeholder.png'} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          mt: 8,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Typography variant="h5">Account Settings</Typography>

        {/* Profile Picture Upload */}
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar src={profilePic || '/static/images/avatar-placeholder.png'} sx={{ width: 150, height: 150, mx: 'auto' }} />
              <Button
                variant="contained"
                component="label"
                sx={{ mt: 2 }}
                startIcon={<PhotoCamera />}
              >
                Change Picture
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleProfilePicChange}
                />
              </Button>
            </Box>
          </Grid>

          {/* Form Fields */}
          <Grid item xs={12} sm={8}>
            <Box component="form" sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    variant="outlined"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    variant="outlined"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State/County"
                    variant="outlined"
                    name="stateCounty"
                    value={formData.stateCounty}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Postcode"
                    variant="outlined"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    variant="outlined"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  />
                </Grid>

                {/* New Fields */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="User Type"
                    variant="outlined"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <MenuItem value="individual">Individual</MenuItem>
                    <MenuItem value="organization">Organization</MenuItem>
                  </TextField>
                </Grid>

                {/* Conditional Admin Name Field */}
                {userType === 'organization' && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Admin Name"
                      variant="outlined"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                    />
                  </Grid>
                )}
              </Grid>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
              >
                Update
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
