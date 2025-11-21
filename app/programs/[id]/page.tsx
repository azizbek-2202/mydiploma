import ProgramDetailsClient from "./program-details";
import { fetchPrograms } from "@/lib/api-programs";

export async function generateStaticParams() {
    const programs = await fetchPrograms();

    return programs.map((p: any) => ({
        id: p.id.toString(),
    }));
}

export default function ProgramPage({ params }: { params: { id: string } }) {
    // Faqat id clientga uzatiladi
    return <ProgramDetailsClient id={params.id} />;
}
