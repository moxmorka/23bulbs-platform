import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Check, Key, Copy } from 'lucide-react';

// Main component for the 23 Bulbs enterprise platform.
// It manages the state for different pages and component parameters.
export default function App() {
  // State to manage the current page being displayed.
  const [currentPage, setCurrentPage] = useState('landing');
  // State for the generated API key and copy functionality.
  const [apiKey, setApiKey] = useState('');
  const [copied, setCopied] = useState(false);
  // State to track which parameter categories are selected for dataset generation.
  const [selectedCategories, setSelectedCategories] = useState(['lighting', 'materials', 'camera', 'physics']);
  
  // State for the default parameters on the generation page.
  const [parameters, setParameters] = useState({
    lighting: { lightAngle: 45, numLights: 3, intensity: 0.8, colorTemp: 5500, hdri: 'studio' },
    materials: { fabricType: 'cotton', roughness: 0.4, metallic: 0.1, subsurface: 0.3, normalStrength: 0.5 },
    camera: { angles: 36, resolution: '8K', focalLength: 50, dof: 0.2, motionBlur: 0.1 },
    physics: { windStrength: 0.6, gravity: 9.8, windDirection: 180, airDensity: 1.0, collisionMargin: 0.01, bounce: 0.3 }
  });

  // State for the interactive 3D editor's mesh, camera, light, and physics properties.
  const [meshParams, setMeshParams] = useState({
    material: { 
      color: '#475569', wireframe: false, opacity: 1.0, metalness: 0.3, roughness: 0.4,
      transmission: 0.0, ior: 1.5
    },
    cameras: [
      { id: 'main', name: 'Main Camera', type: 'perspective', position: { x: 0, y: 0, z: 5 }, rotation: { x: -15, y: 30, z: 0 }, fov: 50 },
      { id: 'side', name: 'Side Camera', type: 'perspective', position: { x: 8, y: 0, z: 0 }, rotation: { x: 0, y: 90, z: 0 }, fov: 45 },
      { id: 'top', name: 'Top Camera', type: 'orthographic', position: { x: 0, y: 8, z: 0 }, rotation: { x: -90, y: 0, z: 0 }, fov: 60 }
    ],
    lights: [
      { id: 'key', name: 'Key Light', type: 'directional', position: { x: 5, y: 5, z: 5 }, intensity: 1.0, color: '#ffffff', castShadows: true },
      { id: 'fill', name: 'Fill Light', type: 'directional', position: { x: -3, y: 2, z: 4 }, intensity: 0.6, color: '#ffffff', castShadows: false },
      { id: 'rim', name: 'Rim Light', type: 'directional', position: { x: 0, y: 3, z: -5 }, intensity: 0.8, color: '#cceeff', castShadows: false }
    ],
    physics: {
      gravity: 9.8, windStrength: 0.6, windDirection: 180, clothStiffness: 0.8, friction: 0.4, selfCollision: true
    },
    viewMode: 'orbit',
    selectedCamera: 'main',
    selectedLight: 'key',
    animation: {
      isPlaying: false, currentFrame: 0, totalFrames: 120, speed: 1.0,
      cameraKeyframes: [
        { frame: 0, cameraId: 'main', position: { x: 0, y: 0, z: 5 }, rotation: { x: -15, y: 30, z: 0 }, fov: 50 },
        { frame: 40, cameraId: 'main', position: { x: 3, y: 2, z: 4 }, rotation: { x: -10, y: 45, z: 0 }, fov: 60 },
        { frame: 80, cameraId: 'main', position: { x: -2, y: 1, z: 6 }, rotation: { x: -20, y: 60, z: 0 }, fov: 45 }
      ],
      lightKeyframes: [],
      materialKeyframes: []
    }
  });

  // Hardcoded data for the marketplace page.
  const marketplaceDatasets = [
    { id: 'pants', name: 'Pants Demo', description: 'Interactive Demo • 50 samples', background: 'bg-gray-800', features: ['8K • 60fps • 36 cameras', 'Wind physics simulation', '35+ adjustable parameters'], isDemo: true, badge: 'Demo' },
    { id: 'enterprise-3d', name: 'Launch Demo 2 Enterprise', description: 'Enterprise 3D Demo • Real-time', background: 'bg-slate-700', features: ['Real-time 3D simulation', 'Interactive mesh editor', 'Physics parameter control'], isDemo: true, badge: 'Enterprise Demo' },
    { id: 'dresses', name: 'Dresses & Skirts', description: 'Enterprise • 100K+ samples', background: 'bg-gray-700', features: ['Flowing fabric dynamics', 'Complex draping physics', 'Multiple fabric types'], isDemo: false, badge: 'Enterprise' },
    { id: 'jackets', name: 'Jackets & Coats', description: 'Enterprise • 150K+ samples', background: 'bg-slate-800', features: ['Heavy fabric simulation', 'Collar & sleeve dynamics', 'Button & zipper physics'], isDemo: false, badge: 'Enterprise' },
    { id: 'sportswear', name: 'Athletic Wear', description: 'Enterprise • 80K+ samples', background: 'bg-gray-600', features: ['Stretch fabric dynamics', 'Moisture simulation', 'Performance materials'], isDemo: false, badge: 'Enterprise' },
    { id: 'furniture', name: 'Furniture & Upholstery', description: 'Enterprise • 120K+ samples', background: 'bg-slate-600', features: ['Cushion deformation', 'Leather & fabric textures', 'Structural physics'], isDemo: false, badge: 'Enterprise' },
    { id: 'curtains', name: 'Curtains & Drapes', description: 'Enterprise • 90K+ samples', background: 'bg-gray-900', features: ['Wind interaction', 'Hanging dynamics', 'Light filtering effects'], isDemo: false, badge: 'Enterprise' },
    { id: 'automotive', name: 'Automotive Interiors', description: 'Enterprise • 200K+ samples', background: 'bg-black', features: ['Seat deformation', 'Dashboard materials', 'Safety simulation'], isDemo: false, badge: 'Enterprise' },
    { id: 'medical', name: 'Medical Textiles', description: 'Enterprise • 60K+ samples', background: 'bg-slate-900', features: ['Surgical drapes', 'Patient positioning', 'Sterile environments'], isDemo: false, badge: 'Enterprise' }
  ];

  // Function to update parameters on the generation page.
  const updateParameter = (category, key, value) => {
    setParameters(prev => ({ ...prev, [category]: { ...prev[category], [key]: value } }));
  };

  // Function to update parameters in the 3D editor.
  const updateMeshParam = (category, param, value, id) => {
    if (category === 'viewMode') {
      setMeshParams(prev => ({ ...prev, viewMode: value }));
    } else if (category === 'selectedCamera') {
      setMeshParams(prev => ({ ...prev, selectedCamera: value }));
    } else if (category === 'selectedLight') {
      setMeshParams(prev => ({ ...prev, selectedLight: value }));
    } else if (category === 'cameras') {
      setMeshParams(prev => ({
        ...prev,
        cameras: prev.cameras.map(cam => 
          cam.id === id ? { ...cam, [param]: typeof value === 'object' ? { ...cam[param], ...value } : value } : cam
        )
      }));
    } else if (category === 'lights') {
      setMeshParams(prev => ({
        ...prev,
        lights: prev.lights.map(light => 
          light.id === id ? { ...light, [param]: typeof value === 'object' ? { ...light[param], ...value } : value } : light
        )
      }));
    } else if (category === 'physics') {
      setMeshParams(prev => ({ ...prev, physics: { ...prev.physics, [param]: value } }));
    } else if (category === 'animation') {
      setMeshParams(prev => ({ ...prev, animation: { ...prev.animation, [param]: value } }));
    } else {
      setMeshParams(prev => ({ ...prev, [category]: { ...prev[category], [param]: value } }));
    }
  };

  // Functions to add, delete, and manage cameras and lights.
  const addCamera = () => {
    const newId = 'cam_' + Math.random().toString(36).substring(2, 8);
    const newCamera = {
      id: newId, name: `Camera ${meshParams.cameras.length + 1}`, type: 'perspective',
      position: { x: 5, y: 2, z: 3 }, rotation: { x: -10, y: 45, z: 0 }, fov: 50
    };
    setMeshParams(prev => ({ ...prev, cameras: [...prev.cameras, newCamera], selectedCamera: newId }));
  };

  const addLight = () => {
    const newId = 'light_' + Math.random().toString(36).substring(2, 8);
    const newLight = {
      id: newId, name: `Light ${meshParams.lights.length + 1}`, type: 'directional',
      position: { x: 3, y: 3, z: 3 }, intensity: 1.0, color: '#ffffff', castShadows: false
    };
    setMeshParams(prev => ({ ...prev, lights: [...prev.lights, newLight], selectedLight: newId }));
  };

  const deleteCamera = (cameraId) => {
    if (meshParams.cameras.length <= 1) return;
    setMeshParams(prev => {
      const newCameras = prev.cameras.filter(cam => cam.id !== cameraId);
      return {
        ...prev,
        cameras: newCameras,
        selectedCamera: prev.selectedCamera === cameraId ? newCameras[0].id : prev.selectedCamera
      };
    });
  };

  const deleteLight = (lightId) => {
    if (meshParams.lights.length <= 1) return;
    setMeshParams(prev => {
      const newLights = prev.lights.filter(light => light.id !== lightId);
      return {
        ...prev,
        lights: newLights,
        selectedLight: prev.selectedLight === lightId ? newLights[0].id : prev.selectedLight
      };
    });
  };

  // Functions for dataset generation and API key management.
  const generatePantsDataset = () => {
    const newApiKey = '23b_demo_' + Math.random().toString(36).substring(2, 15);
    setApiKey(newApiKey);
    setCurrentPage('api-checkout');
  };

  const generateDataset = () => {
    const newApiKey = '23b_ent_' + Math.random().toString(36).substring(2, 15);
    setApiKey(newApiKey);
    setCurrentPage('api-checkout');
  };

  const copyApiKey = () => {
    // Note: document.execCommand('copy') is used for clipboard access
    // because navigator.clipboard.writeText may be restricted in some environments.
    const tempInput = document.createElement('input');
    tempInput.value = apiKey;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Effect hook to handle animation playback.
  useEffect(() => {
    let interval;
    if (meshParams.animation.isPlaying) {
      interval = setInterval(() => {
        setMeshParams(prev => ({
          ...prev,
          animation: {
            ...prev.animation,
            currentFrame: (prev.animation.currentFrame + prev.animation.speed) % prev.animation.totalFrames
          }
        }));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [meshParams.animation.isPlaying, meshParams.animation.speed]);

  // Main page routing logic based on the currentPage state.
  // The structure uses a single return statement for the entire component,
  // with conditional rendering inside, which is a common and correct pattern.
  switch (currentPage) {
    case 'landing':
      return (
        <div className="min-h-screen bg-white font-sans">
          {/* Landing Page Header */}
          <header className="px-4 sm:px-6 py-6 sm:py-8">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">23 Bulbs</h1>
              <button onClick={() => setCurrentPage('signin')} className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors">Sign In</button>
            </div>
          </header>
          {/* Landing Page Content */}
          <main className="px-4 sm:px-6 pt-12 sm:pt-24 pb-16 sm:pb-32">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight tracking-tight">Physics-Aware Datasets<br />for Enterprise GenAI</h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-12 sm:mb-16 max-w-2xl mx-auto leading-relaxed px-4">Power the next generation of AI with real-world fidelity. Our breakthrough real-time simulation engine delivers physics-accurate training data that unlocks GenAI for enterprise use.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4">
                <button onClick={() => setCurrentPage('signup')} className="bg-blue-600 text-white w-full sm:w-52 py-3.5 rounded-full text-base font-semibold hover:bg-blue-700 transition-all duration-200 inline-flex items-center justify-center space-x-2 shadow-sm"><span>Sign Up</span><ArrowRight className="w-4 h-4" /></button>
                <button onClick={() => setCurrentPage('marketplace')} className="bg-gray-900 text-white w-full sm:w-52 py-3.5 rounded-full text-base font-semibold hover:bg-gray-800 transition-all duration-200 shadow-sm">Browse Datasets</button>
                <button onClick={() => setCurrentPage('technology')} className="bg-gray-100 text-gray-900 w-full sm:w-52 py-3.5 rounded-full text-base font-semibold hover:bg-gray-200 transition-all duration-200 shadow-sm">Technology</button>
              </div>
            </div>
          </main>
        </div>
      );
    case 'marketplace':
      return (
        <div className="min-h-screen bg-white font-sans">
          {/* Marketplace Header */}
          <header className="px-4 sm:px-6 py-6 sm:py-8 border-b border-gray-100">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button onClick={() => setCurrentPage('landing')} className="text-gray-500 hover:text-gray-900 p-2 hover:bg-gray-50 rounded-full transition-colors"><ArrowLeft className="w-5 h-5" /></button>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">23 Bulbs</h1>
              </div>
              <button onClick={() => setCurrentPage('signin')} className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors">Sign In</button>
            </div>
          </header>
          {/* Marketplace Content */}
          <main className="px-6 py-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Pre-Built Datasets</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">Enterprise-grade physics-aware datasets that unlock GenAI for real-world applications. Reduce training time from 500M to 500 frames per use case.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {marketplaceDatasets.map(dataset => (
                  <div key={dataset.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                    <div className={`h-48 ${dataset.background} relative`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white bg-opacity-10 rounded-xl flex items-center justify-center">
                          <div className="w-8 h-8 bg-white bg-opacity-90 rounded-sm"></div>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 ${dataset.isDemo ? 'bg-blue-600' : 'bg-gray-900'} bg-opacity-80 text-white text-xs font-medium rounded-full`}>{dataset.badge}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{dataset.name}</h3>
                      <p className="text-gray-600 mb-4">{dataset.description}</p>
                      <ul className="space-y-2 mb-6">
                        {dataset.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center"><Check className="w-4 h-4 text-gray-600 mr-2 flex-shrink-0" />{feature}</li>
                        ))}
                      </ul>
                      <div className="text-center">
                        {dataset.isDemo ? (
                          <>
                            <p className="text-lg font-semibold text-blue-600 mb-4">{dataset.id === 'enterprise-3d' ? 'Try Enterprise 3D Demo' : 'Try Interactive Demo'}</p>
                            <button onClick={() => setCurrentPage(dataset.id === 'enterprise-3d' ? '3d-editor' : 'generation')} className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">{dataset.id === 'enterprise-3d' ? 'Launch Demo 2 Enterprise' : 'Launch Demo'}</button>
                          </>
                        ) : (
                          <>
                            <p className="text-lg font-semibold text-gray-900 mb-4">Enterprise License</p>
                            <button className="w-full bg-gray-900 text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">Contact Sales</button>
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
    case 'generation':
      const categoryConfig = {
        lighting: { title: 'Lighting', color: 'bg-gray-600', description: 'Light angles, intensity, color temperature', params: [
          { key: 'lightAngle', label: 'Light Angle', type: 'range', min: 0, max: 90, unit: '°' },
          { key: 'numLights', label: 'Number of Lights', type: 'range', min: 1, max: 8, unit: '' },
          { key: 'intensity', label: 'Light Intensity', type: 'range', min: 0.1, max: 2.0, step: 0.1, unit: '' },
          { key: 'colorTemp', label: 'Color Temperature', type: 'range', min: 2700, max: 8000, unit: 'K' },
          { key: 'hdri', label: 'HDRI Environment', type: 'select', options: ['studio', 'outdoor', 'indoor', 'sunset'] }
        ]},
        materials: { title: 'Materials & Textures', color: 'bg-gray-600', description: 'Fabric types, surface properties, textures', params: [
          { key: 'fabricType', label: 'Fabric Type', type: 'select', options: ['cotton', 'silk', 'denim', 'leather', 'synthetic'] },
          { key: 'roughness', label: 'Surface Roughness', type: 'range', min: 0, max: 1, step: 0.01, unit: '' },
          { key: 'metallic', label: 'Metallic', type: 'range', min: 0, max: 1, step: 0.01, unit: '' },
          { key: 'subsurface', label: 'Subsurface Scattering', type: 'range', min: 0, max: 1, step: 0.01, unit: '' },
          { key: 'normalStrength', label: 'Normal Map Strength', type: 'range', min: 0, max: 2, step: 0.01, unit: '' }
        ]},
        camera: { title: 'Camera Setup', color: 'bg-gray-600', description: 'Angles, resolution, focal length, effects', params: [
          { key: 'angles', label: 'Camera Angles', type: 'range', min: 8, max: 64, unit: '' },
          { key: 'resolution', label: 'Resolution', type: 'select', options: ['4K', '8K', '12K'] },
          { key: 'focalLength', label: 'Focal Length', type: 'range', min: 24, max: 200, unit: 'mm' },
          { key: 'dof', label: 'Depth of Field', type: 'range', min: 0, max: 1, step: 0.01, unit: '' },
          { key: 'motionBlur', label: 'Motion Blur', type: 'range', min: 0, max: 1, step: 0.01, unit: '' }
        ]},
        physics: { title: 'Physics Forces', color: 'bg-gray-600', description: 'Wind, gravity, air density, collisions', params: [
          { key: 'windStrength', label: 'Wind Strength', type: 'range', min: 0, max: 2, step: 0.1, unit: 'm/s' },
          { key: 'gravity', label: 'Gravity Strength', type: 'range', min: 0, max: 20, step: 0.1, unit: 'm/s²' },
          { key: 'windDirection', label: 'Wind Direction', type: 'range', min: 0, max: 360, unit: '°' },
          { key: 'airDensity', label: 'Air Density', type: 'range', min: 0.5, max: 2.0, step: 0.1, unit: 'kg/m³' },
          { key: 'collisionMargin', label: 'Collision Margin', type: 'range', min: 0.001, max: 0.1, step: 0.001, unit: 'm' }
        ]}
      };

      const toggleCategory = (categoryKey) => {
        if (selectedCategories.includes(categoryKey)) {
          setSelectedCategories(prev => prev.filter(cat => cat !== categoryKey));
        } else {
          setSelectedCategories(prev => [...prev, categoryKey]);
        }
      };

      const selectedParamCount = selectedCategories.reduce((total, cat) => total + categoryConfig[cat].params.length, 0);

      return (
        <div className="min-h-screen bg-white font-sans">
          {/* Generation Page Header */}
          <header className="px-4 sm:px-6 py-6 sm:py-8 border-b border-gray-100">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button onClick={() => setCurrentPage('marketplace')} className="text-gray-500 hover:text-gray-900 p-2 hover:bg-gray-50 rounded-full transition-colors"><ArrowLeft className="w-5 h-5" /></button>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">23 Bulbs</h1>
                <span className="text-sm text-gray-500">• Configure Parameters</span>
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">JD</span>
              </div>
            </div>
          </header>
          {/* Generation Page Content */}
          <div className="px-6 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Parameter Categories</h2>
                <p className="text-lg text-gray-600">Select which aspects of the simulation you'd like to customize</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {Object.entries(categoryConfig).map(([categoryKey, category]) => (
                  <div key={categoryKey} className="space-y-6">
                    <div onClick={() => toggleCategory(categoryKey)} className={`border-2 rounded-2xl p-6 cursor-pointer transition-all hover:shadow-lg ${selectedCategories.includes(categoryKey) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 ${selectedCategories.includes(categoryKey) ? 'bg-blue-500' : 'bg-gray-300'} rounded-full`}></div>
                          <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedCategories.includes(categoryKey) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                          {selectedCategories.includes(categoryKey) && <Check className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{category.description}</p>
                      <div className="text-sm text-gray-500">{category.params.length} parameters available</div>
                    </div>
                    {selectedCategories.includes(categoryKey) && (
                      <div className="bg-white border border-gray-200 rounded-2xl p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <div className={`w-3 h-3 ${selectedCategories.includes(categoryKey) ? 'bg-blue-500' : 'bg-gray-300'} rounded-full mr-2`}></div>
                          {category.title} Parameters
                        </h4>
                        <div className="space-y-4">
                          {category.params.map(param => {
                            const currentValue = parameters[categoryKey][param.key];
                            return (
                              <div key={param.key} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <label className="text-sm font-medium text-gray-700">{param.label}</label>
                                  <span className="text-sm text-gray-500">{currentValue}{param.unit || ''}</span>
                                </div>
                                {param.type === 'range' ? (
                                  <input type="range" min={param.min} max={param.max} step={param.step || 1} value={currentValue} onChange={(e) => updateParameter(categoryKey, param.key, parseFloat(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                                ) : (
                                  <select value={currentValue} onChange={(e) => updateParameter(categoryKey, param.key, e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                                    {param.options.map(option => <option key={option} value={option}>{option}</option>)}
                                  </select>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 mb-8">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Selection Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div><div className="text-2xl font-bold text-blue-600">{selectedCategories.length}</div><div className="text-sm text-gray-600">Categories</div></div>
                    <div><div className="text-2xl font-bold text-blue-600">{selectedParamCount}</div><div className="text-sm text-gray-600">Parameters</div></div>
                    <div><div className="text-2xl font-bold text-blue-600">{Math.floor(selectedParamCount * 2.5)}K</div><div className="text-sm text-gray-600">Est. Samples</div></div>
                    <div><div className="text-2xl font-bold text-blue-600">{(selectedParamCount * 0.26).toFixed(1)}GB</div><div className="text-sm text-gray-600">Data Volume</div></div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button onClick={generatePantsDataset} disabled={selectedCategories.length === 0} className={`px-12 py-4 rounded-full text-lg font-semibold transition-colors shadow-sm ${selectedCategories.length > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>Generate Dataset ({selectedParamCount} parameters)</button>
              </div>
            </div>
          </div>
        </div>
      );
    case '3d-editor':
      const currentCamera = meshParams.cameras.find(cam => cam.id === meshParams.selectedCamera) || meshParams.cameras[0];
      const currentLight = meshParams.lights.find(light => light.id === meshParams.selectedLight);
      
      return (
        <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
          {/* 3D Editor Header */}
          <header className="px-4 sm:px-6 py-6 sm:py-8 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button onClick={() => setCurrentPage('marketplace')} className="text-gray-500 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft className="w-5 h-5" /></button>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">23 Bulbs</h1>
                <span className="text-sm text-gray-500">• Enterprise 3D Demo</span>
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">JD</span>
              </div>
            </div>
          </header>
          <div className="flex h-[calc(100vh-88px)]">
            <div className="flex-1 bg-gray-100 relative overflow-hidden">
              {/* View Mode Toggle */}
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-white rounded-lg shadow-md p-1 flex space-x-1 border border-gray-200">
                  <button onClick={() => updateMeshParam('viewMode', '', 'orbit')} className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${meshParams.viewMode === 'orbit' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>Orbit View</button>
                  <button onClick={() => updateMeshParam('viewMode', '', 'camera')} className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${meshParams.viewMode === 'camera' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>Camera View</button>
                </div>
              </div>
              
              {/* 3D Scene */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative" style={{transform: meshParams.viewMode === 'orbit' ? `perspective(1000px) translateZ(${currentCamera.position.z * -30}px) rotateX(${currentCamera.rotation.x}deg) rotateY(${currentCamera.rotation.y}deg)` : `perspective(1000px) translateZ(-200px) rotateX(${-currentCamera.rotation.x}deg) rotateY(${-currentCamera.rotation.y + 180}deg) scale(1.5)`, transformStyle: 'preserve-3d'}}>
                  {/* The 3D Cube */}
                  <div className="w-32 h-32 relative" style={{transformStyle: 'preserve-3d', transform: `rotateX(${meshParams.animation.isPlaying ? Math.sin(meshParams.animation.currentFrame * 0.05) * 10 : 0}deg) rotateY(${meshParams.animation.isPlaying ? meshParams.animation.currentFrame * 2 : 0}deg)`}}>
                    <div className="absolute w-32 h-32 border-2 border-gray-700" style={{backgroundColor: meshParams.material.color, opacity: meshParams.material.wireframe ? 0.3 : meshParams.material.opacity, transform: 'translateZ(64px)'}} />
                    <div className="absolute w-32 h-32 border-2 border-gray-700" style={{backgroundColor: meshParams.material.color, opacity: meshParams.material.wireframe ? 0.2 : meshParams.material.opacity * 0.8, transform: 'translateZ(-64px) rotateY(180deg)'}} />
                    <div className="absolute w-32 h-32 border-2 border-gray-700" style={{backgroundColor: meshParams.material.color, opacity: meshParams.material.wireframe ? 0.25 : meshParams.material.opacity * 0.9, transform: 'rotateY(90deg) translateZ(64px)'}} />
                    <div className="absolute w-32 h-32 border-2 border-gray-700" style={{backgroundColor: meshParams.material.color, opacity: meshParams.material.wireframe ? 0.2 : meshParams.material.opacity * 0.7, transform: 'rotateY(-90deg) translateZ(64px)'}} />
                    <div className="absolute w-32 h-32 border-2 border-gray-700" style={{backgroundColor: meshParams.material.color, opacity: meshParams.material.wireframe ? 0.3 : meshParams.material.opacity * 0.95, transform: 'rotateX(90deg) translateZ(64px)'}} />
                    <div className="absolute w-32 h-32 border-2 border-gray-700" style={{backgroundColor: meshParams.material.color, opacity: meshParams.material.wireframe ? 0.15 : meshParams.material.opacity * 0.6, transform: 'rotateX(-90deg) translateZ(64px)'}} />
                  </div>

                  {/* Camera and Light Visualizations */}
                  {meshParams.viewMode === 'orbit' && (
                    <>
                      {/* Render only the currently selected camera */}
                      <div className="absolute" style={{transform: `translate3d(${currentCamera.position.x * 40}px, ${currentCamera.position.y * -40}px, ${currentCamera.position.z * 40}px) rotateX(${currentCamera.rotation.x}deg) rotateY(${currentCamera.rotation.y}deg)`, transformStyle: 'preserve-3d', opacity: 1}}>
                        <svg className={`w-8 h-6 border rounded border-gray-700`} viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" fill="#3B82F6">
                          <path d="m657.47 285.05c0.51562-0.09375 1.0781-0.14062 1.6406-0.1875 22.219-2.0625 44.672 5.7656 61.688 19.969 17.766 14.812 28.219 35.672 30.281 58.594 2.8594 32.109-8.9062 49.734-28.359 73.172 27.703 1.125 50.016-1.6406 73.5 16.688 18.516 14.484 28.078 34.031 29.109 57.422 0.375 8.2969-0.51562 16.875 0.5625 25.078 0.046875 0.23438 0.09375 0.42188 0.09375 0.65625h60.562c10.078 0.046875 21.328 1.6875 31.219-0.5625 10.031-2.2969 19.688-8.9062 29.109-13.125 36.984-16.359 73.547-33.656 110.44-50.25 12.516-5.6719 24.844-12.328 37.594-17.344 3.9375-1.5 8.25-3.0469 12.469-3.375 7.4062-0.60938 16.031 2.3906 21.609 7.2188 7.5 6.5156 10.125 15.047 10.734 24.656 0.46875 7.9688 0.1875 16.078 0.23438 24.094l-0.046875 45.938 0.09375 133.26v105.28l-0.046875 32.109c-0.046875 6.6562 0.28125 13.547-0.46875 20.203-0.75 6.9375-3.5625 13.453-8.2969 18.609-6.7031 7.3594-16.359 11.109-26.297 9.9375-12.234-1.5-32.953-13.219-44.484-18.703-32.906-15.609-66-30.938-99.234-45.891-11.812-5.3438-30.938-15.609-42.516-18.562-10.5-2.7188-22.781-0.79688-33.609-0.79688-19.781 0-39.703-0.46875-59.484 0.23438-0.42188 12.234-0.14062 24.516-0.09375 36.75 0.046875 25.453-1.875 47.391-20.766 66.422-11.484 11.578-25.547 19.031-41.672 21.703-13.828 2.2969-28.359 0.65625-42.281 0.60938h-71.859l-280.4-0.046875h-172.03l-41.438 0.09375c-11.812 0.046875-24.516 1.0312-36.141-1.2188-13.781-2.6719-26.203-9.4219-36.375-19.078-16.781-15.938-21.75-34.828-22.172-57.234-0.42188-23.391 0.28125-46.969 0.28125-70.406l-0.09375-150.32-0.23438-72.328c-0.046875-14.672-1.1719-30.609 1.3125-45.094 2.4844-14.812 8.9531-29.016 19.5-39.844 1.1719-1.2188 2.4375-2.3906 3.7031-3.5156s2.5781-2.25 3.8906-3.2812c1.3594-1.0312 2.7188-2.0156 4.125-3 1.4531-0.9375 2.8594-1.8281 4.3594-2.6719 1.4531-0.89062 2.9531-1.6875 4.5-2.4375 1.5-0.75 3.0469-1.4531 4.6406-2.0625 1.5938-0.65625 3.1875-1.2656 4.7812-1.7812 1.6406-0.5625 3.2344-1.0312 4.9219-1.4531 17.016-4.3125 36.516-2.25 53.953-2.25 23.766 0.09375 47.578 0 71.344-0.23438 6-11.906 13.172-23.719 20.531-34.828-10.031-0.70312-20.062-0.51562-30.141-0.51562-18.281 0-34.734-0.42188-48.844-13.781-11.344-10.734-16.594-26.672-16.969-42.047-0.375-15.891 4.5-32.016 15.75-43.641 11.109-11.438 24.984-14.578 40.406-14.859 15.844-0.32812 31.828 0.32812 47.719 0.32812l122.26 0.1875 51.188-0.046875c13.312-0.09375 27.516-1.0781 40.688 1.1719 9.5625 1.5938 18.094 6.1875 25.031 12.938 10.828 10.5 14.156 22.078 14.344 36.844 0.28125 18.188-0.84375 34.734-14.297 48.422-14.484 14.672-32.766 14.812-52.031 14.812-9.3281-0.046875-18.656 0-28.031 0.09375 6.1875 11.953 13.594 23.344 20.062 35.203l160.55 0.14062c-16.922-16.453-28.219-33.234-30.797-57.281-0.09375-0.70312-0.14062-1.4062-0.1875-2.1094s-0.14062-1.4062-0.14062-2.1094l-0.14062-2.1094c0-0.75 0-1.4531-0.046875-2.1562 0-0.70312 0-1.4062 0.046875-2.1094 0-0.70312 0-1.4062 0.046875-2.1562 0.046875-0.70312 0.046875-1.4062 0.09375-2.1094s0.09375-1.4062 0.1875-2.1094c0.046875-0.70312 0.14062-1.4062 0.1875-2.1094l0.28125-2.1094c0.09375-0.70312 0.1875-1.4062 0.32812-2.1094 0.09375-0.70312 0.23438-1.4062 0.375-2.1094l0.42188-2.1094c0.14062-0.65625 0.28125-1.3594 0.46875-2.0625s0.32812-1.3594 0.51562-2.0625 0.375-1.3594 0.5625-2.0625c0.23438-0.65625 0.42188-1.3594 0.65625-2.0156 0.1875-0.65625 0.42188-1.3594 0.65625-2.0156s0.46875-1.3594 0.75-2.0156c0.23438-0.65625 0.46875-1.3125 0.75-1.9688s0.5625-1.3125 0.84375-1.9688 0.5625-1.3125 0.84375-1.9219c0.32812-0.65625 0.60938-1.3125 0.9375-1.9219 0.32812-0.65625 0.60938-1.2656 0.9375-1.9219 0.32812-0.60938 0.70312-1.2656 1.0312-1.875s0.70312-1.2188 1.0781-1.8281c0.32812-0.60938 0.70312-1.2188 1.0781-1.8281s0.75-1.2188 1.125-1.7812c0.42188-0.60938 0.79688-1.2188 1.2188-1.7812 0.375-0.60938 0.79688-1.1719 1.2188-1.7344s0.84375-1.125 1.2656-1.6875c0.46875-0.5625 0.89062-1.125 1.3125-1.6875 14.766-18.188 36.984-28.688 60.047-31.125zm-524.48 174.84c-14.672 1.3594-27.891 6.7031-37.453 18.281-0.79688 0.9375-1.5469 1.875-2.25 2.8594s-1.4062 2.0156-2.0625 3.0469c-0.60938 1.0312-1.2656 2.0625-1.8281 3.1406s-1.125 2.1562-1.5938 3.2812c-0.51562 1.125-0.98438 2.25-1.4062 3.375-0.42188 1.1719-0.79688 2.2969-1.125 3.4688-0.375 1.1719-0.65625 2.3438-0.9375 3.5625-0.28125 1.1719-0.46875 2.3906-0.65625 3.5625-0.75 5.25-0.42188 10.875-0.46875 16.172l-0.09375 28.266 0.09375 91.828-0.14062 137.11v43.5c0.046875 8.7188-0.32812 17.625 0.5625 26.297 1.3594 13.688 8.625 25.266 19.172 33.891 7.5938 6.2344 16.031 9.3281 25.734 10.125 12.984 1.0781 26.438 0.42188 39.516 0.375l64.922 0.046875 225.84 0.09375 206.26-0.23438 58.734-0.1875c9.7031 0.046875 19.875 1.0781 29.531 0.1875 15.234-1.2188 27.984-7.3125 37.875-19.125 0.75-0.89062 1.5-1.875 2.2031-2.8125 0.70312-0.98438 1.3594-2.0156 1.9688-3 0.60938-1.0312 1.2188-2.0625 1.7812-3.1406 0.51562-1.0781 1.0312-2.1562 1.5-3.2344 0.51562-1.125 0.9375-2.25 1.3125-3.375 0.42188-1.125 0.75-2.25 1.0781-3.4219s0.60938-2.3438 0.84375-3.5156 0.42188-2.3438 0.5625-3.5156c0.75-6.2812 0.42188-12.891 0.42188-19.172v-257.68l0.09375-35.625c0.046875-8.4844 0.46875-17.109-0.375-25.5-0.09375-0.9375-0.1875-1.8281-0.32812-2.7656-0.14062-0.89062-0.28125-1.7812-0.46875-2.6719s-0.375-1.8281-0.60938-2.7188c-0.23438-0.84375-0.46875-1.7344-0.75-2.625s-0.5625-1.7344-0.84375-2.625c-0.32812-0.84375-0.65625-1.6875-1.0312-2.5312-0.32812-0.84375-0.70312-1.6875-1.125-2.5312-0.375-0.79688-0.79688-1.6406-1.2188-2.4375-0.46875-0.79688-0.89062-1.5938-1.4062-2.3906-0.46875-0.75-0.9375-1.5469-1.4531-2.2969s-1.0781-1.5-1.5938-2.25c-0.5625-0.70312-1.125-1.4531-1.7344-2.1562-0.5625-0.70312-1.1719-1.3594-1.8281-2.0625-0.60938-0.65625-1.2656-1.3125-1.875-1.9688-0.65625-0.60938-1.3594-1.2656-2.0156-1.875-0.70312-0.60938-1.4062-1.1719-2.1094-1.7812-1.0312-0.79688-2.0625-1.5469-3.1406-2.2969-1.0781-0.70312-2.1562-1.4062-3.2812-2.0625s-2.25-1.2656-3.4219-1.8281-2.3438-1.0781-3.5625-1.5469-2.4375-0.9375-3.6562-1.3125-2.4844-0.70312-3.75-1.0312c-1.2656-0.28125-2.5312-0.51562-3.7969-0.70312-1.2656-0.23438-2.5781-0.375-3.8438-0.46875-13.172-1.0781-26.766-0.23438-39.938-0.14062l-70.031 0.046875-228.74-0.046875-202.31 0.28125c-14.859 0.046875-29.719 0.28125-44.578 0-11.484-0.23438-23.766-1.3594-35.156-0.14062zm975.42 15.047c-43.125 18.797-85.922 38.203-128.44 58.312-16.359 7.5-32.625 15.656-49.172 22.641l-0.28125 135.84c-0.28125 17.297-0.375 34.594-0.28125 51.891-0.046875 8.5781-0.375 17.391 0.23438 25.922 8.5312 2.1094 17.391 7.125 25.406 10.828 12.047 5.625 24.141 11.156 36.281 16.594l80.578 37.312c8.9062 4.0781 17.672 9.0938 26.766 12.516 3.4219 1.3125 8.8125 3.5156 12.469 2.3438 1.5-0.46875 2.5781-1.0781 3.2812-2.5781 1.5938-3.6094 1.875-8.1562 1.9688-12.047 0.46875-17.953-0.14062-36-0.1875-54l0.046875-100.31-0.1875-131.06c0-19.922 0.79688-39.891 0.42188-59.859-0.046875-2.8594-0.14062-6.1406-1.1719-8.8125-0.89062-2.25-3.0469-4.0781-5.2969-4.9219-0.79688-0.32812-1.6406-0.46875-2.4375-0.60937zm-767.76-165.28c-29.625 0.79688-59.484 0.14062-89.156 0.14062-11.484-0.046875-27.703-1.4062-38.625 0.70312-5.5781 1.0312-10.688 3.5156-14.625 7.6406-6.9375 7.2656-10.125 18.844-9.75 28.734 0.32812 8.8125 3.9375 18.094 10.453 24.188 4.4062 4.0781 9.4688 6.1875 15.328 7.125 12.188 1.875 32.062 0.375 45.328 0.375l91.172 0.09375 86.109 0.046875c11.672 0 31.453 1.2188 42.281-0.84375 4.5938-0.84375 10.359-3.8438 13.688-7.1719 7.3594-7.3125 9.2812-18.141 9.0938-28.078-0.1875-9.6562-2.4844-18.703-9.6562-25.594-4.0312-3.8438-8.0625-5.7656-13.453-6.6562-8.0156-1.3594-16.406-0.89062-24.516-0.84375h-32.578l-52.688 0.046875c-9.0469 0-18.234-0.375-27.281 0-0.375 0.046875-0.75 0.046875-1.125 0.09375zm484.78 249.37c-0.5625 44.531 0 89.203 0 133.74l-0.046875 46.547c0 8.7656-0.46875 18 0.375 26.766 17.25-0.23438 34.5-0.28125 51.797-0.1875 9.4688 0.046875 18.984 0.46875 28.406 0.32812 0.75 0 1.2188-0.1875 1.8281-0.5625l0.1875-1.5938-0.14062-204.94c-27.469-0.42188-54.984 0.5625-82.406-0.09375zm-223.36-200.02c-0.98438 6.75-0.89062 12.984-0.46875 19.781 1.3594 8.5312 3.7031 16.594 8.0625 24.094 8.3438 14.391 23.766 25.594 39.75 29.719 16.5 4.3125 32.906 2.4375 47.578-6.2812 14.719-8.6719 25.875-22.688 30.094-39.281 0.23438-1.0312 0.46875-2.0625 0.65625-3.0938 0.23438-1.0312 0.42188-2.0625 0.5625-3.0938 0.14062-1.0781 0.28125-2.1094 0.375-3.1406 0.09375-1.0781 0.1875-2.1094 0.23438-3.1875 0.046875-1.0312 0.09375-2.1094 0.09375-3.1406 0-1.0781-0.046875-2.1094-0.09375-3.1875-0.046875-1.0312-0.14062-2.1094-0.23438-3.1406-0.09375-1.0781-0.23438-2.1094-0.375-3.1406-0.14062-1.0781-0.32812-2.1094-0.51562-3.1406s-0.42188-2.0625-0.70312-3.0938c-0.23438-1.0312-0.51562-2.0156-0.79688-3.0469-0.32812-1.0312-0.65625-2.0156-0.98438-3-0.375-0.98438-0.70312-2.0156-1.125-2.9531-0.375-0.98438-0.79688-1.9688-1.2656-2.9062-0.42188-0.98438-0.89062-1.9219-1.4062-2.8594-0.46875-0.9375-0.98438-1.875-1.5-2.7656-9.1406-15.234-23.719-25.125-40.828-29.297-16.594-4.0312-34.688-0.09375-49.078 8.8125-15.562 9.6562-23.859 23.859-28.031 41.344zm-313.64 42.094c-7.5 11.672-15 23.484-21.141 35.906l133.55-0.28125c7.1719 0 14.578-0.42188 21.75 0-6.5625-11.812-14.016-23.391-20.109-35.438zm313.18-22.312c-0.42188-6.7969-0.51562-13.031 0.46875-19.781-2.6719 3-2.3438 9.4219-2.1562 13.266 0.14062 2.5781 0.42188 5.1562 0.89062 7.6875l0.375 0.1875z"/>
                            <path d="m601.55 378.79-0.375 1.3594-0.375-0.1875c-0.46875-2.5312-0.75-5.1094-0.89062-7.6875-0.1875-3.8438-0.51562-10.266 2.1562-13.266-0.98438 6.75-0.9375 12.984-0.51562 19.781z"/>
                            <path d="m167.68 501.14c9.7031-0.375 19.547 0 29.25-0.046875 11.297-0.09375 23.109-0.9375 34.359 0.5625 4.7344 0.60938 9.7969 1.8281 14.016 4.2188 5.7656 3.3281 9.9375 10.219 11.438 16.641 2.3906 10.266 2.0625 55.547 0.5625 66.375-0.5625 3.9844-1.4531 7.9688-3.7031 11.344-5.3438 8.1562-12.328 12.375-21.75 14.344-9.9375 1.3125-19.781 0.42188-29.719 0.42188-11.953 0.046875-24.375 1.3125-36.234-0.5625-4.8281-0.79688-9.5625-2.25-13.688-4.9688-6.9375-4.5-10.594-12-12.141-19.922-1.9688-10.359-0.79688-21.375-0.84375-31.875-0.046875-10.078-1.1719-20.578 0.46875-30.562 0.79688-5.0625 2.5312-10.125 5.5312-14.297 5.3906-7.5938 13.688-10.359 22.453-11.672zm47.859 22.594-0.79688 0.09375c-7.6406 0.5625-47.766-1.3594-51.094 2.25-3.5156 3.7969-2.3438 54.938-0.46875 61.359 0.375 1.4062 0.98438 2.7188 1.6875 3.9844 6.4688 0.42188 12.984 0.89062 19.453 0.84375 15.375 0 31.453 0.84375 46.734-0.65625 1.4531-1.3594 2.8594-2.6719 4.0781-4.2188 1.3125-6 1.9688-55.453-0.14062-59.625-1.0781-2.2031-5.0156-3.1406-7.2188-3.5156-3.8906-0.65625-8.25-0.70312-12.234-0.51562z"/>
                            <path d="m338.29 574.13c7.3594-1.0312 16.219-0.1875 23.719-0.1875h142.55c15.984 0 32.297-0.65625 48.234 0.1875 5.7656 0.32812 10.875 0.84375 16.125 3.4219 6.6094 3.2344 11.531 8.625 13.922 15.609 1.4531 4.2188 2.2031 8.625 2.4375 13.078 0.375 7.5938-0.1875 15.281-0.23438 22.875l-0.09375 50.203c0 11.906-0.14062 23.859 0.046875 35.766 0.14062 10.594 0.65625 21.141-0.09375 31.688-0.32812 4.7344-1.3594 9.375-3.4688 13.641-4.6875 9.4688-12.891 13.828-22.5 17.156-14.156 1.2656-28.219 0.46875-42.375 0.46875l-71.719-0.046875h-66.094c-11.531 0.046875-23.109 0.89062-34.594-0.09375-6.375-0.51562-12.984-1.7344-18.281-5.5312-7.0312-4.9219-11.812-13.453-12.984-21.844-1.5469-10.5-0.79688-21.141-0.75-31.734v-47.203l-0.09375-41.062c-0.09375-9.6094-0.79688-19.547 0.23438-29.062 0.65625-6.0469 1.875-11.391 5.6719-16.266 5.1094-6.5156 12.375-9.9844 20.344-11.062zm173.9 22.078c-20.953 0.84375-42.094 0.42188-63.047 0.42188l-66.516-0.046875c-12.469-0.09375-25.688-1.0312-38.062 0.046875-2.3906 0.23438-6.8906 0.5625-8.3438 2.625-1.6875 2.3906-2.0156 6.4219-2.2031 9.3281-0.42188 7.5938-0.1875 15.328-0.1875 22.922l0.046874 43.641-0.046874 44.766c0 8.0625-1.3125 20.016 0.84375 27.562 0.375 1.4062 1.0312 2.7188 1.7344 3.9844 1.6406 1.0781 3.3281 2.3906 5.25 2.8594 10.359 2.5781 30.516 0.79688 41.953 0.84375l116.86 0.14062c17.203 0 39.047 1.2188 55.547-0.60938 2.25-1.7812 3.8906-3.4219 5.6719-5.6719 1.4062-39.469 2.3438-79.5 0.9375-118.97-0.32812-9.5625 0.5625-19.828-1.0312-29.203-0.9375-0.98438-1.9688-2.1562-3.1875-2.8125-5.0156-2.7188-15.797-1.875-21.422-1.9688-8.0625-0.14062-16.828-0.70312-24.797 0.14062z"/>
                        </svg>
                        <div className="absolute text-xs font-bold text-gray-900 bg-white px-1 rounded" style={{transform: 'translateZ(10px) translateX(-8px) translateY(-16px)', fontSize: '8px'}}>{currentLight.name}</div>
                      </div>
                      
                    </>
                  )}
                </div>
              </div>

              {/* Mouse Controls */}
              {meshParams.viewMode === 'orbit' && (
                <div className="absolute inset-0 cursor-grab active:cursor-grabbing" onMouseDown={(e) => {
                  const startX = e.clientX;
                  const startY = e.clientY;
                  const startRotX = currentCamera.rotation.x;
                  const startRotY = currentCamera.rotation.y;
                  const handleMouseMove = (moveEvent) => {
                    const deltaX = moveEvent.clientX - startX;
                    const deltaY = moveEvent.clientY - startY;
                    updateMeshParam('cameras', 'rotation', {
                      x: Math.max(-90, Math.min(90, startRotX - deltaY * 0.5)),
                      y: startRotY + deltaX * 0.5
                    }, currentCamera.id);
                  };
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseup', handleMouseUp);
                  };
                  document.addEventListener('mousemove', handleMouseMove);
                  document.addEventListener('mouseup', handleMouseUp);
                }} onWheel={(e) => {
                  e.preventDefault();
                  const newZ = Math.max(1, Math.min(20, currentCamera.position.z + e.deltaY * 0.01));
                  updateMeshParam('cameras', 'position', { ...currentCamera.position, z: newZ }, currentCamera.id);
                }} />
              )}
              
              {/* Enhanced Timeline */}
              <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
                <div className="flex items-center space-x-4 mb-3">
                  <button onClick={() => updateMeshParam('animation', 'isPlaying', !meshParams.animation.isPlaying)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">{meshParams.animation.isPlaying ? 'Pause' : 'Play'}</button>
                  <button onClick={() => updateMeshParam('animation', 'currentFrame', 0)} className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">Reset</button>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs text-gray-500">Frame:</span>
                      <span className="text-xs font-mono text-gray-700">{Math.floor(meshParams.animation.currentFrame)} / {meshParams.animation.totalFrames}</span>
                      <span className="text-xs text-gray-500 ml-4">Time:</span>
                      <span className="text-xs font-mono text-gray-700">{(meshParams.animation.currentFrame / 24).toFixed(2)}s</span>
                    </div>
                    <div className="relative h-4 bg-gray-200 rounded-full cursor-pointer overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{width: `${(meshParams.animation.currentFrame / meshParams.animation.totalFrames) * 100}%`}}></div>
                      <input type="range" min="0" max={meshParams.animation.totalFrames} value={meshParams.animation.currentFrame} onChange={(e) => updateMeshParam('animation', 'currentFrame', parseInt(e.target.value))} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                      
                      {/* Keyframe markers */}
                      {meshParams.animation.cameraKeyframes.map((keyframe, idx) => (
                        <div key={idx} className="absolute w-1 h-full -ml-0.5 bg-blue-600" style={{left: `${(keyframe.frame / meshParams.animation.totalFrames) * 100}%`}} />
                      ))}
                      {meshParams.animation.lightKeyframes.map((keyframe, idx) => (
                        <div key={idx} className="absolute w-1 h-full -ml-0.5 bg-gray-600" style={{left: `${(keyframe.frame / meshParams.animation.totalFrames) * 100}%`}} />
                      ))}
                      {meshParams.animation.materialKeyframes.map((keyframe, idx) => (
                        <div key={idx} className="absolute w-1 h-full -ml-0.5 bg-gray-600" style={{left: `${(keyframe.frame / meshParams.animation.totalFrames) * 100}%`}} />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Speed:</span>
                    <input type="range" min="0.1" max="3.0" step="0.1" value={meshParams.animation.speed} onChange={(e) => updateMeshParam('animation', 'speed', parseFloat(e.target.value))} className="w-16 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                    <span className="text-xs font-mono text-gray-700 w-8">{meshParams.animation.speed}x</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Length:</span>
                    <input type="number" min="60" max="600" value={meshParams.animation.totalFrames} onChange={(e) => updateMeshParam('animation', 'totalFrames', parseInt(e.target.value) || 120)} className="w-16 px-2 py-1 text-xs border border-gray-300 rounded" />
                    <span className="text-xs text-gray-500">frames</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
                    <span className="text-gray-600">Camera</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-600 rounded-sm"></div>
                    <span className="text-gray-600">Light</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-600 rounded-sm"></div>
                    <span className="text-gray-600">Material</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Inspector Panel */}
            <div className="w-80 bg-gray-50 border-l border-gray-200 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Inspector</h3>
                
                {/* Camera Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      Cameras
                    </h4>
                    <button onClick={addCamera} className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700">Add</button>
                  </div>
                  <div className="space-y-3">
                    <select value={meshParams.selectedCamera} onChange={(e) => updateMeshParam('selectedCamera', '', e.target.value)} className="w-full px-2 py-1 text-xs border border-gray-300 rounded">
                      {meshParams.cameras.map(camera => (
                        <option key={camera.id} value={camera.id}>{camera.name} ({camera.type})</option>
                      ))}
                    </select>
                    {currentCamera && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="text" value={currentCamera.name} onChange={(e) => updateMeshParam('cameras', 'name', e.target.value, currentCamera.id)} className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded" />
                          {meshParams.cameras.length > 1 && (
                            <button onClick={() => deleteCamera(currentCamera.id)} className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">Del</button>
                          )}
                        </div>
                        <select value={currentCamera.type} onChange={(e) => updateMeshParam('cameras', 'type', e.target.value, currentCamera.id)} className="w-full px-2 py-1 text-xs border border-gray-300 rounded">
                          <option value="perspective">Perspective</option>
                          <option value="orthographic">Orthographic</option>
                          <option value="wide">Wide Angle</option>
                          <option value="telephoto">Telephoto</option>
                        </select>
                        <div>
                          <label className="text-xs font-medium text-gray-600 block mb-1">Position</label>
                          <div className="grid grid-cols-3 gap-1">
                            {['x', 'y', 'z'].map(axis => (
                              <input key={axis} type="number" value={currentCamera.position[axis].toFixed(1)} onChange={(e) => updateMeshParam('cameras', 'position', {...currentCamera.position, [axis]: parseFloat(e.target.value) || 0}, currentCamera.id)} className="w-full px-2 py-1 text-xs border border-gray-300 rounded" step="0.1" />
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-600 block mb-1">FOV: {currentCamera.fov}°</label>
                          <input type="range" min="10" max="120" value={currentCamera.fov} onChange={(e) => updateMeshParam('cameras', 'fov', parseFloat(e.target.value), currentCamera.id)} className="w-full h-1 bg-gray-200 rounded appearance-none cursor-pointer" />
                        </div>
                        <button onClick={() => {
                          const newKeyframe = {frame: Math.floor(meshParams.animation.currentFrame), cameraId: currentCamera.id, position: {...currentCamera.position}, rotation: {...currentCamera.rotation}, fov: currentCamera.fov};
                          const existingIndex = meshParams.animation.cameraKeyframes.findIndex(kf => kf.frame === Math.floor(meshParams.animation.currentFrame) && kf.cameraId === currentCamera.id);
                          let newKeyframes;
                          if (existingIndex >= 0) {
                            newKeyframes = [...meshParams.animation.cameraKeyframes];
                            newKeyframes[existingIndex] = newKeyframe;
                          } else {
                            newKeyframes = [...meshParams.animation.cameraKeyframes, newKeyframe].sort((a, b) => a.frame - b.frame);
                          }
                          updateMeshParam('animation', 'cameraKeyframes', newKeyframes);
                        }} className="w-full bg-blue-600 text-white py-1 px-2 rounded text-xs hover:bg-blue-700">Set Keyframe</button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Light Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <div className="w-3 h-3 bg-gray-600 rounded-full mr-2"></div>
                      Lights
                    </h4>
                    <button onClick={addLight} className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700">Add</button>
                  </div>
                  <div className="space-y-3">
                    <select value={meshParams.selectedLight} onChange={(e) => updateMeshParam('selectedLight', '', e.target.value)} className="w-full px-2 py-1 text-xs border border-gray-300 rounded">
                      {meshParams.lights.map(light => (
                        <option key={light.id} value={light.id}>{light.name} ({light.type})</option>
                      ))}
                    </select>
                    {currentLight && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="text" value={currentLight.name} onChange={(e) => updateMeshParam('lights', 'name', e.target.value, currentLight.id)} className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded" />
                          {meshParams.lights.length > 1 && (
                            <button onClick={() => deleteLight(currentLight.id)} className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">Del</button>
                          )}
                        </div>
                        <select value={currentLight.type} onChange={(e) => updateMeshParam('lights', 'type', e.target.value, currentLight.id)} className="w-full px-2 py-1 text-xs border border-gray-300 rounded">
                          <option value="directional">Directional</option>
                          <option value="point">Point Light</option>
                          <option value="spot">Spot Light</option>
                          <option value="area">Area Light</option>
                          <option value="hdri">HDRI</option>
                        </select>
                        <div>
                          <label className="text-xs font-medium text-gray-600 block mb-1">Intensity: {currentLight.intensity}</label>
                          <input type="range" min="0" max="3" step="0.1" value={currentLight.intensity} onChange={(e) => updateMeshParam('lights', 'intensity', parseFloat(e.target.value), currentLight.id)} className="w-full h-1 bg-gray-200 rounded appearance-none cursor-pointer" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-600 block mb-1">Color</label>
                          <input type="color" value={currentLight.color} onChange={(e) => updateMeshParam('lights', 'color', e.target.value, currentLight.id)} className="w-full h-6 rounded border cursor-pointer" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" checked={currentLight.castShadows} onChange={(e) => updateMeshParam('lights', 'castShadows', e.target.checked, currentLight.id)} className="rounded" />
                          <label className="text-xs font-medium text-gray-600">Cast Shadows</label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Enhanced Material Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <div className="w-3 h-3 bg-gray-600 rounded-full mr-2"></div>
                      Material
                    </h4>
                    <button onClick={() => updateMeshParam('animation', 'materialKeyframes', [...meshParams.animation.materialKeyframes, { frame: Math.floor(meshParams.animation.currentFrame), material: { ...meshParams.material } }])} className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700">Set Keyframe</button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1">Base Color</label>
                      <input type="color" value={meshParams.material.color} onChange={(e) => updateMeshParam('material', 'color', e.target.value)} className="w-full h-6 rounded border cursor-pointer" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1">Roughness: {meshParams.material.roughness}</label>
                      <input type="range" min="0" max="1" step="0.01" value={meshParams.material.roughness} onChange={(e) => updateMeshParam('material', 'roughness', parseFloat(e.target.value))} className="w-full h-1 bg-gray-200 rounded appearance-none cursor-pointer" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1">Metalness: {meshParams.material.metalness}</label>
                      <input type="range" min="0" max="1" step="0.01" value={meshParams.material.metalness} onChange={(e) => updateMeshParam('material', 'metalness', parseFloat(e.target.value))} className="w-full h-1 bg-gray-200 rounded appearance-none cursor-pointer" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1">Transmission: {meshParams.material.transmission}</label>
                      <input type="range" min="0" max="1" step="0.01" value={meshParams.material.transmission} onChange={(e) => updateMeshParam('material', 'transmission', parseFloat(e.target.value))} className="w-full h-1 bg-gray-200 rounded appearance-none cursor-pointer" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1">IOR: {meshParams.material.ior}</label>
                      <input type="range" min="1" max="3" step="0.01" value={meshParams.material.ior} onChange={(e) => updateMeshParam('material', 'ior', parseFloat(e.target.value))} className="w-full h-1 bg-gray-200 rounded appearance-none cursor-pointer" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" checked={meshParams.material.wireframe} onChange={(e) => updateMeshParam('material', 'wireframe', e.target.checked)} className="rounded" />
                      <label className="text-xs font-medium text-gray-600">Wireframe</label>
                    </div>
                  </div>
                </div>

                {/* Enhanced Physics Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <div className="w-3 h-3 bg-gray-600 rounded-full mr-2"></div>
                      Physics
                    </h4>
                    <button onClick={() => updateMeshParam('animation', 'physicsKeyframes', [...meshParams.animation.physicsKeyframes, { frame: Math.floor(meshParams.animation.currentFrame), physics: { ...meshParams.physics } }])} className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700">Set Keyframe</button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1">Gravity: {meshParams.physics.gravity} m/s²</label>
                      <input type="range" min="0" max="20" step="0.1" value={meshParams.physics.gravity} onChange={(e) => updateMeshParam('physics', 'gravity', parseFloat(e.target.value))} className="w-full h-1 bg-gray-200 rounded appearance-none cursor-pointer" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1">Wind Strength: {meshParams.physics.windStrength} m/s</label>
                      <input type="range" min="0" max="3" step="0.1" value={meshParams.physics.windStrength} onChange={(e) => updateMeshParam('physics', 'windStrength', parseFloat(e.target.value))} className="w-full h-1 bg-gray-200 rounded appearance-none cursor-pointer" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1">Wind Direction: {meshParams.physics.windDirection}°</label>
                      <input type="range" min="0" max="360" value={meshParams.physics.windDirection} onChange={(e) => updateMeshParam('physics', 'windDirection', parseFloat(e.target.value))} className="w-full h-1 bg-gray-200 rounded appearance-none cursor-pointer" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1">Cloth Stiffness: {meshParams.physics.clothStiffness}</label>
                      <input type="range" min="0" max="1" step="0.01" value={meshParams.physics.clothStiffness} onChange={(e) => updateMeshParam('physics', 'clothStiffness', parseFloat(e.target.value))} className="w-full h-1 bg-gray-200 rounded appearance-none cursor-pointer" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 block mb-1">Friction: {meshParams.physics.friction}</label>
                      <input type="range" min="0" max="1" step="0.01" value={meshParams.physics.friction} onChange={(e) => updateMeshParam('physics', 'friction', parseFloat(e.target.value))} className="w-full h-1 bg-gray-200 rounded appearance-none cursor-pointer" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" checked={meshParams.physics.selfCollision} onChange={(e) => updateMeshParam('physics', 'selfCollision', e.target.checked)} className="rounded" />
                      <label className="text-xs font-medium text-gray-600">Self Collision</label>
                    </div>
                  </div>
                </div>
                
                <button onClick={generateDataset} className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors text-sm">Generate Dataset</button>
              </div>
            </div>
          </div>
        </div>
      );
    case 'api-checkout':
      return (
        <div className="min-h-screen bg-white font-sans">
          {/* API Checkout Header */}
          <header className="px-4 sm:px-6 py-6 sm:py-8 border-b border-gray-100">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button onClick={() => setCurrentPage('marketplace')} className="text-gray-500 hover:text-gray-900 p-2 hover:bg-gray-50 rounded-full transition-colors"><ArrowLeft className="w-5 h-5" /></button>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">23 Bulbs</h1>
              </div>
            </div>
          </header>
          {/* API Checkout Content */}
          <main className="px-6 py-16">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Key className="w-8 h-8 text-gray-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">API Access Generated</h2>
                <p className="text-lg text-gray-600">Your dataset configuration is ready!</p>
              </div>
              <div className="bg-gray-100 border border-gray-200 rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  Your API Key
                </h3>
                <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <code className="text-sm font-mono text-gray-800 break-all">{apiKey}</code>
                    </div>
                    <button onClick={copyApiKey} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      <Copy className="w-4 h-4" />
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>
              <button onClick={() => setCurrentPage('marketplace')} className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">Create Another Dataset</button>
            </div>
          </main>
        </div>
      );
    case 'technology':
      return (
        <div className="min-h-screen bg-white font-sans">
          {/* Technology Page Header */}
          <header className="px-4 sm:px-6 py-6 sm:py-8 border-b border-gray-100">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button onClick={() => setCurrentPage('landing')} className="text-gray-500 hover:text-gray-900 p-2 hover:bg-gray-50 rounded-full transition-colors"><ArrowLeft className="w-5 h-5" /></button>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">23 Bulbs</h1>
              </div>
            </div>
          </header>
          {/* Technology Page Content */}
          <main className="px-6 py-16">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Our Technology</h2>
                <p className="text-xl text-gray-600">Physics-aware data generation pipeline</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mb-24">
                <div className="rounded-3xl p-10 bg-gray-100">
                  <h3 className="text-2xl font-bold mb-10 text-gray-900">FEATURES</h3>
                  <div className="space-y-8">
                    <div>
                      <h4 className="font-semibold text-lg mb-3 text-gray-900">Physics-Accurate Simulation Engine</h4>
                      <p className="text-gray-600 leading-relaxed">Real-time cloth and motion simulation, customizable through 20+ parameters.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-3 text-gray-900">On-Demand API</h4>
                      <p className="text-gray-600 leading-relaxed">Self-serve platform for enterprises to request high-fidelity video training data.</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl p-10 bg-gray-200">
                  <h3 className="text-2xl font-bold mb-10 text-gray-900">BENEFITS</h3>
                  <div className="space-y-8">
                    <div>
                      <h4 className="font-semibold text-lg mb-3 text-gray-900">Faster, Cheaper AI Training</h4>
                      <p className="text-gray-600 leading-relaxed">Reduce training time from 500M to just 500 frames per use case.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-block rounded-3xl py-12 px-16 bg-blue-600">
                  <p className="text-4xl font-bold mb-3 text-white">1000x Reduction</p>
                  <p className="text-xl text-white opacity-90">500M frames &rarr; 500 frames per use case</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      );
    case 'signin':
      return (
        <div className="min-h-screen bg-white font-sans flex items-center justify-center">
          <div className="w-full max-w-md px-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">23 Bulbs</h1>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
              <p className="text-gray-600">Sign in to your account</p>
            </div>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-full font-medium hover:bg-blue-700 transition-colors">Sign In</button>
            </form>
            <button onClick={() => setCurrentPage('landing')} className="w-full text-gray-600 hover:text-gray-900 py-2 mt-4 text-sm font-medium">Back to Home</button>
          </div>
        </div>
      );
    case 'signup':
      return (
        <div className="min-h-screen bg-white font-sans flex items-center justify-center">
          <div className="w-full max-w-md px-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">23 Bulbs</h1>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create account</h2>
              <p className="text-gray-600">Start generating physics-aware datasets</p>
            </div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Your Name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-full font-medium hover:bg-blue-700 transition-colors">Create Account</button>
            </form>
            <button onClick={() => setCurrentPage('landing')} className="w-full text-gray-600 hover:text-gray-900 py-2 mt-4 text-sm font-medium">Back to Home</button>
          </div>
        </div>
      );
    default:
      // Fallback page if an invalid route is somehow triggered.
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">23 Bulbs Dataset Platform</h1>
            <button onClick={() => setCurrentPage('landing')} className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">Back to Landing</button>
          </div>
        </div>
      );
  }
}
