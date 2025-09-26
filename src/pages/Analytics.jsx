import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Briefcase, DollarSign, BarChart3 } from 'lucide-react';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [selectedYear, setSelectedYear] = useState('2024');

  useEffect(() => {
    fetchAnalytics();
  }, [selectedYear]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/analytics?year=${selectedYear}`);
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Fallback data
      setAnalytics({
        overview_stats: {
          total_jobs: 2500000,
          new_opportunities: 450000,
          average_package: 6.5,
          placement_rate: 78
        },
        emerging_trends: [
          { field: 'Data Science', growth: 45, demand: 'Very High', avg_salary: '₹12-25 LPA' },
          { field: 'Digital Marketing', growth: 38, demand: 'High', avg_salary: '₹6-15 LPA' },
          { field: 'Cybersecurity', growth: 42, demand: 'Very High', avg_salary: '₹10-30 LPA' },
          { field: 'Healthcare', growth: 25, demand: 'High', avg_salary: '₹8-20 LPA' },
          { field: 'Renewable Energy', growth: 35, demand: 'High', avg_salary: '₹7-18 LPA' },
          { field: 'AI/Machine Learning', growth: 50, demand: 'Very High', avg_salary: '₹15-40 LPA' }
        ],
        stream_popularity_chart: '/api/charts/stream_popularity.png',
        trends_chart: '/api/charts/emerging_trends.png',
        salary_trends_chart: '/api/charts/salary_trends.png',
        demand_skills_chart: '/api/charts/demand_skills.png'
      });
    }
  };

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'Very High': return 'text-green-600';
      case 'High': return 'text-blue-600';
      case 'Medium': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Career Analytics & Insights</h1>
              <p className="text-lg text-gray-600 mt-2">Data-driven insights to make informed career decisions</p>
            </div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {(analytics.overview_stats.total_jobs / 1000000).toFixed(1)}M
            </h3>
            <p className="text-gray-600">Total Jobs Available</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {(analytics.overview_stats.new_opportunities / 1000).toFixed(0)}K
            </h3>
            <p className="text-gray-600">New Opportunities</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              ₹{analytics.overview_stats.average_package} LPA
            </h3>
            <p className="text-gray-600">Average Package</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {analytics.overview_stats.placement_rate}%
            </h3>
            <p className="text-gray-600">Placement Rate</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Stream Popularity Distribution</h3>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <img 
                src={`http://localhost:8000${analytics.stream_popularity_chart}`}
                alt="Stream Popularity Chart"
                className="max-w-full max-h-full rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="text-gray-500 text-center hidden">
                <BarChart3 className="h-16 w-16 mx-auto mb-4" />
                <p>Chart will load from Python backend</p>
                <p className="text-sm mt-2">MPC: 45%, BiPC: 30%, CEC: 15%, Diploma: 10%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Salary Trends Analysis</h3>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <img 
                src={`http://localhost:8000${analytics.salary_trends_chart}`}
                alt="Salary Trends Chart"
                className="max-w-full max-h-full rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="text-gray-500 text-center hidden">
                <TrendingUp className="h-16 w-16 mx-auto mb-4" />
                <p>Salary trends chart will load from Python backend</p>
              </div>
            </div>
          </div>
        </div>

        {/* Emerging Career Trends */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 text-green-500 mr-2" />
            Emerging Career Trends
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analytics.emerging_trends.map((trend, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-lg text-gray-900">{trend.field}</h4>
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="font-semibold">+{trend.growth}%</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Demand:</span>
                    <span className={`font-semibold ${getDemandColor(trend.demand)}`}>
                      {trend.demand}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Salary:</span>
                    <span className="font-semibold text-green-600">{trend.avg_salary}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Top Performing Courses</h3>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <img 
                src={`http://localhost:8000${analytics.trends_chart}`}
                alt="Trends Chart"
                className="max-w-full max-h-full rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="text-gray-500 text-center hidden">
                <BarChart3 className="h-16 w-16 mx-auto mb-4" />
                <p>Performance trends chart will load from Python backend</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">In-Demand Skills</h3>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <img 
                src={`http://localhost:8000${analytics.demand_skills_chart}`}
                alt="Demand Skills Chart"
                className="max-w-full max-h-full rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="text-gray-500 text-center hidden">
                <Users className="h-16 w-16 mx-auto mb-4" />
                <p>Skills demand chart will load from Python backend</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;