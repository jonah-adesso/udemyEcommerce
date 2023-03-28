import useProducts from '../../app/hooks/useProducts';
import { useDispatch } from 'react-redux';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { SetStateAction, useEffect, useState } from 'react';
import agent from '../../app/api/agent';

export default function Categories() {
  const { brands } = useProducts();
  const dispatch = useDispatch();

  const [texts, setTexts] = useState<string[]>([]);
  const [newText, setNewText] = useState('');

  useEffect(() => {
    setTexts(brands);
  }, [brands]);

  const handleTextChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setNewText(event.target.value);
  };

  const handleAddText = () => {
    setTexts([...texts, newText]);
    setNewText('');
  };

  const handleDeleteText = (index: number) => {
    setTexts(texts.filter((_, i) => i !== index));
  };

  return (
    <div>
      <TextField
        label="New Text"
        variant="outlined"
        value={newText}
        onChange={handleTextChange}
      />
      <Button variant="contained" color="primary" onClick={handleAddText}>
        Add Text
      </Button>
      <List>
        {texts.map((text, index) => (
          <ListItem key={index}>
            <ListItemText primary={text} />
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleDeleteText(index)}>
                <DeleteOutline />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
