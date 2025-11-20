"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { createProgram } from "@/lib/api-programs"
import { Upload, Plus, X } from "lucide-react"
import { Textarea } from "../ui/textarea"

export default function ProgramsForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    qita: "",
    image: null as File | null,
    translations: {
      uz: { nomi: "", davomiyligi: "", level: "", davlat: "", daraja: "", yonalishi: "", desc: "" },
      ru: { nomi: "", davomiyligi: "", level: "", davlat: "", daraja: "", yonalishi: "", desc: "" },
      en: { nomi: "", davomiyligi: "", level: "", davlat: "", daraja: "", yonalishi: "", desc: "" },
    },
  })

  const handleChange = (lang: "uz" | "ru" | "en", field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      translations: {
        ...prev.translations,
        [lang]: { ...prev.translations[lang], [field]: value },
      },
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Xatolik",
          description: "Iltimos, faqat rasm yuklang.",
          variant: "destructive",
        })
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Xatolik",
          description: "Rasm 5 MB dan katta bo'lmasin.",
          variant: "destructive",
        })
        return
      }

      setFormData((p) => ({ ...p, image: file }))

      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData((p) => ({ ...p, image: null }))
    setImagePreview(null)

    const fileInp = document.getElementById("image") as HTMLInputElement
    if (fileInp) fileInp.value = ""
  }

  const resetForm = () => {
    setFormData({
      qita: "",
      image: null,
      translations: {
        uz: { nomi: "", davomiyligi: "", level: "", davlat: "", daraja: "", yonalishi: "", desc: "" },
        ru: { nomi: "", davomiyligi: "", level: "", davlat: "", daraja: "", yonalishi: "", desc: "" },
        en: { nomi: "", davomiyligi: "", level: "", davlat: "", daraja: "", yonalishi: "", desc: "" },
      },
    })
    setImagePreview(null)

    const fileInp = document.getElementById("image") as HTMLInputElement
    if (fileInp) fileInp.value = ""
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.qita.trim()) {
      toast({ title: "Xatolik", description: "Qita nomini kiriting.", variant: "destructive" })
      return
    }

    if (!formData.image) {
      toast({ title: "Xatolik", description: "Rasm yuklash majburiy.", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      const form = new FormData()

      form.append("qita", formData.qita)
      form.append("image", formData.image, formData.image.name)

      // ✅ TO‘G‘RI TRANSLATIONS OBJECT
      const translationsPayload = [
        {
          language: "uz",
          nomi: formData.translations.uz.nomi.trim(),
          davlat: formData.translations.uz.davlat.trim(),
          daraja: formData.translations.uz.daraja.trim(),
          qita: formData.qita.trim(),
          desc: formData.translations.uz.desc.trim(),
          price: "5000$",
        },
        {
          language: "ru",
          nomi: formData.translations.ru.nomi.trim(),
          davlat: formData.translations.ru.davlat.trim(),
          daraja: formData.translations.ru.daraja.trim(),
          qita: formData.qita.trim(),
          desc: formData.translations.ru.desc.trim(),
          price: "5000$",
        },
        {
          language: "en",
          nomi: formData.translations.en.nomi.trim(),
          davlat: formData.translations.en.davlat.trim(),
          daraja: formData.translations.en.daraja.trim(),
          qita: formData.qita.trim(),
          desc: formData.translations.en.desc.trim(),
          price: "5000$",
        },
      ];

      form.append("translations", JSON.stringify(translationsPayload))

      
      const response = await createProgram(form)

      toast({ title: "Muvaffaqiyatli", description: "Dastur qo‘shildi!" })

      resetForm()
    } catch (err) {
      toast({
        title: "Xatolik",
        description: "Muammo yuz berdi.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Yangi Dastur Qo'shish</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Qita */}
            <div>
              <Label>Qita nomi *</Label>
              <Input
                value={formData.qita}
                onChange={(e) => setFormData((p) => ({ ...p, qita: e.target.value }))}
                placeholder="Masalan: Asia, Europa"
              />
            </div>

            {/* Image */}
            <div>
              <Label>Rasm *</Label>
              <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
              {imagePreview && (
                <div className="relative mt-2 inline-block">
                  <img src={imagePreview} className="h-32 w-32 rounded-lg object-cover" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Translations */}
            <div className="grid md:grid-cols-3 gap-4">
              {(["uz", "ru", "en"] as const).map((lang) => (
                <div className="border rounded-lg p-4" key={lang}>
                  <h3 className="font-bold uppercase mb-2">{lang}</h3>

                  <Input
                    placeholder="Nomi"
                    value={formData.translations[lang].nomi}
                    onChange={(e) => handleChange(lang, "nomi", e.target.value)}
                  />
                  <Input
                    placeholder="Davlat"
                    className="mt-2"
                    value={formData.translations[lang].davlat}
                    onChange={(e) => handleChange(lang, "davlat", e.target.value)}
                  />
                  <Input
                    placeholder="Daraja"
                    className="mt-2"
                    value={formData.translations[lang].daraja}
                    onChange={(e) => handleChange(lang, "daraja", e.target.value)}
                  />
                  <Textarea
                    placeholder="Tavsif (desc)"
                    className="mt-2 resize-none h-32"
                    value={formData.translations[lang].desc}
                    onChange={(e) => handleChange(lang, "desc", e.target.value)}
                  />
                </div>
              ))}
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Yuborilmoqda..." : "Dastur Qo'shish"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}