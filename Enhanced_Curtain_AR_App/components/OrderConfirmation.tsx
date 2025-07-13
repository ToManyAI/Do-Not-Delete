import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Check, ShoppingCart, Truck, Calendar, Star, Edit3 } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import type { Fabric, Measurements } from '../App';

type OrderConfirmationProps = {
  fabric: Fabric;
  measurements: Measurements;
  onStartOver: () => void;
};

export function OrderConfirmation({ fabric, measurements, onStartOver }: OrderConfirmationProps) {
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderNumber] = useState(`CRT-${Date.now().toString().slice(-6)}`);

  // Calculate pricing
  const fabricArea = (measurements.width * 2 * (measurements.height + 30)) / 10000; // Convert to sq meters
  const fabricCost = fabricArea * fabric.price;
  const makingCharges = 45; // Fixed making charges
  const installationFee = 35;
  const deliveryFee = 15;
  const subtotal = fabricCost + makingCharges + installationFee + deliveryFee;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold">Order Confirmed!</h2>
          <p className="text-muted-foreground">
            Thank you for your order. We'll start preparing your custom curtains right away.
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="text-xl font-mono font-semibold">{orderNumber}</p>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <Calendar className="h-6 w-6 mx-auto text-muted-foreground" />
                <div>
                  <p className="font-semibold">Production</p>
                  <p className="text-sm text-muted-foreground">5-7 business days</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Truck className="h-6 w-6 mx-auto text-muted-foreground" />
                <div>
                  <p className="font-semibold">Delivery</p>
                  <p className="text-sm text-muted-foreground">2-3 business days</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Star className="h-6 w-6 mx-auto text-muted-foreground" />
                <div>
                  <p className="font-semibold">Installation</p>
                  <p className="text-sm text-muted-foreground">Professional setup</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            You'll receive an email confirmation shortly with tracking details.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={onStartOver}>
              Order More Curtains
            </Button>
            <Button>
              Track Your Order
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Order Summary</h2>
        <p className="text-muted-foreground">
          Review your selection and complete your order
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Fabric Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Selected Fabric</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <ImageWithFallback
                  src={fabric.image}
                  alt={fabric.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{fabric.name}</h3>
                      <p className="text-sm text-muted-foreground">{fabric.description}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Badge variant="secondary">{fabric.category}</Badge>
                    <Badge variant="outline">{fabric.material}</Badge>
                  </div>
                  
                  <p className="text-sm">
                    <span className="font-semibold">${fabric.price}</span> per square meter
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Measurements */}
          <Card>
            <CardHeader>
              <CardTitle>Measurements & Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Width</p>
                  <p className="font-semibold">{measurements.width} cm</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Height</p>
                  <p className="font-semibold">{measurements.height} cm</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Room Type</p>
                  <p className="font-semibold capitalize">{measurements.roomType.replace('-', ' ')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Installation</p>
                  <p className="font-semibold capitalize">{measurements.installationType.replace('-', ' ')} Mount</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">Fabric Required:</p>
                <p className="text-sm text-muted-foreground">
                  Total area: {fabricArea.toFixed(2)} square meters
                  <br />
                  (Including standard fullness and hem allowances)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Services Included */}
          <Card>
            <CardHeader>
              <CardTitle>What's Included</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Custom fabric cutting</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Professional hemming</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Hardware installation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-sm">1-year warranty</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Free home delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Professional installation</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary & Checkout */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Price Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Fabric ({fabricArea.toFixed(2)} sq m)</span>
                  <span>${fabricCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Making charges</span>
                  <span>${makingCharges.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Installation fee</span>
                  <span>${installationFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Alert>
                <AlertDescription className="text-sm">
                  💡 <strong>Free installation</strong> included with your order!
                </AlertDescription>
              </Alert>
              
              <Button 
                className="w-full" 
                size="lg"
                onClick={handlePlaceOrder}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Place Order - ${total.toFixed(2)}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Secure checkout • 30-day money-back guarantee
              </p>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Expected Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="text-sm">
                    <p className="font-semibold">Order Confirmation</p>
                    <p className="text-muted-foreground">Immediate</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-muted rounded-full"></div>
                  <div className="text-sm">
                    <p className="font-semibold">Production</p>
                    <p className="text-muted-foreground">5-7 business days</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-muted rounded-full"></div>
                  <div className="text-sm">
                    <p className="font-semibold">Delivery & Installation</p>
                    <p className="text-muted-foreground">2-3 business days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}