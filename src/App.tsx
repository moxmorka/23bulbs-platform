import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, X, Check, Download, Key, ChevronDown } from 'lucide-react';

const DatasetPlatform = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [promptValue, setPromptValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryConfigs, setCategoryConfigs] = useState({});
  const [collapsedCategories, setCollapsedCategories] = useState({});
  const [generatedDataset, setGeneratedDataset] = useState(null);

  const [selectedDataType, setSelectedDataType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const datasetCategories = [
    { 
      id: 'lights', 
      name: 'Lighting',
      options: [
        { id: 'angle', name: 'Light Angle', type: 'range', min: 0, max: 360, default: 45, unit: '°' },
        { id: 'count', name: 'Number of Lights', type: 'range', min: 1, max: 8, default: 3, unit: 'lights' },
        { id: 'intensity', name: 'Light Intensity', type: 'range', min: 0.1, max: 2.0, default: 1.0, unit: 'lux', step: 0.1 },
        { id: 'color_temp', name: 'Color Temperature', type: 'select', options: ['Warm (3000K)', 'Neutral (4000K)', 'Cool (6500K)', 'Mixed'], default: 'Neutral (4000K)' },
        { id: 'shadows', name: 'Shadow Quality', type: 'select', options: ['Soft', 'Hard', 'Mixed', 'None'], default: 'Soft' },
        { id: 'environment', name: 'Environment Lighting', type: 'select', options: ['Studio', 'Natural', 'Indoor', 'Outdoor'], default: 'Studio' }
      ]
    },
    { 
      id: 'materials', 
      name: 'Materials',
      options: [
        { id: 'fabric_type', name: 'Fabric Type', type: 'select', options: ['Cotton', 'Denim', 'Silk', 'Polyester', 'Wool', 'Linen', 'Mixed'], default: 'Cotton' },
        { id: 'roughness', name: 'Surface Roughness', type: 'range', min: 0.0, max: 1.0, default: 0.5, step: 0.1 },
        { id: 'reflectance', name: 'Reflectance', type: 'range', min: 0.0, max: 1.0, default: 0.3, step: 0.1 },
        { id: 'transparency', name: 'Transparency', type: 'range', min: 0.0, max: 0.8, default: 0.0, step: 0.1 },
        { id: 'texture_detail', name: 'Texture Detail', type: 'select', options: ['Low', 'Medium', 'High', 'Ultra'], default: 'High' },
        { id: 'wear_patterns', name: 'Wear Patterns', type: 'select', options: ['None', 'Light', 'Moderate', 'Heavy', 'Vintage'], default: 'Light' }
      ]
    },
    { 
      id: 'camera', 
      name: 'Camera',
      options: [
        { id: 'angles', name: 'Camera Angles', type: 'range', min: 1, max: 16, default: 8, unit: 'angles' },
        { id: 'fov', name: 'Field of View', type: 'range', min: 15, max: 120, default: 50, unit: '°' },
        { id: 'distance', name: 'Camera Distance', type: 'select', options: ['Close-up', 'Medium', 'Wide', 'Mixed'], default: 'Mixed' },
        { id: 'movement', name: 'Camera Movement', type: 'select', options: ['Static', 'Orbit', 'Pan', 'Zoom', 'Mixed'], default: 'Static' },
        { id: 'resolution', name: 'Resolution', type: 'select', options: ['HD (1080p)', '4K (2160p)', '8K (4320p)', 'Mixed'], default: '4K (2160p)' },
        { id: 'framerate', name: 'Frame Rate', type: 'select', options: ['24fps', '30fps', '60fps', '120fps', 'Mixed'], default: '30fps' }
      ]
    },
    { 
      id: 'forces', 
      name: 'Physics Forces',
      options: [
        { id: 'wind_strength', name: 'Wind Strength', type: 'range', min: 0.0, max: 10.0, default: 2.0, unit: 'm/s', step: 0.5 },
        { id: 'wind_direction', name: 'Wind Directions', type: 'range', min: 1, max: 8, default: 4, unit: 'directions' },
        { id: 'gravity', name: 'Gravity Strength', type: 'range', min: 0.5, max: 2.0, default: 1.0, unit: 'g', step: 0.1 },
        { id: 'turbulence', name: 'Air Turbulence', type: 'select', options: ['None', 'Light', 'Moderate', 'Strong'], default: 'Light' },
        { id: 'collision', name: 'Collision Forces', type: 'select', options: ['None', 'Body', 'Objects', 'Both'], default: 'Body' },
        { id: 'elasticity', name: 'Fabric Elasticity', type: 'range', min: 0.1, max: 2.0, default: 1.0, step: 0.1 }
      ]
    },
    { 
      id: 'thickness', 
      name: 'Material Thickness',
      options: [
        { id: 'base_thickness', name: 'Base Thickness', type: 'range', min: 0.1, max: 5.0, default: 1.0, unit: 'mm', step: 0.1 },
        { id: 'variation', name: 'Thickness Variation', type: 'range', min: 0, max: 50, default: 10, unit: '%' },
        { id: 'layers', name: 'Layer Count', type: 'range', min: 1, max: 4, default: 1, unit: 'layers' },
        { id: 'seam_thickness', name: 'Seam Thickness', type: 'range', min: 1.0, max: 8.0, default: 2.0, unit: 'mm', step: 0.5 },
        { id: 'edge_behavior', name: 'Edge Behavior', type: 'select', options: ['Sharp', 'Rounded', 'Frayed', 'Mixed'], default: 'Rounded' },
        { id: 'compression', name: 'Compression Response', type: 'select', options: ['Rigid', 'Soft', 'Elastic', 'Mixed'], default: 'Soft' }
      ]
    },
    { 
      id: 'colors', 
      name: 'Color Variations',
      options: [
        { id: 'base_colors', name: 'Base Colors', type: 'range', min: 1, max: 20, default: 5, unit: 'colors' },
        { id: 'saturation', name: 'Saturation Range', type: 'select', options: ['Muted', 'Natural', 'Vibrant', 'Mixed'], default: 'Natural' },
        { id: 'patterns', name: 'Pattern Types', type: 'select', options: ['Solid', 'Stripes', 'Checks', 'Floral', 'Abstract', 'Mixed'], default: 'Mixed' },
        { id: 'fading', name: 'Color Fading', type: 'select', options: ['None', 'Subtle', 'Moderate', 'Heavy'], default: 'Subtle' },
        { id: 'color_bleeding', name: 'Color Bleeding', type: 'select', options: ['None', 'Light', 'Moderate'], default: 'None' },
        { id: 'brightness', name: 'Brightness Range', type: 'range', min: 0.2, max: 1.0, default: 0.8, step: 0.1 }
      ]
    },
    { 
      id: 'environments', 
      name: 'Environment',
      options: [
        { id: 'background_type', name: 'Background Type', type: 'select', options: ['Studio', 'Indoor', 'Outdoor', 'Abstract', 'Green Screen'], default: 'Studio' },
        { id: 'ambient_occlusion', name: 'Ambient Occlusion', type: 'select', options: ['None', 'Subtle', 'Strong'], default: 'Subtle' },
        { id: 'reflections', name: 'Environmental Reflections', type: 'select', options: ['None', 'Floor', 'Full Environment'], default: 'Floor' },
        { id: 'depth_of_field', name: 'Depth of Field', type: 'select', options: ['None', 'Shallow', 'Deep', 'Mixed'], default: 'None' },
        { id: 'weather', name: 'Weather Conditions', type: 'select', options: ['Clear', 'Cloudy', 'Rainy', 'Windy', 'Mixed'], default: 'Clear' },
        { id: 'time_of_day', name: 'Time of Day', type: 'select', options: ['Morning', 'Noon', 'Evening', 'Night', 'Mixed'], default: 'Mixed' }
      ]
    },
    { 
      id: 'animations', 
      name: 'Animation States',
      options: [
        { id: 'motion_type', name: 'Motion Type', type: 'select', options: ['Static', 'Gentle Sway', 'Walking', 'Running', 'Dancing', 'Mixed'], default: 'Gentle Sway' },
        { id: 'duration', name: 'Animation Duration', type: 'range', min: 1, max: 30, default: 5, unit: 'seconds' },
        { id: 'fps', name: 'Animation FPS', type: 'select', options: ['24fps', '30fps', '60fps', '120fps'], default: '30fps' },
        { id: 'transitions', name: 'State Transitions', type: 'select', options: ['None', 'Smooth', 'Abrupt', 'Mixed'], default: 'Smooth' },
        { id: 'deformation', name: 'Deformation Level', type: 'range', min: 0.1, max: 2.0, default: 1.0, step: 0.1 },
        { id: 'repetition', name: 'Loop Behavior', type: 'select', options: ['Single', 'Loop', 'Ping-pong', 'Random'], default: 'Loop' }
      ]
    }
  ];

  const handlePromptSubmit = () => {
    if (promptValue.trim()) {
      setShowModal(true);
    }
  };

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        const newConfigs = { ...categoryConfigs };
        delete newConfigs[categoryId];
        setCategoryConfigs(newConfigs);
        return prev.filter(id => id !== categoryId);
      } else {
        const category = datasetCategories.find(cat => cat.id === categoryId);
        const defaultConfig = {};
        category.options.forEach(option => {
          defaultConfig[option.id] = option.default;
        });
        setCategoryConfigs(prev => ({ ...prev, [categoryId]: defaultConfig }));
        return [...prev, categoryId];
      }
    });
  };

  const updateCategoryConfig = (categoryId, optionId, value) => {
    setCategoryConfigs(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [optionId]: value
      }
    }));
  };

  const toggleCategoryCollapse = (categoryId) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Filter projects based on category selection
  const getFilteredProjects = () => {
    const allProjects = [
      { 
        id: 'pants', 
        name: 'Garment Physics Simulation', 
        category: 'Garments', 
        type: 'Video', 
        prompt: 'Pants', 
        gradient: 'from-gray-800 to-black', 
        description: 'Generate realistic clothing movement with wind, gravity, and collision physics', 
        tags: ['Video', 'Physics'],
        shape: 'rectangle'
      },
      { 
        id: 'dress', 
        name: 'Flowing Fabric Dynamics', 
        category: 'Garments', 
        type: 'Video', 
        prompt: 'Dress', 
        gradient: 'from-gray-700 to-gray-900', 
        description: 'Train models on dresses, skirts with complex draping and flow physics', 
        tags: ['Video', 'Flow Dynamics'],
        shape: 'triangle'
      },
      { 
        id: 'hair', 
        name: 'Hair Physics & Dynamics', 
        category: 'Human Body', 
        type: 'Video', 
        prompt: 'Hair', 
        gradient: 'from-gray-600 to-gray-800', 
        description: 'Realistic hair movement, wind effects, and strand-level physics simulation', 
        tags: ['Video', 'Hair Dynamics'],
        shape: 'waves'
      },
      { 
        id: 'body', 
        name: 'Human Body Spatial Integrity', 
        category: 'Human Body', 
        type: 'Video', 
        prompt: 'Human Body', 
        gradient: 'from-gray-700 to-black', 
        description: 'Full body motion capture with anatomically correct movement and posing', 
        tags: ['Video', 'Motion Capture'],
        shape: 'circle'
      },
      { 
        id: 'horse', 
        name: 'Animal Rigging & Motion', 
        category: 'Animals', 
        type: 'Video', 
        prompt: 'Horse', 
        gradient: 'from-gray-800 to-gray-900', 
        description: 'Horses with realistic gait patterns, anatomy, and movement dynamics', 
        tags: ['Video', 'Animal Rigging'],
        shape: 'diamond'
      },
      { 
        id: 'dog', 
        name: 'Pet Animation & Behavior', 
        category: 'Animals', 
        type: 'Video', 
        prompt: 'Dog', 
        gradient: 'from-black to-gray-800', 
        description: 'Dogs and cats with natural movement patterns, fur dynamics, and behaviors', 
        tags: ['Video', 'Pet Behavior'],
        shape: 'hexagon'
      }
    ];

    return allProjects.filter(project => {
      const matchesDataType = selectedDataType === 'All' || project.type === selectedDataType;
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      return matchesDataType && matchesCategory;
    });
  };

  const renderShape = (shape) => {
    const shapeClasses = "w-8 h-8 bg-white bg-opacity-90";
    
    switch (shape) {
      case 'rectangle':
        return <div className={`${shapeClasses} rounded-sm`}></div>;
      case 'triangle':
        return (
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-white opacity-90"></div>
        );
      case 'circle':
        return <div className={`${shapeClasses} rounded-full`}></div>;
      case 'diamond':
        return <div className={`${shapeClasses} rotate-45 rounded-sm`}></div>;
      case 'hexagon':
        return (
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-white opacity-90 transform rotate-0" style={{
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
            }}></div>
          </div>
        );
      case 'waves':
        return (
          <div className="w-8 h-8 flex flex-col justify-center space-y-1">
            <div className="h-0.5 bg-white opacity-90 rounded-full w-6"></div>
            <div className="h-0.5 bg-white opacity-90 rounded-full w-8"></div>
            <div className="h-0.5 bg-white opacity-90 rounded-full w-4"></div>
          </div>
        );
      default:
        return <div className={`${shapeClasses} rounded-sm`}></div>;
    }
  };

  const generateDataset = () => {
    setShowModal(false);
    const dataset = {
      name: promptValue,
      categories: selectedCategories,
      samples: Math.floor(Math.random() * 50000) + 10000,
      size: `${(Math.random() * 5 + 1).toFixed(1)}GB`,
      price: selectedCategories.length * 29 + 99
    };
    setGeneratedDataset(dataset);
    setCurrentPage('checkout');
  };

  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>
        <header className="px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-semibold text-black">23 Bulbs</h1>
            <button 
              onClick={() => setCurrentPage('generation')}
              className="bg-black text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Sign In
            </button>
          </div>
        </header>

        <main className="px-4 sm:px-6 pt-12 sm:pt-24 pb-16 sm:pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-6xl font-bold text-black mb-6 sm:mb-8 leading-tight tracking-tight">
              Real-Time Datasets<br />
              for AI Training
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-12 sm:mb-16 max-w-2xl mx-auto leading-relaxed px-4">
              Generate unlimited physics-accurate datasets with our breakthrough 
              real-time simulation engine built for AI video generation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3 px-4">
              <button 
                onClick={() => setCurrentPage('generation')}
                className="bg-blue-600 text-white w-full sm:w-52 py-3.5 rounded-full text-base font-semibold hover:bg-blue-700 transition-all duration-200 inline-flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setCurrentPage('marketplace')}
                className="bg-black text-white w-full sm:w-52 py-3.5 rounded-full text-base font-semibold hover:bg-gray-800 transition-all duration-200 shadow-sm"
              >
                Browse Datasets
              </button>
              <button 
                onClick={() => setCurrentPage('technology')}
                className="bg-gray-100 text-gray-900 w-full sm:w-52 py-3.5 rounded-full text-base font-semibold hover:bg-gray-200 transition-all duration-200 shadow-sm"
              >
                Technology
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // THIS IS THE MAIN DASHBOARD - Scale AI Style Project Templates
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>
      <header className="px-6 py-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentPage('landing')}
              className="text-gray-500 hover:text-black p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-semibold text-black">23 Bulbs</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentPage('marketplace')}
              className="text-gray-600 hover:text-black px-4 py-2 text-sm font-medium transition-colors"
            >
              Browse Datasets
            </button>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">JD</span>
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 py-8 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Signed in as John Doe</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4 tracking-tight">
              Create New Project
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Choose a use case to get started with your dataset generation
            </p>
          </div>

          {/* Filter Section */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Data Type:</span>
              <button 
                onClick={() => setSelectedDataType('All')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${selectedDataType === 'All' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                All
              </button>
              <button 
                onClick={() => setSelectedDataType('Video')}
                className={`px-3 py-1 rounded-full text-sm ${selectedDataType === 'Video' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Video
              </button>
              <button 
                onClick={() => setSelectedDataType('Image')}
                className={`px-3 py-1 rounded-full text-sm ${selectedDataType === 'Image' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Image
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Category:</span>
              <button 
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1 rounded-full text-sm font-medium ${selectedCategory === 'All' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                All
              </button>
              <button 
                onClick={() => setSelectedCategory('Garments')}
                className={`px-3 py-1 rounded-full text-sm ${selectedCategory === 'Garments' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Garments
              </button>
              <button 
                onClick={() => setSelectedCategory('Human Body')}
                className={`px-3 py-1 rounded-full text-sm ${selectedCategory === 'Human Body' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Human Body
              </button>
              <button 
                onClick={() => setSelectedCategory('Animals')}
                className={`px-3 py-1 rounded-full text-sm ${selectedCategory === 'Animals' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Animals
              </button>
            </div>
          </div>

          {/* Project Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {getFilteredProjects().map((project) => (
              <div 
                key={project.id}
                onClick={() => {
                  setPromptValue(project.prompt);
                  setShowModal(true);
                }}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white bg-opacity-10 rounded-xl flex items-center justify-center">
                      {renderShape(project.shape)}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black bg-opacity-40 text-white text-xs font-medium rounded-full">{project.type}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Custom Project */}
            <div 
              onClick={() => setShowModal(true)}
              className="bg-white border-2 border-dashed border-gray-300 rounded-xl overflow-hidden hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer group"
            >
              <div className="h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <div className="w-6 h-6 border-2 border-gray-500 rounded-lg border-dashed"></div>
                  </div>
                  <span className="text-gray-600 font-medium">Custom Project</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Custom Dataset</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">Configure your own dataset with advanced parameters and specifications</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">Advanced</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">Custom</span>
                </div>
              </div>
            </div>

          </div>

          {/* Need Help Section */}
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-4 h-4 border-2 border-white rounded-full border-dashed"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Need help starting a project?</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">Our team can guide you through the best dataset configuration for your specific AI training needs.</p>
                <a 
                  href="mailto:support@23bulbs.com?subject=Project Configuration Help&body=Hi, I need help choosing the right dataset configuration for my AI training project."
                  className="inline-flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center p-4 sm:p-6 z-50">
          <style jsx>{`
            .modal-scroll::-webkit-scrollbar {
              width: 12px;
            }
            .modal-scroll::-webkit-scrollbar-track {
              background: #f1f5f9;
              border-radius: 6px;
              margin: 8px 0;
            }
            .modal-scroll::-webkit-scrollbar-thumb {
              background: #cbd5e1;
              border-radius: 6px;
              border: 2px solid #f1f5f9;
            }
            .modal-scroll::-webkit-scrollbar-thumb:hover {
              background: #94a3b8;
            }
            .modal-scroll::-webkit-scrollbar-thumb:active {
              background: #64748b;
            }
          `}</style>
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl">
            <div className="p-4 sm:p-8 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-black">Configure Dataset</h3>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">"{promptValue}"</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-50 rounded-full transition-all"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
            
            <div 
              className="flex-1 overflow-y-scroll p-4 sm:p-8 modal-scroll" 
              style={{ 
                scrollbarWidth: 'auto', 
                scrollbarColor: '#CBD5E1 #F1F5F9',
                maxHeight: 'calc(90vh - 200px)',
                minHeight: '400px'
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 sm:mb-8">
                {datasetCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={`p-4 rounded-xl border transition-all text-left ${
                      selectedCategories.includes(category.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-black">{category.name}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedCategories.includes(category.id)
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedCategories.includes(category.id) && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {selectedCategories.length > 0 && (
                <div className="mb-8 border-t border-gray-100 pt-8">
                  <h4 className="text-lg font-semibold text-black mb-6">Configuration Options</h4>
                  <div className="space-y-4">
                    {selectedCategories.map(categoryId => {
                      const category = datasetCategories.find(cat => cat.id === categoryId);
                      const config = categoryConfigs[categoryId] || {};
                      const isCollapsed = collapsedCategories[categoryId];
                      
                      return (
                        <div key={categoryId} className="bg-gray-50 rounded-xl overflow-hidden">
                          <button
                            onClick={() => toggleCategoryCollapse(categoryId)}
                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                              <h5 className="font-medium text-black">{category.name}</h5>
                            </div>
                            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${
                              isCollapsed ? '-rotate-90' : 'rotate-0'
                            }`} />
                          </button>
                          
                          {!isCollapsed && (
                            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {category.options.map(option => (
                                  <div key={option.id} className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                      {option.name}
                                      {option.unit && <span className="text-gray-500 ml-1">({option.unit})</span>}
                                    </label>
                                    
                                    {option.type === 'range' && (
                                      <div className="space-y-1">
                                        <input
                                          type="range"
                                          min={option.min}
                                          max={option.max}
                                          step={option.step || 1}
                                          value={config[option.id] || option.default}
                                          onChange={(e) => updateCategoryConfig(categoryId, option.id, parseFloat(e.target.value))}
                                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500">
                                          <span>{option.min}{option.unit}</span>
                                          <span className="font-medium text-black">
                                            {config[option.id] || option.default}{option.unit}
                                          </span>
                                          <span>{option.max}{option.unit}</span>
                                        </div>
                                      </div>
                                    )}
                                    
                                    {option.type === 'select' && (
                                      <select
                                        value={config[option.id] || option.default}
                                        onChange={(e) => updateCategoryConfig(categoryId, option.id, e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                      >
                                        {option.options.map(optValue => (
                                          <option key={optValue} value={optValue}>{optValue}</option>
                                        ))}
                                      </select>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
              
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-8 border-t border-gray-100 flex-shrink-0 space-y-3 sm:space-y-0">
              <span className="text-gray-600 text-sm sm:text-base">
                {selectedCategories.length} selected
              </span>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full sm:w-auto px-6 py-2.5 text-gray-600 hover:text-black font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={generateDataset}
                  disabled={selectedCategories.length === 0}
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatasetPlatform;
