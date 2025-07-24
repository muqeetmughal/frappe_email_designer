
import { Link } from 'react-router-dom';

const SamplesList = () => {


  return (
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
  )
}

export default SamplesList