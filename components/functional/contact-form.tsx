'use client'

import { createTicket } from '@/actions/starko';
import { useState } from 'react';
import { toast } from 'sonner';
import { CheckCircle2 } from 'lucide-react';

interface ContactFormProps {
  dict: {
    contacts: {
      form: {
        name: string;
        email: string;
        subject: string;
        message: string;
        submit: string;
        success: {
          title: string;
          message: string;
          button: string;
        };
      };
    };
  };
}

export default function ContactForm({ dict }: ContactFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createTicket({
        title: formData.subject,
        description: formData.message,
        priority: 'medium',
        status: 'open',
        name: formData.name,
        email: formData.email,
        phone: '',
        location: '',
        attachments: [],
        locale: 'me'
      });

      setIsSuccess(true);
      toast.success(dict.contacts.form.success.message);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12 px-4 bg-green-50 rounded-lg border border-green-200">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-green-800 mb-2">{dict.contacts.form.success.title}</h3>
        <p className="text-green-600 mb-6">{dict.contacts.form.success.message}</p>
        <button
          onClick={() => setIsSuccess(false)}
          className="text-green-700 hover:text-green-800 font-medium underline"
        >
          {dict.contacts.form.success.button}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            {dict.contacts.form.name}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
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
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
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
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#7D1C21] focus:border-[#7D1C21]"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          {dict.contacts.form.message}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#7D1C21] focus:border-[#7D1C21]"
        ></textarea>
      </div>
      <div className="text-center">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#7D1C21] text-white px-8 py-3 rounded-md hover:bg-[#9B2C32] transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Sending...' : dict.contacts.form.submit}
        </button>
      </div>
    </form>
  );
} 