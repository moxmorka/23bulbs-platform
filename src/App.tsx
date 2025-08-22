import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, X, Check, Key, Copy } from 'lucide-react';

export default function DatasetPlatform() {
  const [page, setPage] = useState('landing');
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [apiKey, setApiKey] = useState('');
  const [copied, setCopied] = useState(false);

  const [cube, setCube] = useState({
    x: 0, y: 0, rotation: 0, scale: 1,
    color: '#475569', wireframe: false, opacity: 1,
    gravity: 9.8, mass: 1, frame: 0
  });

  const categories = [
    { id: 'lights', name: 'Lighting', count: 5 },
    { id: 'materials', name: 'Materials', count: 5 },
    { id: 'camera', name: 'Camera', count: 5 },
    { id: 'physics', name: 'Physics', count: 5 }
  ];

  const toggle = (id) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const generate = () => {
    setApiKey('23b_' + Math.random().toString(36).substr(2, 10));
    setShowModal(false);
    setPage('checkout');
  };

  const copy = () => {
    navigator.clipboard?.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const update = (key, value) => {
    setCube(prev => ({ ...prev, [key]: value }));
  };

  if (page === 'landing') {
    return (
      <div className="min-h-screen bg-white">
        <header className="px-6 py-8">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">23 Bulbs</h1>
            <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">
              Sign In
            </button>
          </div>
        </header>

        <main className="px-6 pt-24 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-6xl font-bold mb-8">
              Physics-Aware Datasets<br />
              for Enterprise GenAI
            </h2>
            <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
              Real-time simulation engine delivers physics-accurate training data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 flex items-center justify-center gap-2">
                Sign Up <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setPage('marketplace')}
                className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800"
              >
                Browse Datasets
              </button>
              <button 
                onClick={() => setPage('tech')}
                className="bg-gray-100 text-gray-900 px-8 py-3 rounded-full hover:bg-gray-200"
              >
                Technology
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (page === 'marketplace') {
    return (
      <div className="min-h-screen bg-white">
        <header className="px-6 py-8 border-b">
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <button onClick={() => setPage('landing')} className="p-2 hover:bg-gray-100 rounded">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold">23 Bulbs</h1>
          </div>
        </header>

        <main className="px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Pre-Built Datasets</h2>
              <p className="text-xl text-gray-600">Reduce training time from 500M to 500 frames per use case.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="border rounded-2xl overflow-hidden hover:shadow-lg">
                <div className="h-48 bg-gray-800 flex items-center justify-center relative">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl"></div>
                  <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs">Demo</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Pants Demo</h3>
                  <p className="text-gray-600 mb-4">Interactive Demo • 50 samples</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500" />
                      8K • 60fps • 36 cameras
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500" />
                      Wind physics simulation
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowModal(true)}
                    className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700"
                  >
                    Launch Demo
                  </button>
                </div>
              </div>

              <div className="border rounded-2xl overflow-hidden hover:shadow-lg">
                <div className="h-48 bg-slate-700 flex items-center justify-center relative">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl"></div>
                  <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs">Enterprise</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Launch Demo 2 Enterprise</h3>
                  <p className="text-gray-600 mb-4">Enterprise 3D Demo • Real-time</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500" />
                      Real-time 3D simulation
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500" />
                      Interactive mesh editor
                    </div>
                  </div>
                  <button 
                    onClick={() => setPage('3d')}
                    className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700"
                  >
                    Launch Demo 2 Enterprise
                  </button>
                </div>
              </div>

              <div className="border rounded-2xl overflow-hidden hover:shadow-lg">
                <div className="h-48 bg-gray-700 flex items-center justify-center relative">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl"></div>
                  <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-xs">Enterprise</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Dresses & Skirts</h3>
                  <p className="text-gray-600 mb-4">Enterprise • 100K+ samples</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500" />
                      Flowing fabric dynamics
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500" />
                      Complex draping physics
                    </div>
                  </div>
                  <button className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800">
                    Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center p-6 z-50">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col">
              <div className="p-8 border-b flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">Configure Dataset</h3>
                  <p className="text-gray-600">Pants Demo Parameters</p>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8" style={{ maxHeight: 'calc(90vh - 200px)' }}>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => toggle(cat.id)}
                      className={`p-4 rounded-xl border text-left transition ${
                        selected.includes(cat.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">{cat.name}</span>
                          <span className="text-xs text-gray-500 ml-2">({cat.count} params)</span>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selected.includes(cat.id) ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                        }`}>
                          {selected.includes(cat.id) && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {selected.length > 0 && (
                  <div className="border-t pt-8">
                    <h4 className="text-lg font-semibold mb-6">Configuration Options</h4>
                    <div className="space-y-4">
                      {selected.map(id => {
                        const cat = categories.find(c => c.id === id);
                        return (
                          <div key={id} className="bg-gray-50 rounded-xl overflow-hidden">
                            <div className="px-6 py-4 bg-gray-100">
                              <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                <h5 className="font-medium">{cat.name}</h5>
                                <span className="text-xs text-gray-500 ml-2">({cat.count} parameters)</span>
                              </div>
                            </div>
                            <div className="px-6 py-4">
                              {cat.id === 'lights' && (
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium block mb-2">Light Angle</label>
                                    <input type="range" min="0" max="360" defaultValue="45" className="w-full h-2 bg-gray-200 rounded" />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                      <span>0°</span><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">45°</span><span>360°</span>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium block mb-2">Number of Lights</label>
                                    <input type="range" min="1" max="8" defaultValue="3" className="w-full h-2 bg-gray-200 rounded" />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                      <span>1</span><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">3</span><span>8</span>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium block mb-2">Light Intensity</label>
                                    <input type="range" min="0.1" max="2.0" step="0.1" defaultValue="1.0" className="w-full h-2 bg-gray-200 rounded" />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                      <span>0.1</span><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">1.0</span><span>2.0</span>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium block mb-2">HDRI Environment</label>
                                    <select className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500">
                                      <option>Studio</option>
                                      <option>Outdoor</option>
                                      <option>Indoor</option>
                                      <option>Sunset</option>
                                    </select>
                                  </div>
                                </div>
                              )}
                              {cat.id === 'materials' && (
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium block mb-2">Fabric Type</label>
                                    <select className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500">
                                      <option>Cotton</option>
                                      <option>Denim</option>
                                      <option>Silk</option>
                                      <option>Polyester</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium block mb-2">Surface Roughness</label>
                                    <input type="range" min="0" max="1" step="0.1" defaultValue="0.5" className="w-full h-2 bg-gray-200 rounded" />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                      <span>0.0</span><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">0.5</span><span>1.0</span>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium block mb-2">Metallic</label>
                                    <input type="range" min="0" max="1" step="0.1" defaultValue="0.0" className="w-full h-2 bg-gray-200 rounded" />
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium block mb-2">Subsurface Scattering</label>
                                    <input type="range" min="0" max="1" step="0.1" defaultValue="0.3" className="w-full h-2 bg-gray-200 rounded" />
                                  </div>
                                </div>
                              )}
                              {cat.id === 'camera' && (
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium block mb-2">Camera Angles</label>
                                    <input type="range" min="1" max="36" defaultValue="8" className="w-full h-2 bg-gray-200 rounded" />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                      <span>1</span><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">8</span><span>36</span>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium block mb-2">Resolution</label>
                                    <select className="w-full px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500">
                                      <option>HD</option>
                                      <option selected>4K</option>
                                      <option>8K</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium block mb-2">Focal Length</label>
                                    <input type="range" min="18" max="200" defaultValue="50" className="w-full h-2 bg-gray-200 rounded" />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                      <span>18mm</span><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">50mm</span><span>200mm</span>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium block mb-2">Depth of Field</label>
                                    <input type="range" min="0" max="10" step="0.1" defaultValue="2.8" className="w-full h-2 bg-gray-200 rounded" />
                                  </div>
                                </div>
                              )}
                              {cat.id === 'physics' && (
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium block mb-2">Wind Strength</label>
                                    <input type="range" min="0" max="10" step="0.5" defaultValue="2.0" className="w-full h-2 bg-gray-200 rounded" />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                      <span>0 m/s</span><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">2.0 m/s</span><span>10 m/s</span>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium block mb-2">Gravity Strength</label>
                                    <input type="range" min="0.5" max="2.0" step="0.1" defaultValue="1.0" className="w-full h-2 bg-gray-200 rounded" />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                      <span>0.5g</span><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">1.0g</span><span>2.0g</span>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium block mb-2">Wind Direction</label>
                                    <input type="range" min="0" max="360" defaultValue="90" className="w-full h-2 bg-gray-200 rounded" />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                      <span>0°</span><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">90°</span><span>360°</span>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium block mb-2">Air Density</label>
                                    <input type="range" min="0.5" max="2.0" step="0.1" defaultValue="1.0" className="w-full h-2 bg-gray-200 rounded" />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
                
              <div className="flex justify-between items-center p-8 border-t">
                <span className="text-gray-600">{selected.length} categories selected</span>
                <div className="flex gap-3">
                  <button onClick={() => setShowModal(false)} className="px-6 py-2 text-gray-600 hover:text-black">
                    Cancel
                  </button>
                  <button
                    onClick={generate}
                    disabled={selected.length === 0}
                    className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-200"
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
  }

  if (page === '3d') {
    return (
      <div className="min-h-screen bg-white">
        <header className="px-6 py-8 border-b">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <button onClick={() => setPage('marketplace')} className="p-2 hover:bg-gray-100 rounded">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold">23 Bulbs</h1>
            <span className="text-sm text-gray-500">• Enterprise 3D Demo</span>
          </div>
        </header>

        <div className="flex h-[calc(100vh-88px)]">
          <div className="flex-1 bg-gray-100 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div 
                  className="relative transition-all duration-300 ease-in-out"
                  style={{
                    transform: `scale(${cube.scale}) rotateX(${cube.rotation}deg) rotateY(${cube.rotation}deg) translate3d(${cube.x * 10}px, ${cube.y * -10}px, 0px)`,
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
                    {/* Front face */}
                    <div 
                      className="absolute w-32 h-32 border-2"
                      style={{
                        backgroundColor: cube.color,
                        opacity: cube.wireframe ? 0.3 : cube.opacity * 0.8,
                        borderColor: cube.wireframe ? '#374151' : 'rgba(55, 65, 81, 0.3)',
                        transform: 'translateZ(64px)'
                      }}
                    ></div>
                    {/* Back face */}
                    <div 
                      className="absolute w-32 h-32 border-2"
                      style={{
                        backgroundColor: cube.color,
                        opacity: cube.wireframe ? 0.2 : cube.opacity * 0.6,
                        borderColor: cube.wireframe ? '#374151' : 'rgba(55, 65, 81, 0.3)',
                        transform: 'translateZ(-64px) rotateY(180deg)'
                      }}
                    ></div>
                    {/* Right face */}
                    <div 
                      className="absolute w-32 h-32 border-2"
                      style={{
                        backgroundColor: cube.color,
                        opacity: cube.wireframe ? 0.25 : cube.opacity * 0.7,
                        borderColor: cube.wireframe ? '#374151' : 'rgba(55, 65, 81, 0.3)',
                        transform: 'rotateY(90deg) translateZ(64px)'
                      }}
                    ></div>
                    {/* Left face */}
                    <div 
                      className="absolute w-32 h-32 border-2"
                      style={{
                        backgroundColor: cube.color,
                        opacity: cube.wireframe ? 0.2 : cube.opacity * 0.5,
                        borderColor: cube.wireframe ? '#374151' : 'rgba(55, 65, 81, 0.3)',
                        transform: 'rotateY(-90deg) translateZ(64px)'
                      }}
                    ></div>
                    {/* Top face */}
                    <div 
                      className="absolute w-32 h-32 border-2"
                      style={{
                        backgroundColor: cube.color,
                        opacity: cube.wireframe ? 0.3 : cube.opacity * 0.9,
                        borderColor: cube.wireframe ? '#374151' : 'rgba(55, 65, 81, 0.3)',
                        transform: 'rotateX(90deg) translateZ(64px)'
                      }}
                    ></div>
                    {/* Bottom face */}
                    <div 
                      className="absolute w-32 h-32 border-2"
                      style={{
                        backgroundColor: cube.color,
                        opacity: cube.wireframe ? 0.15 : cube.opacity * 0.4,
                        borderColor: cube.wireframe ? '#374151' : 'rgba(55, 65, 81, 0.3)',
                        transform: 'rotateX(-90deg) translateZ(64px)'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4">
              <div className="flex items-center gap-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                  Play
                </button>
                <div className="flex-1">
                  <span className="text-xs text-gray-500">Frame: {cube.frame} / 120</span>
                  <input
                    type="range"
                    min="0"
                    max="120"
                    value={cube.frame}
                    onChange={(e) => update('frame', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-80 bg-gray-50 border-l overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-6">Mesh Inspector</h3>
              
              <div className="mb-8">
                <h4 className="font-medium mb-4 flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  Transform
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium block mb-2">Position X</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="-5"
                        max="5"
                        step="0.1"
                        value={cube.x}
                        onChange={(e) => update('x', parseFloat(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded"
                      />
                      <span className="text-xs text-gray-600 w-8">{cube.x}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Position Y</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="-5"
                        max="5"
                        step="0.1"
                        value={cube.y}
                        onChange={(e) => update('y', parseFloat(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded"
                      />
                      <span className="text-xs text-gray-600 w-8">{cube.y}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Rotation (degrees)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={cube.rotation}
                        onChange={(e) => update('rotation', parseInt(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded"
                      />
                      <span className="text-xs text-gray-600 w-12">{cube.rotation}°</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Scale</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.1"
                        value={cube.scale}
                        onChange={(e) => update('scale', parseFloat(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded"
                      />
                      <span className="text-xs text-gray-600 w-8">{cube.scale}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="font-medium mb-4 flex items-center">
                  <div className="w-3 h-3 bg-slate-600 rounded-full mr-2"></div>
                  Material
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium block mb-2">Color</label>
                    <input
                      type="color"
                      value={cube.color}
                      onChange={(e) => update('color', e.target.value)}
                      className="w-full h-10 rounded border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Opacity</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.1"
                        value={cube.opacity}
                        onChange={(e) => update('opacity', parseFloat(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded"
                      />
                      <span className="text-xs text-gray-600 w-8">{cube.opacity}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={cube.wireframe}
                      onChange={(e) => update('wireframe', e.target.checked)}
                    />
                    <label className="text-sm font-medium">Wireframe Mode</label>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="font-medium mb-4 flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  Physics Forces
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium block mb-2">Gravity (m/s²)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="20"
                        step="0.1"
                        value={cube.gravity}
                        onChange={(e) => update('gravity', parseFloat(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded"
                      />
                      <span className="text-xs text-gray-600 w-16">{cube.gravity} m/s²</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Mass (kg)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0.1"
                        max="10"
                        step="0.1"
                        value={cube.mass}
                        onChange={(e) => update('mass', parseFloat(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded"
                      />
                      <span className="text-xs text-gray-600 w-12">{cube.mass} kg</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    setApiKey('23b_ent_' + Math.random().toString(36).substr(2, 10));
                    setPage('checkout');
                  }}
                  className="w-full bg-slate-700 text-white py-3 rounded hover:bg-black"
                >
                  Generate Enterprise Dataset
                </button>
                <button 
                  onClick={() => setCube({
                    x: 0, y: 0, rotation: 0, scale: 1,
                    color: '#475569', wireframe: false, opacity: 1,
                    gravity: 9.8, mass: 1, frame: 0
                  })}
                  className="w-full bg-gray-600 text-white py-3 rounded hover:bg-gray-700"
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

  if (page === 'tech') {
    return (
      <div className="min-h-screen bg-white">
        <header className="px-6 py-8 border-b">
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <button onClick={() => setPage('landing')} className="p-2 hover:bg-gray-100 rounded">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold">23 Bulbs</h1>
          </div>
        </header>

        <main className="px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold mb-4">Our Technology</h2>
              <p className="text-xl text-gray-600">Physics-aware data generation pipeline</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-24">
              <div className="rounded-3xl p-10 bg-gray-100">
                <h3 className="text-2xl font-bold mb-10">FEATURES</h3>
                <div className="space-y-8">
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Physics-Accurate Simulation Engine</h4>
                    <p className="text-gray-600">Real-time cloth and motion simulation, customizable through 20+ parameters.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-3">On-Demand API</h4>
                    <p className="text-gray-600">Self-serve platform for enterprises to request high-fidelity video training data.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Multi-Engine Platform</h4>
                    <p className="text-gray-600">Growing suite of engines for human motion, sensor data, and dynamic environments.</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-3xl p-10 bg-gray-200">
                <h3 className="text-2xl font-bold mb-10">BENEFITS</h3>
                <div className="space-y-8">
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Faster, Cheaper AI Training</h4>
                    <p className="text-gray-600">Reduce training time from 500M to just 500 frames per use case.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Enterprise-Ready Performance</h4>
                    <p className="text-gray-600">Stable, predictable, brand-safe video generation beyond current limits.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Massive Revenue & Moat</h4>
                    <p className="text-gray-600">Proprietary tech years in the making that giants couldn't build.</p>
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

  if (page === 'checkout') {
    return (
      <div className="min-h-screen bg-white">
        <header className="px-6 py-8 border-b">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <button onClick={() => setPage('marketplace')} className="p-2 hover:bg-gray-100 rounded">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold">23 Bulbs</h1>
          </div>
        </header>

        <main className="px-6 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Key className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4">API Access Generated</h2>
              <p className="text-lg text-gray-600">Your dataset configuration is ready!</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Key className="w-5 h-5" />
                Your API Key
              </h3>
              
              <div className="bg-white border rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <code className="text-sm font-mono break-all mr-4">{apiKey}</code>
                  <button 
                    onClick={copy}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold mb-6">Dataset Configuration</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Dataset Type</span>
                  <span className="font-medium">Physics Simulation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Categories</span>
                  <span className="font-medium">{selected.length} selected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Samples</span>
                  <span className="font-medium">75,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data Volume</span>
                  <span className="font-medium">8.5GB</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setPage('marketplace')}
              className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700"
            >
              Create Another Dataset
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">23 Bulbs Dataset Platform</h1>
        <p className="text-gray-600 mb-6">Current page: {page}</p>
        <button
          onClick={() => setPage('landing')}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
        >
          Back to Landing
        </button>
      </div>
    </div>
  );
}
