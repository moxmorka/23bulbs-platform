import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Key, Copy } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [apiKey, setApiKey] = useState('');
  const [copied, setCopied] = useState(false);

  const demoScenes = [
    {
      id: 'blue',
      name: 'Dynamic Fabric Simulation',
      description: 'Animate high-quality materials with advanced wind and physics settings.',
      cube: { color: '#3B82F6', roughness: 0.3, metalness: 0.8, rotationX: -15, rotationY: 30, rotationSpeed: 0.5 },
      light: { intensity: 1.5, color: '#fef3c7' }
    },
    {
      id: 'red',
      name: 'High-Contrast Lighting',
      description: 'Showcasing intricate material details under a dramatic, single-source light.',
      cube: { color: '#ef4444', roughness: 0.9, metalness: 0.1, rotationX: 10, rotationY: -45, rotationSpeed: -0.3 },
      light: { intensity: 0.8, color: '#fca5a5' }
    },
    {
      id: 'green',
      name: 'Complex Material Textures',
      description: 'Illustrates the platform’s ability to render metallic and glossy surfaces.',
      cube: { color: '#16a34a', roughness: 0.1, metalness: 0.9, rotationX: 45, rotationY: 10, rotationSpeed: 0.8 },
      light: { intensity: 2.0, color: '#dcfce7' }
    },
  ];

  const [currentDemoScene, setCurrentDemoScene] = useState(demoScenes[0]);

  const copyApiKey = () => {
    const tempInput = document.createElement('input');
    tempInput.value = apiKey;
    document.body.appendChild(tempInput);
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startDemo = () => {
    const newApiKey = '23b_demo_' + Math.random().toString(36).substring(2, 15);
    setApiKey(newApiKey);
    setCurrentPage('demo-select');
  }
  
  const selectScene = (sceneId) => {
    const scene = demoScenes.find(s => s.id === sceneId);
    if (scene) {
      setCurrentDemoScene(scene);
      setCurrentPage('pitch-demo');
    }
  };

  useEffect(() => {
    let animationFrameId;
    let rotationY = currentDemoScene.cube.rotationY;

    const animateCube = () => {
      rotationY += currentDemoScene.cube.rotationSpeed;
      document.documentElement.style.setProperty('--cube-rotation-y', `${rotationY}deg`);
      animationFrameId = requestAnimationFrame(animateCube);
    };

    if (currentPage === 'pitch-demo') {
      document.documentElement.style.setProperty('--cube-color', currentDemoScene.cube.color);
      document.documentElement.style.setProperty('--cube-rotation-x', `${currentDemoScene.cube.rotationX}deg`);
      document.documentElement.style.setProperty('--light-color', currentDemoScene.light.color);
      
      animateCube();
    }
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentPage, currentDemoScene]);

  switch (currentPage) {
    case 'landing':
      return (
        <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col justify-between">
          <header className="px-4 sm:px-6 py-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <h1 className="text-2xl font-bold">23 Bulbs</h1>
              <button onClick={startDemo} className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-500 transition-colors">Start Demo</button>
            </div>
          </header>
          <main className="flex-grow flex items-center justify-center text-center px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl sm:text-7xl font-extrabold mb-6 leading-tight tracking-tighter">Physics-Aware Datasets for Enterprise GenAI</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Power the next generation of AI with real-world fidelity. Our breakthrough platform delivers physics-accurate training data that unlocks GenAI for enterprise use.</p>
              <button onClick={startDemo} className="mt-12 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-500 transition-all duration-300 inline-flex items-center justify-center space-x-2 shadow-lg"><span>See the Demo</span><ArrowRight className="w-5 h-5" /></button>
            </div>
          </main>
          <footer className="py-4 text-center text-gray-600 text-xs">
            © 2023-2025 23 Bulbs. All rights reserved.
          </footer>
        </div>
      );
    case 'demo-select':
      return (
        <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
          <header className="px-4 sm:px-6 py-6 border-b border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button onClick={() => setCurrentPage('landing')} className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft className="w-5 h-5" /></button>
                <h1 className="text-2xl font-bold">Choose a Demo Scene</h1>
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">JD</span>
              </div>
            </div>
          </header>
          <main className="flex-grow p-6 flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {demoScenes.map(scene => (
                <div key={scene.id} onClick={() => selectScene(scene.id)} className="bg-gray-100 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 flex items-center justify-center mb-4">
                    <div className="w-32 h-32 relative perspective-[1000px]">
                      <div className="cube-3d w-full h-full relative" style={{'--cube-color': scene.cube.color, '--cube-rotation-x': `${scene.cube.rotationX}deg`, '--cube-rotation-y': `${scene.cube.rotationY}deg`}}>
                        <div className="cube-face cube-front bg-[var(--cube-color)] border-2 border-gray-400"></div>
                        <div className="cube-face cube-back bg-[var(--cube-color)] border-2 border-gray-400"></div>
                        <div className="cube-face cube-right bg-[var(--cube-color)] border-2 border-gray-400"></div>
                        <div className="cube-face cube-left bg-[var(--cube-color)] border-2 border-gray-400"></div>
                        <div className="cube-face cube-top bg-[var(--cube-color)] border-2 border-gray-400"></div>
                        <div className="cube-face cube-bottom bg-[var(--cube-color)] border-2 border-gray-400"></div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{scene.name}</h3>
                  <p className="text-gray-600 text-sm">{scene.description}</p>
                </div>
              ))}
            </div>
          </main>
        </div>
      );
    case 'pitch-demo':
      const currentSceneStyle = {
        '--cube-color': currentDemoScene.cube.color,
        '--cube-roughness': currentDemoScene.cube.roughness,
        '--cube-metalness': currentDemoScene.cube.metalness,
        '--cube-rotation-x': `${currentDemoScene.cube.rotationX}deg`,
        '--light-color': currentDemoScene.light.color,
        '--light-intensity': currentDemoScene.light.intensity,
      };

      return (
        <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
          <header className="px-4 sm:px-6 py-6 border-b border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button onClick={() => setCurrentPage('demo-select')} className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft className="w-5 h-5" /></button>
                <h1 className="text-2xl font-bold">{currentDemoScene.name}</h1>
              </div>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">JD</span>
              </div>
            </div>
          </header>
          <main className="flex-grow flex flex-col lg:flex-row p-6 space-y-6 lg:space-y-0 lg:space-x-6">
            <div className="flex-1 bg-gray-100 rounded-3xl overflow-hidden relative shadow-lg">
              {/* 3D Scene Container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 perspective-[1000px]">
                  <div className="cube-3d w-full h-full relative" style={currentSceneStyle}>
                    {/* CSS 3D Cube Faces */}
                    <div className="cube-face cube-front bg-[var(--cube-color)] border-2 border-gray-400"></div>
                    <div className="cube-face cube-back bg-[var(--cube-color)] border-2 border-gray-400"></div>
                    <div className="cube-face cube-right bg-[var(--cube-color)] border-2 border-gray-400"></div>
                    <div className="cube-face cube-left bg-[var(--cube-color)] border-2 border-gray-400"></div>
                    <div className="cube-face cube-top bg-[var(--cube-color)] border-2 border-gray-400"></div>
                    <div className="cube-face cube-bottom bg-[var(--cube-color)] border-2 border-gray-400"></div>
                  </div>
                </div>
              </div>
              {/* Gradient overlay for dramatic effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent"></div>
            </div>

            {/* Read-only Demo description */}
            <div className="w-full lg:w-96 bg-white rounded-3xl p-8 flex flex-col justify-between shadow-lg border border-gray-200">
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold mb-2">{currentDemoScene.name}</h3>
                  <p className="text-gray-600">{currentDemoScene.description}</p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="text-lg font-bold mb-4">API Access</h4>
                <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 flex items-center">
                  <div className="flex-1 mr-4">
                    <code className="text-sm font-mono text-gray-800 break-all">{apiKey || 'Your API key will appear here...'}</code>
                  </div>
                  <button onClick={copyApiKey} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors">
                    <Copy className="w-4 h-4" />
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Use this key to integrate our physics-aware datasets into your AI training pipeline.</p>
              </div>
            </div>
          </main>
          <style>{`
            .cube-3d {
              transform: rotateX(var(--cube-rotation-x)) rotateY(var(--cube-rotation-y));
              transform-style: preserve-3d;
              transition: transform 0.5s ease-out;
            }
            .cube-face {
              position: absolute;
              width: 100%;
              height: 100%;
              opacity: 0.9;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.5rem;
              color: white;
              transition: background-color 0.5s, transform 0.5s;
              border-radius: 8px;
            }
            .cube-front  { transform: rotateY(0deg) translateZ(calc(32px + 2px)); }
            .cube-back   { transform: rotateX(180deg) rotateY(0deg) translateZ(calc(32px + 2px)); }
            .cube-right  { transform: rotateY(90deg) translateZ(calc(32px + 2px)); }
            .cube-left   { transform: rotateY(-90deg) translateZ(calc(32px + 2px)); }
            .cube-top    { transform: rotateX(90deg) translateZ(calc(32px + 2px)); }
            .cube-bottom { transform: rotateX(-90deg) translateZ(calc(32px + 2px)); }
            @keyframes spin {
              from { transform: rotateX(var(--cube-rotation-x)) rotateY(var(--cube-rotation-y)); }
              to { transform: rotateX(calc(var(--cube-rotation-x) + 360deg)) rotateY(calc(var(--cube-rotation-y) + 360deg)); }
            }
          `}</style>
        </div>
      );
    case 'api-checkout':
      return (
        <div className="min-h-screen bg-white text-gray-900 font-sans flex items-center justify-center">
          <div className="max-w-xl mx-auto p-8 bg-white rounded-3xl shadow-lg border border-gray-200 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Key className="w-8 h-8 text-gray-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">API Access Generated</h2>
            <p className="text-gray-600">Your dataset configuration is ready!</p>
            <div className="mt-8 bg-gray-100 border border-gray-200 rounded-xl p-4 flex items-center">
              <div className="flex-1 mr-4">
                <code className="text-sm font-mono text-gray-800 break-all">{apiKey}</code>
              </div>
              <button onClick={copyApiKey} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors">
                <Copy className="w-4 h-4" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <button onClick={() => setCurrentPage('landing')} className="w-full mt-8 bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-500 transition-colors">Return to Home</button>
          </div>
        </div>
      );
    default:
      return (
        <div className="min-h-screen bg-white flex items-center justify-center font-sans text-gray-900">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-gray-900 mb-4">Page Not Found</h1>
            <button onClick={() => setCurrentPage('landing')} className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-500 transition-colors">Return to Landing</button>
          </div>
        </div>
      );
  }
}
