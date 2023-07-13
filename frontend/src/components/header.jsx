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

  const styles = `
  @font-face {
    font-family: 'PumaFontReg';
    src: url(${PumaFontReg}) format('truetype');
  }
`;
    const styleElement = document.createElement('style');
    styleElement.innerText = styles;
    document.head.appendChild(styleElement);

  return (
    <Header
      style={{
        backgroundColor: '#006341',
        borderBottom: '1px solid #e5e5e5',
        padding: '20px',
        marginLeft: '-20px',
        marginRight: '-20px',
        paddingLeft: '100px'

      }}
    >
      <Container
        size="lg"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={PumaLogo}  style={{ width: '8%', height: '8%' ,marginLeft: '-25px',paddingRight:'12px'}} />
          <Text size="xl" style={{ marginRight: '20px', color: '#d3d3d3 ' ,fontFamily: 'PumaFontReg' }}>
        PUMA SEA    E-Commerce Analytics
          </Text>
          <Badge color="pink" variant="light">
            Singapore
          </Badge>
        </div>
        <div style={{ display: 'flex', alignItems: 'center',background:'none'}}>
        <Avatar
            size="sm"
            alt="User Avatar"
            style={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
              color: '#333',
            }}
            onClick={handleProfileClick}
          >
            <AiOutlineUser style={{ fontSize: '26px' }} />
          </Avatar>
          <Text
            size="l"
            style={{ marginLeft: '10px', cursor: 'pointer', color: '#d3d3d3' }}
            onClick={handleProfileClick}
          >
            John Doe
          </Text>
        </div>
      </Container>

      {isProfileOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: '20px',
            backgroundColor: '#fff',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            padding: '10px',
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
