import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function LocationFilter() {
  const [location, setLocation] = React.useState('');

  const handleChange = (event) => {
    setLocation(event.target.value);
    console.log(location);
  };

  return (
    <Box maxWidth={false} sx={{ minWidth: 180, maxHeight: 10, px: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Location</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={location}
          label="location"
          onChange={handleChange}
          size="sm"
        >
          <MenuItem value={"North"}>North</MenuItem>
          <MenuItem value={"South"}>South</MenuItem>
          <MenuItem value={"East"}>East</MenuItem>
          <MenuItem value={"West"}>West</MenuItem>
          <MenuItem value={"Central"}>Central</MenuItem>
          <MenuItem value={"All"}>All</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
