
'use client';
import { useState } from 'react';
import { useTranslation } from "@/hooks/useTranslation";

export default function AboutSection() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('story');

  const sections = [
    { id: 'story', label: t('about.story') },
    { id: 'impact', label: t('about.impact') },
    { id: 'mission', label: t('about.mission') }
  ];

  const getContent = (sectionId: string) => {
    switch (sectionId) {
      case 'story':
        return t('about.storyContent');
      case 'impact':
        return t('about.impactContent');
      case 'mission':
        return t('about.missionContent');
      default:
        return '';
    }
  };

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl font-bold text-center text-gray-800 mb-12">
          {t('about.title')}
        </h3>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all font-medium ${
                        activeSection === section.id
                          ? 'bg-orange-500 text-white shadow-md'
                          : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Right Content */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 min-h-[400px]">
                <h4 className="text-2xl font-bold text-gray-800 mb-6 text-orange-600">
                  {sections.find(s => s.id === activeSection)?.label}
                </h4>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {getContent(activeSection)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
