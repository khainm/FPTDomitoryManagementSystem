import React  from 'react';
import { Box, Card, CardContent, CardHeader, Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StudentGuideContent: React.FC = () => {
    const guideItems = [
        { title: "Instructions for viewing news", content: "Here are the detailed instructions for viewing news..." },
        { title: "Instructions for booking a bed", content: "Here are the detailed instructions for booking a bed..." },
        { title: "Instructions for contacting the security department", content: "Here are the detailed instructions for contacting the security department..." },
        { title: "Instructions for contacting the medical department", content: "Here are the detailed instructions for contacting the medical department..." },
        { title: "Instructions for contacting the housing department", content: "Here are the detailed instructions for contacting the housing department..." },
        { title: "Instructions for reporting maintenance issues", content: "Here are the detailed instructions for reporting maintenance issues..." },
        { title: "Instructions for using laundry services", content: "Here are the detailed instructions for using laundry services..." },
        { title: "Instructions for participating in dormitory events", content: "Here are the detailed instructions for participating in dormitory events..." },
        { title: "Guidelines for dormitory safety", content: "Here are the guidelines for dormitory safety..." },
        { title: "Guidelines for dormitory cleanliness", content: "Here are the guidelines for dormitory cleanliness..." }
    ];

    return (
        <Box sx={{ marginTop: '20px' }}>
            <Grid container>
                <Grid item xs={12}>
                    <Card sx={{ width: '100%', height: '80vh', overflowY: 'auto' }}>
                        <CardHeader
                            title="Student Guide"
                            sx={{
                                backgroundColor: '#034DA1',
                                color: 'white',
                                position: 'sticky',
                                top: 0,
                                zIndex: 1,
                                textAlign: 'center'
                            }}
                        />
                        <CardContent sx={{ padding: '10px', backgroundColor: '#f8f9fa' }}>
                            {guideItems.length > 0 ? (
                                guideItems.map((item, index) => (
                                    <Accordion key={index} sx={{ marginBottom: '10px', borderRadius: '8px', boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)' }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={`panel${index}-content`}
                                            id={`panel${index}-header`}
                                            sx={{ backgroundColor: 'white', borderRadius: '8px' }}
                                        >
                                            <Typography variant="body1">{item.title}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails sx={{ backgroundColor: 'white', borderRadius: '8px' }}>
                                            <Typography variant="body2">{item.content}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                ))
                            ) : (
                                <Typography>No guides found</Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default StudentGuideContent;
