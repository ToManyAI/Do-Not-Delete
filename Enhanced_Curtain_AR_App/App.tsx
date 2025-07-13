import React, { useState } from 'react';
import { FabricGallery } from './components/FabricGallery';
import { ARViewer } from './components/ARViewer';
import { MeasurementForm } from './components/MeasurementForm';
import { OrderConfirmation } from './components/OrderConfirmation';
import { Button } from './components/ui/button';
import { ArrowLeft } from 'lucide-react';

export type Fabric = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  material: string;
};

export type Measurements = {
  width: number;
  height: number;
  roomType: string;
  installationType: string;
};

type Step = 'selection' | 'ar' | 'measurements' | 'confirmation';

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>('selection');
  const [selectedFabric, setSelectedFabric] = useState<Fabric | null>(null);
  const [measurements, setMeasurements] = useState<Measurements | null>(null);

  const handleFabricSelect = (fabric: Fabric) => {
    setSelectedFabric(fabric);
    setCurrentStep('ar');
  };

  const handleARContinue = () => {
    setCurrentStep('measurements');
  };

  const handleMeasurementsSubmit = (measurements: Measurements) => {
    setMeasurements(measurements);
    setCurrentStep('confirmation');
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'ar':
        setCurrentStep('selection');
        break;
      case 'measurements':
        setCurrentStep('ar');
        break;
      case 'confirmation':
        setCurrentStep('measurements');
        break;
    }
  };

  const handleStartOver = () => {
    setCurrentStep('selection');
    setSelectedFabric(null);
    setMeasurements(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {currentStep !== 'selection' && (
                <Button variant="ghost" size="sm" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              <h1 className="text-xl font-semibold">Curtain Studio</h1>
            </div>
            
            {/* Progress Steps */}
            <div className="hidden sm:flex items-center space-x-2">
              <div className={`px-3 py-1 rounded-full text-sm ${
                currentStep === 'selection' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                1. Select
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                currentStep === 'ar' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                2. Try AR
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                currentStep === 'measurements' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                3. Measure
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                currentStep === 'confirmation' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                4. Confirm
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'selection' && (
          <FabricGallery onFabricSelect={handleFabricSelect} />
        )}
        
        {currentStep === 'ar' && selectedFabric && (
          <ARViewer 
            fabric={selectedFabric} 
            onContinue={handleARContinue}
          />
        )}
        
        {currentStep === 'measurements' && (
          <MeasurementForm onSubmit={handleMeasurementsSubmit} />
        )}
        
        {currentStep === 'confirmation' && selectedFabric && measurements && (
          <OrderConfirmation 
            fabric={selectedFabric}
            measurements={measurements}
            onStartOver={handleStartOver}
          />
        )}
      </main>
    </div>
  );
}