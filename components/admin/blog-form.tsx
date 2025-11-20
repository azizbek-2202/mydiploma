// "use client"

// import { useState, useRef } from "react"
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { useToast } from "@/hooks/use-toast"
// import { Upload, Plus, X } from "lucide-react"
// import { createBlogPost } from "@/lib/api-blog"

// interface BlogFormProps {
//   onClose: () => void
// }

// function BlogForm({ onClose }: BlogFormProps) {
//   const { toast } = useToast()
//   const [loading, setLoading] = useState(false)
//   const [imagePreview, setImagePreview] = useState<string | null>(null)
//   const [userImagePreview, setUserImagePreview] = useState<string | null>(null)

//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const userFileInputRef = useRef<HTMLInputElement>(null)

//   const [formData, setFormData] = useState({
//     image: null as File | null,
//     userImage: null as File | null,
//     translations: {
//       uz: { title: "", desc: "" },
//       ru: { title: "", desc: "" },
//       en: { title: "", desc: "" },
//     },
//     name: "",
//   })

//   const handleChange = (lang: "uz" | "ru" | "en", field: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       translations: {
//         ...prev.translations,
//         [lang]: { ...prev.translations[lang], [field]: value },
//       },
//     }))
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "userImage") => {
//     const file = e.target.files?.[0]
//     if (!file) return
//     if (!file.type.startsWith("image/")) {
//       toast({ title: "Xatolik", description: "Faqat rasm yuklang", variant: "destructive" })
//       return
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       toast({ title: "Xatolik", description: "Rasm 5MB dan kichik bo‘lishi kerak", variant: "destructive" })
//       return
//     }

//     const reader = new FileReader()
//     reader.onloadend = () => {
//       if (type === "image") {
//         setFormData(prev => ({ ...prev, image: file }))
//         setImagePreview(reader.result as string)
//       } else {
//         setFormData(prev => ({ ...prev, userImage: file }))
//         setUserImagePreview(reader.result as string)
//       }
//     }
//     reader.readAsDataURL(file)
//   }

//   const removeImage = (type: "image" | "userImage") => {
//     if (type === "image") {
//       setFormData(prev => ({ ...prev, image: null }))
//       setImagePreview(null)
//       if (fileInputRef.current) fileInputRef.current.value = ""
//     } else {
//       setFormData(prev => ({ ...prev, userImage: null }))
//       setUserImagePreview(null)
//       if (userFileInputRef.current) userFileInputRef.current.value = ""
//     }
//   }

//   const resetForm = () => {
//     setFormData({
//       image: null,
//       userImage: null,
//       translations: {
//         uz: { title: "", desc: "" },
//         ru: { title: "", desc: "" },
//         en: { title: "", desc: "" },
//       },
//       name: "",
//     })
//     setImagePreview(null)
//     setUserImagePreview(null)
//     if (fileInputRef.current) fileInputRef.current.value = ""
//     if (userFileInputRef.current) userFileInputRef.current.value = ""
//   }

//   // 🔹 Button click orqali submit
//   const handleButtonClick = async () => {
//     if (!formData.image || !formData.userImage) {
//       toast({ title: "Xatolik", description: "Ikkala rasmni ham yuklash shart", variant: "destructive" })
//       return
//     }

//     const emptyFields: string[] = []
//     Object.entries(formData.translations).forEach(([lang, trans]) => {
//       if (!trans.title.trim()) emptyFields.push(`${lang.toUpperCase()} - Title`)
//       if (!trans.desc.trim()) emptyFields.push(`${lang.toUpperCase()} - Description`)
//     })
//     if (emptyFields.length > 0) {
//       toast({
//         title: "To‘ldirilmagan maydonlar",
//         description: emptyFields.slice(0, 3).join(", ") + (emptyFields.length > 3 ? "..." : ""),
//         variant: "destructive",
//       })
//       return
//     }

//     setLoading(true)
//     try {
//       const form = new FormData()
//       form.append("image", formData.image!)
//       form.append("userImage", formData.userImage!)
//       form.append("name", formData.name)

//       const translationsArray = Object.entries(formData.translations).map(([lang, data]) => ({
//         lang,
//         title: data.title.trim(),
//         desc: data.desc.trim(),
//         rank: 1,
//         createDay: new Date().toISOString().split("T")[0],
//       }))
//       form.append("translations", JSON.stringify(translationsArray))

//       await createBlogPost(form)

//       toast({ title: "Muvaffaqiyatli ✅", description: "Blog yaratildi!" })
//       resetForm()
//       onClose()
//     } catch (err: any) {
//       console.error(err)
//       toast({ title: "Xatolik", description: err?.message || "Xatolik yuz berdi", variant: "destructive" })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="container mx-auto max-w-4xl py-8">
//       <Card className="shadow-lg border border-gray-200">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">📝 Yangi Blog Qo‘shish</CardTitle>
//         </CardHeader>
//         <CardContent>

//           {/* Blog rasm */}
//           <div>
//             <Label htmlFor="image">Blog rasmi <span className="text-red-500">*</span></Label>
//             <Input ref={fileInputRef} id="image" type="file" accept="image/*" onChange={e => handleImageChange(e, "image")} className="cursor-pointer mt-2" />
//             {imagePreview && (
//               <div className="relative inline-block mt-2">
//                 <img src={imagePreview} alt="Preview" className="h-40 w-40 object-cover rounded-xl border-2 border-gray-200 shadow-sm" />
//                 <button type="button" onClick={() => removeImage("image")} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
//                   <X className="h-4 w-4" />
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* User rasm */}
//           <div>
//             <Label htmlFor="userImage">Foydalanuvchi rasmi <span className="text-red-500">*</span></Label>
//             <Input ref={userFileInputRef} id="userImage" type="file" accept="image/*" onChange={e => handleImageChange(e, "userImage")} className="cursor-pointer mt-2" />
//             {userImagePreview && (
//               <div className="relative inline-block mt-2">
//                 <img src={userImagePreview} alt="Preview" className="h-40 w-40 object-cover rounded-xl border-2 border-gray-200 shadow-sm" />
//                 <button type="button" onClick={() => removeImage("userImage")} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
//                   <X className="h-4 w-4" />
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Translations */}
//           <div>
//             <Label className="block mb-3">Tarjimalar <span className="text-red-500">*</span></Label>
//             <div className="grid md:grid-cols-3 gap-4">
//               {(["uz", "ru", "en"] as const).map(lang => (
//                 <div key={lang} className="border rounded-lg p-4 bg-gray-50">
//                   <h3 className="font-bold mb-3 text-lg uppercase">{lang === "uz" ? "O‘zbek" : lang === "ru" ? "Русский" : "English"}</h3>
//                   <Input placeholder="Sarlavha" value={formData.translations[lang].title} onChange={e => handleChange(lang, "title", e.target.value)} />
//                   <Textarea placeholder="Tavsif" value={formData.translations[lang].desc} onChange={e => handleChange(lang, "desc", e.target.value)} className="mt-2 min-h-[120px]" />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-3 pt-4">
//             <Button type="button" onClick={resetForm} className="flex-1">
//               <span className="flex items-center justify-center gap-2">
//                 {loading ? <Upload className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
//                 {loading ? "Yuborilmoqda..." : "Blog qo‘shish"}
//               </span>
//             </Button>
//             <Button type="button" variant="outline" onClick={handleButtonClick} disabled={loading}>Tozalash</Button>
//           </div>

//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default BlogForm


"use client";

import { useState, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, Plus, X } from "lucide-react";
import { createBlogPost } from "@/lib/api-blog";

export default function BlogForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [userImagePreview, setUserImagePreview] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const userFileRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    image: null as File | null,
    userImage: null as File | null,
    name: "",
    translations: {
      uz: { title: "", desc: "" },
      ru: { title: "", desc: "" },
      en: { title: "", desc: "" },
    },
  });

  const handleChange = (lang: "uz" | "ru" | "en", field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      translations: {
        ...prev.translations,
        [lang]: { ...prev.translations[lang], [field]: value },
      },
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "userImage"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Xatolik",
        description: "Faqat rasm yuklash mumkin!",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Xatolik",
        description: "Rasm 5MB dan katta bo‘lmasligi kerak.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "image") {
        setFormData((p) => ({ ...p, image: file }));
        setImagePreview(reader.result as string);
      } else {
        setFormData((p) => ({ ...p, userImage: file }));
        setUserImagePreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (type: "image" | "userImage") => {
    if (type === "image") {
      setFormData((p) => ({ ...p, image: null }));
      setImagePreview(null);
      if (fileRef.current) fileRef.current.value = "";
    } else {
      setFormData((p) => ({ ...p, userImage: null }));
      setUserImagePreview(null);
      if (userFileRef.current) userFileRef.current.value = "";
    }
  };

  const resetForm = () => {
    setFormData({
      image: null,
      userImage: null,
      name: "",
      translations: {
        uz: { title: "", desc: "" },
        ru: { title: "", desc: "" },
        en: { title: "", desc: "" },
      },
    });
    setImagePreview(null);
    setUserImagePreview(null);

    if (fileRef.current) fileRef.current.value = "";
    if (userFileRef.current) userFileRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!formData.image || !formData.userImage) {
      toast({
        title: "Xatolik",
        description: "Ikkala rasm ham yuklanishi shart!",
        variant: "destructive",
      });
      return;
    }

    const missing: string[] = [];
    Object.entries(formData.translations).forEach(([lang, t]) => {
      if (!t.title.trim()) missing.push(`${lang.toUpperCase()} Title`);
      if (!t.desc.trim()) missing.push(`${lang.toUpperCase()} Desc`);
    });

    if (missing.length > 0) {
      toast({
        title: "Xatolik",
        description: missing.join(", ") + " to‘ldirilmagan!",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const form = new FormData();

      form.append("image", formData.image);
      form.append("userImage", formData.userImage);
      form.append("name", formData.name);

      const translations = Object.entries(formData.translations).map(
        ([lang, data]) => ({
          lang,
          title: data.title.trim(),
          desc: data.desc.trim(),
          rank: 1,
          createDay: new Date().toISOString().split("T")[0],
        })
      );

      form.append("translations", JSON.stringify(translations));

      console.log(form);
      
      await createBlogPost(form);

      toast({
        title: "Muvaffaqiyatli!",
        description: "Blog muvaffaqiyatli yaratildi!",
      });

      resetForm();
    } catch (err) {
      console.error(err);
      toast({
        title: "Xatolik",
        description: "Blogni yaratishda muammo yuz berdi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <Card className="shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            📝 Yangi Blog Qo‘shish
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Name */}
          <div>
            <Label>Muallif ismi *</Label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData((p) => ({ ...p, name: e.target.value }))
              }
              placeholder="Masalan: Azizbek"
            />
          </div>

          {/* BLOG IMAGE */}
          <div>
            <Label>Blog rasmi *</Label>
            <Input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "image")}
            />

            {imagePreview && (
              <div className="relative mt-2 inline-block">
                <img
                  src={imagePreview}
                  className="h-40 w-40 rounded-xl object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage("image")}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* USER IMAGE */}
          <div>
            <Label>Foydalanuvchi rasmi *</Label>
            <Input
              ref={userFileRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "userImage")}
            />

            {userImagePreview && (
              <div className="relative mt-2 inline-block">
                <img
                  src={userImagePreview}
                  className="h-40 w-40 rounded-xl object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage("userImage")}
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
                <h3 className="font-bold uppercase mb-3">{lang}</h3>

                <Input
                  placeholder="Sarlavha"
                  value={formData.translations[lang].title}
                  onChange={(e) =>
                    handleChange(lang, "title", e.target.value)
                  }
                />

                <Textarea
                  placeholder="Tavsif"
                  className="mt-2 h-32 resize-none"
                  value={formData.translations[lang].desc}
                  onChange={(e) =>
                    handleChange(lang, "desc", e.target.value)
                  }
                />
              </div>
            ))}
          </div>

          {/* SUBMIT */}
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Yuborilmoqda..." : "Yaratish"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
