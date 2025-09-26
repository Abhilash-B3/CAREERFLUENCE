import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, TrendingUp, Award, Microscope, Calculator, TrendingUp as TrendIcon, Wrench } from 'lucide-react';

const Home = () => {
  const [streams, setStreams] = useState([]);
  const [stats, setStats] = useState({
    studentsGuided: 0,
    careerPaths: 0,
    successRate: 0
  });

  useEffect(() => {
    fetchStreams();
    fetchStats();
  }, []);

  const fetchStreams = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/streams');
      const data = await response.json();
      setStreams(data);
    } catch (error) {
      console.error('Error fetching streams:', error);
      // Fallback data for development
      setStreams([
        {
          id: 'bipc',
          name: 'BiPC',
          full_name: 'Biology, Physics, Chemistry',
          description: 'Perfect for aspiring medical professionals and life science enthusiasts',
          icon: 'microscope',
          color: 'green',
          popular_courses: ['MBBS', 'BDS', 'BAMS', '+2 more']
        },
        {
          id: 'mpc',
          name: 'MPC',
          full_name: 'Mathematics, Physics, Chemistry',
          description: 'Ideal for engineering and scientific research careers',
          icon: 'calculator',
          color: 'blue',
          popular_courses: ['B.Tech', 'B.Sc Physics', 'B.Arch', '+1 more']
        },
        {
          id: 'cec',
          name: 'CEC',
          full_name: 'Commerce, Economics, Civics',
          description: 'Gateway to business, finance, and commerce careers',
          icon: 'trending-up',
          color: 'purple',
          popular_courses: ['B.Com', 'BBA', 'CA', '+2 more']
        },
        {
          id: 'diploma',
          name: 'Diploma',
          full_name: 'Technical Diploma Courses',
          description: 'Hands-on technical skills for immediate career opportunities',
          icon: 'wrench',
          color: 'orange',
          popular_courses: ['Civil', 'Mechanical', 'Electrical', '+1 more']
        }
      ]);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Fallback stats
      setStats({
        studentsGuided: 10000,
        careerPaths: 500,
        successRate: 95
      });
    }
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'microscope': return <Microscope className="h-8 w-8" />;
      case 'calculator': return <Calculator className="h-8 w-8" />;
      case 'trending-up': return <TrendIcon className="h-8 w-8" />;
      case 'wrench': return <Wrench className="h-8 w-8" />;
      default: return <Users className="h-8 w-8" />;
    }
  };

  const getColorClasses = (color) => {
    switch (color) {
      case 'green': return 'bg-green-500 hover:bg-green-600 text-white';
      case 'blue': return 'bg-blue-500 hover:bg-blue-600 text-white';
      case 'purple': return 'bg-purple-500 hover:bg-purple-600 text-white';
      case 'orange': return 'bg-orange-500 hover:bg-orange-600 text-white';
      default: return 'bg-indigo-500 hover:bg-indigo-600 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Choose Your <span className="text-indigo-600">Career Path</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Discover the perfect academic stream after your 10th grade and explore endless career possibilities with data-driven insights and expert guidance.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-12 w-12 text-indigo-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stats.studentsGuided.toLocaleString()}+</div>
              <div className="text-gray-600">Students Guided</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="h-12 w-12 text-indigo-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stats.careerPaths}+</div>
              <div className="text-gray-600">Career Paths</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <Award className="h-12 w-12 text-indigo-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stats.successRate}%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {streams.map((stream) => (
            <Link key={stream.id} to={`/stream/${stream.id}`}>
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 h-full">
                <div className={`w-16 h-16 rounded-full ${getColorClasses(stream.color)} flex items-center justify-center mb-6 mx-auto`}>
                  {getIcon(stream.icon)}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{stream.name}</h3>
                <p className="text-sm text-indigo-600 font-medium mb-4">{stream.full_name}</p>
                <p className="text-gray-600 mb-6">{stream.description}</p>
                
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-900">Popular Courses:</p>
                  <div className="flex flex-wrap gap-1">
                    {stream.popular_courses.map((course, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="text-indigo-600 font-medium flex items-center">
                    Explore Stream →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CF</span>
                </div>
                <span className="text-xl font-bold">CareerFluence</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Empowering students to make informed career decisions with data-driven insights and expert guidance for a successful future.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <div className="w-6 h-6 bg-gray-600 rounded"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <div className="w-6 h-6 bg-gray-600 rounded"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <div className="w-6 h-6 bg-gray-600 rounded"></div>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Streams</a></li>
                <li><a href="/government-jobs" className="text-gray-400 hover:text-white transition-colors">Government Jobs</a></li>
                <li><a href="/analytics" className="text-gray-400 hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 CareerFluence. All rights reserved. Made with ❤️ for students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;