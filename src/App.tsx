import React, { useState } from ‘react’;
import { ArrowRight, ArrowLeft, X, Check, ChevronDown, Key, Copy, ExternalLink, Mail, Lock, User } from ‘lucide-react’;

const DatasetPlatform = () => {
const [currentPage, setCurrentPage] = useState(‘landing’);
const [promptValue, setPromptValue] = useState(’’);
const [showModal, setShowModal] = useState(false);
const [selectedCategories, setSelectedCategories] = useState([]);
const [categoryConfigs, setCategoryConfigs] = useState({});
const [collapsedCategories, setCollapsedCategories] = useState({});
const [generatedDataset, setGeneratedDataset] = useState(null);
const [apiKey, setApiKey] = useState(’’);
const [copied, setCopied] = useState(false);

const datasetCategories = [
{
id: ‘lights’,
name: ‘Lighting’,
paramCount: 5,
options: [
{ id: ‘angle’, name: ‘Light Angle’, type: ‘range’, min: 0, max: 360, default: 45, unit: ‘°’ },
{ id: ‘count’, name: ‘Number of Lights’, type: ‘range’, min: 1, max: 8, default: 3, unit: ‘lights’ },
{ id: ‘intensity’, name: ‘Light Intensity’, type: ‘range’, min: 0.1, max: 2.0, default: 1.0, unit: ‘lux’, step: 0.1 },
{ id: ‘color_temp’, name: ‘Color Temperature’, type: ‘range’, min: 2700, max: 6500, default: 5000, unit: ‘K’ },
{ id: ‘hdri’, name: ‘HDRI Environment’, type: ‘select’, options: [‘Studio’, ‘Outdoor’, ‘Indoor’, ‘Sunset’], default: ‘Studio’ }
]
},
{
id: ‘materials’,
name: ‘Materials & Textures’,
paramCount: 5,
options: [
{ id: ‘fabric_type’, name: ‘Fabric Type’, type: ‘select’, options: [‘Cotton’, ‘Denim’, ‘Silk’, ‘Polyester’, ‘Wool’, ‘Leather’], default: ‘Cotton’ },
{ id: ‘roughness’, name: ‘Surface Roughness’, type: ‘range’, min: 0.0, max: 1.0, default: 0.5, step: 0.1 },
{ id: ‘metallic’, name: ‘Metallic’, type: ‘range’, min: 0.0, max: 1.0, default: 0.0, step: 0.1 },
{ id: ‘subsurface’, name: ‘Subsurface Scattering’, type: ‘range’, min: 0.0, max: 1.0, default: 0.3, step: 0.1 },
{ id: ‘normal_strength’, name: ‘Normal Map Strength’, type: ‘range’, min: 0.0, max: 2.0, default: 1.0, step: 0.1 }
]
},
{
id: ‘camera’,
name: ‘Camera Setup’,
paramCount: 5,
options: [
{ id: ‘angles’, name: ‘Camera Angles’, type: ‘range’, min: 1, max: 36, default: 8, unit: ‘angles’ },
{ id: ‘resolution’, name: ‘Resolution’, type: ‘select’, options: [‘HD’, ‘4K’, ‘8K’], default: ‘4K’ },
{ id: ‘focal_length’, name: ‘Focal Length’, type: ‘range’, min: 18, max: 200, default: 50, unit: ‘mm’ },
{ id: ‘depth_of_field’, name: ‘Depth of Field’, type: ‘range’, min: 0.0, max: 10.0, default: 2.8, unit: ‘f’ },
{ id: ‘motion_blur’, name: ‘Motion Blur’, type: ‘range’, min: 0.0, max: 1.0, default: 0.2, step: 0.1 }
]
},
{
id: ‘forces’,
name: ‘Physics Forces’,
paramCount: 5,
options: [
{ id: ‘wind_strength’, name: ‘Wind Strength’, type: ‘range’, min: 0.0, max: 10.0, default: 2.0, unit: ‘m/s’, step: 0.5 },
{ id: ‘gravity’, name: ‘Gravity Strength’, type: ‘range’, min: 0.5, max: 2.0, default: 1.0, unit: ‘g’, step: 0.1 },
{ id: ‘wind_direction’, name: ‘Wind Direction’, type: ‘range’, min: 0, max: 360, default: 90, unit: ‘°’ },
{ id: ‘air_density’, name: ‘Air Density’, type: ‘range’, min: 0.5, max: 2.0, default: 1.0, unit: ‘kg/m³’, step: 0.1 },
{ id: ‘collision_margin’, name: ‘Collision Margin’, type: ‘range’, min: 0.001, max: 0.1, default: 0.01, unit: ‘m’, step: 0.001 }
]
},
{
id: ‘thickness’,
name: ‘Material Thickness’,
paramCount: 4,
options: [
{ id: ‘fabric_thickness’, name: ‘Fabric Thickness’, type: ‘range’, min: 0.1, max: 5.0, default: 1.0, unit: ‘mm’, step: 0.1 },
{ id: ‘thread_density’, name: ‘Thread Density’, type: ‘range’, min: 10, max: 200, default: 100, unit: ‘threads/cm’ },
{ id: ‘weave_pattern’, name: ‘Weave Pattern’, type: ‘select’, options: [‘Plain’, ‘Twill’, ‘Satin’, ‘Basket’], default: ‘Plain’ },
{ id: ‘elasticity’, name: ‘Elasticity’, type: ‘range’, min: 0.0, max: 1.0, default: 0.2, step: 0.1 }
]
},
{
id: ‘colors’,
name: ‘Colors & Patterns’,
paramCount: 4,
options: [
{ id: ‘base_color’, name: ‘Base Color’, type: ‘select’, options: [‘Black’, ‘White’, ‘Red’, ‘Blue’, ‘Green’, ‘Custom’], default: ‘Blue’ },
{ id: ‘saturation’, name: ‘Color Saturation’, type: ‘range’, min: 0.0, max: 2.0, default: 1.0, step: 0.1 },
{ id: ‘pattern_type’, name: ‘Pattern Type’, type: ‘select’, options: [‘None’, ‘Stripes’, ‘Dots’, ‘Plaid’, ‘Custom’], default: ‘None’ },
{ id: ‘pattern_scale’, name: ‘Pattern Scale’, type: ‘range’, min: 0.1, max: 5.0, default: 1.0, step: 0.1 }
]
},
{
id: ‘environment’,
name: ‘Environment’,
paramCount: 4,
options: [
{ id: ‘temperature’, name: ‘Temperature’, type: ‘range’, min: -20, max: 50, default: 20, unit: ‘°C’ },
{ id: ‘humidity’, name: ‘Humidity’, type: ‘range’, min: 10, max: 90, default: 50, unit: ‘%’ },
{ id: ‘background’, name: ‘Background’, type: ‘select’, options: [‘White’, ‘Black’, ‘Gray’, ‘Custom HDRI’], default: ‘White’ },
{ id: ‘floor_material’, name: ‘Floor Material’, type: ‘select’, options: [‘Concrete’, ‘Wood’, ‘Marble’, ‘Fabric’], default: ‘Concrete’ }
]
},
{
id: ‘animation’,
name: ‘Animation States’,
paramCount: 4,
options: [
{ id: ‘movement_type’, name: ‘Movement Type’, type: ‘select’, options: [‘Static’, ‘Walking’, ‘Running’, ‘Dancing’], default: ‘Walking’ },
{ id: ‘animation_speed’, name: ‘Animation Speed’, type: ‘range’, min: 0.1, max: 3.0, default: 1.0, step: 0.1 },
{ id: ‘frame_rate’, name: ‘Frame Rate’, type: ‘select’, options: [‘24fps’, ‘30fps’, ‘60fps’, ‘120fps’], default: ‘60fps’ },
{ id: ‘duration’, name: ‘Duration’, type: ‘range’, min: 1, max: 10, default: 5, unit: ‘s’ }
]
}
];

const marketplaceDatasets = [
{
id: ‘pants’,
name: ‘Pants Demo’,
description: ‘Interactive Demo • 50 samples’,
gradient: ‘from-gray-800 to-black’,
features: [‘8K • 60fps • 36 cameras’, ‘AOV render passes’, ‘Wind physics: No wind → Storm’, ‘35+ adjustable parameters’],
isDemo: true,
badge: ‘Demo’,
shape: ‘rectangle’
},
{
id: ‘dresses’,
name: ‘Dresses & Skirts’,
description: ‘Enterprise • 100K+ samples’,
gradient: ‘from-gray-700 to-gray-900’,
features: [‘Flowing fabric dynamics’, ‘Complex draping physics’, ‘Multiple fabric types’, ‘Full texture variants’],
isDemo: false,
badge: ‘Enterprise’,
shape: ‘triangle’
},
{
id: ‘hair’,
name: ‘Hair Dynamics’,
description: ‘Enterprise • 50K+ samples’,
gradient: ‘from-gray-600 to-gray-800’,
features: [‘Strand-level simulation’, ‘Wind & gravity effects’, ‘Multiple hair types’, ‘Realistic movement’],
isDemo: false,
badge: ‘Enterprise’,
shape: ‘waves’
},
{
id: ‘body’,
name: ‘Human Bodies’,
description: ‘Enterprise • 200K+ samples’,
gradient: ‘from-gray-700 to-black’,
features: [‘Full body motion capture’, ‘Anatomically correct’, ‘Multiple body types’, ‘Pose variations’],
isDemo: false,
badge: ‘Enterprise’,
shape: ‘circle’
},
{
id: ‘animal’,
name: ‘Animal Motion’,
description: ‘Enterprise • 75K+ samples’,
gradient: ‘from-gray-800 to-gray-900’,
features: [‘Natural gait patterns’, ‘Fur dynamics’, ‘Multiple species’, ‘Behavioral animations’],
isDemo: false,
badge: ‘Enterprise’,
shape: ‘diamond’
},
{
id: ‘custom’,
name: ‘Custom Dataset’,
description: ‘Enterprise • Custom volume’,
gradient: ‘from-black to-gray-800’,
features: [‘Tailored to your needs’, ‘Custom parameters’, ‘Dedicated support’, ‘Priority generation’],
isDemo: false,
badge: ‘Custom’,
shape: ‘hexagon’
}
];

const toggleCategory = (categoryId) => {
setSelectedCategories(prev => {
if (prev.includes(categoryId)) {
const newConfigs = { …categoryConfigs };
delete newConfigs[categoryId];
setCategoryConfigs(newConfigs);
return prev.filter(id => id !== categoryId);
} else {
const category = datasetCategories.find(cat => cat.id === categoryId);
const defaultConfig = {};
category.options.forEach(option => {
defaultConfig[option.id] = option.default;
});
setCategoryConfigs(prev => ({ …prev, [categoryId]: defaultConfig }));
return […prev, categoryId];
}
});
};

const updateCategoryConfig = (categoryId, optionId, value) => {
setCategoryConfigs(prev => ({
…prev,
[categoryId]: {
…prev[categoryId],
[optionId]: value
}
}));
};

const toggleCategoryCollapse = (categoryId) => {
setCollapsedCategories(prev => ({
…prev,
[categoryId]: !prev[categoryId]
}));
};

const renderShape = (shape) => {
const shapeClasses = “w-8 h-8 bg-white bg-opacity-90”;

```
switch (shape) {
  case 'rectangle':
    return <div className={`${shapeClasses} rounded-sm`}></div>;
  case 'triangle':
    return (
      <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-b-[28px] border-l-transparent border-r-transparent border-b-white opacity-90"></div>
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
```

};

const generateDataset = () => {
const newApiKey = ‘23b_live_’ + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
setApiKey(newApiKey);

```
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
```

};

const copyApiKey = () => {
if (navigator.clipboard) {
navigator.clipboard.writeText(apiKey);
setCopied(true);
setTimeout(() => setCopied(false), 2000);
}
};

const handleModalClose = () => {
setShowModal(false);
};

// Landing Page
if (currentPage === ‘landing’) {
return (
<div className=“min-h-screen bg-white” style={{ fontFamily: ‘-apple-system, BlinkMacSystemFont, “SF Pro Display”, Inter, sans-serif’ }}>
<header className="px-4 sm:px-6 py-6 sm:py-8">
<div className="max-w-6xl mx-auto flex items-center justify-between">
<h1 className="text-xl sm:text-2xl font-semibold text-black">23 Bulbs</h1>
<button
onClick={() => setCurrentPage(‘signin’)}
className=“bg-black text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors”
>
Sign In
</button>
</div>
</header>

```
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
```

}

// Marketplace Page
if (currentPage === ‘marketplace’) {
return (
<div className=“min-h-screen bg-white” style={{ fontFamily: ‘-apple-system, BlinkMacSystemFont, “SF Pro Display”, Inter, sans-serif’ }}>
<header className="px-4 sm:px-6 py-6 sm:py-8 border-b border-gray-100">
<div className="max-w-6xl mx-auto flex items-center justify-between">
<div className="flex items-center space-x-4">
<button
onClick={() => setCurrentPage(‘landing’)}
className=“text-gray-500 hover:text-black p-2 hover:bg-gray-50 rounded-full transition-colors”
>
<ArrowLeft className="w-5 h-5" />
</button>
<h1 className="text-xl sm:text-2xl font-semibold text-black">23 Bulbs</h1>
</div>
<button
onClick={() => setCurrentPage(‘signin’)}
className=“bg-black text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors”
>
Sign In
</button>
</div>
</header>

```
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
          {marketplaceDatasets.map(dataset => (
            <div key={dataset.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
              <div className={`h-48 bg-gradient-to-br ${dataset.gradient} relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white bg-opacity-10 rounded-xl flex items-center justify-center">
                    {renderShape(dataset.shape)}
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 ${dataset.isDemo ? 'bg-blue-600' : 'bg-black'} bg-opacity-80 text-white text-xs font-medium rounded-full`}>
                    {dataset.badge}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-2">{dataset.name}</h3>
                <p className="text-gray-600 mb-4">{dataset.description}</p>
                <ul className="space-y-2 mb-6">
                  {dataset.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  {dataset.isDemo ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-semibold text-gray-900 mb-4">Enterprise License</p>
                      <button 
                        className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                      >
                        Contact Sales
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  </div>
);
```

}

// Generation Page with Modal
if (currentPage === ‘generation’) {
return (
<div className=“min-h-screen bg-white” style={{ fontFamily: ‘-apple-system, BlinkMacSystemFont, “SF Pro Display”, Inter, sans-serif’ }}>
<header className="px-4 sm:px-6 py-6 sm:py-8 border-b border-gray-100">
<div className="max-w-6xl mx-auto flex items-center justify-between">
<div className="flex items-center space-x-4">
<button
onClick={() => setCurrentPage(‘marketplace’)}
className=“text-gray-500 hover:text-black p-2 hover:bg-gray-50 rounded-full transition-colors”
>
<ArrowLeft className="w-5 h-5" />
</button>
<h1 className="text-xl sm:text-2xl font-semibold text-black">23 Bulbs</h1>
</div>
<div className="flex items-center space-x-4">
<button
onClick={() => setCurrentPage(‘marketplace’)}
className=“text-gray-600 hover:text-black px-4 py-2 text-xs sm:text-sm font-medium transition-colors”
>
Browse Datasets
</button>
<div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
<span className="text-xs font-medium text-gray-600">JD</span>
</div>
</div>
</div>
</header>

```
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
                onClick={handleModalClose}
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
                onClick={handleModalClose}
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

    <div className="px-4 sm:px-6 py-8 sm:py-16">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Signed in as John Doe</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4 tracking-tight">
          Interactive Demo
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 mb-8">
          Configure physics parameters for pants simulation
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
        >
          Configure Parameters
        </button>
      </div>
    </div>
  </div>
);
```

}

// API Checkout Page
if (currentPage === ‘api-checkout’) {
const codeExample1 = `from twentythreebulbs import Client

client = Client(api_key=”${apiKey ? apiKey.substring(0, 20) + ‘…’ : ‘your-api-key’}”)
dataset = client.generate(”${generatedDataset?.name?.toLowerCase() || ‘pants’}”)`;

```
const codeExample2 = `# Generate and download your dataset
```

result = dataset.create()
dataset.download(”./my_dataset/”)`;

```
return (
  <div className="min-h-screen bg-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, sans-serif' }}>
    <header className="px-4 sm:px-6 py-6 sm:py-8 border-b border-gray-100">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              setCurrentPage('generation');
              setShowModal(true);
            }}
            className="text-gray-500 hover:text-black p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl sm:text-2xl font-semibold text-black">23 Bulbs</h1>
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
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm"><code>{codeExample1}</code></pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-black mb-3">3. Generate Your Dataset</h4>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm"><code>{codeExample2}</code></pre>
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
            onClick={() => {
              setCurrentPage('generation');
              setShowModal(true);
            }}
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
            href={`mailto:support@23bulbs.com?subject=API Integration Help&body=Hi, I need help integrating the dataset.`}
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
```

}

// Sign In Page
if (currentPage === ‘signin’) {
return (
<div className=“min-h-screen bg-white flex items-center justify-center” style={{ fontFamily: ‘-apple-system, BlinkMacSystemFont, “SF Pro Display”, Inter, sans-serif’ }}>
<div className="w-full max-w-md px-6">
<div className="text-center mb-8">
<h1 className="text-2xl font-semibold text-black mb-2">23 Bulbs</h1>
<h2 className="text-3xl font-bold text-black mb-2">Welcome back</h2>
<p className="text-gray-600">Sign in to your account</p>
</div>

```
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="email" 
              defaultValue="john.doe@company.com"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="password" 
              defaultValue="password123"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
        
        <button 
          onClick={() => setCurrentPage('generation')}
          className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
        
        <div className="text-center">
          <button 
            onClick={() => setCurrentPage('signup')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Don't have an account? Sign up
          </button>
        </div>
        
        <button 
          onClick={() => setCurrentPage('landing')}
          className="w-full text-gray-600 hover:text-black py-2 text-sm font-medium"
        >
          Back to Home
        </button>
      </div>
    </div>
  </div>
);
```

}

// Sign Up Page
if (currentPage === ‘signup’) {
return (
<div className=“min-h-screen bg-white flex items-center justify-center” style={{ fontFamily: ‘-apple-system, BlinkMacSystemFont, “SF Pro Display”, Inter, sans-serif’ }}>
<div className="w-full max-w-md px-6">
<div className="text-center mb-8">
<h1 className="text-2xl font-semibold text-black mb-2">23 Bulbs</h1>
<h2 className="text-3xl font-bold text-black mb-2">Create account</h2>
<p className="text-gray-600">Start generating physics-aware datasets</p>
</div>

```
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              defaultValue="John Doe"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="email" 
              defaultValue="john.doe@company.com"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="password" 
              placeholder="Create a strong password"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
        
        <button 
          onClick={() => setCurrentPage('generation')}
          className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
        >
          Create Account
        </button>
        
        <div className="text-center">
          <button 
            onClick={() => setCurrentPage('signin')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Already have an account? Sign in
          </button>
        </div>
        
        <button 
          onClick={() => setCurrentPage('landing')}
          className="w-full text-gray-600 hover:text-black py-2 text-sm font-medium"
        >
          Back to Home
        </button>
      </div>
    </div>
  </div>
);
```

}

// Technology Page
if (currentPage === ‘technology’) {
return (
<div className=“min-h-screen bg-white” style={{ fontFamily: ‘-apple-system, BlinkMacSystemFont, “SF Pro Display”, Inter, sans-serif’ }}>
<header className="px-4 sm:px-6 py-6 sm:py-8 border-b border-gray-100">
<div className="max-w-6xl mx-auto flex items-center justify-between">
<div className="flex items-center space-x-4">
<button
onClick={() => setCurrentPage(‘landing’)}
className=“text-gray-500 hover:text-black p-2 hover:bg-gray-50 rounded-full transition-colors”
>
<ArrowLeft className="w-5 h-5" />
</button>
<h1 className="text-xl sm:text-2xl font-semibold text-black">23 Bulbs</h1>
</div>
<button
onClick={() => setCurrentPage(‘signin’)}
className=“bg-black text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors”
>
Sign In
</button>
</div>
</header>

```
    <main className="px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-black mb-4 tracking-tight">Our Technology</h2>
          <p className="text-xl text-gray-600">Physics-aware data generation pipeline</p>
        </div>

        {/* Features and Benefits Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {/* Features Card */}
          <div className="rounded-3xl p-10" style={{ backgroundColor: '#f0f1f4' }}>
            <h3 className="text-2xl font-bold mb-10" style={{ color: '#1a1a1a' }}>FEATURES</h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="font-semibold text-lg mb-3" style={{ color: '#1a1a1a' }}>Physics-Accurate Simulation Engine</h4>
                <p className="text-gray-600 leading-relaxed">
                  Real-time cloth and motion simulation, customizable through 20+ parameters (e.g., fabric, force, movement type).
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-3" style={{ color: '#1a1a1a' }}>On-Demand API with Scalable UI</h4>
                <p className="text-gray-600 leading-relaxed">
                  Self-serve platform for enterprises to request and receive high-fidelity video training data with seamless API integration.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-3" style={{ color: '#1a1a1a' }}>Multi-Engine Platform</h4>
                <p className="text-gray-600 leading-relaxed">
                  Beyond ClothTrain - a growing suite of engines for human motion, sensor data, and dynamic environments, building a data flywheel.
                </p>
              </div>
            </div>
          </div>
          
          {/* Benefits Card */}
          <div className="rounded-3xl p-10" style={{ backgroundColor: '#e8eaee' }}>
            <h3 className="text-2xl font-bold mb-10" style={{ color: '#1a1a1a' }}>BENEFITS</h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="font-semibold text-lg mb-3" style={{ color: '#1a1a1a' }}>Faster, Cheaper AI Training</h4>
                <p className="text-gray-600 leading-relaxed">
                  Specific, tagged data reduces training time and compute load - from 500M to just 500 frames per use case.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-3" style={{ color: '#1a1a1a' }}>Enterprise-Ready Performance</h4>
                <p className="text-gray-600 leading-relaxed">
                  Extends video generation beyond the 4-8 second collapse point of current GenAI; stable, predictable, brand-safe.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-3" style={{ color: '#1a1a1a' }}>Massive Revenue & Moat</h4>
                <p className="text-gray-600 leading-relaxed">
                  Recurring revenue from API + per-garment pricing; proprietary tech years in the making that giants like Meta & Snap couldn't build.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Impact Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-16" style={{ color: '#1a1a1a' }}>Performance Impact</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mb-3">
                <span className="text-4xl font-bold" style={{ color: '#ef4444' }}>500M</span>
                <span className="text-2xl mx-2 text-gray-400">→</span>
                <span className="text-4xl font-bold" style={{ color: '#22c55e' }}>500</span>
              </div>
              <p className="text-sm text-gray-600">Training Frames Required</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold mb-3" style={{ color: '#3b82f6' }}>45TB</div>
              <p className="text-sm text-gray-600">Dataset Volume Generated</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold mb-3" style={{ color: '#3b82f6' }}>8K@60fps</div>
              <p className="text-sm text-gray-600">Video Resolution & Frame Rate</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold mb-3" style={{ color: '#22c55e' }}>4 Years</div>
              <p className="text-sm text-gray-600">Technical Development Lead</p>
            </div>
          </div>
        </div>

        {/* Horizontal Pipeline Diagram */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-center mb-16" style={{ color: '#1a1a1a' }}>Data Generation Pipeline</h3>
          <div className="relative px-8">
            {/* Main Connection Line */}
            <div className="absolute top-[40px] left-[80px] right-[80px] h-[3px]" style={{ 
              background: 'linear-gradient(to right, #1a1a1a 0%, #6b7280 40%, #6b7280 60%, #3b82f6 100%)'
            }}></div>
            
            {/* Arrow at the end */}
            <div className="absolute top-[34px] right-[72px]" style={{
              width: 0,
              height: 0,
              borderLeft: '15px solid #3b82f6',
              borderTop: '7px solid transparent',
              borderBottom: '7px solid transparent'
            }}></div>
            
            {/* Process Steps */}
            <div className="flex justify-between items-start">
              {[
                {
                  title: 'Cloth',
                  subtitle: 'Simulation',
                  icon: '⚙️'
                },
                {
                  title: 'Data',
                  subtitle: 'Capture',
                  icon: '📸'
                },
                {
                  title: 'Learning',
                  subtitle: 'Process',
                  icon: '🧠'
                },
                {
                  title: 'Data',
                  subtitle: 'Sets',
                  icon: '📊'
                },
                {
                  title: 'API',
                  subtitle: '',
                  icon: '🔌'
                },
                {
                  title: 'Enhanced',
                  subtitle: 'GenAI',
                  icon: '✨'
                }
              ].map((stage, idx) => (
                <div key={idx} className="flex flex-col items-center relative z-10">
                  {/* Circle with shadow and gradient */}
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg transition-transform hover:scale-110"
                    style={{ 
                      backgroundColor: idx === 5 ? '#3b82f6' : (idx === 0 ? '#1a1a1a' : '#6b7280'),
                      background: idx === 5 
                        ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' 
                        : idx === 0 
                          ? 'linear-gradient(135deg, #1a1a1a 0%, #374151 100%)'
                          : 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)',
                      boxShadow: idx === 5 
                        ? '0 10px 30px rgba(59, 130, 246, 0.3)' 
                        : '0 10px 30px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <div className="text-3xl">{stage.icon}</div>
                    <div className="absolute bottom-2 text-xs font-normal">{idx + 1}</div>
                  </div>
                  
                  {/* Text Below */}
                  <div className="text-center mt-4">
                    <div 
                      className="font-semibold text-base"
                      style={{ color: idx === 5 ? '#3b82f6' : '#1a1a1a' }}
                    >
                      {stage.title}
                    </div>
                    {stage.subtitle && (
                      <div 
                        className="text-sm mt-1"
                        style={{ color: idx === 5 ? '#60a5fa' : '#6b7280' }}
                      >
                        {stage.subtitle}
                      </div>
                    )}
                  </div>
                  
                  {/* Progress indicator dots */}
                  {idx < 5 && (
                    <div className="absolute -right-[50%] top-10 flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-1 h-1 rounded-full animate-pulse"
                          style={{ 
                            backgroundColor: idx === 4 ? '#3b82f6' : '#d1d5db',
                            animationDelay: `${i * 200}ms`
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Description text below pipeline */}
            <div className="mt-12 text-center">
              <p className="text-sm text-gray-500 max-w-3xl mx-auto">
                Our proprietary pipeline transforms physics simulations into AI-ready datasets, 
                reducing training requirements by 1000x while maintaining real-world accuracy
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-block rounded-3xl py-12 px-16" style={{ backgroundColor: '#3b82f6' }}>
            <p className="text-4xl font-bold mb-3 text-white">1000x Reduction</p>
            <p className="text-xl text-white opacity-90">500M frames → 500 frames per use case</p>
          </div>
        </div>
      </div>
    </main>
  </div>
);
```

}

// Default fallback
return (
<div className="min-h-screen bg-gray-100 flex items-center justify-center">
<div className="text-center">
<h1 className="text-2xl font-semibold text-gray-800 mb-4">23 Bulbs Dataset Platform</h1>
<p className="text-gray-600 mb-6">Page not found: {currentPage}</p>
<button
onClick={() => setCurrentPage(‘landing’)}
className=“bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors”
>
Back to Landing
</button>
</div>
</div>
);
};

export default DatasetPlatform;
