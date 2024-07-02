import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography, Select, MenuItem, InputLabel, FormControl, TextField, Button, Card, CardContent } from '@mui/material';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [rating, setRating] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sort, setSort] = useState('');

    useEffect(() => {
        // Fetch products when filters or sorting change
        fetchProducts();
    }, [category, company, rating, minPrice, maxPrice, sort]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://20.244.56.144/test/companies/${company}/categories/${category}/products`, {
                params: {
                    top: 10,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    rating: rating,
                    sort: sort,
                },
            });
            setProducts(response.data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    return (
        <Container>
            <Typography variant="h2">Top Products</Typography>
            <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <MenuItem value="Phone">Phone</MenuItem>
                    <MenuItem value="Computer">Computer</MenuItem>
                    <MenuItem value="TV">TV</MenuItem>
                    <MenuItem value="Earphone">Earphone</MenuItem>
                    <MenuItem value="Tablet">Tablet</MenuItem>
                    <MenuItem value="Charger">Charger</MenuItem>
                    <MenuItem value="Mouse">Mouse</MenuItem>
                    <MenuItem value="Keypad">Keypad</MenuItem>
                    <MenuItem value="Bluetooth">Bluetooth</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Company</InputLabel>
                <Select value={company} onChange={(e) => setCompany(e.target.value)}>
                    <MenuItem value="AMZ">AMZ</MenuItem>
                    <MenuItem value="FLP">FLP</MenuItem>
                    <MenuItem value="SNP">SNP</MenuItem>
                    <MenuItem value="MYN">MYN</MenuItem>
                    <MenuItem value="AZO">AZO</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField label="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField label="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Sort By</InputLabel>
                <Select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <MenuItem value="price">Price</MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                    <MenuItem value="discount">Discount</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={fetchProducts}>Filter</Button>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{product.name}</Typography>
                                <Typography>Company: {product.company}</Typography>
                                <Typography>Category: {product.category}</Typography>
                                <Typography>Price: {product.price}</Typography>
                                <Typography>Rating: {product.rating}</Typography>
                                <Typography>Discount: {product.discount}</Typography>
                                <Typography>Availability: {product.availability}</Typography>
                                <Link to={`/product/${product.id}`}>View Details</Link>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HomePage;
