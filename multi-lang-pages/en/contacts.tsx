import { Locale } from "@/types";
import { getDictionary } from "@/utils/dictionaries";
import React from "react";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

export default async function Contacts({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  return (
    <main className="min-h-screen">
      {/* Contact Information Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#7D1C21] text-center mb-12">{dict.contacts.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <MapPin className="w-12 h-12 text-[#7D1C21] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{dict.contacts.address.title}</h3>
              <p className="text-gray-600">{dict.contacts.address.value}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Phone className="w-12 h-12 text-[#7D1C21] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{dict.contacts.phone.title}</h3>
              <p className="text-gray-600">{dict.contacts.phone.value}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Mail className="w-12 h-12 text-[#7D1C21] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{dict.contacts.email.title}</h3>
              <p className="text-gray-600">{dict.contacts.email.value}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Globe className="w-12 h-12 text-[#7D1C21] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{dict.contacts.website.title}</h3>
              <p className="text-gray-600">{dict.contacts.website.value}</p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-3xl mx-auto">
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
      <section className="h-[500px] bg-gray-100">
        <div className="h-full w-full">
          {/* Add your map component here */}
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Map will be integrated here</p>
          </div>
        </div>
      </section>
    </main>
  );
} 