import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import {
  CategoryOutlined,
  HomeOutlined,
  InventoryOutlined
} from '@mui/icons-material';
import { useState } from 'react';
import Inventory from './Inventory';
import { ListItemButton } from '@mui/material';
import Categories from './Categories';

const navStyles = {
  backgroundColor: '#1976d2',
  color: 'white',
  textDecoration: 'none',
  typography: 'h6'
};

const data = [
  { name: 'Home', component: <Admin />, icon: <HomeOutlined /> },
  { name: 'Categories', component: <Categories />, icon: <CategoryOutlined /> },
  { name: 'Inventory', component: <Inventory />, icon: <InventoryOutlined /> }
];

export default function Admin() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const handleComponentClick = (component: any) => {
    setSelectedComponent(component);
  };
  const getList = () => (
    <div style={{ width: 250 }}>
      {data.map((item, index) => (
        <ListItemButton
          key={index}
          onClick={() => handleComponentClick(item.component)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      ))}
    </div>
  );

  return (
    <div>
      <Drawer variant="permanent" open={true} anchor={'left'}>
        <Toolbar sx={navStyles}>Admin</Toolbar>
        <Divider />
        {getList()}
      </Drawer>
      {selectedComponent}
    </div>
  );
}
