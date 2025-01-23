"use client"
import React from 'react';
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";

const LandingPage = () => {

    const router = useRouter();
    
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="text-2xl font-bold text-indigo-600">
            <Image src={'/logo.svg'} alt='logo' width={100} height={100} /></div>
          <div>
          <Button variant="secondary" className="w-full my-3 text-1xl text-primary"
           onClick={() => router.push("/dashboard")}>
            Get Started
          </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            AI Content <span className='text-indigo-600'>Generator</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Revolutionize your content creation with our AI-powered app,
            delivering engaging and high-quality text in seconds.
          </p>
          <button  className="px-6 py-3  bg-indigo-600 text-white text-lg font-medium rounded hover:bg-indigo-700"
          onClick={() => router.push("/dashboard")}>
            Get Started →
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          <FeatureCard
            title="25+ Templates"
            description="Responsive and mobile-first designs for all your needs."
            icon="📄"
          />
          <FeatureCard
            title="Customizable"
            description="Easily extendable components to match your style."
            icon="⚙️"
          />
          <FeatureCard
            title="Free to Use"
            description="All features are well-documented and free to use."
            icon="💸"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center text-sm">
          © {new Date().getFullYear()} AI Content Generator. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) => (
  <div className="bg-gray-100 p-6 rounded shadow hover:shadow-lg transition">
    <div className="text-3xl">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800 mt-4">{title}</h3>
    <p className="text-gray-600 mt-2">{description}</p>
  </div>
);

export default LandingPage;
