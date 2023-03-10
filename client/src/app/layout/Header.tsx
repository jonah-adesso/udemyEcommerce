import { AppBar, Switch, Toolbar, Typography } from '@mui/material';

type Props = {
  darkMode: boolean;
  handleThemeChange: () => void;
};

const Header = ({ darkMode, handleThemeChange }: Props) => {
  const title = 'Set theme to:' + darkMode ? 'light' : 'dark';
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Switch checked={darkMode} title={title} onChange={handleThemeChange} />
        <Typography variant="h6">ECommerce Store</Typography>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
