import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ARScene } from './ARScene';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { RotateCcw, Maximize2, Minimize2, Camera, RefreshCw } from 'lucide-react';
import type { Fabric } from '../App';

type ARViewerProps = {
  fabric: Fabric;
  onContinue: () => void;
};

const roomSettings = [
  {
    id: 'living',
    name: 'Living Room',
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&h=600&fit=crop',
    description: 'Spacious living room with natural light'
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop',
    description: 'Cozy bedroom setting'
  },
  {
    id: 'dining',
    name: 'Dining Room',
    image: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&h=600&fit=crop',
    description: 'Elegant dining space'
  }
];

export function ARViewer({ fabric, onContinue }: ARViewerProps) {
  const [selectedRoom, setSelectedRoom] = useState(roomSettings[0]);
  const [showAR, setShowAR] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [curtainStyle, setCurtainStyle] = useState('gathered');
  const [isLoading, setIsLoading] = useState(false);

  const refreshView = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const capturePhoto = () => {
    // Simulate photo capture
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = 800;
      canvas.height = 600;
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, 800, 600);
      ctx.fillStyle = '#333';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('AR Curtain Preview Captured', 400, 300);
      
      // Download the image
      const link = document.createElement('a');
      link.download = `curtain-preview-${fabric.name}.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  ARScene();
  return (
    <>
      <Button onClick={() => setShowAR(!showAR)}>
        {showAR ? 'Hide AR View' : 'Try in AR'}
      </Button>
      {showAR && <ARScene />}
(
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">AR Preview: {fabric.name}</h2>
        <p className="text-muted-foreground">
          See how your selected curtain looks in different room settings
        </p>
      </div>

      {/* Room Selection */}
      <div className="flex justify-center">
        <div className="flex gap-2 p-1 bg-muted rounded-lg">
          {roomSettings.map(room => (
            <Button
              key={room.id}
              variant={selectedRoom.id === room.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedRoom(room)}
              className="text-sm"
            >
              {room.name}
            </Button>
          ))}
        </div>
      </div>

      {/* AR Viewer */}
      <Card className={`${isFullscreen ? 'fixed inset-4 z-50' : ''} overflow-hidden`}>
        <CardContent className="p-0">
          <div className="relative">
            {/* Background Room */}
            <div className="relative">
              <ImageWithFallback
                src={selectedRoom.image}
                alt={selectedRoom.name}
                className={`w-full object-cover ${isFullscreen ? 'h-[calc(100vh-8rem)]' : 'h-96 md:h-[500px]'}`}
              />
              
              {/* Simulated Curtain Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Left Curtain Panel */}
                <div 
                  className="absolute left-[15%] top-[10%] w-[30%] h-[70%] opacity-80 shadow-lg"
                  style={{
                    backgroundImage: `url(${fabric.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: curtainStyle === 'gathered' ? 'scaleX(0.8)' : 'scaleX(1)',
                    filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.3))'
                  }}
                />
                
                {/* Right Curtain Panel */}
                <div 
                  className="absolute right-[15%] top-[10%] w-[30%] h-[70%] opacity-80 shadow-lg"
                  style={{
                    backgroundImage: `url(${fabric.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: curtainStyle === 'gathered' ? 'scaleX(0.8)' : 'scaleX(1)',
                    filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.3))'
                  }}
                />
              </div>

              {/* Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="bg-white rounded-lg p-4 flex items-center gap-3">
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span>Updating AR view...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Controls Overlay */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-black/70 text-white">
                  AR Mode
                </Badge>
                <Badge variant="outline" className="bg-white/90">
                  {selectedRoom.description}
                </Badge>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={refreshView}
                  className="bg-white/90"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={capturePhoto}
                  className="bg-white/90"
                >
                  <Camera className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="bg-white/90"
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-4 left-4 right-4">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{fabric.name}</h3>
                      <p className="text-sm text-muted-foreground">{fabric.material} • ${fabric.price}/meter</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={curtainStyle === 'gathered' ? 'default' : 'outline'}
                        onClick={() => setCurtainStyle('gathered')}
                      >
                        Gathered
                      </Button>
                      <Button
                        size="sm"
                        variant={curtainStyle === 'straight' ? 'default' : 'outline'}
                        onClick={() => setCurtainStyle('straight')}
                      >
                        Straight
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={refreshView}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Try Different Angle
        </Button>
        <Button onClick={onContinue} size="lg">
          Looks Perfect! Continue to Measurements
        </Button>
      </div>

      {/* Tips */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <h4 className="font-semibold mb-2">AR Tips:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Move around to see the curtain from different angles</li>
            <li>• Try different room settings to match your space</li>
            <li>• Capture photos to compare different options</li>
            <li>• Use gathered or straight hanging styles</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}