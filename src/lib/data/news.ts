import { NewsArticle } from "@/lib/types";
import { PlaceHolderImages } from '@/lib/placeholder-images';

const cyberAttackImage = PlaceHolderImages.find(p => p.id === 'news-cyber-attack');
const dataBreachImage = PlaceHolderImages.find(p => p.id === 'news-data-breach');
const newScamImage = PlaceHolderImages.find(p => p.id === 'news-new-scam');


export const newsArticles: NewsArticle[] = [
    {
        id: 'news-1',
        title: 'Massive Phishing Campaign Targets Cloud Service Users',
        source: 'CyberSec Today',
        publishedAt: '2024-07-21T14:30:00Z',
        url: '#',
        summary: 'A widespread phishing campaign is using sophisticated social engineering tactics to steal credentials from users of popular cloud storage services. The attackers use fake "document shared" notifications to lure victims to convincing-looking fake login pages.',
        imageUrl: cyberAttackImage?.imageUrl || '',
        imageHint: cyberAttackImage?.imageHint || '',
    },
    {
        id: 'news-2',
        title: 'Data Breach at HealthFirst Corp Exposes 2 Million Patient Records',
        source: 'Data Breach Watch',
        publishedAt: '2024-07-20T09:00:00Z',
        url: '#',
        summary: 'HealthFirst Corp has announced a major data breach after an unauthorized party gained access to its servers. The breach reportedly exposed names, addresses, and medical record numbers of over two million patients. The company is offering free credit monitoring.',
        imageUrl: dataBreachImage?.imageUrl || '',
        imageHint: dataBreachImage?.imageHint || '',
    },
    {
        id: 'news-3',
        title: 'New "QR Code" Scam on Parking Meters Spreading Across Cities',
        source: 'Local News 7',
        publishedAt: '2024-07-19T18:45:00Z',
        url: '#',
        summary: 'Authorities are warning of a new scam where fraudulent QR code stickers are placed on public parking meters. When scanned, the codes lead to a fake payment website designed to steal credit card information from unsuspecting drivers.',
        imageUrl: newScamImage?.imageUrl || '',
        imageHint: newScamImage?.imageHint || '',
    },
     {
        id: 'news-4',
        title: 'AI Voice Cloning Used in Sophisticated "Grandparent Scam"',
        source: 'Future Crimes',
        publishedAt: '2024-07-18T11:20:00Z',
        url: '#',
        summary: 'Scammers are now using AI to clone the voices of grandchildren from social media videos to create highly convincing emergency-plea phone calls to elderly individuals. The FBI has issued a new alert regarding this advanced form of the "grandparent scam."',
        imageUrl: 'https://picsum.photos/seed/204/300/200',
        imageHint: 'sound wave',
    },
];
