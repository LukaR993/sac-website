import { Locale } from "@/types";
import { getDictionary } from "@/utils/dictionaries";
import React from "react";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

export default async function Contacts({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  return (
    <main className="min-h-screen ">
      {/* Contact Information Section */}
      <section className="py-16 bg-white ">
        <div className="container mx-auto flex flex-col-reverse gap-12 items-center  px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#7D1C21] text-center mb-12">{dict.contacts.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg border text-center">
              <MapPin className="w-12 h-12 text-[#7D1C21] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{dict.contacts.address.title}</h3>
              <p className="text-gray-600">Novo selo bb</p>
              <p className="text-gray-600">81410 Danilovgrad</p>
              <p className="text-gray-600">Crna Gora</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border text-center">
              <Phone className="w-12 h-12 text-[#7D1C21] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{dict.contacts.phone.title}</h3>
             
              <p className="text-gray-600">Mob: +382 69 010 766</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border text-center">
              <Mail className="w-12 h-12 text-[#7D1C21] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{dict.contacts.email.title}</h3>
              <p className="text-gray-600">sacpg@t-com.me</p>
              <p className="text-gray-600">sach-ireks@t-com.me</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border text-center">
              <Globe className="w-12 h-12 text-[#7D1C21] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{dict.contacts.website.title}</h3>
              <p className="text-gray-600">www.sac-cg.com</p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className=" mx-auto w-full">
            <h2 className="text-3xl font-bold text-[#7D1C21] text-center mb-8">{dict.contacts.form.title}</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {dict.contacts.form.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#7D1C21] focus:border-[#7D1C21]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {dict.contacts.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#7D1C21] focus:border-[#7D1C21]"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.contacts.form.subject}
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#7D1C21] focus:border-[#7D1C21]"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {dict.contacts.form.message}
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#7D1C21] focus:border-[#7D1C21]"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#7D1C21] text-white px-8 py-3 rounded-md hover:bg-[#9B2C32] transition-colors text-lg"
                >
                  {dict.contacts.form.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px]">
        <div className="h-full w-full">
          {/* Add your map component here */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1457.1195477215665!2d19.147291439925404!3d42.500421100238576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134deb077b4cdb5b%3A0xb06a7dadfad7b1ac!2sSA%C4%8C%20d.o.o.!5e1!3m2!1sen!2s!4v1746447265937!5m2!1sen!2s"
            className="w-full h-full"
            style={{border: 0}}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
} 