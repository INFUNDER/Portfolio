import React, { useState } from 'react';
import { FaGraduationCap, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';

const Timeline = () => {
  const [activeTab, setActiveTab] = useState('Education');

  const educationData = [
    {
      title: 'Web Design',
      location: 'Spain - Institute',
      date: '2021 - Present'
    },
    {
      title: 'Web Development',
      location: 'Spain - Institute',
      date: '2018 - 2020'
    },
  ];

  const experienceData = [
    {
      title: 'Art Director',
      location: 'Spain - Institute',
      date: '2020 - 2021'
    },
    {
      title: 'UX Expert',
      location: 'Spain - Institute',
      date: '2017 - 2018'
    },
  ];

  const data = activeTab === 'Education' ? educationData : experienceData;

  return (
    <div className="container mx-auto px-4 py-10 text-center">
      <h3 className="text-gray-500 mb-6">My personal journey</h3>
      <div className="flex justify-center space-x-8 mb-10">
        <button
          onClick={() => setActiveTab('Education')}
          className={`flex items-center space-x-2 px-4 py-2 rounded ${
            activeTab === 'Education' ? 'text-black font-semibold' : 'text-gray-400'
          }`}
        >
          <FaGraduationCap />
          <span>Education</span>
        </button>
        <button
          onClick={() => setActiveTab('Experience')}
          className={`flex items-center space-x-2 px-4 py-2 rounded ${
            activeTab === 'Experience' ? 'text-black font-semibold' : 'text-gray-400'
          }`}
        >
          <FaBriefcase />
          <span>Experience</span>
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.map((item, index) => (
            <div key={index} className={`flex items-start ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
              <div className="flex flex-col items-center w-6 h-6 rounded-full bg-gray-500"></div>

              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'text-right' : 'text-left'} px-4`}>
                <h4 className="text-lg font-semibold">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.location}</p>
                <div className="flex items-center justify-${index % 2 === 0 ? 'end' : 'start'} text-gray-500">
                  <FaCalendarAlt className="mr-2" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
