"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import { fetchBlogPostById, updateBlogPost } from "@/lib/api-blog";

export default function BlogEditForm({ postId, onClose }: any) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<any>(null);

    const fileRef = useRef<HTMLInputElement>(null);
    const userFileRef = useRef<HTMLInputElement>(null);

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [userImagePreview, setUserImagePreview] = useState<string | null>(null);

    // LOAD DATA
    useEffect(() => {
        if (!postId) return;
        loadPost(postId);
    }, [postId]);

    const loadPost = async (id: string) => {
        const data = await fetchBlogPostById(id);

        setFormData({
            name: data.name,
            translations: {
                uz: data.translations.find((t: any) => t.lang === "uz"),
                ru: data.translations.find((t: any) => t.lang === "ru"),
                en: data.translations.find((t: any) => t.lang === "en"),
            },
            image: null,
            userImage: null,
        });

        setImagePreview(data.imageUrl);
        setUserImagePreview(data.userImageUrl);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const form = new FormData();

            if (formData.image) form.append("image", formData.image);
            if (formData.userImage) form.append("userImage", formData.userImage);

            form.append("name", formData.name);
            form.append("translations", JSON.stringify(Object.values(formData.translations)));

            await updateBlogPost(postId, form);

            toast({ title: "Updated", description: "Blog updated successfully!" });
            onClose();
        } catch (e) {
            console.log(e);
            toast({
                title: "Xatolik",
                description: "Update qilinmadi",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    if (!formData) return "Loading...";

    return (
        <div className="container mx-auto max-w-4xl py-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        ✏️ Blogni Tahrirlash
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">

                    {/* Name */}
                    <div>
                        <Label>Muallif ismi *</Label>
                        <Input
                            value={formData.name}
                            onChange={(e) =>
                                setFormData((p: any) => ({ ...p, name: e.target.value }))
                            }
                        />
                    </div>

                    {/* Translations */}
                    <div className="grid md:grid-cols-3 gap-4">
                        {(["uz", "ru", "en"] as const).map((lang) => (
                            <div className="border rounded-lg p-4" key={lang}>
                                <h3 className="font-bold uppercase mb-3">{lang}</h3>

                                <Input
                                    placeholder="Title"
                                    value={formData.translations[lang]?.title}
                                    onChange={(e) =>
                                        setFormData((p: any) => ({
                                            ...p,
                                            translations: {
                                                ...p.translations,
                                                [lang]: { ...p.translations[lang], title: e.target.value },
                                            },
                                        }))
                                    }
                                />

                                <Textarea
                                    placeholder="Desc"
                                    className="mt-2 h-32 resize-none"
                                    value={formData.translations[lang]?.desc}
                                    onChange={(e) =>
                                        setFormData((p: any) => ({
                                            ...p,
                                            translations: {
                                                ...p.translations,
                                                [lang]: { ...p.translations[lang], desc: e.target.value },
                                            },
                                        }))
                                    }
                                />
                            </div>
                        ))}
                    </div>

                    <Button
                        className="w-full"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Yangilash"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
