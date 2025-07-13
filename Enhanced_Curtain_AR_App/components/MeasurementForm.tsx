import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Ruler, Calculator, Info } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import type { Measurements } from '../App';

type MeasurementFormProps = {
  onSubmit: (measurements: Measurements) => void;
};

export function MeasurementForm({ onSubmit }: MeasurementFormProps) {
  const [formData, setFormData] = useState({
    width: '',
    height: '',
    roomType: '',
    installationType: '',
    dropLength: '',
    heading: '',
    additionalNotes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.width || parseFloat(formData.width) <= 0) {
      newErrors.width = 'Please enter a valid width';
    }
    if (!formData.height || parseFloat(formData.height) <= 0) {
      newErrors.height = 'Please enter a valid height';
    }
    if (!formData.roomType) {
      newErrors.roomType = 'Please select a room type';
    }
    if (!formData.installationType) {
      newErrors.installationType = 'Please select installation type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const measurements: Measurements = {
        width: parseFloat(formData.width),
        height: parseFloat(formData.height),
        roomType: formData.roomType,
        installationType: formData.installationType,
      };
      
      onSubmit(measurements);
    }
  };

  const calculateFabricNeeded = () => {
    const width = parseFloat(formData.width) || 0;
    const height = parseFloat(formData.height) || 0;
    const fullness = 2; // Standard fullness factor
    
    const fabricWidth = width * fullness;
    const fabricHeight = height + 0.3; // Add 30cm for hems
    
    return {
      width: fabricWidth,
      height: fabricHeight,
      totalMeters: (fabricWidth * fabricHeight / 100).toFixed(2)
    };
  };

  const fabric = calculateFabricNeeded();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Enter Your Measurements</h2>
        <p className="text-muted-foreground">
          Provide accurate measurements to ensure perfect fit for your curtains
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Measurement Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="h-5 w-5" />
              Window Measurements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Measurements */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width">Width (cm) *</Label>
                    <Input
                      id="width"
                      type="number"
                      step="0.1"
                      min="0"
                      placeholder="e.g. 150"
                      value={formData.width}
                      onChange={(e) => handleInputChange('width', e.target.value)}
                      className={errors.width ? 'border-destructive' : ''}
                    />
                    {errors.width && (
                      <p className="text-sm text-destructive">{errors.width}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm) *</Label>
                    <Input
                      id="height"
                      type="number"
                      step="0.1"
                      min="0"
                      placeholder="e.g. 220"
                      value={formData.height}
                      onChange={(e) => handleInputChange('height', e.target.value)}
                      className={errors.height ? 'border-destructive' : ''}
                    />
                    {errors.height && (
                      <p className="text-sm text-destructive">{errors.height}</p>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Room Type */}
              <div className="space-y-3">
                <Label>Room Type *</Label>
                <Select 
                  value={formData.roomType} 
                  onValueChange={(value) => handleInputChange('roomType', value)}
                >
                  <SelectTrigger className={errors.roomType ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="living-room">Living Room</SelectItem>
                    <SelectItem value="bedroom">Bedroom</SelectItem>
                    <SelectItem value="dining-room">Dining Room</SelectItem>
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="bathroom">Bathroom</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.roomType && (
                  <p className="text-sm text-destructive">{errors.roomType}</p>
                )}
              </div>

              {/* Installation Type */}
              <div className="space-y-3">
                <Label>Installation Type *</Label>
                <RadioGroup 
                  value={formData.installationType}
                  onValueChange={(value) => handleInputChange('installationType', value)}
                  className="grid grid-cols-1 gap-3"
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="ceiling" id="ceiling" />
                    <Label htmlFor="ceiling" className="flex-1 cursor-pointer">
                      <div>
                        <div>Ceiling Mount</div>
                        <div className="text-sm text-muted-foreground">
                          Mounted directly to ceiling
                        </div>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="wall" id="wall" />
                    <Label htmlFor="wall" className="flex-1 cursor-pointer">
                      <div>
                        <div>Wall Mount</div>
                        <div className="text-sm text-muted-foreground">
                          Mounted on wall above window
                        </div>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="inside" id="inside" />
                    <Label htmlFor="inside" className="flex-1 cursor-pointer">
                      <div>
                        <div>Inside Mount</div>
                        <div className="text-sm text-muted-foreground">
                          Mounted inside window frame
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
                {errors.installationType && (
                  <p className="text-sm text-destructive">{errors.installationType}</p>
                )}
              </div>

              <Separator />

              {/* Additional Options */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="heading">Heading Style</Label>
                  <Select 
                    value={formData.heading} 
                    onValueChange={(value) => handleInputChange('heading', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select heading style (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pencil-pleat">Pencil Pleat</SelectItem>
                      <SelectItem value="eyelet">Eyelet</SelectItem>
                      <SelectItem value="tab-top">Tab Top</SelectItem>
                      <SelectItem value="rod-pocket">Rod Pocket</SelectItem>
                      <SelectItem value="pinch-pleat">Pinch Pleat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <textarea
                    id="notes"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Any special requirements or notes..."
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Calculate & Continue
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Calculation & Guide */}
        <div className="space-y-6">
          {/* Fabric Calculator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Fabric Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.width && formData.height ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fabric Width:</span>
                    <span>{fabric.width.toFixed(1)} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fabric Height:</span>
                    <span>{fabric.height.toFixed(1)} cm</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total Fabric Needed:</span>
                    <span>{fabric.totalMeters} sq meters</span>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Enter measurements to see fabric calculation
                </p>
              )}
            </CardContent>
          </Card>

          {/* Measurement Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Measurement Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
                  alt="Measurement guide"
                  className="w-full h-48 object-cover rounded-lg"
                />
                
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Pro Tips:</strong>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li>• Measure the window frame, not the glass</li>
                      <li>• Add 15-20cm to width for overlap</li>
                      <li>• Add 10-15cm to height for floor clearance</li>
                      <li>• Consider furniture placement</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}