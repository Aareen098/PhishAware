import type { NewsArticle } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { formatDistanceToNow } from "date-fns";

type NewsCardProps = {
    article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <div className="aspect-video overflow-hidden rounded-md border">
                    <Image 
                        src={article.imageUrl}
                        alt={article.title}
                        width={300}
                        height={200}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                        data-ai-hint={article.imageHint}
                    />
                </div>
            </CardHeader>
            <CardContent className="flex-1">
                <CardTitle className="mb-2 text-lg leading-tight">{article.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{article.summary}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center text-xs text-muted-foreground">
                <span>{article.source}</span>
                <time dateTime={article.publishedAt}>
                    {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                </time>
            </CardFooter>
        </Card>
    );
}
