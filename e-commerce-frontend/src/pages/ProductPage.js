import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent } from '@mui/material';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://20.244.56.144/test/products/${id}`);
            setProduct(response.data.product);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    if (!product) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h4">{product.name}</Typography>
                    <Typography>Company: {product.company}</Typography>
                    <Typography>Category: {product.category}</Typography>
                    <Typography>Price: {product.price}</Typography>
                    <Typography>Rating: {product.rating}</Typography>
                    <Typography>Discount: {product.discount}</Typography>
                    <Typography>Availability: {product.availability}</Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ProductPage;
