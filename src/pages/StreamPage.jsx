import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, TrendingUp, Star, ExternalLink, Calendar, MapPin, Users, DollarSign } from 'lucide-react';

const StreamPage = () => {
  const { id } = useParams();
  const [streamData, setStreamData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchStreamData();
    fetchCourses();
    fetchJobs();
  }, [id]);

  const fetchStreamData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/streams/${id}`);
      const data = await response.json();
      setStreamData(data);
    } catch (error) {
      console.error('Error fetching stream data:', error);
      // Fallback data
      setStreamData({
        id: id,
        name: id.toUpperCase(),
        full_name: getStreamFullName(id),
        description: getStreamDescription(id),
        stats: {
          popular_courses: 6,
          entrance_exams: 2,
          career_options: 3,
          avg_salary: getAvgSalary(id)
        }
      });
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/streams/${id}/courses`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses(getCoursesData(id));
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/streams/${id}/jobs`);
      const data = await response.json();
      setJobs(data.jobs);
      setExams(data.exams);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs(getJobsData(id));
      setExams(getExamsData(id));
    }
  };

  // Fallback data functions
  const getStreamFullName = (streamId) => {
    const names = {
      'bipc': 'Biology, Physics, Chemistry',
      'mpc': 'Mathematics, Physics, Chemistry',
      'cec': 'Commerce, Economics, Civics',
      'diploma': 'Technical Diploma Courses'
    };
    return names[streamId] || 'Stream';
  };

  const getStreamDescription = (streamId) => {
    const descriptions = {
      'bipc': 'Perfect for aspiring medical professionals and life science enthusiasts',
      'mpc': 'Ideal for engineering and scientific research careers',
      'cec': 'Gateway to business, finance, and commerce careers',
      'diploma': 'Hands-on technical skills for immediate career opportunities'
    };
    return descriptions[streamId] || 'Career stream description';
  };

  const getAvgSalary = (streamId) => {
    const salaries = {
      'bipc': '₹8-12 LPA',
      'mpc': '₹6-10 LPA',
      'cec': '₹5-8 LPA',
      'diploma': '₹4-7 LPA'
    };
    return salaries[streamId] || '₹5-8 LPA';
  };

  const getCoursesData = (streamId) => {
    const coursesMap = {
      'bipc': [
        { name: 'MBBS', full_name: 'Bachelor of Medicine and Bachelor of Surgery', duration: '5.5 years', avg_fee: '₹10-60 LPA', demand: 'Very High' },
        { name: 'BDS', full_name: 'Bachelor of Dental Surgery', duration: '5 years', avg_fee: '₹2-25 LPA', demand: 'High' },
        { name: 'BAMS', full_name: 'Bachelor of Ayurvedic Medicine and Surgery', duration: '5.5 years', avg_fee: '₹2-10 LPA', demand: 'Medium' },
        { name: 'B.Pharmacy', full_name: 'Bachelor of Pharmacy', duration: '4 years', avg_fee: '₹2-8 LPA', demand: 'High' },
        { name: 'B.Sc Nursing', full_name: 'Bachelor of Science in Nursing', duration: '4 years', avg_fee: '₹1-5 LPA', demand: 'Very High' },
        { name: 'Physiotherapy', full_name: 'Bachelor of Physiotherapy', duration: '4.5 years', avg_fee: '₹2-12 LPA', demand: 'High' }
      ],
      'mpc': [
        { name: 'B.Tech', full_name: 'Bachelor of Technology', duration: '4 years', avg_fee: '₹2-15 LPA', demand: 'Very High' },
        { name: 'B.Sc Physics', full_name: 'Bachelor of Science in Physics', duration: '3 years', avg_fee: '₹50K-2 LPA', demand: 'Medium' },
        { name: 'B.Arch', full_name: 'Bachelor of Architecture', duration: '5 years', avg_fee: '₹2-10 LPA', demand: 'High' },
        { name: 'B.Sc Mathematics', full_name: 'Bachelor of Science in Mathematics', duration: '3 years', avg_fee: '₹30K-1.5 LPA', demand: 'Medium' },
        { name: 'Aerospace Engineering', full_name: 'Bachelor in Aerospace Engineering', duration: '4 years', avg_fee: '₹3-18 LPA', demand: 'High' },
        { name: 'Data Science', full_name: 'Bachelor in Data Science', duration: '3-4 years', avg_fee: '₹2-12 LPA', demand: 'Very High' }
      ],
      'cec': [
        { name: 'B.Com', full_name: 'Bachelor of Commerce', duration: '3 years', avg_fee: '₹30K-2 LPA', demand: 'High' },
        { name: 'BBA', full_name: 'Bachelor of Business Administration', duration: '3 years', avg_fee: '₹1-8 LPA', demand: 'High' },
        { name: 'CA', full_name: 'Chartered Accountant', duration: '4-5 years', avg_fee: '₹2-5 LPA', demand: 'Very High' },
        { name: 'Economics Honors', full_name: 'Bachelor in Economics', duration: '3 years', avg_fee: '₹50K-3 LPA', demand: 'Medium' },
        { name: 'Hotel Management', full_name: 'Bachelor in Hotel Management', duration: '3-4 years', avg_fee: '₹2-8 LPA', demand: 'Medium' },
        { name: 'Digital Marketing', full_name: 'Bachelor in Digital Marketing', duration: '3 years', avg_fee: '₹1-5 LPA', demand: 'High' }
      ],
      'diploma': [
        { name: 'Civil Engineering', full_name: 'Diploma in Civil Engineering', duration: '3 years', avg_fee: '₹50K-2 LPA', demand: 'High' },
        { name: 'Mechanical Engineering', full_name: 'Diploma in Mechanical Engineering', duration: '3 years', avg_fee: '₹50K-2 LPA', demand: 'High' },
        { name: 'Electrical Engineering', full_name: 'Diploma in Electrical Engineering', duration: '3 years', avg_fee: '₹50K-2 LPA', demand: 'High' },
        { name: 'Computer Science', full_name: 'Diploma in Computer Science', duration: '3 years', avg_fee: '₹1-3 LPA', demand: 'Very High' },
        { name: 'Electronics', full_name: 'Diploma in Electronics Engineering', duration: '3 years', avg_fee: '₹50K-2 LPA', demand: 'Medium' },
        { name: 'Automobile Engineering', full_name: 'Diploma in Automobile Engineering', duration: '3 years', avg_fee: '₹1-2.5 LPA', demand: 'Medium' }
      ]
    };
    return coursesMap[streamId] || [];
  };

  const getJobsData = (streamId) => {
    const jobsMap = {
      'bipc': [
        { title: 'Software Engineer', description: 'Develop and maintain software applications', salary_range: '₹6-30 LPA', growth: 'Very High', skills: ['Programming', 'Problem Solving', 'Algorithms'] },
        { title: 'Mechanical Engineer', description: 'Design and develop mechanical systems', salary_range: '₹4-18 LPA', growth: 'Medium', skills: ['CAD', 'Manufacturing', 'Thermodynamics'] },
        { title: 'Data Scientist', description: 'Analyze complex data to drive business decisions', salary_range: '₹8-35 LPA', growth: 'Very High', skills: ['Statistics', 'Python', 'Machine Learning'] },
        { title: 'Aerospace Engineer', description: 'Design aircraft and spacecraft systems', salary_range: '₹6-25 LPA', growth: 'High', skills: ['Aerodynamics', 'Materials', 'CAD'] }
      ],
      'mpc': [
        { title: 'Software Engineer', description: 'Develop and maintain software applications', salary_range: '₹6-30 LPA', growth: 'Very High', skills: ['Programming', 'Problem Solving', 'Algorithms'] },
        { title: 'Mechanical Engineer', description: 'Design and develop mechanical systems', salary_range: '₹4-18 LPA', growth: 'Medium', skills: ['CAD', 'Manufacturing', 'Thermodynamics'] },
        { title: 'Data Scientist', description: 'Analyze complex data to drive business decisions', salary_range: '₹8-35 LPA', growth: 'Very High', skills: ['Statistics', 'Python', 'Machine Learning'] },
        { title: 'Aerospace Engineer', description: 'Design aircraft and spacecraft systems', salary_range: '₹6-25 LPA', growth: 'High', skills: ['Aerodynamics', 'Materials', 'CAD'] }
      ],
      'cec': [
        { title: 'Financial Analyst', description: 'Analyze financial data and market trends', salary_range: '₹4-15 LPA', growth: 'High', skills: ['Finance', 'Excel', 'Analysis'] },
        { title: 'Business Analyst', description: 'Analyze business processes and requirements', salary_range: '₹5-18 LPA', growth: 'High', skills: ['Analytics', 'Communication', 'Strategy'] },
        { title: 'Marketing Manager', description: 'Develop and execute marketing strategies', salary_range: '₹6-20 LPA', growth: 'Medium', skills: ['Marketing', 'Digital Marketing', 'Strategy'] },
        { title: 'Investment Banker', description: 'Provide financial advisory services', salary_range: '₹8-40 LPA', growth: 'High', skills: ['Finance', 'Analysis', 'Communication'] }
      ],
      'diploma': [
        { title: 'Technical Support Engineer', description: 'Provide technical support and maintenance', salary_range: '₹3-8 LPA', growth: 'Medium', skills: ['Troubleshooting', 'Technical Skills', 'Communication'] },
        { title: 'Quality Assurance Engineer', description: 'Ensure quality standards in manufacturing', salary_range: '₹3-10 LPA', growth: 'Medium', skills: ['Quality Control', 'Testing', 'Documentation'] },
        { title: 'Production Supervisor', description: 'Oversee manufacturing operations', salary_range: '₹4-12 LPA', growth: 'Medium', skills: ['Leadership', 'Operations', 'Quality'] },
        { title: 'CAD Technician', description: 'Create technical drawings and designs', salary_range: '₹2-8 LPA', growth: 'Medium', skills: ['CAD Software', 'Technical Drawing', 'Attention to Detail'] }
      ]
    };
    return jobsMap[streamId] || [];
  };

  const getExamsData = (streamId) => {
    const examsMap = {
      'bipc': [
        { name: 'NEET', full_name: 'National Eligibility cum Entrance Test for medical courses', difficulty: 'High', for_courses: 'MBBS, BDS, BAMS', exam_date: 'May 2025', application: 'December 2024 - January 2025' },
        { name: 'AIIMS', full_name: 'All India Institute of Medical Sciences Entrance', difficulty: 'Very High', for_courses: 'MBBS', exam_date: 'May 2025', application: 'February - March 2025' }
      ],
      'mpc': [
        { name: 'JEE Main', full_name: 'Joint Entrance Examination for engineering courses', difficulty: 'High', for_courses: 'B.Tech', exam_date: 'January & April 2025', application: 'November 2024 - December 2024' },
        { name: 'JEE Advanced', full_name: 'For admission to IITs', difficulty: 'Very High', for_courses: 'B.Tech at IITs', exam_date: 'May 2025', application: 'After JEE Main results' },
        { name: 'BITSAT', full_name: 'Birla Institute of Technology and Science Admission Test', difficulty: 'High', for_courses: 'B.Tech at BITS', exam_date: 'May 2025', application: 'January - March 2025' }
      ],
      'cec': [
        { name: 'IPMAT', full_name: 'Integrated Programme in Management Aptitude Test', difficulty: 'Medium', for_courses: 'Integrated MBA', exam_date: 'June 2025', application: 'February - April 2025' },
        { name: 'DU JAT', full_name: 'Delhi University Joint Admission Test', difficulty: 'Medium', for_courses: 'BMS, BBA', exam_date: 'May 2025', application: 'March - April 2025' }
      ],
      'diploma': [
        { name: 'State Polytechnic', full_name: 'State Polytechnic Entrance Examination', difficulty: 'Medium', for_courses: 'Diploma courses', exam_date: 'April - May 2025', application: 'February - March 2025' },
        { name: 'JEE Main Paper 2', full_name: 'For B.Arch admission', difficulty: 'High', for_courses: 'B.Arch', exam_date: 'January & April 2025', application: 'November 2024 - December 2024' }
      ]
    };
    return examsMap[streamId] || [];
  };

  if (!streamData) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
    </div>;
  }

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'Very High': return 'bg-green-100 text-green-800';
      case 'High': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGrowthColor = (growth) => {
    switch (growth) {
      case 'Very High': return 'text-green-600';
      case 'High': return 'text-blue-600';
      case 'Medium': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Very High': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{streamData.name}</h1>
              <p className="text-lg text-indigo-600 mt-1">{streamData.full_name}</p>
              <p className="text-gray-600 mt-2">{streamData.description}</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{streamData.stats.popular_courses}</div>
              <div className="text-sm text-gray-600">Popular Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{streamData.stats.entrance_exams}</div>
              <div className="text-sm text-gray-600">Entrance Exams</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{streamData.stats.career_options}</div>
              <div className="text-sm text-gray-600">Career Options</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{streamData.stats.avg_salary}</div>
              <div className="text-sm text-gray-600">Avg Starting Salary</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Popular Graduation Courses */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Star className="h-6 w-6 text-yellow-500 mr-2" />
            Popular Graduation Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-gray-900">{course.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{course.full_name}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span>Duration: {course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                    <span>Avg Fee: {course.avg_fee}</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-gray-400 mr-2" />
                    <span className={`px-2 py-1 rounded-full text-xs ${getDemandColor(course.demand)}`}>
                      Demand: {course.demand}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Relevant Entrance Examinations */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Star className="h-6 w-6 text-yellow-500 mr-2" />
            Relevant Entrance Examinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exams.map((exam, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-gray-900">{exam.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(exam.difficulty)}`}>
                    {exam.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{exam.full_name}</p>
                <div className="space-y-2 text-sm">
                  <div><strong>For:</strong> {exam.for_courses}</div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span><strong>Exam Date:</strong> {exam.exam_date}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span><strong>Application:</strong> {exam.application}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Job Recommendations */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 text-green-500 mr-2" />
            Future Job Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{job.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{job.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Salary Range:</span>
                    <span className="font-semibold text-green-600">{job.salary_range}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Growth:</span>
                    <span className={`font-semibold ${getGrowthColor(job.growth)}`}>{job.growth}</span>
                  </div>
                  <div>
                    <span className="font-medium">Required Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {job.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamPage;