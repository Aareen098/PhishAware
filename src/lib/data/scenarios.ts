import { Scenario } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const socialMediaImage = PlaceHolderImages.find(p => p.id === 'scenario-social-media');
const bankImage = PlaceHolderImages.find(p => p.id === 'scenario-bank-impersonation');
const deliveryImage = PlaceHolderImages.find(p => p.id === 'scenario-package-delivery');
const ceoFraudImage = PlaceHolderImages.find(p => p.id === 'scenario-ceo-fraud');
const fakeLoginImage = PlaceHolderImages.find(p => p.id === 'question-fake-login');

export const scenarios: Scenario[] = [
  {
    id: 'social-media-scam',
    title: 'The Suspicious Friend Request',
    description: 'A scenario testing your ability to spot fake profiles and malicious links on social media.',
    category: 'Social Engineering',
    imageUrl: socialMediaImage?.imageUrl || '',
    imageHint: socialMediaImage?.imageHint || '',
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        text: 'You receive a friend request from someone you don\'t recognize, but you have mutual friends. Their profile is new and has very few posts. What is the safest course of action?',
        options: [
          { id: 'opt1', text: 'Accept the request to see who it is.', isCorrect: false },
          { id: 'opt2', text: 'Ignore or delete the request.', isCorrect: true },
          { id: 'opt3', text: 'Message them and ask how you know them.', isCorrect: false },
          { id: 'opt4', text: 'Check with your mutual friends if they know the person.', isCorrect: false },
        ],
        explanation: 'The safest action is to ignore or delete requests from unknown individuals. Engaging with a fake profile can expose you to scams or malware.',
        difficulty: 'easy',
      },
      // more questions...
    ],
  },
  {
    id: 'bank-impersonation',
    title: 'Urgent Account Verification',
    description: 'This simulation tests if you can identify a fake bank email asking for your login details.',
    category: 'Email Phishing',
    imageUrl: bankImage?.imageUrl || '',
    imageHint: bankImage?.imageHint || '',
    questions: [
        {
            id: 'b1',
            type: 'image',
            text: 'You receive an email that looks like it\'s from your bank, stating your account is locked due to suspicious activity. It provides a link to "verify your identity". What is the biggest red flag?',
            imageUrl: fakeLoginImage?.imageUrl,
            imageHint: fakeLoginImage?.imageHint,
            options: [
              { id: 'opt1', text: 'The sense of urgency.', isCorrect: false },
              { id: 'opt2', text: 'The email is not personalized with your name.', isCorrect: false },
              { id: 'opt3', text: 'The link asks you to enter your password and social security number.', isCorrect: true },
              { id: 'opt4', text: 'The bank\'s logo looks slightly off.', isCorrect: false },
            ],
            explanation: 'Legitimate banks will never ask for sensitive information like passwords or SSNs via email. The request for this information is the most definitive red flag of a phishing attempt.',
            difficulty: 'medium',
        },
        // more questions...
    ],
  },
    {
    id: 'package-delivery-fraud',
    title: 'Package Delivery Problem',
    description: 'A common scam where attackers impersonate a delivery service. Can you spot the fake?',
    category: 'Smishing (SMS Phishing)',
    imageUrl: deliveryImage?.imageUrl || '',
    imageHint: deliveryImage?.imageHint || '',
    questions: [
        {
            id: 'p1',
            type: 'multiple-choice',
            text: 'You get an SMS: "FedEx: Your package #4815162342 has a delivery issue. Please visit tinyurl.com/fix-delivery to update your address." What should you do?',
            options: [
              { id: 'opt1', text: 'Click the link; it seems like a legitimate issue.', isCorrect: false },
              { id: 'opt2', text: 'Ignore the text and go to the official FedEx website to track your package using the number.', isCorrect: true },
              { id: 'opt3', text: 'Reply "STOP" to the message.', isCorrect: false },
              { id: 'opt4', text: 'Call the number the text came from.', isCorrect: false },
            ],
            explanation: 'Never click links in unsolicited SMS messages. URL shorteners like tinyurl hide the true destination. The correct way is to go directly to the official website and use the tracking number if you are expecting a package.',
            difficulty: 'medium',
        }
    ],
  },
  {
    id: 'ceo-fraud',
    title: 'The CEO\'s Urgent Request',
    description: 'An advanced spear-phishing attack known as "CEO Fraud" or "Business Email Compromise".',
    category: 'Spear Phishing',
    imageUrl: ceoFraudImage?.imageUrl || '',
    imageHint: ceoFraudImage?.imageHint || '',
    questions: [
        {
            id: 'c1',
            type: 'multiple-choice',
            text: 'You, an accounting employee, get an email from your CEO: "I\'m in a meeting and need you to urgently wire $15,000 to this account for a confidential acquisition. Please process it ASAP and don\'t talk to anyone about it." What is the best next step?',
            options: [
              { id: 'opt1', text: 'Process the wire transfer as requested to not anger the CEO.', isCorrect: false },
              { id: 'opt2', text: 'Reply to the email to confirm the account details.', isCorrect: false },
              { id: 'opt3', text: 'Verbally confirm the request with the CEO or your direct manager through a known, trusted channel (e.g., in person or via a known phone number).', isCorrect: true },
              { id: 'opt4', text: 'Forward the email to the IT department\'s security alias.', isCorrect: false },
            ],
            explanation: 'This has all the hallmarks of CEO fraud: urgency, a request for a wire transfer, and a demand for secrecy. Always verify such requests out-of-band (i.e., not by replying to the email). A verbal confirmation is the best way to ensure legitimacy before transferring funds.',
            difficulty: 'hard',
        }
    ],
  },
];
