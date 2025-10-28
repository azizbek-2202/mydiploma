export type Locale = "en" | "ru" | "uz"

export const locales: Locale[] = ["en", "ru", "uz"]

export const defaultLocale: Locale = "en"

export const localeNames: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  uz: "O'zbekcha",
}

export interface Translations {
  nav: {
    home: string
    about: string
    programs: string
    blog: string
    contact: string
  }
  home: {
    hero: {
      title: string
      subtitle: string
      cta: string
      explore: string
      badge: string
    }
    features: {
      title: string
      universities: string
      universitiesDesc: string
      support: string
      supportDesc: string
      success: string
      successDesc: string
    }
    stats: {
      title: string
      subtitle: string
      students: string
      countries: string
      universities: string
      successRate: string
    }
    testimonials: {
      title: string
      subtitle: string
    }
    process: {
      title: string
      subtitle: string
      step1: string
      step1Desc: string
      step2: string
      step2Desc: string
      step3: string
      step3Desc: string
      step4: string
      step4Desc: string
    }
    partners: {
      title: string
      subtitle: string
    }
    cta: {
      title: string
      subtitle: string
      button: string
    }
  }
  about: {
    title: string
    mission: string
    missionText: string
    hero: string
    heroDesc: string
    vision: string
    visionText: string
    values: string
    valuesText: string
    team: string
    teamDesc: string
  }
  programs: {
    title: string
    subtitle: string
    search: string
    filter: string
    allCountries: string
    viewDetails: string
    duration: string
    tuition: string
    language: string
  }
  blog: {
    title: string
    subtitle: string
    readMore: string
    backToBlog: string
    relatedPosts: string
  }
  contact: {
    title: string
    subtitle: string
    name: string
    email: string
    phone: string
    message: string
    send: string
    sending: string
    success: string
    error: string
    info: string
    infoDesc: string
    location: string
    hours: string
    hoursValue: string
  }
  footer: {
    rights: string
  }
}

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      programs: "Programs",
      blog: "Blog",
      contact: "Contact",
    },
    home: {
      hero: {
        title: "Your Gateway to Global Education",
        subtitle: "Discover world-class universities and transform your future with our expert guidance",
        cta: "Apply Now",
        explore: "Explore Programs",
        badge: "Your Future Starts Here",
      },
      features: {
        title: "Why Choose Us",
        universities: "Top Universities",
        universitiesDesc: "Access to 500+ prestigious universities worldwide",
        support: "24/7 Support",
        supportDesc: "Dedicated support throughout your journey",
        success: "95% Success Rate",
        successDesc: "Proven track record of successful applications",
      },
      stats: {
        title: "Our Impact in Numbers",
        subtitle: "Trusted by thousands of students worldwide",
        students: "Students Sent Abroad",
        countries: "Countries",
        universities: "Partner Universities",
        successRate: "Success Rate",
      },
      testimonials: {
        title: "Student Success Stories",
        subtitle: "Hear from students who achieved their dreams",
      },
      process: {
        title: "Your Journey to Success",
        subtitle: "Simple steps to study abroad",
        step1: "Consultation",
        step1Desc: "Free consultation to understand your goals and preferences",
        step2: "University Selection",
        step2Desc: "We help you choose the best universities for your profile",
        step3: "Application",
        step3Desc: "Complete application support and document preparation",
        step4: "Visa & Travel",
        step4Desc: "Visa assistance and pre-departure guidance",
      },
      partners: {
        title: "Our University Partners",
        subtitle: "Partnered with top institutions worldwide",
      },
      cta: {
        title: "Ready to Start Your Journey?",
        subtitle: "Get in touch with our expert counselors today",
        button: "Contact Us",
      },
    },
    about: {
      title: "About Us",
      hero: "Empowering Dreams, Building Futures",
      heroDesc: "We are dedicated to helping students achieve their international education goals",
      mission: "Our Mission",
      missionText:
        "We empower students to achieve their dreams of studying abroad by providing comprehensive guidance and support.",
      vision: "Our Vision",
      visionText:
        "To be the leading educational consultancy, transforming lives through global education opportunities.",
      values: "Our Values",
      valuesText: "Excellence, Integrity, Student Success, Innovation",
      team: "Our Team",
      teamDesc: "Meet the experts dedicated to your success",
    },
    programs: {
      title: "Study Abroad Programs",
      subtitle: "Explore opportunities at world-class universities",
      search: "Search programs...",
      filter: "Filter by country",
      allCountries: "All Countries",
      viewDetails: "View Details",
      duration: "Duration",
      tuition: "Tuition",
      language: "Language",
    },
    blog: {
      title: "Latest Insights",
      subtitle: "Stay updated with the latest news and tips",
      readMore: "Read More",
      backToBlog: "Back to Blog",
      relatedPosts: "Related Posts",
    },
    contact: {
      title: "Get In Touch",
      subtitle: "We're here to help you start your journey",
      name: "Your Name",
      email: "Your Email",
      phone: "Phone Number",
      message: "Your Message",
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "Failed to send message. Please try again.",
      info: "Contact Information",
      infoDesc: "Reach out to us through any of these channels",
      location: "Location",
      hours: "Working Hours",
      hoursValue: "Mon - Fri: 9:00 AM - 6:00 PM",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
  ru: {
    nav: {
      home: "Главная",
      about: "О нас",
      programs: "Программы",
      blog: "Блог",
      contact: "Контакты",
    },
    home: {
      hero: {
        title: "Ваш путь к мировому образованию",
        subtitle:
          "Откройте для себя университеты мирового класса и измените свое будущее с нашей экспертной поддержкой",
        cta: "Подать заявку",
        explore: "Изучить программы",
        badge: "Ваше будущее начинается здесь",
      },
      features: {
        title: "Почему мы",
        universities: "Лучшие университеты",
        universitiesDesc: "Доступ к 500+ престижным университетам по всему миру",
        support: "Поддержка 24/7",
        supportDesc: "Постоянная поддержка на протяжении всего пути",
        success: "95% успеха",
        successDesc: "Проверенный опыт успешных заявок",
      },
      stats: {
        title: "Наши результаты в цифрах",
        subtitle: "Нам доверяют тысячи студентов по всему миру",
        students: "Студентов отправлено",
        countries: "Стран",
        universities: "Университетов-партнеров",
        successRate: "Процент успеха",
      },
      testimonials: {
        title: "Истории успеха студентов",
        subtitle: "Узнайте от студентов, которые достигли своих мечт",
      },
      process: {
        title: "Ваш путь к успеху",
        subtitle: "Простые шаги к обучению за рубежом",
        step1: "Консультация",
        step1Desc: "Бесплатная консультация для понимания ваших целей",
        step2: "Выбор университета",
        step2Desc: "Мы поможем выбрать лучшие университеты для вашего профиля",
        step3: "Подача заявки",
        step3Desc: "Полная поддержка в подаче заявки и подготовке документов",
        step4: "Виза и поездка",
        step4Desc: "Помощь с визой и предотъездная подготовка",
      },
      partners: {
        title: "Наши университеты-партнеры",
        subtitle: "Партнерство с ведущими учебными заведениями мира",
      },
      cta: {
        title: "Готовы начать свой путь?",
        subtitle: "Свяжитесь с нашими экспертами сегодня",
        button: "Связаться с нами",
      },
    },
    about: {
      title: "О нас",
      hero: "Воплощаем мечты, строим будущее",
      heroDesc: "Мы помогаем студентам достичь целей международного образования",
      mission: "Наша миссия",
      missionText:
        "Мы помогаем студентам осуществить мечту об обучении за рубежом, предоставляя всестороннюю поддержку.",
      vision: "Наше видение",
      visionText: "Стать ведущей образовательной консультацией, меняющей жизни через возможности мирового образования.",
      values: "Наши ценности",
      valuesText: "Превосходство, Честность, Успех студентов, Инновации",
      team: "Наша команда",
      teamDesc: "Познакомьтесь с экспертами, посвятившими себя вашему успеху",
    },
    programs: {
      title: "Программы обучения за рубежом",
      subtitle: "Изучите возможности в университетах мирового класса",
      search: "Поиск программ...",
      filter: "Фильтр по стране",
      allCountries: "Все страны",
      viewDetails: "Подробнее",
      duration: "Длительность",
      tuition: "Стоимость",
      language: "Язык",
    },
    blog: {
      title: "Последние новости",
      subtitle: "Будьте в курсе последних новостей и советов",
      readMore: "Читать далее",
      backToBlog: "Вернуться к блогу",
      relatedPosts: "Похожие статьи",
    },
    contact: {
      title: "Свяжитесь с нами",
      subtitle: "Мы здесь, чтобы помочь вам начать ваш путь",
      name: "Ваше имя",
      email: "Ваш email",
      phone: "Номер телефона",
      message: "Ваше сообщение",
      send: "Отправить",
      sending: "Отправка...",
      success: "Сообщение успешно отправлено!",
      error: "Не удалось отправить сообщение. Попробуйте снова.",
      info: "Контактная информация",
      infoDesc: "Свяжитесь с нами любым удобным способом",
      location: "Местоположение",
      hours: "Часы работы",
      hoursValue: "Пн - Пт: 9:00 - 18:00",
    },
    footer: {
      rights: "Все права защищены.",
    },
  },
  uz: {
    nav: {
      home: "Bosh sahifa",
      about: "Biz haqimizda",
      programs: "Dasturlar",
      blog: "Blog",
      contact: "Aloqa",
    },
    home: {
      hero: {
        title: "Jahon ta'limiga yo'lingiz",
        subtitle:
          "Jahon darajasidagi universitetlarni kashf eting va kelajagingizni mutaxassis yo'l-yo'riq bilan o'zgartiring",
        cta: "Hozir ariza bering",
        explore: "Dasturlarni ko'rish",
        badge: "Kelajagingiz shu yerdan boshlanadi",
      },
      features: {
        title: "Nega biz",
        universities: "Eng yaxshi universitetlar",
        universitiesDesc: "Butun dunyo bo'ylab 500+ nufuzli universitetlarga kirish",
        support: "24/7 qo'llab-quvvatlash",
        supportDesc: "Yo'lingiz davomida doimiy qo'llab-quvvatlash",
        success: "95% muvaffaqiyat",
        successDesc: "Muvaffaqiyatli arizalarning isbotlangan tajribasi",
      },
      stats: {
        title: "Bizning natijalarimiz raqamlarda",
        subtitle: "Butun dunyo bo'ylab minglab talabalar bizga ishonadi",
        students: "Talabalar jo'natildi",
        countries: "Mamlakatlar",
        universities: "Hamkor universitetlar",
        successRate: "Muvaffaqiyat darajasi",
      },
      testimonials: {
        title: "Talabalar muvaffaqiyat hikoyalari",
        subtitle: "Orzulariga erishgan talabalardan eshiting",
      },
      process: {
        title: "Muvaffaqiyatga yo'lingiz",
        subtitle: "Chet elda o'qishning oddiy qadamlari",
        step1: "Konsultatsiya",
        step1Desc: "Maqsadlaringizni tushunish uchun bepul konsultatsiya",
        step2: "Universitet tanlash",
        step2Desc: "Profilingiz uchun eng yaxshi universitetlarni tanlashda yordam beramiz",
        step3: "Ariza berish",
        step3Desc: "To'liq ariza qo'llab-quvvatlash va hujjatlarni tayyorlash",
        step4: "Viza va sayohat",
        step4Desc: "Viza yordami va jo'nash oldidan yo'l-yo'riq",
      },
      partners: {
        title: "Hamkor universitetlarimiz",
        subtitle: "Dunyo bo'ylab yetakchi ta'lim muassasalari bilan hamkorlik",
      },
      cta: {
        title: "Yo'lingizni boshlashga tayyormisiz?",
        subtitle: "Bugun mutaxassis maslahatchilarimiz bilan bog'laning",
        button: "Biz bilan bog'laning",
      },
    },
    about: {
      title: "Biz haqimizda",
      hero: "Orzularni amalga oshirish, kelajakni qurish",
      heroDesc: "Biz talabalarga xalqaro ta'lim maqsadlariga erishishda yordam beramiz",
      mission: "Bizning missiyamiz",
      missionText:
        "Biz talabalarga chet elda o'qish orzularini amalga oshirishda keng qamrovli yo'l-yo'riq va qo'llab-quvvatlash orqali yordam beramiz.",
      vision: "Bizning ko'z o'ngimiz",
      visionText: "Jahon ta'limi imkoniyatlari orqali hayotni o'zgartiruvchi yetakchi ta'lim konsaltingi bo'lish.",
      values: "Bizning qadriyatlarimiz",
      valuesText: "Mukammallik, Halollik, Talabalar muvaffaqiyati, Innovatsiya",
      team: "Bizning jamoa",
      teamDesc: "Muvaffaqiyatingizga bag'ishlangan mutaxassislar bilan tanishing",
    },
    programs: {
      title: "Chet elda o'qish dasturlari",
      subtitle: "Jahon darajasidagi universitetlarda imkoniyatlarni o'rganing",
      search: "Dasturlarni qidirish...",
      filter: "Mamlakat bo'yicha filtrlash",
      allCountries: "Barcha mamlakatlar",
      viewDetails: "Batafsil",
      duration: "Davomiyligi",
      tuition: "Narxi",
      language: "Til",
    },
    blog: {
      title: "So'nggi yangiliklar",
      subtitle: "So'nggi yangiliklar va maslahatlar bilan tanishing",
      readMore: "Batafsil",
      backToBlog: "Blogga qaytish",
      relatedPosts: "O'xshash maqolalar",
    },
    contact: {
      title: "Biz bilan bog'laning",
      subtitle: "Yo'lingizni boshlashda sizga yordam berish uchun shu yerdamiz",
      name: "Ismingiz",
      email: "Emailingiz",
      phone: "Telefon raqami",
      message: "Xabaringiz",
      send: "Yuborish",
      sending: "Yuborilmoqda...",
      success: "Xabar muvaffaqiyatli yuborildi!",
      error: "Xabarni yuborib bo'lmadi. Qaytadan urinib ko'ring.",
      info: "Aloqa ma'lumotlari",
      infoDesc: "Biz bilan istalgan usulda bog'laning",
      location: "Manzil",
      hours: "Ish vaqti",
      hoursValue: "Dush - Jum: 9:00 - 18:00",
    },
    footer: {
      rights: "Barcha huquqlar himoyalangan.",
    },
  },
}
