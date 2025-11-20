"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { fetchProgramById } from "@/lib/api-programs"

interface Props {
    params: { id: string }
}

export default function ProgramDetailsPage({ params }: Props) {
    const router = useRouter()
    const [program, setProgram] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadProgram() {
            const id = params.id
            const locale = localStorage.getItem("locale") || "uz"

            try {
                const data = await fetchProgramById(id, locale)
                setProgram(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        loadProgram()
    }, [params])

    if (loading) return <div>Loading...</div>
    if (!program) return <div>Program not found</div>

    const translation = program.translation || program.translations?.[0]
    const title = translation?.nomi || "Untitled"
    const content = translation?.desc || ""
    const category = translation?.yonalishi || "General"

    const formattedDate = program.createdAt
        ? new Intl.DateTimeFormat("uz-UZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(new Date(program.createdAt))
        : ""

    return (
        <div className="min-h-screen py-12">
            <div className="flex justify-between max-w-6xl mb-10 mx-auto">
                <div className="">
                    <Button onClick={() => router.back()} className="bg-black text-purple-700 cursor-pointer hover:text-white">
                        Back
                    </Button>
                </div>
                <div></div>
            </div>
            <div className="max-w-5xl mx-auto relative h-[80vh] overflow-hidden rounded-3xl shadow-xl mb-12">
                <Image
                    src={program.image || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover rounded-3xl"
                />
            </div>

            <div className="max-w-4xl mx-auto p-8 rounded-2xl shadow-xl">
                <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                    {category}
                </div>

                <h1 className="text-4xl text-center font-bold mb-4">{title}</h1>

                <div className="flex flex-wrap gap-6 text-xl text-muted-foreground mb-6">
                    <span>{formattedDate}</span>
                    <span><b>Davomiyligi:</b> {translation.davomiyligi}</span>
                    <span><b>Daraja:</b> {translation.level}</span>
                    <span><b>Davlat:</b> {translation.davlat}</span>
                </div>

                <div
                    className="prose prose-lg dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </div>
        </div>
    )
}
