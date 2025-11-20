"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { fetchPrograms, fetchProgramById } from "@/lib/api-programs";

// STATIC PARAMS
export async function generateStaticParams() {
    const programs = await fetchPrograms();

    return programs
        .filter((p) => p.id)
        .map((p) => ({ id: String(p.id) }));
}

interface Props {
    params: { id: string };
}

export default async function ProgramDetailsPage({ params }: Props) {
    const { id } = params;
    const program: any = await fetchProgramById(id);
    if (!program) return <div>Program Not Found</div>;

    // Backendda translation mavjud
    const translation = program.translation || program.translations?.[0];

    const title = translation?.nomi || "Untitled";
    const content = translation?.desc || "";
    const category = translation?.yonalishi || "General";

    const formattedDate = program.createdAt
        ? new Intl.DateTimeFormat("uz-UZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(new Date(program.createdAt))
        : "";

    return (
        <div className="min-h-screen">
            {/* Top Image */}
            <div className="relative h-[60vh] overflow-hidden">
                <Image
                    src={program.image || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute top-8 left-4 md:left-8">
                    <Button asChild variant="secondary" size="sm" className="gap-2">
                        <Link href="/programs">
                            <ArrowLeft className="w-4 h-4" /> Back to Programs
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Article */}
            <article className="container mx-auto px-4 -mt-32 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-card rounded-2xl p-8 md:p-12 shadow-2xl border border-border mb-12">
                        <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                            {category}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                            {title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
                            <span>{formattedDate}</span>
                            <span><b>Davomiyligi:</b> {translation.davomiyligi}</span>
                            <span><b>Daraja:</b> {translation.level}</span>
                            <span><b>Davlat:</b> {translation.davlat}</span>
                            <span><b>Narxi:</b> {translation.price}</span>
                        </div>

                        <div className="flex gap-4">
                            <Image
                                src={program.userImage || "/placeholder.svg"}
                                alt={program.name || "Author"}
                                width={48}
                                height={48}
                                className="rounded-full object-cover"
                            />
                            <div>
                                <p className="font-semibold">{program.name || "Author"}</p>
                                <p className="text-sm text-muted-foreground">Author</p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="prose prose-lg dark:prose-invert max-w-none mb-16"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
            </article>
        </div>
    );
}
