import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, X, Check, Key, Copy, Mail, Lock, User } from 'lucide-react';

export default function DatasetPlatform() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [apiKey, setApiKey] = useState('');
  const [copied, setCopied] = useState(false);
  const [meshParams, setMeshParams] = useState({
    scale: { x: 1, y: 1, z: 1 },
    rotation: { x: 0, y: 0, z: 0 },
    position: { x: 0, y: 0, z: 0 },
    material: {
      color: '#4f46e5',
      wireframe: false
    },
    physics: {
      gravity: 9.8,
      mass: 1.0
    }
  });

  const marketplaceDatasets = [
    {
      id: 'pants',
      name: 'Pants Demo',
      description: 'Interactive Demo • 50 samples',
      background: 'bg-gray-800',
      features: ['8K • 60fps • 36 cameras', 'Wind physics simulation', '35+ adjustable parameters'],
      isDemo: true,
      badge: 'Demo'
    },
    {
      id: 'enterprise-3d',
      name: 'Launch Demo 2 Enterprise',
      description: 'Enterprise 3D Demo • Real-time',
      background: 'bg-purple-800',
      features: ['Real-time 3D simulation', 'Interactive mesh editor', 'Physics parameter control'],
      isDemo: true,
      badge: 'Enterprise Demo'
    },
    {
      id: 'dresses',
      name: 'Dresses & Skirts',
      description: 'Enterprise • 100K+ samples',
      background: 'bg-gray-700',
      features: ['Flowing fabric dynamics', 'Complex draping physics', 'Multiple fabric types'],
      isDemo: false,
      badge: 'Enterprise'
    }
  ];

  const updateMeshParam = (category, param, value) => {
    setMeshParams(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [param]: value
      }
    }));
  };

  const generateDataset = () => {
    const newApiKey = '23b_ent_' + Math.random().toString(36).substring(2, 15);
    setApiKey(newApiKey);
    setCurrentPage('api-checkout');
  };

  const copyApiKey = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Landing Page
  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen bg-white">
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

  // Marketplace Page
  if (currentPage === 'marketplace') {
    return (
      <div className="min-h-screen bg-white">
        <header className="px-4 sm:px-6 py-6 sm:py-8 border-b border-gray-100">
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
              className="bg-black text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors"
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
              {marketplaceDatasets.map(dataset => (
                <div key={dataset.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all">
                  <div className={`h-48 ${dataset.background} relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white bg-opacity-10 rounded-xl flex items-center justify-center">
                        <div className="w-8 h-8 bg-white bg-opacity-90 rounded-sm"></div>
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
                          <p className="text-lg font-semibold text-blue-900 mb-4">
                            {dataset.id === 'enterprise-3d' ? 'Try Enterprise 3D Demo' : 'Try Interactive Demo'}
                          </p>
                          <button 
                            onClick={() => {
                              if (dataset.id === 'enterprise-3d') {
                                setCurrentPage('3d-editor');
                              } else {
                                setCurrentPage('generation');
                              }
                            }}
                            className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
                          >
                            {dataset.id === 'enterprise-3d' ? 'Launch Demo 2 Enterprise' : 'Launch Demo'}
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
  }

  // 3D Editor Page
  if (currentPage === '3d-editor') {
    return (
      <div className="min-h-screen bg-white">
        <header className="px-4 sm:px-6 py-6 sm:py-8 border-b border-gray-100">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage('marketplace')}
                className="text-gray-500 hover:text-black p-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl sm:text-2xl font-semibold text-black">23 Bulbs</h1>
              <span className="text-sm text-gray-500">• Enterprise 3D Demo</span>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">JD</span>
            </div>
          </div>
        </header>

        <div className="flex h-[calc(100vh-88px)]">
          <div className="flex-1 bg-gray-800 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div 
                  className="relative transition-all duration-300 ease-in-out"
                  style={{
                    transform: `
                      scale(${meshParams.scale.x}, ${meshParams.scale.y}) 
                      rotateX(${meshParams.rotation.x}deg) 
                      rotateY(${meshParams.rotation.y}deg) 
                      rotateZ(${meshParams.rotation.z}deg)
                      translate3d(${meshParams.position.x * 10}px, ${meshParams.position.y * -10}px, ${meshParams.position.z * 10}px)
                    `,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div 
                    className="w-32 h-32 relative"
                    style={{
                      transform: 'rotateX(-15deg) rotateY(30deg)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <div 
                      className="absolute w-32 h-32 border-2 border-white border-opacity-30"
                      style={{
                        backgroundColor: meshParams.material.color,
                        opacity: meshParams.material.wireframe ? 0.3 : 0.8,
                        transform: 'translateZ(64px)'
                      }}
                    ></div>
                    <div 
                      className="absolute w-32 h-32 border-2 border-white border-opacity-30"
                      style={{
                        backgroundColor: meshParams.material.color,
                        opacity: meshParams.material.wireframe ? 0.2 : 0.6,
                        transform: 'translateZ(-64px) rotateY(180deg)'
                      }}
                    ></div>
                    <div 
                      className="absolute w-32 h-32 border-2 border-white border-opacity-30"
                      style={{
                        backgroundColor: meshParams.material.color,
                        opacity: meshParams.material.wireframe ? 0.25 : 0.7,
                        transform: 'rotateY(90deg) translateZ(64px)'
                      }}
                    ></div>
                    <div 
                      className="absolute w-32 h-32 border-2 border-white border-opacity-30"
                      style={{
                        backgroundColor: meshParams.material.color,
                        opacity: meshParams.material.wireframe ? 0.2 : 0.5,
                        transform: 'rotateY(-90deg) translateZ(64px)'
                      }}
                    ></div>
                    <div 
                      className="absolute w-32 h-32 border-2 border-white border-opacity-30"
                      style={{
                        backgroundColor: meshParams.material.color,
                        opacity: meshParams.material.wireframe ? 0.3 : 0.9,
                        transform: 'rotateX(90deg) translateZ(64px)'
                      }}
                    ></div>
                    <div 
                      className="absolute w-32 h-32 border-2 border-white border-opacity-30"
                      style={{
                        backgroundColor: meshParams.material.color,
                        opacity: meshParams.material.wireframe ? 0.15 : 0.4,
                        transform: 'rotateX(-90deg) translateZ(64px)'
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="absolute top-4 left-4 text-white text-sm bg-black bg-opacity-50 rounded-lg p-3">
                  <div>Scene: Enterprise Mesh Demo</div>
                  <div>Renderer: WebGL 2.0</div>
                  <div>Objects: 1 Cube</div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-80 bg-gray-50 border-l border-gray-200 overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-black mb-6">Mesh Inspector</h3>
              
              <div className="mb-8">
                <h4 className="font-medium text-black mb-4 flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  Transform
                </h4>
                
                <div className="space-y-3 mb-4">
                  <label className="text-sm font-medium text-gray-700">Position</label>
                  {['x', 'y', 'z'].map(axis => (
                    <div key={axis} className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 w-4">{axis.toUpperCase()}</span>
                      <input
                        type="range"
                        min="-5"
                        max="5"
                        step="0.1"
                        value={meshParams.position[axis]}
                        onChange={(e) => updateMeshParam('position', axis, parseFloat(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-xs text-gray-600 w-8">{meshParams.position[axis]}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 mb-4">
                  <label className="text-sm font-medium text-gray-700">Rotation (degrees)</label>
                  {['x', 'y', 'z'].map(axis => (
                    <div key={axis} className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 w-4">{axis.toUpperCase()}</span>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        step="1"
                        value={meshParams.rotation[axis]}
                        onChange={(e) => updateMeshParam('rotation', axis, parseInt(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-xs text-gray-600 w-8">{meshParams.rotation[axis]}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Scale</label>
                  {['x', 'y', 'z'].map(axis => (
                    <div key={axis} className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 w-4">{axis.toUpperCase()}</span>
                      <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.1"
                        value={meshParams.scale[axis]}
                        onChange={(e) => updateMeshParam('scale', axis, parseFloat(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-xs text-gray-600 w-8">{meshParams.scale[axis]}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="font-medium text-black mb-4 flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  Material
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Color</label>
                    <input
                      type="color"
                      value={meshParams.material.color}
                      onChange={(e) => updateMeshParam('material', 'color', e.target.value)}
                      className="w-full h-10 rounded-lg border border-gray-200 cursor-pointer"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={meshParams.material.wireframe}
                      onChange={(e) => updateMeshParam('material', 'wireframe', e.target.checked)}
                      className="rounded"
                    />
                    <label className="text-sm font-medium text-gray-700">Wireframe Mode</label>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="font-medium text-black mb-4 flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  Physics Forces
                </h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Gravity (m/s²)</label>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="0.1"
                      value={meshParams.physics.gravity}
                      onChange={(e) => updateMeshParam('physics', 'gravity', parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xs text-gray-600">{meshParams.physics.gravity} m/s²</span>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Mass (kg)</label>
                    <input
                      type="range"
                      min="0.1"
                      max="10"
                      step="0.1"
                      value={meshParams.physics.mass}
                      onChange={(e) => updateMeshParam('physics', 'mass', parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xs text-gray-600">{meshParams.physics.mass} kg</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={generateDataset}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Generate Enterprise Dataset
                </button>
                
                <button 
                  onClick={() => {
                    setMeshParams({
                      scale: { x: 1, y: 1, z: 1 },
                      rotation: { x: 0, y: 0, z: 0 },
                      position: { x: 0, y: 0, z: 0 },
                      material: {
                        color: '#4f46e5',
                        wireframe: false
                      },
                      physics: {
                        gravity: 9.8,
                        mass: 1.0
                      }
                    });
                  }}
                  className="w-full bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // API Checkout Page
  if (currentPage === 'api-checkout') {
    return (
      <div className="min-h-screen bg-white">
        <header className="px-4 sm:px-6 py-6 sm:py-8 border-b border-gray-100">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage('3d-editor')}
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
              <p className="text-lg text-gray-600">Your enterprise dataset configuration is ready!</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-8">
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
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-black mb-6">Dataset Configuration</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dataset Type</span>
                  <span className="font-medium text-black">3D Mesh Simulation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Categories</span>
                  <span className="font-medium text-black">3 selected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Samples</span>
                  <span className="font-medium text-black">75,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data Volume</span>
                  <span className="font-medium text-black">8.5GB</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setCurrentPage('3d-editor')}
              className="w-full bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              Create Another Dataset
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Technology Page
  if (currentPage === 'technology') {
    return (
      <div className="min-h-screen bg-white">
        <header className="px-4 sm:px-6 py-6 sm:py-8 border-b border-gray-100">
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
              className="bg-black text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Sign In
            </button>
          </div>
        </header>

        <main className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-black mb-4 tracking-tight">Our Technology</h2>
              <p className="text-xl text-gray-600">Physics-aware data generation pipeline</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-24">
              <div className="rounded-3xl p-10 bg-gray-100">
                <h3 className="text-2xl font-bold mb-10 text-black">FEATURES</h3>
                <div className="space-y-8">
                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-black">Physics-Accurate Simulation Engine</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Real-time cloth and motion simulation, customizable through 20+ parameters.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-black">On-Demand API</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Self-serve platform for enterprises to request high-fidelity video training data.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-black">Multi-Engine Platform</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Growing suite of engines for human motion, sensor data, and dynamic environments.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-3xl p-10 bg-gray-200">
                <h3 className="text-2xl font-bold mb-10 text-black">BENEFITS</h3>
                <div className="space-y-8">
                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-black">Faster, Cheaper AI Training</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Reduce training time from 500M to just 500 frames per use case.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-black">Enterprise-Ready Performance</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Stable, predictable, brand-safe video generation beyond current limits.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-3 text-black">Massive Revenue & Moat</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Proprietary tech years in the making that giants couldn't build.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-block rounded-3xl py-12 px-16 bg-blue-600">
                <p className="text-4xl font-bold mb-3 text-white">1000x Reduction</p>
                <p className="text-xl text-white opacity-90">500M frames → 500 frames per use case</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Sign In Page
  if (currentPage === 'signin') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-full max-w-md px-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-black mb-2">23 Bulbs</h1>
            <h2 className="text-3xl font-bold text-black mb-2">Welcome back</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>
          
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
              onClick={() => setCurrentPage('marketplace')}
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
  }

  // Sign Up Page
  if (currentPage === 'signup') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-full max-w-md px-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-black mb-2">23 Bulbs</h1>
            <h2 className="text-3xl font-bold text-black mb-2">Create account</h2>
            <p className="text-gray-600">Start generating physics-aware datasets</p>
          </div>
          
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
              onClick={() => setCurrentPage('marketplace')}
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
  }

  // Default fallback
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">23 Bulbs Dataset Platform</h1>
        <p className="text-gray-600 mb-6">Page not found: {currentPage}</p>
        <button
          onClick={() => setCurrentPage('landing')}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
        >
          Back to Landing
        </button>
      </div>
    </div>
  );
}
