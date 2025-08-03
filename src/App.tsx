import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, X, Check, ChevronDown, Key, Copy, ExternalLink } from 'lucide-react';

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
  const [apiKey, setApiKey] = useState('');
  const [copied, setCopied] = useState(false);

  const datasetCategories = [
    { 
      id: 'lights', 
      name: 'Lighting',
      paramCount: 5,
      options: [
        { id: 'angle', name: 'Light Angle', type: 'range', min: 0, max: 360, default: 45, unit: '°' },
        { id: 'count', name: 'Number of Lights', type: 'range', min: 1, max: 8, default: 3, unit: 'lights' },
        { id: 'intensity', name: 'Light Intensity', type: 'range', min: 0.1, max: 2.0, default: 1.0, unit: 'lux', step: 0.1 },
        { id: 'color_temp', name: 'Color Temperature', type: 'range', min: 2700, max: 6500, default: 5000, unit: 'K' },
        { id: 'hdri', name: 'HDRI Environment', type: 'select', options: ['Studio', 'Outdoor', 'Indoor', 'Sunset'], default: 'Studio' }
      ]
    },
    { 
      id: 'materials', 
      name: 'Materials & Textures',
      paramCount: 5,
      options: [
        { id: 'fabric_type', name: 'Fabric Type', type: 'select', options: ['Cotton', 'Denim', 'Silk', 'Polyester', 'Wool', 'Leather'], default: 'Cotton' },
        { id: 'roughness', name: 'Surface Roughness', type: 'range', min: 0.0, max: 1.0, default: 0.5, step: 0.1 },
        { id: 'metallic', name: 'Metallic', type: 'range', min: 0.0, max: 1.0, default: 0.0, step: 0.1 },
        { id: 'subsurface', name: 'Subsurface Scattering', type: 'range', min: 0.0, max: 1.0, default: 0.3, step: 0.1 },
        { id: 'normal_strength', name: 'Normal Map Strength', type: 'range', min: 0.0, max: 2.0, default: 1.0, step: 0.1 }
      ]
    },
    { 
      id: 'camera', 
      name: 'Camera Setup',
      paramCount: 5,
      options: [
        { id: 'angles', name: 'Camera Angles', type: 'range', min: 1, max: 36, default: 8, unit: 'angles' },
        { id: 'resolution', name: 'Resolution', type: 'select', options: ['HD', '4K', '8K'], default: '4K' },
        { id: 'focal_length', name: 'Focal Length', type: 'range', min: 18, max: 200, default: 50, unit: 'mm' },
        { id: 'depth_of_field', name: 'Depth of Field', type: 'range', min: 0.0, max: 10.0, default: 2.8, unit: 'f' },
        { id: 'motion_blur', name: 'Motion Blur', type: 'range', min: 0.0, max: 1.0, default: 0.2, step: 0.1 }
      ]
    },
    { 
      id: 'forces', 
      name: 'Physics Forces',
      paramCount: 5,
      options: [
        { id: 'wind_strength', name: 'Wind Strength', type: 'range', min: 0.0, max: 10.0, default: 2.0, unit: 'm/s', step: 0.5 },
        { id: 'gravity', name: 'Gravity Strength', type: 'range', min: 0.5, max: 2.0, default: 1.0, unit: 'g', step: 0.1 },
        { id: 'wind_direction', name: 'Wind Direction', type: 'range', min: 0, max: 360, default: 90, unit: '°' },
        { id: 'air_density', name: 'Air Density', type: 'range', min: 0.5, max: 2.0, default: 1.0, unit: 'kg/m³', step: 0.1 },
        { id: 'collision_margin', name: 'Collision Margin', type: 'range', min: 0.001, max: 0.1, default: 0.01, unit: 'm', step: 0.001 }
      ]
    },
    { 
      id: 'thickness', 
      name: 'Material Thickness',
      paramCount: 4,
      options: [
        { id: 'fabric_thickness', name: 'Fabric Thickness', type: 'range', min: 0.1, max: 5.0, default: 1.0, unit: 'mm', step: 0.1 },
        { id: 'thread_density', name: 'Thread Density', type: 'range', min: 10, max: 200, default: 100, unit: 'threads/cm' },
        { id: 'weave_pattern', name: 'Weave Pattern', type: 'select', options: ['Plain', 'Twill', 'Satin', 'Basket'], default: 'Plain' },
        { id: 'elasticity', name: 'Elasticity', type: 'range', min: 0.0, max: 1.0, default: 0.2, step: 0.1 }
      ]
    },
    { 
      id: 'colors', 
      name: 'Colors & Patterns',
      paramCount: 4,
      options: [
        { id: 'base_color', name: 'Base Color', type: 'select', options: ['Black', 'White', 'Red', 'Blue', 'Green', 'Custom'], default: 'Blue' },
        { id: 'saturation', name: 'Color Saturation', type: 'range', min: 0.0, max: 2.0, default: 1.0, step: 0.1 },
        { id: 'pattern_type', name: 'Pattern Type', type: 'select', options: ['None', 'Stripes', 'Dots', 'Plaid', 'Custom'], default: 'None' },
        { id: 'pattern_scale', name: 'Pattern Scale', type: 'range', min: 0.1, max: 5.0, default: 1.0, step: 0.1 }
      ]
    },
    { 
      id: 'environment', 
      name: 'Environment',
      paramCount: 4,
      options: [
        { id: 'temperature', name: 'Temperature', type: 'range', min: -20, max: 50, default: 20, unit: '°C' },
        { id: 'humidity', name: 'Humidity', type: 'range', min: 10, max: 90, default: 50, unit: '%' },
        { id: 'background', name: 'Background', type: 'select', options: ['White', 'Black', 'Gray', 'Custom HDRI'], default: 'White' },
        { id: 'floor_material', name: 'Floor Material', type: 'select', options: ['Concrete', 'Wood', 'Marble', 'Fabric'], default: 'Concrete' }
      ]
    },
    { 
      id: 'animation', 
      name: 'Animation States',
      paramCount: 4,
      options: [
        { id: 'movement_type', name: 'Movement Type', type: 'select', options: ['Static', 'Walking', 'Running', 'Dancing'], default: 'Walking' },
        { id: 'animation_speed', name: 'Animation Speed', type: 'range', min: 0.1, max: 3.0, default: 1.0, step: 0.1 },
        { id: 'frame_rate', name: 'Frame Rate', type: 'select', options: ['24fps', '30fps', '60fps', '120fps'], default: '60fps' },
        { id: 'duration', name: 'Duration', type: 'range', min: 1, max: 10, default: 5, unit: 's' }
      ]
    }
  ];

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
    const newApiKey = '23b_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKey(newApiKey);
    
    const dataset = {
      name: promptValue || 'Pants',
      categories: selectedCategories,
      samples: Math.floor(Math.random() * 50000) + 10000,
      size: `${(Math.random() * 5 + 1).toFixed(1)}GB`,
      price: selectedCategories.length * 29 + 99
    };
    setGeneratedDataset(dataset);
    setShowModal(false);
    setCurrentPage('api-checkout');
  };

  const copyApiKey = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>
        <header className="px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-semibold text-black">23 Bulbs</h1>
            <button 
              onClick={() => setCurrentPage('signin')}
              className="bg-black text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Sign In
            </button>
          </div>
        </header>

        <main className="px-4 sm:px-6 pt-12 sm:pt-24 pb-16 sm:pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-6xl font-bold text-black mb-6 sm:mb-8 leading-tight tracking-tight">
              Physics-Aware Datasets<br />
              for Enterprise GenAI
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-12 sm:mb-16 max-w-2xl mx-auto leading-relaxed px-4">
              Power the next generation of AI with real-world fidelity. Our breakthrough 
              real-time simulation engine delivers physics-accurate training data that unlocks GenAI for enterprise use.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4">
              <button 
                onClick={() => setCurrentPage('signup')}
                className="bg-blue-600 text-white w-full sm:w-52 py-3.5 rounded-full text-base font-semibold hover:bg-blue-700 transition-all duration-200 inline-flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Sign Up</span>
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

  if (currentPage === 'signin') {
    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>
        <header className="px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentPage('landing')}
                className="text-gray-500 hover:text-black p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl sm:text-2xl font-semibold text-black">23 Bulbs</h1>
            </div>
          </div>
        </header>

        <main className="px-4 sm:px-6 py-12 sm:py-24">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Welcome Back</h2>
              <p className="text-lg text-gray-600">
                Sign in to your 23 Bulbs account
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="john.doe@company.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="remember" className="text-sm text-gray-600">
                      Remember me
                    </label>
                  </div>
                  <button className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </button>
                </div>

                <button 
                  onClick={() => setCurrentPage('generation')}
                  className="w-full bg-blue-600 text-white py-3.5 rounded-xl text-base font-semibold hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </button>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-gray-500">
                Don't have an account? <button onClick={() => setCurrentPage('signup')} className="text-blue-600 hover:underline cursor-pointer">Sign Up</button>
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (currentPage === 'signup') {
    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>
        <header className="px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentPage('landing')}
                className="text-gray-500 hover:text-black p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl sm:text-2xl font-semibold text-black">23 Bulbs</h1>
            </div>
          </div>
        </header>

        <main className="px-4 sm:px-6 py-12 sm:py-24">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Create Account</h2>
              <p className="text-lg text-gray-600">
                Join 23 Bulbs to start generating enterprise-grade datasets
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value="John Doe"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value="john.doe@company.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value="AI Research Corp"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Use Case</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                    <option>AI Video Generation Training</option>
                    <option>Computer Vision Research</option>
                    <option>Fashion Tech Development</option>
                    <option>3D Simulation & Modeling</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    defaultChecked
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the <span className="text-blue-600 hover:underline cursor-pointer">Terms of Service</span> and <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span>
                  </label>
                </div>

                <button 
                  onClick={() => setCurrentPage('generation')}
                  className="w-full bg-blue-600 text-white py-3.5 rounded-xl text-base font-semibold hover:bg-blue-700 transition-colors"
                >
                  Create Account & Continue
                </button>

                <div className="text-center">
                  <button 
                    onClick={() => setCurrentPage('marketplace')}
                    className="text-gray-600 hover:text-black text-sm font-medium transition-colors"
                  >
                    Browse Datasets First
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-gray-500">
                Already have an account? <button onClick={() => setCurrentPage('signin')} className="text-blue-600 hover:underline cursor-pointer">Sign In</button>
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (currentPage === 'technology') {
    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>
        <header className="px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentPage('landing')}
                className="text-gray-500 hover:text-black p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl sm:text-2xl font-semibold text-black">23 Bulbs</h1>
            </div>
            <button 
              onClick={() => setCurrentPage('signin')}
              className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Sign In
            </button>
          </div>
        </header>

        <main className="px-4 sm:px-6 py-16 sm:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-32">
              <h2 className="text-6xl font-light text-black mb-8 tracking-tight">
                Physics‑Aware Training Data
              </h2>
              <p className="text-xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Current GenAI models are unusable for enterprise. We deliver real‑world simulation 
                through API at scale, unlocking GenAI for enterprise use.
              </p>
            </div>

            <div className="mb-32">
              <h3 className="text-3xl font-light text-black mb-16 text-center">Technical Pipeline</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <div className="w-6 h-4 border-2 border-gray-700 rounded-sm"></div>
                  </div>
                  <h4 className="text-lg font-medium text-black mb-2">3D Models</h4>
                  <p className="text-sm text-gray-600">High‑fidelity geometry</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-3 border-r-3 border-b-6 border-l-transparent border-r-transparent border-b-gray-700"></div>
                  </div>
                  <h4 className="text-lg font-medium text-black mb-2">Physics Engine</h4>
                  <p className="text-sm text-gray-600">Real‑time simulation</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                  </div>
                  <h4 className="text-lg font-medium text-black mb-2">Multi‑Camera Render</h4>
                  <p className="text-sm text-gray-600">36 camera perspectives</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-blue-50 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-blue-900 transform rotate-45 rounded-sm"></div>
                  </div>
                  <h4 className="text-lg font-medium text-black mb-2">Training Data</h4>
                  <p className="text-sm text-gray-600">Tagged, AI‑ready output</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
              <div className="bg-gray-100 rounded-2xl p-12">
                <h3 className="text-2xl font-light text-black mb-8">The Problem</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-4 h-4 mt-1 border-2 border-gray-700 rounded-full flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-black mb-1">Unstable Generation</h4>
                      <p className="text-sm text-gray-600">Video melts after 4‑8 seconds</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-4 h-4 mt-1 bg-gray-700 rounded-sm flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-black mb-1">Blocked Adoption</h4>
                      <p className="text-sm text-gray-600">Enterprise can't deploy at scale</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-4 h-4 mt-1 border-2 border-gray-700 flex-shrink-0" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                    <div>
                      <h4 className="font-medium text-black mb-1">Legal Risk</h4>
                      <p className="text-sm text-gray-600">Copyright infringement liability</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 rounded-2xl p-12">
                <h3 className="text-2xl font-light text-black mb-8">Our Solution</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-4 h-4 mt-1 border-2 border-gray-700 rounded-full flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-black mb-1">Real‑Time Physics</h4>
                      <p className="text-sm text-gray-600">Cloth and motion simulation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="grid grid-cols-2 gap-0.5 w-4 h-4 mt-1 flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-black mb-1">Multi‑Camera Array</h4>
                      <p className="text-sm text-gray-600">36 perspectives per frame</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-4 h-4 mt-1 bg-gray-700 rounded-sm border-2 border-gray-700 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-black mb-1">Material Accuracy</h4>
                      <p className="text-sm text-gray-600">Physics‑based rendering</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex space-x-0.5 mt-1 flex-shrink-0">
                      <div className="w-1 h-4 bg-gray-700"></div>
                      <div className="w-1 h-3 bg-gray-700"></div>
                      <div className="w-1 h-4 bg-gray-700"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-black mb-1">Scalable Pipeline</h4>
                      <p className="text-sm text-gray-600">API‑driven generation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-4 h-4 mt-1 bg-gray-700 rounded-sm relative flex-shrink-0">
                      <div className="absolute inset-1 grid grid-cols-2 gap-0.5">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-black mb-1">Tagged Data</h4>
                      <p className="text-sm text-gray-600">Labeled training datasets</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-4 h-4 mt-1 bg-blue-900 rounded-sm flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-black mb-1">AI‑Ready Output</h4>
                      <p className="text-sm text-gray-600">Optimized for training</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-white rounded-2xl p-16 text-center">
              <h3 className="text-2xl font-light mb-16">Performance Metrics</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                <div>
                  <div className="text-4xl font-light mb-2">500M → 500</div>
                  <div className="text-gray-400 text-sm">Frames Reduced</div>
                </div>
                <div>
                  <div className="text-4xl font-light mb-2">45TB</div>
                  <div className="text-gray-400 text-sm">Data Volume</div>
                </div>
                <div>
                  <div className="text-4xl font-light mb-2">8K</div>
                  <div className="text-gray-400 text-sm">Resolution @ 60fps</div>
                </div>
                <div>
                  <div className="text-4xl font-light text-blue-600 mb-2">4 Years</div>
                  <div className="text-gray-400 text-sm">Technical Moat</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (currentPage === 'marketplace') {
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
            <button 
              onClick={() => setCurrentPage('signin')}
              className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Sign In
            </button>
          </div>
        </header>

        <main className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-4 tracking-tight">
                Pre-Built Datasets
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Enterprise-grade physics-aware datasets that unlock GenAI for real-world applications. 
                Reduce training time from 500M to 500 frames per use case.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                <div className="h-48 bg-gradient-to-br from-blue-600 to-blue-800 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white bg-opacity-10 rounded-xl flex items-center justify-center">
                      {renderShape('rectangle')}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 bg-opacity-80 text-white text-xs font-medium rounded-full">Demo</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-2">Pants Demo</h3>
                  <p className="text-gray-600 mb-4">Interactive Demo • 50 samples</p>
                  <ul className="space-y-2 mb-6">
                    <li className="text-sm text-gray-600 flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      8K • 60fps • 36 cameras
                    </li>
                    <li className="text-sm text-gray-600 flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      AOV render passes
                    </li>
                    <li className="text-sm text-gray-600 flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      Wind physics: No wind → Storm
                    </li>
                    <li className="text-sm text-gray-600 flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      35+ adjustable parameters
                    </li>
                  </ul>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-blue-900 mb-4">Try Interactive Demo</p>
                    <button 
                      onClick={() => {
                        setPromptValue('Pants');
                        setCurrentPage('generation');
                        setShowModal(true);
                      }}
                      className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
                    >
                      Launch Demo
                    </button>
                  </div>
                </div>
              </div>

              {[
                { 
                  name: 'Dresses', 
                  items: '2.6K videos • 45TB', 
                  specs: ['8K • 60fps • 36 cameras', 'Flowing fabric dynamics', 'Complex draping physics', 'HDR lighting setups'],
                  gradient: 'from-gray-700 to-gray-900',
                  shape: 'triangle'
                },
                { 
                  name: 'Hair Dynamics', 
                  items: '2.6K videos • 45TB', 
                  specs: ['8K • 60fps • 36 cameras', 'Strand-level physics', 'Wind interaction', 'Multiple hair types'],
                  gradient: 'from-gray-600 to-gray-800',
                  shape: 'waves'
                },
                { 
                  name: 'Human Bodies', 
                  items: '2.6K videos • 45TB', 
                  specs: ['8K • 60fps • 36 cameras', 'Motion capture data', 'Anatomical accuracy', 'Spatial integrity'],
                  gradient: 'from-gray-700 to-black',
                  shape: 'circle'
                },
                { 
                  name: 'Animal Motion', 
                  items: '2.6K videos • 45TB', 
                  specs: ['8K • 60fps • 36 cameras', 'Realistic gait patterns', 'Natural behaviors', 'Fur dynamics'],
                  gradient: 'from-gray-800 to-gray-900',
                  shape: 'diamond'
                },
                { 
                  name: 'Custom Dataset', 
                  items: 'Configure your own', 
                  specs: ['Custom specifications', 'Advanced parameters', 'Tailored for your needs', 'Enterprise support'],
                  gradient: 'from-black to-gray-800',
                  shape: 'hexagon'
                }
              ].map((dataset, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                  <div className={`h-48 bg-gradient-to-br ${dataset.gradient} relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white bg-opacity-10 rounded-xl flex items-center justify-center">
                        {renderShape(dataset.shape)}
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black bg-opacity-40 text-white text-xs font-medium rounded-full">Video</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-black mb-2">{dataset.name}</h3>
                    <p className="text-gray-600 mb-4">{dataset.items}</p>
                    <ul className="space-y-2 mb-6">
                      {dataset.specs.map((spec, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900 mb-4">Enterprise Pricing</p>
                      <a 
                        href={`mailto:sales@23bulbs.com?subject=Dataset Inquiry - ${dataset.name}&body=Hi, I'm interested in learning more about the ${dataset.name} dataset (2.6K videos, 45TB). Please contact me to discuss pricing and requirements.`}
                        className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors inline-block"
                      >
                        Contact Sales
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (currentPage === 'api-checkout') {
    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>
        <header className="px-6 py-8 border-b border-gray-100">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentPage('generation')}
                className="text-gray-500 hover:text-black p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-semibold text-black">23 Bulbs</h1>
            </div>
          </div>
        </header>

        <main className="px-6 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Key className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-black mb-4">API Access Generated</h2>
              <p className="text-lg text-gray-600">Your dataset configuration is ready! Use this API key to access your custom "{generatedDataset?.name}" dataset.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-black mb-6 flex items-center">
                <Key className="w-5 h-5 mr-2" />
                Your API Key
              </h3>
              
              <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <code className="text-sm font-mono text-gray-800 break-all">{apiKey}</code>
                  </div>
                  <button 
                    onClick={copyApiKey}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Important:</strong> Store this API key securely. For security reasons, we won't show it again.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-black mb-6">Dataset Configuration</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dataset Type</span>
                  <span className="font-medium text-black">{generatedDataset?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Categories</span>
                  <span className="font-medium text-black">{generatedDataset?.categories?.length} selected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Samples</span>
                  <span className="font-medium text-black">{generatedDataset?.samples?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data Volume</span>
                  <span className="font-medium text-black">{generatedDataset?.size}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-4">
                  <span className="text-gray-600">API Endpoint</span>
                  <span className="font-mono text-sm text-blue-600">api.23bulbs.com/v1/generate</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-black mb-6">Quick Start Guide</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-black mb-3">1. Install the SDK</h4>
                  <div className="bg-gray-900 text-gray-100 rounded-lg p-4">
                    <code className="text-sm">pip install twentythreebulbs</code>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-black mb-3">2. Initialize the Client</h4>
                  <div className="bg-gray-900 text-gray-100 rounded-lg p-4">
                    <code className="text-sm">
                      from twentythreebulbs import Client<br />
                      <br />
                      client = Client(api_key="{apiKey ? apiKey.substring(0, 20) + '...' : 'your-api-key'}")<br />
                      dataset = client.generate("{generatedDataset?.name?.toLowerCase() || 'pants'}")
                    </code>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-black mb-3">3. Generate Your Dataset</h4>
                  <div className="bg-gray-900 text-gray-100 rounded-lg p-4">
                    <code className="text-sm">
                      # Generate and download your dataset<br />
                      result = dataset.create()<br />
                      dataset.download("./my_dataset/")
                    </code>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://docs.23bulbs.com/quickstart"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>View Full Documentation</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <button 
                onClick={() => setCurrentPage('generation')}
                className="flex-1 bg-gray-100 text-gray-900 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Create Another Dataset
              </button>
            </div>

            <div className="text-center mt-8 p-6 bg-blue-50 rounded-xl">
              <h4 className="font-semibold text-black mb-2">Need Help?</h4>
              <p className="text-sm text-gray-600 mb-4">
                Our technical team is here to help you integrate and optimize your dataset generation.
              </p>
              <a 
                href={`mailto:support@23bulbs.com?subject=API Integration Help - ${generatedDataset?.name}&body=Hi, I just received my API key and need help integrating the ${generatedDataset?.name} dataset. My API key starts with: ${apiKey ? apiKey.substring(0, 10) + '...' : 'API key'}`}
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <span>Contact Support</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (currentPage === 'checkout') {
    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>
        <header className="px-6 py-8 border-b border-gray-100">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentPage('generation')}
                className="text-gray-500 hover:text-black p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-semibold text-black">23 Bulbs</h1>
            </div>
          </div>
        </header>

        <main className="px-6 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">Contact Sales</h2>
              <p className="text-lg text-gray-600">Enterprise dataset licensing for "{generatedDataset?.name}"</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-black mb-6">Dataset Configuration</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dataset Type</span>
                  <span className="font-medium text-black">{generatedDataset?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Categories</span>
                  <span className="font-medium text-black">{generatedDataset?.categories?.length} selected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Samples</span>
                  <span className="font-medium text-black">{generatedDataset?.samples?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data Volume</span>
                  <span className="font-medium text-black">{generatedDataset?.size}</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a 
                href={`mailto:sales@23bulbs.com?subject=Dataset Configuration - ${generatedDataset?.name}&body=Hi, I'd like to discuss enterprise licensing for a ${generatedDataset?.name} dataset with ${generatedDataset?.categories?.length} categories. Please contact me to discuss pricing and implementation timeline.`}
                className="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-colors inline-block mb-4"
              >
                Schedule Sales Call
              </a>
              <p className="text-sm text-gray-600">
                Our enterprise team will contact you within 24 hours to discuss<br />
                custom pricing, technical consultation, and implementation support.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Main Dashboard
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {getFilteredProjects().map((project) => (
              <div 
                key={project.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all group"
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
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="text-center">
                    <a 
                      href={`mailto:sales@23bulbs.com?subject=Project Inquiry - ${project.name}&body=Hi, I'm interested in the ${project.name} project. Please contact me to discuss enterprise pricing and implementation.`}
                      className="w-full bg-black text-white py-2.5 rounded-full font-medium hover:bg-gray-800 transition-colors inline-block text-sm"
                    >
                      Contact Sales
                    </a>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl overflow-hidden hover:border-gray-400 hover:bg-gray-50 transition-all group">
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
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">Advanced</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">Custom</span>
                </div>
                <div className="text-center">
                  <a 
                    href="mailto:sales@23bulbs.com?subject=Custom Dataset Inquiry&body=Hi, I'm interested in creating a custom dataset. Please contact me to discuss requirements and pricing."
                    className="w-full bg-black text-white py-2.5 rounded-full font-medium hover:bg-gray-800 transition-colors inline-block text-sm"
                  >
                    Contact Sales
                  </a>
                </div>
              </div>
            </div>
          </div>

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
            
            <div className="flex-1 overflow-y-auto p-4 sm:p-8" style={{ maxHeight: 'calc(90vh - 200px)' }}>
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
                      <div>
                        <span className="font-medium text-black">{category.name}</span>
                        <span className="text-xs text-gray-500 ml-2">({category.paramCount} params)</span>
                      </div>
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
                              <span className="text-xs text-gray-500 ml-2">({category.paramCount} parameters)</span>
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
                                          style={{
                                            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((config[option.id] || option.default) - option.min) / (option.max - option.min) * 100}%, #e5e7eb ${((config[option.id] || option.default) - option.min) / (option.max - option.min) * 100}%, #e5e7eb 100%)`
                                          }}
                                        />
                                        <div className="flex justify-between text-xs text-gray-500">
                                          <span>{option.min}{option.unit}</span>
                                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-medium">
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
                {selectedCategories.length} categories selected ({selectedCategories.reduce((total, catId) => {
                  const cat = datasetCategories.find(c => c.id === catId);
                  return total + (cat ? cat.paramCount : 0);
                }, 0)} total parameters)
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
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
                >
                  Generate Dataset
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
