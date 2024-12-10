import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppAppBar from '../../components/Blog/AppAppBar';
import MainContent from '../../components/Blog/MainContent';
import Latest from '../../components/Blog/Latest';
import Footer from '../../components/Blog/Footer';
import AppTheme from '../../components/Blog/AppTheme';

export default function Blog(props) {
  return (
    <>
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <MainContent />
        {/* <Latest /> */}
      </Container>
      <Footer />
    </AppTheme>
    </>
  );
}
