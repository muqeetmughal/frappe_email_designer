import { useFrappeGetDocList } from 'frappe-react-sdk';
import type { EmailTemplate } from '../types';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Stack,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const sampleTemplates = [
  { label: 'New Template', to: '/samples/new' },
  { label: 'Welcome email', to: '/samples/welcome' },
  { label: 'One-time passcode (OTP)', to: '/samples/one-time-password' },
  { label: 'Reset password', to: '/samples/reset-password' },
  { label: 'E-commerce receipt', to: '/samples/order-ecomerce' },
  { label: 'Subscription receipt', to: '/samples/subscription-receipt' },
  { label: 'Reservation reminder', to: '/samples/reservation-reminder' },
  { label: 'Post metrics', to: '/samples/post-metrics-report' },
  { label: 'Respond to inquiry', to: '/samples/respond-to-message' },
];

const TemplatesList = () => {
  const email_templates_query = useFrappeGetDocList<EmailTemplate>('Email Template', {
    fields: ['*'],
  });
  const email_templates = email_templates_query?.data || [];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Sample Templates
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {sampleTemplates.map((sample, idx) => (
          <Grid item xs={12} sm={6} md={4} key={sample.to}>
        <Card
          elevation={idx === 0 ? 4 : 2}
          sx={{
            border: idx === 0 ? '2px solid #1976d2' : '1px solid #e0e0e0',
            background: idx === 0 ? '#e3f2fd' : 'background.paper',
            transition: 'box-shadow 0.2s',
          }}
        >
          <CardActionArea
            component={RouterLink}
            to={sample.to}
            sx={{ height: '100%' }}
          >
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {idx === 0 && <AddIcon color="primary" />}
          <Typography
            variant={idx === 0 ? 'h6' : 'body1'}
            color={idx === 0 ? 'primary' : 'text.primary'}
          >
            {sample.label}
          </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ my: 4 }} />
      <Typography variant="h4" gutterBottom>
        Email Templates
      </Typography>
      <Grid container spacing={3}>
        {email_templates.map((email_template) => (
          <Grid item xs={12} sm={6} md={4} key={email_template.name}>
            <Card elevation={3}>
              <CardActionArea component={RouterLink} to={`/templates/${email_template.name}`}>
                <CardContent>
                  <Typography variant="h6" component="div" gutterBottom>
                    {email_template.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {email_template.subject}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TemplatesList;