'use client'
import { Locale } from '@/types'
import Script from 'next/script'
import React from 'react'

export default function Widget(params: {locale: Locale}) {
    const key = params.locale === "me" ? "c14f2d91-6005-4b3a-ab4c-30d621fde5b9" : params.locale === "en" ? "466cb5d3-77d3-480c-ac68-e465257f9517" :  params.locale === "ru" ? "fe5633e7-e212-413b-8b79-9b129dcdc6d7" : "35039ed9-5330-40cf-897d-2dee7d19d00b"
  return (



    <Script
      src="https://widget.starko.one/widget.js"
      onLoad={() => {
        (window as any).initWidget(key);
      }}
    ></Script>
  


  )
}
