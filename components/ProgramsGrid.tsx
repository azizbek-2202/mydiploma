import { motion } from "framer-motion"
import { Clock, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Program {
    id: string
    image: string | null
    qita?: string
    translations: {
        id: string
        nomi: string
        davlat: string
        davomiyligi: string
        level: string
        yonalishi: string
    }[]
}

interface ProgramsGridProps {
    programs: Program[]
    programsInView: boolean
    clearFilters: () => void
}

export const ProgramsGrid = ({ programs, programsInView, clearFilters }: ProgramsGridProps) => {
    if (!programs.length) {
        return (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
                <p className="text-xl text-muted-foreground">No programs found matching your criteria.</p>
                <Button onClick={clearFilters} className="mt-4" variant="outline">
                    Clear Filters
                </Button>
            </motion.div>
        )
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => {
                const t = program.translations[0] // Backenddan kelayotgan til ma’lumotlari
                return (
                    <motion.div
                        key={program.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={programsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="group"
                    >
                        <div className={`h-full rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl overflow-hidden backdrop-blur-sm`}>
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={program.image || "/placeholder.svg"}
                                    alt={t.nomi}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                                    {t.davlat}
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                                        {t.nomi}
                                    </h3>
                                    <p className="text-primary font-semibold">{t.yonalishi}</p>
                                </div>

                                <p className="text-sm text-muted-foreground leading-relaxed">{t.level}</p>

                                <div className="space-y-2 pt-4 border-t border-border">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock className="w-4 h-4" />
                                        <span>{t.davomiyligi}</span>
                                    </div>
                                </div>
                                <Link href={`/programs/${program.id}`}>
                                    <Button className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground">
                                        Learn More
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
