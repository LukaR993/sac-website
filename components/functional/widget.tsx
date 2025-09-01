'use client'
import { Locale } from '@/types'
import Script from 'next/script'
import React, { useEffect, useState } from 'react'

const translations = {
  me: {
    customTexts: {
      homePage: {
        greeting: 'Kako Vam možemo pomoći?',
        chatWithUs: 'Razgovarajte sa nama',
        reportProblem: 'Prijavite problem ovdje 👉',
        newMessage: 'Nova poruka',
        logoutAriaLabel: 'Odjavite se',
        searchPlaceholder: 'Pretraži'
      },
      reportProblem: {
        title: 'Prijavite problem',
        description: 'Molimo opišite problem koji imate.',
        titleLabel: 'Naslov',
        titlePlaceholder: 'Problem',
        descriptionLabel: 'Opis',
        descriptionPlaceholder: 'Opis problema',
        attachmentsLabel: 'Prilozi',
        uploadingText: 'Učitavanje...',
        addMoreFiles: 'Dodajte još datoteka',
        uploadFilesHint: 'Dodajte datoteke (max 10MB)',
        attachedFiles: 'Priložene datoteke',
        removeFileAriaLabel: 'Ukloni'
      },
      verifyEmail: {
        title: 'Potvrdite svoju e-mail adresu',
        description: 'Poslali smo Vam kod za verifikaciju. Molimo unesite ga ispod.',
        resendCode: 'Pošalji kod ponovo',
        verifyButton: 'Potvrdi'
      },
      common: {
        loading: 'Učitavanje...',
        error: 'Nešto nije u redu',
        retry: 'Pokušaj ponovo'
      },
      register: {
        title: 'Registracija',
        emailLabel: 'E-mail',
        emailPlaceholder: 'Unesite e-mail',
        nameLabel: 'Ime',
        namePlaceholder: 'Unesite ime',
        registerButton: 'Registrujte se',
        verificationCodeText: 'Poslaćemo Vam verifikacioni kod da potvrdimo Vaš identitet.'
      },
      article: {
        backButton: 'Nazad',
        shareButton: 'Podeli',
        relatedArticles: 'Srodni članci'
      },
      tickets: {
        title: 'Vaši tiketovi',
        noTickets: 'Nemate tiketova',
        status: 'Status',
        date: 'Datum',
        viewDetails: 'Pogledaj detalje'
      },
      success: {
        title: 'Uspešno!',
        description: 'Vaš zahtev je uspešno poslat.',
        backToHome: 'Nazad na početnu'
      },
      chat: {
        sendButton: 'Pošalji',
        inputPlaceholder: 'Unesite poruku...',
        typingIndicator: 'piše...',
        messageSent: 'Poruka poslana',
        messageDelivered: 'Poruka dostavljena',
        messageRead: 'Poruka pročitana',
        noMessages: 'Nema poruka',
        startChat: 'Započnite razgovor'
      },
      ai: {
        title: 'AI Asistent',
        askQuestion: 'Postavite pitanje',
        send: 'Pošalji',
        thinking: 'Razmišljam...',
        noAnswer: 'Nisam mogao da pronađem odgovor'
      },
      messageUs: {
        title: 'Pošaljite nam poruku',
        message: 'Poruka',
        send: 'Pošalji',
        messagePlaceholder: 'Unesite svoju poruku ovde...'
      }
    }
  },
  en: {
    customTexts: {
      homePage: {
        greeting: 'How can we help you?',
        chatWithUs: 'Chat with us',
        reportProblem: 'Report a problem here 👉',
        newMessage: 'New message',
        logoutAriaLabel: 'Logout',
        searchPlaceholder: 'Search'
      },
      reportProblem: {
        title: 'Report a problem',
        description: 'Please describe the problem you are experiencing.',
        titleLabel: 'Title',
        titlePlaceholder: 'Problem',
        descriptionLabel: 'Description',
        descriptionPlaceholder: 'Problem description',
        attachmentsLabel: 'Attachments',
        uploadingText: 'Uploading...',
        addMoreFiles: 'Add more files',
        uploadFilesHint: 'Add files (max 10MB)',
        attachedFiles: 'Attached files',
        removeFileAriaLabel: 'Remove'
      },
      verifyEmail: {
        title: 'Verify your email address',
        description: 'We sent you a verification code. Please enter it below.',
        resendCode: 'Resend code',
        verifyButton: 'Verify'
      },
      common: {
        loading: 'Loading...',
        error: 'Something went wrong',
        retry: 'Try again'
      },
      register: {
        title: 'Registration',
        emailLabel: 'Email',
        emailPlaceholder: 'Enter email',
        nameLabel: 'Name',
        namePlaceholder: 'Enter name',
        registerButton: 'Register',
        verificationCodeText: 'We will send you a verification code to confirm your identity.'
      },
      article: {
        backButton: 'Back',
        shareButton: 'Share',
        relatedArticles: 'Related articles'
      },
      tickets: {
        title: 'Your tickets',
        noTickets: 'No tickets',
        status: 'Status',
        date: 'Date',
        viewDetails: 'View details'
      },
      success: {
        title: 'Success!',
        description: 'Your request has been sent successfully.',
        backToHome: 'Back to home'
      },
      chat: {
        sendButton: 'Send',
        inputPlaceholder: 'Enter message...',
        typingIndicator: 'typing...',
        messageSent: 'Message sent',
        messageDelivered: 'Message delivered',
        messageRead: 'Message read',
        noMessages: 'No messages',
        startChat: 'Start conversation'
      },
      ai: {
        title: 'AI Assistant',
        askQuestion: 'Ask a question',
        send: 'Send',
        thinking: 'Thinking...',
        noAnswer: 'I could not find an answer'
      },
      messageUs: {
        title: 'Send us a message',
        message: 'Message',
        send: 'Send',
        messagePlaceholder: 'Enter your message here...'
      }
    }
  },
  ru: {
    customTexts: {
      homePage: {
        greeting: 'Как мы можем вам помочь?',
        chatWithUs: 'Чат с нами',
        reportProblem: 'Сообщить о проблеме здесь 👉',
        newMessage: 'Новое сообщение',
        logoutAriaLabel: 'Выйти',
        searchPlaceholder: 'Поиск'
      },
      reportProblem: {
        title: 'Сообщить о проблеме',
        description: 'Пожалуйста, опишите проблему, с которой вы столкнулись.',
        titleLabel: 'Заголовок',
        titlePlaceholder: 'Проблема',
        descriptionLabel: 'Описание',
        descriptionPlaceholder: 'Описание проблемы',
        attachmentsLabel: 'Вложения',
        uploadingText: 'Загрузка...',
        addMoreFiles: 'Добавить еще файлы',
        uploadFilesHint: 'Добавить файлы (макс. 10МБ)',
        attachedFiles: 'Прикрепленные файлы',
        removeFileAriaLabel: 'Удалить'
      },
      verifyEmail: {
        title: 'Подтвердите ваш email',
        description: 'Мы отправили вам код подтверждения. Пожалуйста, введите его ниже.',
        resendCode: 'Отправить код повторно',
        verifyButton: 'Подтвердить'
      },
      common: {
        loading: 'Загрузка...',
        error: 'Что-то пошло не так',
        retry: 'Попробовать снова'
      },
      register: {
        title: 'Регистрация',
        emailLabel: 'Email',
        emailPlaceholder: 'Введите email',
        nameLabel: 'Имя',
        namePlaceholder: 'Введите имя',
        registerButton: 'Зарегистрироваться',
        verificationCodeText: 'Мы отправим вам код подтверждения для подтверждения вашей личности.'
      },
      article: {
        backButton: 'Назад',
        shareButton: 'Поделиться',
        relatedArticles: 'Похожие статьи'
      },
      tickets: {
        title: 'Ваши тикеты',
        noTickets: 'Нет тикетов',
        status: 'Статус',
        date: 'Дата',
        viewDetails: 'Посмотреть детали'
      },
      success: {
        title: 'Успешно!',
        description: 'Ваш запрос был успешно отправлен.',
        backToHome: 'Вернуться на главную'
      },
      chat: {
        sendButton: 'Отправить',
        inputPlaceholder: 'Введите сообщение...',
        typingIndicator: 'печатает...',
        messageSent: 'Сообщение отправлено',
        messageDelivered: 'Сообщение доставлено',
        messageRead: 'Сообщение прочитано',
        noMessages: 'Нет сообщений',
        startChat: 'Начать разговор'
      },
      ai: {
        title: 'ИИ Ассистент',
        askQuestion: 'Задать вопрос',
        send: 'Отправить',
        thinking: 'Думаю...',
        noAnswer: 'Не смог найти ответ'
      },
      messageUs: {
        title: 'Отправить нам сообщение',
        message: 'Сообщение',
        send: 'Отправить',
        messagePlaceholder: 'Введите ваше сообщение здесь...'
      }
    }
  },
  sq: {
    customTexts: {
      homePage: {
        greeting: 'Si mund t\'ju ndihmojmë?',
        chatWithUs: 'Bisedoni me ne',
        reportProblem: 'Raporton një problem këtu 👉',
        newMessage: 'Mesazh i ri',
        logoutAriaLabel: 'Dilni',
        searchPlaceholder: 'Kërkoni'
      },
      reportProblem: {
        title: 'Raporton një problem',
        description: 'Ju lutemi përshkruani problemin që po hasni.',
        titleLabel: 'Titulli',
        titlePlaceholder: 'Problem',
        descriptionLabel: 'Përshkrimi',
        descriptionPlaceholder: 'Përshkrimi i problemit',
        attachmentsLabel: 'Bashkëngjitjet',
        uploadingText: 'Duke ngarkuar...',
        addMoreFiles: 'Shtoni më shumë skedarë',
        uploadFilesHint: 'Shtoni skedarë (maksimumi 10MB)',
        attachedFiles: 'Skedarët e bashkëngjitur',
        removeFileAriaLabel: 'Hiqni'
      },
      verifyEmail: {
        title: 'Verifikoni adresën tuaj të emailit',
        description: 'Ju dërguam një kod verifikimi. Ju lutemi shkruajeni më poshtë.',
        resendCode: 'Dërgo kodin përsëri',
        verifyButton: 'Verifiko'
      },
      common: {
        loading: 'Duke ngarkuar...',
        error: 'Diçka shkoi keq',
        retry: 'Provo përsëri'
      },
      register: {
        title: 'Regjistrimi',
        emailLabel: 'Email',
        emailPlaceholder: 'Shkruani emailin',
        nameLabel: 'Emri',
        namePlaceholder: 'Shkruani emrin',
        registerButton: 'Regjistrohuni',
        verificationCodeText: 'Do t\'ju dërgojmë një kod verifikimi për të konfirmuar identitetin tuaj.'
      },
      article: {
        backButton: 'Kthehu',
        shareButton: 'Ndani',
        relatedArticles: 'Artikuj të ngjashëm'
      },
      tickets: {
        title: 'Biletat tuaja',
        noTickets: 'Nuk keni bileta',
        status: 'Statusi',
        date: 'Data',
        viewDetails: 'Shikoni detajet'
      },
      success: {
        title: 'Sukses!',
        description: 'Kërkesa juaj u dërgua me sukses.',
        backToHome: 'Kthehu në shtëpi'
      },
      chat: {
        sendButton: 'Dërgo',
        inputPlaceholder: 'Shkruani mesazhin...',
        typingIndicator: 'po shkruan...',
        messageSent: 'Mesazhi u dërgua',
        messageDelivered: 'Mesazhi u dorëzua',
        messageRead: 'Mesazhi u lexua',
        noMessages: 'Nuk ka mesazhe',
        startChat: 'Filloni bisedën'
      },
      ai: {
        title: 'Ndihmësi AI',
        askQuestion: 'Bëni një pyetje',
        send: 'Dërgo',
        thinking: 'Duke menduar...',
        noAnswer: 'Nuk mund të gjeja një përgjigje'
      },
      messageUs: {
        title: 'Na dërgoni një mesazh',
        message: 'Mesazhi',
        send: 'Dërgo',
        messagePlaceholder: 'Shkruani mesazhin tuaj këtu...'
      }
    }
  }
};

export default function Widget(params: {locale: Locale}) {
    const [key, setKey] = useState(params.locale === "me" ? "c14f2d91-6005-4b3a-ab4c-30d621fde5b9" : params.locale === "en" ? "466cb5d3-77d3-480c-ac68-e465257f9517" :  params.locale === "ru" ? "fe5633e7-e212-413b-8b79-9b129dcdc6d7" : "35039ed9-5330-40cf-897d-2dee7d19d00b")
    const [currentTranslations, setCurrentTranslations] = useState(translations[params.locale as keyof typeof translations] || translations.en)
    const [scriptLoaded, setScriptLoaded] = useState(false)
    
    const getKeyForLocale = (locale: Locale) => {
      return locale === "me" ? "c14f2d91-6005-4b3a-ab4c-30d621fde5b9" : 
             locale === "en" ? "466cb5d3-77d3-480c-ac68-e465257f9517" : 
             locale === "ru" ? "fe5633e7-e212-413b-8b79-9b129dcdc6d7" : 
             "35039ed9-5330-40cf-897d-2dee7d19d00b"
    }

    const initializeWidget = () => {
      if (typeof window !== 'undefined' && (window as unknown as {initWidget: (key: string, config?: any) => void}).initWidget) {
        (window as unknown as {initWidget: (key: string, config?: any) => void}).initWidget(key, currentTranslations)
      }
    }
   
    useEffect(() => {
      const newKey = getKeyForLocale(params.locale)
      const newTranslations = translations[params.locale as keyof typeof translations] || translations.en
      
      setKey(newKey)
      setCurrentTranslations(newTranslations)
      
      // If script is already loaded, reinitialize with new settings
      if (scriptLoaded) {
        initializeWidget()
      }
    }, [params.locale, scriptLoaded])

    const handleScriptLoad = () => {
      setScriptLoaded(true)
      initializeWidget()
    }

  return (
    <Script
      src="https://widget.starko.one/widget.js"
      onLoad={handleScriptLoad}
    />
  )
}

