import { Scenario } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const socialMediaImage = PlaceHolderImages.find(p => p.id === 'scenario-social-media');
const bankImage = PlaceHolderImages.find(p => p.id === 'scenario-bank-impersonation');
const deliveryImage = PlaceHolderImages.find(p => p.id === 'scenario-package-delivery');
const ceoFraudImage = PlaceHolderImages.find(p => p.id === 'scenario-ceo-fraud');
const fakeLoginImage = PlaceHolderImages.find(p => p.id === 'question-fake-login');
const techSupportImage = PlaceHolderImages.find(p => p.id === 'scenario-tech-support');
const fakeInvoiceImage = PlaceHolderImages.find(p => p.id === 'scenario-fake-invoice');

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
  {
    id: 'tech-support-scam',
    title: 'The "Tech Support" Pop-up',
    description: 'A browser pop-up claims your computer is infected. Can you handle the pressure?',
    category: 'Impersonation',
    imageUrl: techSupportImage?.imageUrl || '',
    imageHint: techSupportImage?.imageHint || '',
    questions: [
      {
        id: 'ts1',
        type: 'multiple-choice',
        text: 'A loud alarm sounds and a pop-up window freezes your browser, stating: "VIRUS DETECTED! Call Microsoft Support at 1-800-FAKE-NUM immediately to prevent data loss." What should you do?',
        options: [
          { id: 'opt1', text: 'Call the number. It says it\'s Microsoft, so it must be official.', isCorrect: false },
          { id: 'opt2', text: 'Try to close the browser tab or window. If that fails, restart your computer.', isCorrect: true },
          { id: 'opt3', text: 'Click the "Scan Now" button in the pop-up to fix the issue.', isCorrect: false },
          { id: 'opt4', text: 'Unplug your computer from the internet.', isCorrect: false },
        ],
        explanation: 'This is a classic tech support scam. Legitimate companies like Microsoft will never use scary pop-ups that lock your browser and demand you call a number. The goal is to get you on the phone, gain remote access to your PC, and charge you for fake services or install malware. The correct action is to close the browser (using Task Manager or Force Quit if needed) and restart.',
        difficulty: 'medium',
      },
    ],
  },
  {
    id: 'fake-invoice-scam',
    title: 'The Unexpected Invoice',
    description: 'You receive an invoice for a service you don\'t remember. Is it real or a trick?',
    category: 'Email Phishing',
    imageUrl: fakeInvoiceImage?.imageUrl || '',
    imageHint: fakeInvoiceImage?.imageHint || '',
    questions: [
      {
        id: 'fi1',
        type: 'multiple-choice',
        text: 'You get an email with an attached PDF invoice from "Geek Squad" for $399.99 for an annual subscription you don\'t recall purchasing. The email says to call a number if you wish to cancel. What is the scammer\'s primary goal?',
        options: [
          { id: 'opt1', text: 'To get you to open the malicious PDF attachment.', isCorrect: false },
          { id: 'opt2', text: 'To trick you into calling the number where they will phish for your credit card info to "process the refund".', isCorrect: true },
          { id: 'opt3', text: 'To confirm that your email address is active when you reply.', isCorrect: false },
          { id: 'opt4', text: 'To hope you ignore it and they can try to charge your card.', isCorrect: false },
        ],
        explanation: 'This is a refund scam. The invoice is fake, designed to make you panic and call the number. Once on the phone, the scammer will pretend to be customer service and trick you into giving them your financial details under the guise of "canceling the charge" or "processing a refund". The best action is to delete the email and block the sender.',
        difficulty: 'hard',
      },
    ],
  },
];
