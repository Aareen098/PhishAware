import { scenarios } from "@/lib/data/scenarios";
import { notFound } from "next/navigation";
import { QuizClient } from "@/components/quiz/quiz-client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type QuizPageProps = {
    params: {
        id: string;
    }
}

export default function QuizPage({ params }: QuizPageProps) {
    const scenario = scenarios.find(s => s.id === params.id);

    if (!scenario) {
        notFound();
    }

    return (
        <div className="mx-auto w-full max-w-3xl">
            <Card className="mb-8">
                 <CardHeader>
                    <CardTitle className="text-2xl font-headline">{scenario.title}</CardTitle>
                    <CardDescription>{scenario.description}</CardDescription>
                 </CardHeader>
            </Card>
            <QuizClient scenario={scenario} />
        </div>
    );
}
