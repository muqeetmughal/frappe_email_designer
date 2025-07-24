import { useFrappeGetDocList } from 'frappe-react-sdk';
import type { EmailTemplate } from '../types';
import { Link } from 'react-router-dom';

const TemplatesList = () => {
  const email_templates_query = useFrappeGetDocList<EmailTemplate>('Email Template', {
    fields: ["*"],
  });
  const email_templates = email_templates_query?.data || [];

  return (

    <>
    <h2>Sample Templates</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Link to="/samples/new">New Template</Link>
      <Link to="/samples/welcome">Welcome email</Link>
      <Link to="/samples/one-time-password">One-time passcode (OTP)</Link>
      <Link to="/samples/reset-password">Reset password</Link>
      <Link to="/samples/order-ecomerce">E-commerce receipt</Link>
      <Link to="/samples/subscription-receipt">Subscription receipt</Link>
      <Link to="/samples/reservation-reminder">Reservation reminder</Link>
      <Link to="/samples/post-metrics-report">Post metrics</Link>
      <Link to="/samples/respond-to-message">Respond to inquiry</Link>
    </div>
    <h2>Email Templates</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
      {email_templates.map((email_template) => (
        <div key={email_template.name} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', background: '#fff' }}>
          <Link to={'/templates/' + email_template.name} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3>{email_template.name}</h3>
            <p>{email_template.subject}</p>
          </Link>
        </div>
      ))}
    </div>
    </>
  )
}

export default TemplatesList