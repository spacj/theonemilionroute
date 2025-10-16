// app/podcast-directories/page.js
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, ExternalLink, X, ChevronDown, Zap, Clock, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';

export default function PodcastDirectoriesPage() {
  const [directories, setDirectories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubmissionType, setSelectedSubmissionType] = useState('All');
  const [selectedSport, setSelectedSport] = useState('All');
  const [showFilters, setShowFilters] = useState(true);
  const [loading, setLoading] = useState(true);

  // Load CSV data
  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch('/podcast_directories.csv');
        const text = await response.text();
        const parsed = parseCSV(text);
        setDirectories(parsed);
        setLoading(false);
      } catch (error) {
        console.error('Error loading CSV:', error);
        setLoading(false);
      }
    };
    loadCSV();
  }, []);

  // Enhanced CSV Parser
  const parseCSV = (text) => {
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1)
      .filter(line => line.trim())
      .map(line => {
        const values = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = values[index] ? values[index].replace(/^"|"$/g, '').trim() : '';
        });
        return obj;
      });
  };

  // Get unique values for filters
  const types = useMemo(() => {
    const uniqueTypes = [...new Set(directories.map(d => d.Type))].filter(Boolean);
    return ['All', ...uniqueTypes.sort()];
  }, [directories]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(directories.map(d => d.Category))].filter(Boolean);
    return ['All', ...uniqueCategories.sort()];
  }, [directories]);

  const submissionTypes = useMemo(() => {
    const uniqueSubmissionTypes = [...new Set(directories.map(d => d['Submission Type']))].filter(Boolean);
    return ['All', ...uniqueSubmissionTypes.sort()];
  }, [directories]);

  const sports = useMemo(() => {
    const uniqueSports = [...new Set(directories.map(d => d.Sport))].filter(Boolean);
    return ['All', ...uniqueSports.sort()];
  }, [directories]);

  // Filter directories
  const filteredDirectories = useMemo(() => {
    return directories.filter(directory => {
      const matchesSearch = 
        directory.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        directory.Notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        directory.Category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        directory.Sport?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === 'All' || directory.Type === selectedType;
      const matchesCategory = selectedCategory === 'All' || directory.Category === selectedCategory;
      const matchesSubmissionType = selectedSubmissionType === 'All' || directory['Submission Type'] === selectedSubmissionType;
      const matchesSport = selectedSport === 'All' || directory.Sport === selectedSport;
      
      return matchesSearch && matchesType && matchesCategory && matchesSubmissionType && matchesSport;
    });
  }, [directories, searchTerm, selectedType, selectedCategory, selectedSubmissionType, selectedSport]);

  // Statistics
  const stats = useMemo(() => {
    const free = filteredDirectories.filter(d => d.Type === 'Free').length;
    const paid = filteredDirectories.filter(d => d.Type === 'Paid').length;
    const freePaid = filteredDirectories.filter(d => d.Type === 'Free/Paid').length;
    const canSubmit = filteredDirectories.filter(d => 
      d['Submit URL'] && d['Submit URL'] !== 'N/A' && !d['Submission Type']?.includes('Network Exclusive')
    ).length;
    
    return { free, paid, freePaid, canSubmit, total: filteredDirectories.length };
  }, [filteredDirectories]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('All');
    setSelectedCategory('All');
    setSelectedSubmissionType('All');
    setSelectedSport('All');
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Free': return 'bg-green-100 text-green-800 border-green-200';
      case 'Paid': return 'bg-red-100 text-red-800 border-red-200';
      case 'Free/Paid': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Network Only': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Major Platform': 'bg-purple-100 text-purple-700',
      'Platform': 'bg-indigo-100 text-indigo-700',
      'Directory': 'bg-cyan-100 text-cyan-700',
      'App': 'bg-pink-100 text-pink-700',
      'Hosting': 'bg-orange-100 text-orange-700',
      'Discovery': 'bg-teal-100 text-teal-700',
      'Analytics': 'bg-yellow-100 text-yellow-700',
      'Sports Network': 'bg-red-100 text-red-700',
      'Monetization': 'bg-emerald-100 text-emerald-700',
      'Tool': 'bg-blue-100 text-blue-700',
      'International': 'bg-violet-100 text-violet-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const canSubmitToPlatform = (directory) => {
    return directory['Submit URL'] && 
           directory['Submit URL'] !== 'N/A' && 
           !directory['Submission Type']?.includes('Network Exclusive');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm md:text-base">Loading podcast directories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">🎙️ Sports Podcast Directory Finder</h1>
              <p className="mt-1 text-xs md:text-sm text-gray-600">Discover 75+ verified platforms to submit your sports podcast</p>
            </div>
            <div className="flex gap-2 md:gap-4 text-xs md:text-sm overflow-x-auto pb-2 md:pb-0">
              <div className="bg-green-50 px-3 md:px-4 py-2 rounded-lg border border-green-200 flex-shrink-0">
                <div className="font-semibold text-green-800">{stats.free}</div>
                <div className="text-green-600 text-xs">Free</div>
              </div>
              <div className="bg-blue-50 px-3 md:px-4 py-2 rounded-lg border border-blue-200 flex-shrink-0">
                <div className="font-semibold text-blue-800">{stats.freePaid}</div>
                <div className="text-blue-600 text-xs">Free/Paid</div>
              </div>
              <div className="bg-red-50 px-3 md:px-4 py-2 rounded-lg border border-red-200 flex-shrink-0">
                <div className="font-semibold text-red-800">{stats.paid}</div>
                <div className="text-red-600 text-xs">Paid</div>
              </div>
              <div className="bg-purple-50 px-3 md:px-4 py-2 rounded-lg border border-purple-200 flex-shrink-0">
                <div className="font-semibold text-purple-800">{stats.canSubmit}</div>
                <div className="text-purple-600 text-xs">Can Submit</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Service Promotion Boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Box 1: Done-For-You Service */}
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <Zap className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-2">Done-For-You Submission Service</h3>
                <p className="text-purple-100 text-sm md:text-base mb-4">
                  Save 20+ hours. We'll submit your podcast to all 75+ verified directories while you focus on creating content.
                </p>
                <ul className="space-y-2 mb-6 text-sm md:text-base">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span>Professional submission to all platforms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span>Optimized descriptions & metadata</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span>Detailed submission report</span>
                  </li>
                </ul>
                <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center gap-2 w-full md:w-auto justify-center">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Box 2: Time-Saver Highlight */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 md:p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <Clock className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-2">Why Waste Your Time?</h3>
                <p className="text-amber-50 text-sm md:text-base mb-4">
                  Manual submission takes 15-30 minutes per platform. That's over 20 hours for 75 directories!
                </p>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 md:p-6 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl md:text-3xl font-bold mb-1">20+</div>
                      <div className="text-xs md:text-sm text-amber-100">Hours Saved</div>
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold mb-1">75+</div>
                      <div className="text-xs md:text-sm text-amber-100">Platforms</div>
                    </div>
                  </div>
                </div>
                <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors flex items-center gap-2 w-full md:w-auto justify-center">
                  <Sparkles className="w-5 h-5" />
                  Let Us Handle It
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-gray-700 font-medium hover:text-purple-600 transition-colors text-sm md:text-base"
            >
              <Filter className="w-4 h-4 md:w-5 md:h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            {(searchTerm || selectedType !== 'All' || selectedCategory !== 'All' || selectedSubmissionType !== 'All' || selectedSport !== 'All') && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs md:text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                <X className="w-3 h-3 md:w-4 md:h-4" />
                Clear filters
              </button>
            )}
          </div>

          {showFilters && (
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                <input
                  type="text"
                  placeholder="Search directories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Filters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Access Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Submission Method
                  </label>
                  <select
                    value={selectedSubmissionType}
                    onChange={(e) => setSelectedSubmissionType(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    {submissionTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Sport
                  </label>
                  <select
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    {sports.map(sport => (
                      <option key={sport} value={sport}>{sport}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-xs md:text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{stats.total}</span> {stats.total === 1 ? 'directory' : 'directories'}
          {stats.canSubmit > 0 && <span className="ml-2">• <span className="font-semibold text-purple-600">{stats.canSubmit}</span> accept submissions</span>}
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredDirectories.map((directory, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex flex-col"
            >
              <div className="flex items-start justify-between mb-3 gap-2">
                <h3 className="text-base md:text-lg font-bold text-gray-900 flex-1">
                  {directory.Name}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(directory.Type)} whitespace-nowrap flex-shrink-0`}>
                  {directory.Type}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`inline-block px-2 md:px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(directory.Category)}`}>
                  {directory.Category}
                </span>
                {directory.Sport && (
                  <span className="inline-block px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {directory.Sport}
                  </span>
                )}
              </div>

              {directory['Submission Type'] && (
                <div className="text-xs text-gray-600 mb-2">
                  <span className="font-medium">Method:</span> {directory['Submission Type']}
                </div>
              )}

              {directory.Notes && (
                <p className="text-xs md:text-sm text-gray-600 mb-4 flex-1">
                  {directory.Notes}
                </p>
              )}

              <div className="space-y-2 mt-auto">
                {canSubmitToPlatform(directory) ? (
                  <a
                    href={directory['Submit URL']}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 md:py-2.5 rounded-lg transition-colors font-medium text-sm md:text-base"
                  >
                    Submit Podcast
                    <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                  </a>
                ) : (
                  <div className="flex items-center justify-center gap-2 w-full bg-gray-100 text-gray-500 px-4 py-2 md:py-2.5 rounded-lg font-medium text-sm md:text-base cursor-not-allowed">
                    {directory['Submission Type']?.includes('Network Exclusive') ? 'Network Only' : 'No Direct Submission'}
                  </div>
                )}
                <a
                  href={directory.URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors text-xs md:text-sm"
                >
                  Visit Site
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDirectories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 md:w-16 md:h-16 mx-auto" />
            </div>
            <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">No directories found</h3>
            <p className="text-sm md:text-base text-gray-600 mb-4">Try adjusting your filters or search term</p>
            <button
              onClick={clearFilters}
              className="text-purple-600 hover:text-purple-700 font-medium text-sm md:text-base"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-xs md:text-sm text-gray-600">
          <p>Total of {directories.length} verified podcast directories • All submission links verified • Updated regularly</p>
        </div>
      </footer>
    </div>
  );
}