import { NewsCard } from "@/components/news/news-card";
import { newsArticles } from "@/lib/data/news";

export default function NewsPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight font-headline">Latest Cybercrime News</h1>
                <p className="text-muted-foreground">Stay informed about the latest threats and security trends.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {newsArticles.map((article) => (
                    <NewsCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
}
