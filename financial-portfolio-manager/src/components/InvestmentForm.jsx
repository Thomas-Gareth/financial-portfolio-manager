// InvestmentForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addInvestment } from '../store/portfolioSlice';
import { v4 as uuidv4 } from 'uuid';
import { fetchStockPrice, fetchCryptoPrice } from '../api/marketApi';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Search, Add } from '@mui/icons-material';

function InvestmentForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    type: 'Stock',
    quantity: '',
    price: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const fetchLivePrice = async () => {
    setLoading(true);
    setError('');
    let price = 0;

    try {
      if (formData.type === 'Stock') {
        price = await fetchStockPrice(formData.name);
      } else if (formData.type === 'Crypto') {
        price = await fetchCryptoPrice(formData.name.toLowerCase());
      }

      if (price) {
        setFormData({ ...formData, price });
      } else {
        setError('Failed to fetch price. Please enter manually.');
      }
    } catch (err) {
      setError('Error fetching price. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quantity || !formData.price) {
      setError('Please fill in all fields');
      return;
    }

    const investment = {
      id: uuidv4(),
      name: formData.name,
      type: formData.type,
      quantity: parseFloat(formData.quantity),
      price: parseFloat(formData.price),
    };

    dispatch(addInvestment(investment));
    setSuccess(true);
    setFormData({ name: '', type: 'Stock', quantity: '', price: '' });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Type</InputLabel>
        <Select
          name="type"
          value={formData.type}
          onChange={handleChange}
          label="Type"
        >
          <MenuItem value="Stock">Stock</MenuItem>
          <MenuItem value="Crypto">Crypto</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        margin="normal"
        label="Symbol/ID"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder={formData.type === 'Stock' ? 'e.g. AAPL' : 'e.g. bitcoin'}
        error={!!error && !formData.name}
      />

      <LoadingButton
        fullWidth
        variant="outlined"
        onClick={fetchLivePrice}
        loading={loading}
        loadingPosition="start"
        startIcon={<Search />}
        sx={{ mt: 2, mb: 2 }}
      >
        Get Live Price
      </LoadingButton>

      <TextField
        fullWidth
        margin="normal"
        label="Price per Unit ($)"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        disabled
        error={!!error && !formData.price}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Quantity"
        name="quantity"
        type="number"
        value={formData.quantity}
        onChange={handleChange}
        error={!!error && !formData.quantity}
      />

      <Button
        fullWidth
        variant="contained"
        type="submit"
        startIcon={<Add />}
        sx={{ mt: 2 }}
      >
        Add Investment
      </Button>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Investment added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default InvestmentForm;