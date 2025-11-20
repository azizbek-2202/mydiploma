import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface SearchFilterProps {
    searchQuery: string
    setSearchQuery: (value: string) => void
    selectedCountry: string
    setSelectedCountry: (value: string) => void
    countries: string[]
    totalPrograms: number
    filteredProgramsCount: number
    t: any
}

export const SearchFilter = ({
    searchQuery,
    setSearchQuery,
    selectedCountry,
    setSelectedCountry,
    countries,
    totalPrograms,
    filteredProgramsCount,
    t,
}: SearchFilterProps) => {
    return (
        <section className="py-12 bg-muted/30 sticky top-16 z-40 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder={t.programs.search}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                        <SelectTrigger className="w-full md:w-[200px]">
                            <SelectValue placeholder={t.programs.filter} />
                        </SelectTrigger>
                        <SelectContent>
                            {countries.map((country) => (
                                <SelectItem key={country} value={country}>
                                    {country}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="text-center mt-4 text-sm text-muted-foreground">
                    Showing {filteredProgramsCount} of {totalPrograms} programs
                </div>
            </div>
        </section>
    )
}