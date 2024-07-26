import React, { useState } from 'react';
import { Box, Card, CardContent, CardHeader, Grid, TextField, Button, Typography } from '@mui/material';

const NewsLookingContent: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const newsItems = [
        "Welcome to FPT Dormitory Management System! We're excited to have you here. Stay tuned for the latest updates and information.",
        "Upcoming Event: Join us for the Annual Dormitory Sports Day! Participate in exciting sports activities and win amazing prizes. Date: July 20th, Location: Main Campus Ground.",
        "Health Advisory: Ensure you are up to date with your vaccinations. Our on-campus health center offers free consultations and vaccines. Visit us at the Health Department.",
        "Maintenance Notice: Regular maintenance of the dormitory facilities will take place on July 25th. Please be aware of temporary disruptions and plan accordingly.",
        "New Service: We are introducing a laundry service for all residents. Enjoy convenient and affordable laundry solutions. Check the Services section for more details.",
        "Safety Tips: Remember to lock your doors and windows when you leave your room. Report any suspicious activities to the security department immediately.",
        "Cultural Festival: Experience diverse cultures at our Annual Cultural Festival. Enjoy performances, food stalls, and cultural exhibits. Date: August 10th, Location: Student Center.",
        "Electricity and Water Usage: Monitor your electricity and water usage through our online portal. Conserve energy and resources to help our environment."
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Add search functionality here if needed
    };

    const filteredNewsItems = newsItems.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ marginTop: '20px' }}>
            <Grid container justifyContent="center" mb={4}>
                <Grid item xs={8} md={6}>
                    <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex' }}>
                        <TextField
                            fullWidth
                            type="search"
                            placeholder="Type to search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ borderRadius: '20px', paddingLeft: '30px', marginRight: '8px' }}
                        />
                        <Button
                            type="submit"
                            sx={{
                                backgroundColor: 'orange',
                                border: '1px solid orange',
                                borderRadius: '20px',
                                color: 'white',
                                '&:hover': { backgroundColor: 'darkorange' },
                            }}
                        >
                            Search
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Card sx={{ width: '100%', height: '80vh', overflowY: 'auto' }}>
                        <CardHeader
                            title="News"
                            sx={{
                                backgroundColor: '#034DA1',
                                color: 'white',
                                position: 'sticky',
                                top: 0,
                                zIndex: 1,
                            }}
                        />
                        <CardContent sx={{ padding: '10px', backgroundColor: '#f8f9fa' }}>
                            {filteredNewsItems.length > 0 ? (
                                filteredNewsItems.map((text, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            padding: '10px',
                                            marginBottom: '10px',
                                            backgroundColor: 'white',
                                            borderRadius: '8px',
                                            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        <Typography variant="body1">{text}</Typography>
                                    </Box>
                                ))
                            ) : (
                                <Typography>No news found</Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default NewsLookingContent;
