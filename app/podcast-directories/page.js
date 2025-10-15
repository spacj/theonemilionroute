// app/podcast-directories/page.js
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, ExternalLink, X, ChevronDown } from 'lucide-react';

export default function PodcastDirectoriesPage() {
  const [directories, setDirectories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
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

  // CSV Parser
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

  // Filter directories
  const filteredDirectories = useMemo(() => {
    return directories.filter(directory => {
      const matchesSearch = 
        directory.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        directory.Description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        directory.Category?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === 'All' || directory.Type === selectedType;
      const matchesCategory = selectedCategory === 'All' || directory.Category === selectedCategory;
      
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [directories, searchTerm, selectedType, selectedCategory]);

  // Statistics
  const stats = useMemo(() => {
    const free = filteredDirectories.filter(d => d.Type === 'Free').length;
    const paid = filteredDirectories.filter(d => d.Type === 'Paid').length;
    const freePaid = filteredDirectories.filter(d => d.Type === 'Free/Paid').length;
    
    return { free, paid, freePaid, total: filteredDirectories.length };
  }, [filteredDirectories]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('All');
    setSelectedCategory('All');
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Free': return 'bg-green-100 text-green-800 border-green-200';
      case 'Paid': return 'bg-red-100 text-red-800 border-red-200';
      case 'Free/Paid': return 'bg-blue-100 text-blue-800 border-blue-200';
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
      'Sponsorship': 'bg-emerald-100 text-emerald-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading podcast directories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🎙️ Podcast Directory Finder</h1>
              <p className="mt-1 text-sm text-gray-600">Discover 150+ places to submit your podcast</p>
            </div>
            <div className="hidden sm:flex gap-4 text-sm">
              <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                <div className="font-semibold text-green-800">{stats.free}</div>
                <div className="text-green-600 text-xs">Free</div>
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                <div className="font-semibold text-blue-800">{stats.freePaid}</div>
                <div className="text-blue-600 text-xs">Free/Paid</div>
              </div>
              <div className="bg-red-50 px-4 py-2 rounded-lg border border-red-200">
                <div className="font-semibold text-red-800">{stats.paid}</div>
                <div className="text-red-600 text-xs">Paid</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-gray-700 font-medium hover:text-purple-600 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            {(searchTerm || selectedType !== 'All' || selectedCategory !== 'All') && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
                Clear filters
              </button>
            )}
          </div>

          {showFilters && (
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search directories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Type and Category Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Submission Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{stats.total}</span> {stats.total === 1 ? 'directory' : 'directories'}
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDirectories.map((directory, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900 flex-1 pr-2">
                  {directory.Name}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(directory.Type)} whitespace-nowrap`}>
                  {directory.Type}
                </span>
              </div>

              <div className="mb-3">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(directory.Category)}`}>
                  {directory.Category}
                </span>
              </div>

              {directory.Description && (
                <p className="text-sm text-gray-600 mb-4 flex-1">
                  {directory.Description}
                </p>
              )}

              <div className="space-y-2 mt-auto">
                <a
                  href={directory['Submit URL']}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  Submit Podcast
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a
                  href={directory.URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors text-sm"
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
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No directories found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or search term</p>
            <button
              onClick={clearFilters}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-600">
          <p>Total of {directories.length} podcast directories • Updated regularly</p>
        </div>
      </footer>
    </div>
  );
}