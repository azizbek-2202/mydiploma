"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const { t, locale } = useLanguage()

  const contactInfo = {
    en: {
      email: "info@mydiploma.com",
      phone: "+998 90 123 45 67",
      address: "Tashkent, Uzbekistan",
      tagline: "Your trusted partner for studying abroad",
      quickLinks: "Quick Links",
      contact: "Contact",
      followUs: "Follow Us",
    },
    ru: {
      email: "info@mydiploma.com",
      phone: "+998 90 123 45 67",
      address: "Ташкент, Узбекистан",
      tagline: "Ваш надежный партнер для обучения за рубежом",
      quickLinks: "Быстрые ссылки",
      contact: "Контакты",
      followUs: "Следите за нами",
    },
    uz: {
      email: "info@mydiploma.com",
      phone: "+998 90 123 45 67",
      address: "Toshkent, O'zbekiston",
      tagline: "Chet elda o'qish uchun ishonchli hamkoringiz",
      quickLinks: "Tezkor havolalar",
      contact: "Aloqa",
      followUs: "Bizni kuzatib boring",
    },
  }

  const info = contactInfo[locale]

  return (
    <footer className="bg-card border-t border-border text-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                MyDiploma
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{info.tagline}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{info.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.nav.programs}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t.nav.blog}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{info.contact}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {info.email}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {info.phone}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {info.address}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{info.followUs}</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2025 MyDiploma. {t.footer.rights}
        </div>
      </div>
    </footer>
  )
}
