import React from 'react';
import UserNavbar from './NavBar'; // Assuming you have a UserNavbar component
import Footer from './Footer'; // Assuming you have a Footer component

const TermsAndPolicy = () => {
  return (
    <>
      <UserNavbar />
      <section id="TermsAndConditions" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.card}>
            <h1 style={styles.title}>Terms and Conditions</h1>
            <h2 style={styles.subtitle}>Terms and Conditions | Privacy Policy | Cookies Policy</h2>

            <h3 style={styles.header}>1. GENERAL CONDITIONS OF USE</h3>

            <h4 style={styles.subHeader}>1.1 Scope and Definitions</h4>
            <p style={styles.paragraph}>
              These General Conditions of Use apply to all services provided by ShareRide (defined herein below). ShareRide owns and operates the Site (defined herein below) in India.
            </p>

          

            <h4 style={styles.subHeader}>1.2 Acceptance of Conditions</h4>
            <p style={styles.paragraph}>
              The Conditions apply to any and all use of the Site by a Member. By using the Site, the Members signify their acceptance of these Conditions in full and agree to be bound by them.
            </p>
            <p style={styles.paragraph}>
              No access to the Services will be permitted unless the Conditions are accepted in full. If a Member does not agree to the Conditions, such Member may not use the Services.
            </p>
            <p style={styles.paragraph}>
              All Members agree to comply with the Conditions and accept that their personal data may be processed in accordance with the Privacy Policy.
            </p>
            <p style={styles.paragraph}>
              In the event that any Member fails to comply with any of the Conditions, ShareRide reserves the right, but not the obligation at its own discretion, to withdraw the User Account in question and suspend or withdraw all Services to that Member without notice.
            </p>
            <p style={styles.paragraph}>
              These Conditions are intended to create binding rights and obligations between Members and ShareRide in accordance with the Indian Contract Act, 1872.
            </p>

            <h4 style={styles.subHeader }>1.3 Variation of the Conditions, Site, and Service</h4>
            <p style={styles.paragraph}>
              ShareRide reserves the right to modify the Conditions at any time. Any modification to the Site, Services, or Conditions will take effect as soon as such changes are published on the Site.
            </p>
            <p style={styles.paragraph}>
              Members will be deemed to have accepted any varied Conditions in the event that they use any Services offered through the Site following publication of the varied Conditions.
            </p>

            <h3 style={styles.header}>2. USE OF THE SERVICE</h3>

            <h4 style={styles.subHeader}>2.1 User Account and Accuracy of Information</h4>
            <p style={styles.paragraph}>
              In order to use the Services, each Member must create a User Account and agrees to provide any personal information requested by ShareRide. Members agree that all information provided shall be true, correct, complete, and accurate.
            </p>
            <p style={styles.paragraph}>
              Members are limited to one User Account per Member. No User Account may be created on behalf of or in order to impersonate another person.
            </p>

            <h4 style={styles.subHeader}>2.2 No Commercial Activity and Status of ShareRide</h4>
            <p style={styles.paragraph}>
              The Site and the Services are strictly limited to providing a Service for Vehicle Owners and Passengers to car share in a private capacity. The Services may not be used for commercial purposes.
            </p>

            <h4 style={styles.subHeader}>2.3 Types of Booking and Payment</h4>
            <p style={styles.paragraph}>
              ShareRide offers an online booking service to facilitate the booking of seats by Passengers. The Vehicle Owner provides details of their Trip on the Site, specifying date, time, and destination points, along with the Cost Contribution per seat.
            </p>

            <h4 style={styles.subHeader}>2.4 Vehicle Owner and Passenger Obligations</h4>
            <p style={styles.paragraph}><strong>Vehicle Owner’s Obligations:</strong></p>
            <ul style={styles.list}>
              <li>The Vehicle Owner agrees that the Trip shall not be for any fraudulent, unlawful, or criminal activity.</li>
              <li>The Vehicle Owner must present themselves on time and at the agreed location.</li>
            </ul>
            <p style={styles.paragraph}><strong>Passenger Obligations:</strong></p>
            <ul style={styles.list}>
              <li>The Passenger agrees to present themselves on time and at the agreed location.</li>
              <li>The Passenger agrees to pay the Cost Contribution to the Vehicle Owner.</li>
            </ul>

            <h4 style={styles.subHeader}>2.5 Insurance</h4>
            <p style={styles.paragraph}>
              The Vehicle Owner agrees to maintain a comprehensive insurance policy covering third-party liability and the occupants of the Vehicle. The Vehicle Owner must provide evidence of valid insurance upon request.
            </p>

            <h4 style={styles.subHeader}>2.6 Management of Disputes Between Members</h4>
            <p style={styles.paragraph}>
              ShareRide may provide an online service for resolving disputes at its sole discretion. This service is non-binding, and ShareRide is not obligated to resolve disputes.
            </p>

            <h4 style={styles.subHeader}>2.7 Verification of IDs and Phone Numbers</h4>
            <p style={styles.paragraph}>
              Members consent to ShareRide collecting IDs/documents for verification purposes. Members may verify their mobile numbers through a code sent via SMS.
            </p>

            <h4 style={styles.subHeader}>2.8 International Trips and Bookings</h4>
            <p style={styles.paragraph}>
              Bookings may be made for international Trips. Vehicle Owners must ensure their insurance covers travel outside of India.
            </p>

            <h4 style={styles.subHeader}>2.9 Messages Between Members</h4>
            <p style={styles.paragraph}>
              ShareRide may review messages exchanged between Members for compliance and fraud prevention. Members agree to refrain from sending prohibited messages.
            </p>

            <h4 style={styles.subHeader}>2.10 Contacting Members</h4>
            <p style={styles.paragraph}>
              Members consent to ShareRide communicating via phone, SMS, and email regarding services and updates.
            </p>

            <h3 style={styles.header}>3. DISCLAIMER OF LIABILITY</h3>
            <p style={styles.paragraph}>
              Members access the Services at their own risk. ShareRide disclaims any liability for actions or inactions of Members and for any inaccuracies in information provided.
            </p>
            <p style={styles.paragraph}>
              Members access the Services at their own risk. ShareRide disclaims any liability for actions or inactions of Members and for any inaccuracies in information provided.
            </p>

            <h3 style={styles.header}>4. INDEMNITY AND RELEASE</h3>
            <p style={styles.paragraph}>
              Members will indemnify ShareRide from any claims arising from their breach of these Conditions or violation of any laws.
            </p>

            <h3 style={styles.header}>5. GENERAL TERMS</h3>

            <h4 style={styles.subHeader}>5.1 Relationship</h4>
            <p style={styles.paragraph}>
              No arrangement between Members and ShareRide constitutes an agency or partnership.
            </p>

            <h4 style={styles.subHeader}>5.2 Suspension or Withdrawal of Site Access</h4>
            <p style={styles.paragraph}>
              ShareRide can suspend or withdraw access to the Site without prior notification for non-compliance with the Conditions.
            </p>

            <h4 style={styles.subHeader}>5.3 Intellectual Property</h4>
            <p style={styles.paragraph}>
              All content on the Site is the property of ShareRide and is protected by copyright laws. No content may be reproduced without consent.
            </p>

            <h4 style={styles.subHeader}>5.4 Content Provided by Members</h4>
            <p style={styles.paragraph}>
              Members grant ShareRide a license to display content they publish on the Site.
            </p>

            <h4 style={styles.subHeader}>5.5 Partner Sites</h4>
            <p style={styles.paragraph}>
              ShareRide reserves the right to reproduce information from partner sites.
            </p>

            <h3 style={styles.header}>6. LAW AND JURISDICTION</h3>
            <p style={styles.paragraph}>
              These terms shall be governed by the laws of India, and any disputes shall be subject to the jurisdiction of the Courts of New Delhi.
            </p>
          </div>
        </div>
      </section>
      
    </>
  );
};

const styles = {
  section: {
    backgroundColor: '#f9f9f9',
    padding: '2.5rem 0',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  card: {
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.5rem',
    padding: '1.5rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  header: {
    fontSize: '1.5rem',
    marginTop: '1.5rem',
  },
  subHeader: {
    fontSize: '1.25rem',
    marginTop: '1rem',
  },
  paragraph: {
    color: '#555',
    marginBottom: '1rem',
  },
  list: {
    listStyleType: 'disc',
    marginLeft: '20px',
  },
};

export default TermsAndPolicy;