"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { fetchProgramById } from "@/lib/api-programs";

export default function ProgramDetailsClient({ id }: { id: string }) {
    const router = useRouter();
    const [program, setProgram] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProgram() {
            const locale = localStorage.getItem("locale") || "uz";
            const data = await fetchProgramById(id, locale);
            setProgram(data);
            setLoading(false);
        }

        loadProgram();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!program) return <div>Program not found</div>;

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
            {/* Back button */}
            <div className="max-w-6xl mx-auto py-8 px-4">
                <Button asChild variant="secondary" size="sm">
                    <Link href="/programs">
                        <ArrowLeft className="w-4 h-4" /> Back to Programs
                    </Link>
                </Button>
            </div>

            {/* Image tepadagi article oldida */}
            <div className="max-w-5xl mx-auto mb-8 rounded-2xl overflow-hidden shadow-lg">
                <Image
                    src={program.image || "/placeholder.svg"}
                    alt={title}
                    width={1200}
                    height={600}
                    className="object-cover rounded-2xl"
                />
            </div>

            {/* Article */}
            <article className="container mx-auto px-4 relative z-10">
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
