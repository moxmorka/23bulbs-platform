import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Key, Copy } from 'lucide-react';

const DemoIcon = ({ id }) => {
  const iconMap = {
    'blue': `M536.4 273.6c8.3984 8.3984 20.398 13.199 31.199 13.199 10.801 0 22.801-4.8008 31.199-13.199l168-166.8c18-18 18-45.602 0-63.602s-45.602-18-63.602 0l-166.8 166.8c-16.797 18-16.797 45.602 0 63.602z M403.2 406.8c-18-18-45.602-18-63.602 0l-63.598 63.598c-18 18-18 45.602 0 63.602 8.3984 8.3984 20.398 13.199 31.199 13.199s22.801-4.8008 31.199-13.199l63.602-63.602c19.199-18 19.199-46.797 1.1992-63.598z M80.398 667.2l-37.199 37.199c-18 18-18 45.602 0 63.602 8.4023 7.1992 20.402 12 31.199 12 12 0 22.801-4.8008 31.199-13.199l37.199-37.199c18-18 18-45.602 0-63.602-16.797-16.801-45.598-16.801-62.398 1.1992z M403.2 667.2c-18-18-45.602-18-63.602 0l-166.8 166.8c-18 18-18 45.602 0 63.602 8.3984 8.3984 20.398 13.199 31.199 13.199 12 0 22.801-4.8008 31.199-13.199l166.8-166.8c19.199-18 19.199-46.801 1.1992-63.602z M600 406.8l-63.602 63.602c-18 18-18 45.602 0 63.602 8.3984 8.3984 20.398 13.199 31.199 13.199 10.801 0 22.801-4.8008 31.199-13.199l63.602-63.602c18-18 18-45.602 0-63.602-16.797-18-44.398-18-62.398 0z M828 286.8c12 0 22.801-4.8008 31.199-13.199l37.199-37.199c18-18 18-45.602 0-63.602s-45.602-18-63.602 0l-37.199 37.199c-18 18-18 45.602 0 63.602 9.6016 8.3984 21.602 13.199 32.402 13.199z M663.6 926.4c-18-18-45.602-18-63.602 0l-166.8 166.8c-18 18-18 45.602 0 63.602 8.3984 8.3984 20.398 13.199 31.199 13.199 10.801 0 22.801-4.8008 31.199-13.199l166.8-166.8c18-18 18-45.602 1.2031-63.602z M828 806.4c12 0 22.801-4.8008 31.199-13.199l63.602-63.602c18-18 18-45.602 0-63.602s-45.602-18-63.602 0l-63.602 63.602c-18 18-18 45.602 0 63.602 9.6016 8.4023 21.602 13.199 32.402 13.199z M1088.4 546c12 0 22.801-4.8008 31.199-13.199l37.199-37.199c18-18 18-45.602 0-63.602s-45.602-18-63.602 0l-37.199 37.199c-18 18-18 45.602 0 63.602 9.6055 9.5977 21.605 13.199 32.402 13.199z M796.8 532.8c8.3984 8.3984 20.398 13.199 31.199 13.199s22.801-4.8008 31.199-13.199l166.8-166.8c18-18 18-45.602 0-63.602s-45.602-18-63.602 0l-165.6 168c-18 16.801-18 45.602 0 62.402z M600 793.2l63.602-63.602c18-18 18-45.602 0-63.602s-45.602-18-63.602 0l-63.602 63.602c-18 18-18 45.602 0 63.602 8.3984 8.3984 20.398 13.199 31.199 13.199 10.801 0 24.004-4.7969 32.402-13.199z M339.6 926.4l-37.199 37.199c-18 18-18 45.602 0 63.602 8.3984 8.3984 20.398 13.199 31.199 13.199 12 0 22.801-4.8008 31.199-13.199l37.199-37.199c18-18 18-45.602 0-63.602-16.801-16.797-44.398-16.797-62.398 0z M990 536.4c-18-18-45.602-18-63.602 0s-18 45.602 0 63.602l166.8 166.8c8.3984 8.3984 20.398 13.199 31.199 13.199s22.801-4.8008 31.199-13.199c18-18 18-45.602 0-63.602z M729.6 403.2c8.3984 8.3984 20.398 13.199 31.199 13.199 12 0 22.801-4.8008 31.199-13.199 18-18 18-45.602 0-63.602l-62.398-63.598c-18-18-45.602-18-63.602 0s-18 45.602 0 63.602z M470.4 142.8c8.3984 8.3984 20.398 13.199 31.199 13.199 10.801 0 22.801-4.8008 31.199-13.199 18-18 18-45.602 0-63.602l-37.199-37.199c-18-18-45.602-18-63.602 0s-18 45.602 0 63.602z M470.4 403.2c8.3984 8.3984 20.398 13.199 31.199 13.199 10.801 0 22.801-4.8008 31.199-13.199 18-18 18-45.602 0-63.602l-166.8-166.8c-18-18-45.602-18-63.602 0s-18 45.602 0 63.602z M762 676.8c12 0 22.801-4.8008 31.199-13.199 18-18 18-45.602 0-63.602l-63.602-63.602c-18-18-45.602-18-63.602 0s-18 45.602 0 63.602l63.602 63.602c9.6016 8.3984 20.402 13.199 32.402 13.199z M990 796.8c-18-18-45.602-18-63.602 0s-18 45.602 0 63.602l37.199 37.199c8.3984 8.3984 20.398 13.199 31.199 13.199s22.801-4.8008 31.199-13.199c18-18 18-45.602 0-63.602z M210 663.6c8.3984 8.3984 20.398 13.199 31.199 13.199s22.801-4.8008 31.199-13.199c18-18 18-45.602 0-63.602l-165.6-166.8c-18-18-45.602-18-63.602 0s-18 45.602 0 63.602z M406.8 860.4l63.602 63.602c8.3984 8.3984 20.398 13.199 31.199 13.199 10.801 0 22.801-4.8008 31.199-13.199 18-18 18-45.602 0-63.602l-63.602-63.602c-18-18-45.602-18-63.602 0-16.797 18.004-16.797 45.602 1.2031 63.602z M729.6 1057.2c-18-18-45.602-18-63.602 0s-18 45.602 0 63.602l37.199 37.199c8.3984 8.3984 20.398 13.199 31.199 13.199 10.801 0 22.801-4.8008 31.199-13.199 18-18 18-45.602 0-63.602z M729.6 796.8c-18-18-45.602-18-63.602 0s-18 45.602 0 63.602l166.8 166.8c8.3984 8.3984 20.398 13.199 31.199 13.199s22.801-4.8008 31.199-13.199c18-18 18-45.602 0-63.602z M470.4 663.6c8.3984 8.3984 20.398 13.199 31.199 13.199 10.801 0 22.801-4.8008 31.199-13.199 18-18 18-45.602 0-63.602l-63.602-63.602c-18-18-45.602-18-63.602 0s-18 45.602 0 63.602z M210 403.2c8.3984 8.3984 20.398 13.199 31.199 13.199s22.801-4.8008 31.199-13.199c18-18 18-45.602 0-63.602l-37.199-37.199c-18-18-45.602-18-63.602 0s-18 45.602 0 63.602z`,
    'red': `m629.28 315c-144.16 0-261.01 116.86-261.01 261.01s116.86 261.01 261.01 261.01 261.01-116.86 261.01-261.01-116.86-261.01-261.01-261.01zm0 467.71c-114.16 0-206.7-92.543-206.7-206.7s92.543-206.7 206.7-206.7 206.7 92.543 206.7 206.7-92.543 206.7-206.7 206.7zm159.71-206.71c0 91.141-73.934 165.07-165.07 165.07l-0.003907-330.14c91.141 0 165.07 73.941 165.07 165.07zm-134.2-331.4c0 10.246-8.3047 18.551-18.551 18.551h-13.922c-10.246 0-18.551-8.3047-18.551-18.551v-148.41c0-10.246 8.3047-18.551 18.551-18.551h13.906c10.246 0 18.551 8.3047 18.551 18.551l0.003906 148.41zm-243.4 75.25c7.2461 7.2461 7.2461 18.996 0 26.23l-9.8398 9.8398c-7.2461 7.2461-18.996 7.2461-26.23 0l-104.94-104.94c-7.2461-7.2461-7.2461-18.996 0-26.23l9.8398-9.8398c7.2461-7.2461 18.996-7.2461 26.23 0zm-118.89 225.3c10.246 0 18.551 8.3047 18.551 18.551v13.906c0 10.246-8.3047 18.551-18.551 18.551l-148.4 0.003906c-10.246 0-18.551-8.3047-18.551-18.551v-13.906c0-10.246 8.3047-18.551 18.551-18.551zm75.238 243.38c7.2461-7.2461 18.996-7.2461 26.23 0l9.8398 9.8398c7.2461 7.2461 7.2461 18.996 0 26.23l-104.94 104.94c-7.2461 7.2461-18.996 7.2461-26.23 0l-9.8398-9.8398c-7.2461-7.2461-7.2461-18.996 0-26.23zm225.31 118.9c0-10.246 8.3047-18.551 18.551-18.551h13.906c10.246 0 18.551 8.3047 18.551 18.551v148.4c0 10.246-8.3047 18.551-18.551 18.551h-13.906c-10.246 0-18.551-8.3047-18.551-18.551zm243.39-75.242c-7.2461-7.2461-7.2461-18.996 0-26.23l9.8398-9.8398c7.2461-7.2461 18.996-7.2461 26.23 0l104.94 104.94c7.2461 7.2461 7.2461 18.996 0 26.23l-9.8398 9.8398c-7.2461 7.2461-18.996 7.2461-26.23 0zm118.89-225.3c-10.246 0-18.551-8.3047-18.551-18.551v-13.906c0-10.246 8.3047-18.551 18.551-18.551h148.4c10.246 0 18.551 8.3047 18.551 18.551v13.906c0 10.246-8.3047 18.551-18.551 18.551zm-75.238-243.38c-7.2461 7.2461-18.996 7.2461-26.23 0l-9.8398-9.8398c-7.2461-7.2461-7.2461-18.996 0-26.23l104.94-104.94c7.2461-7.2461 18.996-7.2461 26.23 0l9.8398 9.8398c7.2461 7.2461 7.2461 18.996 0 26.23z`,
    'green': `m3.6055 601.8 234.23-234.23 72.07 75.676-158.56 158.56 158.56 154.95-72.07 75.676zm753.15 288.29 75.676 75.676-230.63 230.63-234.23-230.63 75.676-75.676 158.56 158.56zm-389.19-652.25l234.23-234.23 230.63 234.23-75.676 72.07-154.95-158.56-158.56 158.56zm598.2 129.73l230.63 234.23-230.63 230.63-75.676-75.676 158.56-154.95-158.56-158.56z M266.67 601.8l129.73-133.33 39.641 43.242-86.488 90.09 86.488 86.488-39.641 43.242zm421.62 162.16l43.242 43.242-129.73 129.73-133.33-129.73 43.242-43.242 90.09 90.09zm-219.82-367.57l133.33-129.73 129.73 129.73-43.242 39.641-86.488-86.488-90.09 86.488zm338.74 72.07l129.73 133.33-129.73 129.73-43.242-43.242 90.09-86.488-90.09-90.09z M468.47 601.8l54.055-50.449 14.414 14.414-36.035 36.035 36.035 32.434-14.414 18.02-54.055-50.449zm165.77 61.262l18.02 18.02-50.449 50.449-50.449-50.449 14.414-18.02 36.035 36.035 32.434-36.035zm-82.883-140.54l50.449-54.055 50.449 54.055-18.02 14.414-32.434-36.035-36.035 36.035-14.414-14.414zm129.73 28.828l50.449 50.449-50.449 50.449-18.02-18.02 36.035-32.434-36.035-36.035 18.02-14.414z`,
  };

  const colors = {
    'blue': '#3B82F6',
    'red': '#EF4444',
    'green': '#16A34A',
  };

  return (
    <svg className="w-32 h-32" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
      <path d={iconMap[id]} fill={colors[id]} />
    </svg>
  );
};
export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [apiKey, setApiKey] = useState('');
  const [copied, setCopied] = useState(false);
  const [currentDemoScene, setCurrentDemoScene] = useState(null);
  const startDemo = () => {
    setCurrentPage('demo-select');
  };
  const selectScene = (id) => {
    const scene = demoScenes.find(s => s.id === id);
    setCurrentDemoScene(scene);
    setCurrentPage('pitch-demo');
  };
  const demoScenes = [
    {
      id: 'blue',
      name: 'Dynamic Fabric Simulation',
      description: 'Generates high-fidelity data for computer vision models that analyze object behavior under complex physical conditions.',
      cube: { color: '#3B82F6', roughness: 0.3, metalness: 0.8, rotationX: -15, rotationY: 30, rotationSpeed: 0.5 },
      light: { intensity: 1.5, color: '#fef3c7' },
    },
    {
      id: 'red',
      name: 'High-Contrast Lighting',
      description: 'Provides annotated datasets to train models for detection and recognition in challenging lighting environments.',
      cube: { color: '#EF4444', roughness: 0.9, metalness: 0.1, rotationX: 10, rotationY: -45, rotationSpeed: -0.3 },
      light: { intensity: 0.8, color: '#fca5a5' },
    },
    {
      id: 'green',
      name: 'Complex Material Textures',
      description: 'Creates rich datasets for models that need to accurately classify and segment different surface properties.',
      cube: { color: '#16A34A', roughness: 0.1, metalness: 0.0, rotationX: 20, rotationY: 10, rotationSpeed: 0.2 },
      light: { intensity: 2.0, color: '#dcfce7' },
    },
  ];
  useEffect(() => {
    let intervalId;
    if (currentPage === 'pitch-demo') {
      const sceneDuration = 5000;
      intervalId = setInterval(() => {
        setCurrentDemoScene(prevScene => {
          const currentIndex = demoScenes.findIndex(s => s.id === prevScene.id);
          const nextIndex = (currentIndex + 1) % demoScenes.length;
          return demoScenes[nextIndex];
        });
      }, sceneDuration);
    }
    return () => clearInterval(intervalId);
  }, [currentPage]);

  useEffect(() => {
    let rotationInterval;
    if (currentPage === 'pitch-demo' && currentDemoScene) {
      const initialRotationY = currentDemoScene.cube.rotationY;
      let currentRotationY = initialRotationY;
      rotationInterval = setInterval(() => {
        currentRotationY += currentDemoScene.cube.rotationSpeed;
        const newRotationY = currentRotationY;
        const cube = document.querySelector('.cube-3d');
        if (cube) {
          cube.style.transform = `rotateX(${currentDemoScene.cube.rotationX}deg) rotateY(${newRotationY}deg)`;
        }
      }, 20);
    }
    return () => clearInterval(rotationInterval);
  }, [currentPage, currentDemoScene]);

  const copyApiKey = () => {
    const tempInput = document.createElement('input');
    tempInput.value = apiKey;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleGenerateApiKey = () => {
    const newApiKey = '23b_' + Math.random().toString(36).substring(2, 15);
    setApiKey(newApiKey);
    setCurrentPage('api-checkout');
  };

  switch (currentPage) {
    case 'landing':
      return (
        <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col justify-between">
          <header className="px-4 sm:px-6 py-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <h1 className="text-2xl font-bold">23 Bulbs</h1>
              <button onClick={() => setCurrentPage('signin')} className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">Sign In</button>
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
                <div key={scene.id} onClick={() => selectScene(scene.id)} className="bg-gray-100 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-full">
                  <div className="h-48 flex items-center justify-center mb-4">
                    <DemoIcon id={scene.id} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{scene.name}</h3>
                    <p className="text-gray-600 text-sm">{scene.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      );
    case 'pitch-demo':
      const currentScene = currentDemoScene || demoScenes[0];
      const currentSceneStyle = {
        '--cube-color': currentScene.cube.color,
        '--cube-roughness': currentScene.cube.roughness,
        '--cube-metalness': currentScene.cube.metalness,
        '--cube-rotation-x': `${currentScene.cube.rotationX}deg`,
        '--light-color': currentScene.light.color,
        '--light-intensity': currentScene.light.intensity,
      };

      return (
        <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
          <header className="px-4 sm:px-6 py-6 border-b border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button onClick={() => setCurrentPage('demo-select')} className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-full transition-colors"><ArrowLeft className="w-5 h-5" /></button>
                <h1 className="text-2xl font-bold">{currentScene.name}</h1>
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
                  <h3 className="text-3xl font-bold mb-2">{currentScene.name}</h3>
                  <p className="text-gray-600">{currentScene.description}</p>
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
                <button onClick={handleGenerateApiKey} className="w-full mt-4 bg-gray-900 text-white py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors">Generate New API Key</button>
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
            .cube-front  { transform: rotateY(0deg) translateZ(34px); }
            .cube-back   { transform: rotateX(180deg) rotateY(0deg) translateZ(34px); }
            .cube-right  { transform: rotateY(90deg) translateZ(34px); }
            .cube-left   { transform: rotateY(-90deg) translateZ(34px); }
            .cube-top    { transform: rotateX(90deg) translateZ(34px); }
            .cube-bottom { transform: rotateX(-90deg) translateZ(34px); }
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
            <button onClick={() => setCurrentPage('landing')} className="w-full mt-8 bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors">Return to Home</button>
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
