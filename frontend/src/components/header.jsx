import React from 'react';
import { Header, Container, Text, Avatar, Badge } from '@mantine/core';
import { AiOutlineUser } from 'react-icons/ai';
import PumaFontReg from '../assets/fonts/FFDINforPUMA-Regular.ttf';
import PumaLogo from '../assets/PUMA_Logo_Cat_with-Registration.svg';

const MyHeader = () => {
  const [isProfileOpen, setProfileOpen] = React.useState(false);

  const handleProfileClick = () => {
    setProfileOpen(!isProfileOpen);
  };

  const headerStyle = {
    backgroundColor: '#006341',
    borderBottom: '1px solid #e5e5e5',
    padding: '1rem', // Use relative units like 'rem'
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '1rem',
    marginRight: '1rem',
  };

  const logoStyle = {
    width: '8%',
    height: '8%',
    marginLeft: '-0.625rem', // Use negative margin to adjust positioning
    paddingRight: '0.75rem', // Use relative units like 'rem'
  };

  const textStyle = {
    marginRight: '1rem',
    color: '#d3d3d3',
    fontSize: '1.25rem', // Use relative units like 'rem'
  };

  const badgeStyle = {
    color: 'white',
    backgroundColor: 'maroon',
    variant: 'dark',
  };

  const avatarStyle = {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    color: '#333',
    cursor: 'pointer',
    fontSize: '1.625rem', // Use relative units like 'rem'
  };

  const userNameStyle = {
    marginLeft: '0.625rem', // Use relative units like 'rem'
    cursor: 'pointer',
    color: '#d3d3d3',
    fontSize: '1rem', // Use relative units like 'rem'
  };

  return (
    <Header style={headerStyle}>
      <Container size="lg" style={containerStyle}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={PumaLogo} style={logoStyle} alt="Puma Logo" />
          <Text size="xl" style={textStyle}>
            PUMA SEA E-Commerce Analytics
          </Text>
          <Badge style={badgeStyle}>Singapore</Badge>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', background: 'none' }}>
          <Avatar size="sm" alt="User Avatar" style={avatarStyle} onClick={handleProfileClick}>
            <AiOutlineUser />
          </Avatar>
          <Text size="l" style={userNameStyle} onClick={handleProfileClick}>
            John Doe
          </Text>
        </div>
      </Container>

      {isProfileOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: '1rem', // Use relative units like 'rem'
            backgroundColor: '#fff',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            padding: '0.625rem', // Use relative units like 'rem'
            zIndex: 10,
          }}
        >
          {/* Profile content */}
          <Text size="sm">Profile Content</Text>
        </div>
      )}
    </Header>
  );
};

export default MyHeader;
