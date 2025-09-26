import React, { useState, useEffect } from 'react';
import { ExternalLink, MapPin, Users, Calendar, DollarSign, Clock } from 'lucide-react';

const GovJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'UPSC', 'SSC', 'Banking', 'Railways', 'Defense', 'State PSC'];

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter(job => job.category === activeFilter));
    }
  }, [jobs, activeFilter]);

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/gov-jobs');
      const data = await response.json();
      setJobs(data);
      setFilteredJobs(data);
    } catch (error) {
      console.error('Error fetching government jobs:', error);
      // Fallback data
      const fallbackJobs = [
        {
          id: 1,
          title: 'Civil Services Examination',
          organization: 'UPSC',
          category: 'UPSC',
          status: 'Open',
          description: 'Recruitment for IAS, IPS, IFS and other Group A services',
          vacancies: 861,
          location: 'Pan India',
          qualification: 'Graduate from recognized university',
          salary: '₹56,100 - ₹2,50,000',
          age_limit: '21-32 years',
          apply_by: '31st March 2025',
          exam_dates: {
            prelims: 'June 2025',
            mains: 'October 2025'
          },
          apply_link: '#'
        },
        {
          id: 2,
          title: 'SSC Combined Graduate Level',
          organization: 'Staff Selection Commission',
          category: 'SSC',
          status: 'Open',
          description: 'Recruitment for Group B and C posts in various ministries',
          vacancies: 3261,
          location: 'Various States',
          qualification: 'Bachelor degree from recognized university',
          salary: '₹25,500 - ₹81,100',
          age_limit: '18-27 years',
          apply_by: '15th February 2025',
          exam_dates: {
            tier1: 'April 2025',
            tier2: 'June 2025'
          },
          apply_link: '#'
        },
        {
          id: 3,
          title: 'SBI Probationary Officer',
          organization: 'State Bank of India',
          category: 'Banking',
          status: 'Open',
          description: 'Recruitment for Probationary Officer positions',
          vacancies: 2000,
          location: 'Pan India',
          qualification: 'Graduate in any discipline',
          salary: '₹27,620 - ₹50,000',
          age_limit: '21-30 years',
          apply_by: '20th March 2025',
          exam_dates: {
            prelims: 'May 2025',
            mains: 'July 2025'
          },
          apply_link: '#'
        },
        {
          id: 4,
          title: 'Railway Recruitment Board NTPC',
          organization: 'Indian Railways',
          category: 'Railways',
          status: 'Closing Soon',
          description: 'Non-Technical Popular Categories recruitment',
          vacancies: 35281,
          location: 'Pan India',
          qualification: 'Graduate/Undergraduate as per post',
          salary: '₹19,900 - ₹63,200',
          age_limit: '18-33 years',
          apply_by: '31st January 2025',
          exam_dates: {
            cbt1: 'March 2025',
            cbt2: 'May 2025'
          },
          apply_link: '#'
        },
        {
          id: 5,
          title: 'Indian Army Technical Entry Scheme',
          organization: 'Indian Army',
          category: 'Defense',
          status: 'Open',
          description: 'Direct entry for Engineering graduates',
          vacancies: 40,
          location: 'Various Cantonments',
          qualification: 'BE/B.Tech in specified branches',
          salary: '₹56,100 - ₹1,77,500',
          age_limit: '20-27 years',
          apply_by: '28th February 2025',
          exam_dates: {
            ssb: 'April-June 2025'
          },
          apply_link: '#'
        },
        {
          id: 6,
          title: 'Andhra Pradesh Public Service Commission',
          organization: 'APPSC',
          category: 'State PSC',
          status: 'Open',
          description: 'Group I Services recruitment',
          vacancies: 503,
          location: 'Andhra Pradesh',
          qualification: 'Graduate from recognized university',
          salary: '₹36,400 - ₹1,16,600',
          age_limit: '21-42 years',
          apply_by: '15th March 2025',
          exam_dates: {
            prelims: 'May 2025',
            mains: 'August 2025'
          },
          apply_link: '#'
        }
      ];
      setJobs(fallbackJobs);
      setFilteredJobs(fallbackJobs);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-green-100 text-green-800';
      case 'Closing Soon': return 'bg-red-100 text-red-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Government Job Notifications</h1>
          <p className="text-lg text-gray-600 mt-2">Stay updated with the latest government job opportunities across India</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-sm border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Filter by Category:</span>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === filter
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.category === 'UPSC' ? 'bg-blue-100 text-blue-800' : job.category === 'SSC' ? 'bg-green-100 text-green-800' : job.category === 'Banking' ? 'bg-purple-100 text-purple-800' : job.category === 'Railways' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'}`}>
                          {job.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{job.organization}</p>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{job.vacancies} vacancies</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Apply by: {job.apply_by}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Age: {job.age_limit}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Qualification:</h4>
                      <p className="text-sm text-gray-600">{job.qualification}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Salary:</h4>
                      <p className="text-sm text-green-600 font-medium">{job.salary}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Important Dates:</h4>
                      <div className="space-y-1">
                        {Object.entries(job.exam_dates).map(([key, value]) => (
                          <p key={key} className="text-sm text-gray-600">
                            <span className="capitalize">{key}:</span> {value}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <a
                      href={job.apply_link}
                      className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Apply Now
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No jobs found for the selected category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GovJobs;