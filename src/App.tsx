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

  const handleBuyNow = (dataset) => {
    setGeneratedDataset({
      name: dataset.name,
      categories: dataset.categories,
      samples: parseInt(dataset.items.replace(/[^\d]/g, '')),
      size: `${(Math.random() * 5 + 1).toFixed(1)}GB`,
      price: dataset.price
    });
    setCurrentPage('checkout');
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
              onClick={() => setCurrentPage('generation')}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Custom Generation
            </button>
          </div>
        </header>

        <div className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-4 tracking-tight">
                Pre-Built Datasets
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Ready-to-use datasets optimized for common AI training scenarios
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  name: 'Pants', 
                  items: '85K frames', 
                  specs: ['4K • 8 angles • 3 fits', 'Cotton, Denim, Wool', 'Wind, Drape, Collision'],
                  price: '$55,000', 
                  popular: false 
                },
                { 
                  name: 'Dress', 
                  items: '120K frames', 
                  specs: ['4K • 12 angles • Flow physics', 'Silk, Chiffon, Satin', '15 colors • Walk, Sway, Static'],
                  price: '$75,000', 
                  popular: true 
                },
                { 
                  name: 'Jacket', 
                  items: '90K frames', 
                  specs: ['4K • 6 angles • Heavy materials', 'Leather, Wool, Cotton', 'Indoor/Outdoor • 3 fits'],
                  price: '$60,000', 
                  popular: false 
                },
                { 
                  name: 'Shirt', 
                  items: '70K frames', 
                  specs: ['4K • 8 angles • Studio lighting', 'Cotton, Linen, Polyester', 'Slim, Regular, Loose'],
                  price: '$45,000', 
                  popular: false 
                },
                { 
                  name: 'Skirt', 
                  items: '95K frames', 
                  specs: ['4K • 10 angles • Spin physics', 'Wool, Cotton, Polyester', 'A-line, Pencil, Pleated'],
                  price: '$58,000', 
                  popular: false 
                },
                { 
                  name: 'Sweater', 
                  items: '80K frames', 
                  specs: ['4K • 6 angles • Knit textures', 'Wool, Cashmere, Cotton', 'Cable, Ribbed, Smooth'],
                  price: '$52,000', 
                  popular: false 
                }
              ].map((dataset, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition-colors relative">
                  {dataset.popular && (
                    <div className="absolute -top-3 left-6 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-black mb-2">{dataset.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{dataset.items}</p>
                  <div className="mb-6">
                    <div className="space-y-2">
                      {dataset.specs.map((spec, i) => (
                        <div key={i} className="text-xs text-gray-600 font-medium">
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-black">{dataset.price}</span>
                    <button 
                      onClick={() => handleBuyNow(dataset)}
                      className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <p className="text-gray-600 mb-6">Need something custom?</p>
              <button 
                onClick={() => setCurrentPage('generation')}
                className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
              >
                <span>Create Custom Dataset</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'technology') {
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
          </div>
        </header>

        <div className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-black mb-4 tracking-tight">
                Real-Time Technology
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our proprietary simulation engine processes physics calculations 
                in real-time to generate unlimited datasets at unprecedented speed.
              </p>
            </div>

            <div className="relative mb-16 bg-white p-20">
              <div className="flex items-center justify-center">
                <svg width="900" height="300" viewBox="0 0 900 300">
                  <g>
                    {Array.from({ length: 20 }).map((_, i) => (
                      <circle
                        key={i}
                        cx={100 + (i % 5) * 20}
                        cy={120 + Math.floor(i / 5) * 20}
                        r="3"
                        fill="#666"
                        opacity="0.6"
                      >
                        <animate
                          attributeName="opacity"
                          values="0.3;0.8;0.3"
                          dur={`${2 + (i * 0.1)}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                    ))}
                  </g>

                  <g>
                    <line x1="400" y1="130" x2="500" y2="130" stroke="#666" strokeWidth="3"/>
                    <line x1="400" y1="170" x2="500" y2="170" stroke="#666" strokeWidth="3"/>
                  </g>

                  <g transform="translate(700, 150)">
                    <rect x="-20" y="-15" width="40" height="30" rx="4" fill="none" stroke="#333" strokeWidth="2"/>
                    <circle cx="-10" cy="-8" r="1.5" fill="#333"/>
                    <circle cx="-5" cy="-8" r="1.5" fill="#333"/>
                    <circle cx="0" cy="-8" r="1.5" fill="#333"/>
                    <path d="M-8 2 L-12 6 L-8 10" fill="none" stroke="#333" strokeWidth="2"/>
                    <path d="M8 2 L12 6 L8 10" fill="none" stroke="#333" strokeWidth="2"/>
                  </g>
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-8 mt-12 text-center">
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">Real-Time Simulation</h3>
                  <p className="text-gray-600 text-sm">
                    Physics calculations<br/>
                    3D cloth dynamics
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">Processing Pipeline</h3>
                  <p className="text-gray-600 text-sm">
                    Real-time data transformation
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-black mb-2">API</h3>
                  <p className="text-gray-600 text-sm">
                    Ready for AI training<br/>
                    Instant access
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-black mb-2">{'< 1ms'}</div>
                <div className="text-gray-600">Processing Latency</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-2">CPU + GPU</div>
                <div className="text-gray-600">Hybrid Computing</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black mb-2">∞</div>
                <div className="text-gray-600">Scalability</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              Custom Generation
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
                <span>Custom Generation</span>
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

        <div className="px-4 sm:px-6 pb-8 sm:pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12">
              <div>
                <div className="text-2xl sm:text-4xl font-bold text-black mb-2">Real-time</div>
                <div className="text-gray-600">Generation</div>
              </div>
              <div>
                <div className="text-2xl sm:text-4xl font-bold text-black mb-2">100%</div>
                <div className="text-gray-600">Accurate</div>
              </div>
              <div>
                <div className="text-2xl sm:text-4xl font-bold text-black mb-2">Unlimited</div>
                <div className="text-gray-600">Scale</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'checkout' && generatedDataset) {
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

        <div className="px-6 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-black mb-4 tracking-tight">
                Your Dataset is Ready
              </h2>
              <p className="text-xl text-gray-600">
                Complete purchase to access your API
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-black mb-6">{generatedDataset.name}</h3>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Categories</div>
                  <div className="font-medium text-black">
                    {Array.isArray(generatedDataset.categories) 
                      ? `${generatedDataset.categories.length} selected`
                      : generatedDataset.categories
                    }
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Samples</div>
                  <div className="font-medium text-black">{generatedDataset.samples.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Size</div>
                  <div className="font-medium text-black">{generatedDataset.size}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Format</div>
                  <div className="font-medium text-black">API + Download</div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 space-y-3">
                {typeof generatedDataset.price === 'string' ? (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Dataset license</span>
                      <span className="text-black">{generatedDataset.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">API access (annual)</span>
                      <span className="text-black">$15,000</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-black">Total</span>
                        <span className="text-2xl font-bold text-black">
                          ${(parseInt(generatedDataset.price.replace(/[^\d]/g, '')) + 15000).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">One-time dataset license • Annual API access • Commercial usage rights</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Real-time simulation engine setup</span>
                      <span className="text-black">$150,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Advanced configurations ({Array.isArray(generatedDataset.categories) ? generatedDataset.categories.length : 0} categories)</span>
                      <span className="text-black">${(Array.isArray(generatedDataset.categories) ? generatedDataset.categories.length * 25000 : 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Real-time API infrastructure (monthly)</span>
                      <span className="text-black font-semibold text-red-600">$2,500,000</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-black">Total</span>
                        <span className="text-2xl font-bold text-black">
                          ${(150000 + (Array.isArray(generatedDataset.categories) ? generatedDataset.categories.length * 25000 : 0) + 2500000).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Enterprise contract • Real-time GPU cluster access • Dedicated infrastructure</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => setCurrentPage('success')}
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Purchase & Get API Key
              </button>
              <p className="text-center text-sm text-gray-500">
                Enterprise contract • Dedicated GPU clusters• Real-time infrastructure • Premium support
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'success') {
    return (
      <div className="min-h-screen bg-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>
        <header className="px-6 py-8 border-b border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold text-black">23 Bulbs</h1>
          </div>
        </header>

        <div className="px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            
            <h2 className="text-4xl font-bold text-black mb-4 tracking-tight">
              Dataset Ready
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Your API key and dataset download are ready
            </p>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-black">API Key</h3>
                <Key className="w-5 h-5 text-gray-400" />
              </div>
              <div className="bg-white rounded-xl p-4 font-mono text-sm text-gray-800 border border-gray-200 mb-4">
                23b_sk_live_abc123def456ghi789jkl012mno345
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Copy to clipboard
              </button>
            </div>

            <div className="space-y-4">
              <button className="w-full bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors inline-flex items-center justify-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Dataset</span>
              </button>
              <button 
                onClick={() => setCurrentPage('landing')}
                className="w-full border border-gray-300 text-black px-8 py-4 rounded-full text-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                Generate Another Dataset
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>
      <header className="px-6 py-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentPage('landing')}
              className="text-gray-500 hover:text-black p-2 hover:bg-gray-50 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-semibold text-black">23 Bulbs</h1>
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 py-8 sm:py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4 tracking-tight">
              Generate Dataset
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Describe what you need
            </p>
          </div>

          <div className="mb-8 sm:mb-12">
            <div className="relative">
              <input
                type="text"
                value={promptValue}
                onChange={(e) => setPromptValue(e.target.value)}
                placeholder="Pants"
                className="w-full px-4 sm:px-6 py-4 sm:py-6 text-xl sm:text-2xl border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400 bg-white"
                onKeyPress={(e) => e.key === 'Enter' && handlePromptSubmit()}
              />
              <button
                onClick={handlePromptSubmit}
                disabled={!promptValue.trim()}
                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-3">Popular suggestions:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                'Pants', 'Dress', 'Jacket', 'Shirt', 
                'Skirt', 'Sweater', 'Coat', 'Blouse',
                'Jeans', 'T-Shirt', 'Hoodie', 'Blazer',
                'Shorts', 'Cardigan', 'Vest', 'Scarf'
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => setPromptValue(example)}
                  className="p-3 text-sm text-center border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all"
                >
                  <div className="font-medium text-black">{example}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center p-6 z-50">
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
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl">
            <div className="p-8 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-black">Configure Dataset</h3>
                  <p className="text-gray-600 mt-1">"{promptValue}"</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-50 rounded-full transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div 
              className="flex-1 overflow-y-scroll p-8 modal-scroll" 
              style={{ 
                scrollbarWidth: 'auto', 
                scrollbarColor: '#CBD5E1 #F1F5F9',
                maxHeight: 'calc(90vh - 200px)',
                minHeight: '400px'
              }}
            >
              <div className="grid grid-cols-2 gap-3 mb-8">
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
                            <div className="px-6 pb-6">
                              <div className="grid grid-cols-2 gap-4">
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
              
            <div className="flex items-center justify-between p-8 border-t border-gray-100 flex-shrink-0">
              <span className="text-gray-600">
                {selectedCategories.length} selected
              </span>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 text-gray-600 hover:text-black font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={generateDataset}
                  disabled={selectedCategories.length === 0}
                  className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors"
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
