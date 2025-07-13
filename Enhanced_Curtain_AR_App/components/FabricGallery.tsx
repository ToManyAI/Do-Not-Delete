import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Search, Filter } from 'lucide-react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { Fabric } from '../App';

type FabricGalleryProps = {
  onFabricSelect: (fabric: Fabric) => void;
};

const curtainFabrics: Fabric[] = [
  {
    id: '1',
    name: 'Silk Elegance',
    description: 'Luxurious silk curtains with a subtle sheen',
    price: 89,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    category: 'Premium',
    material: 'Silk'
  },
  {
    id: '2',
    name: 'Linen Natural',
    description: 'Natural linen with organic texture',
    price: 65,
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400&h=400&fit=crop',
    category: 'Natural',
    material: 'Linen'
  },
  {
    id: '3',
    name: 'Velvet Royal',
    description: 'Rich velvet curtains for a royal touch',
    price: 95,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop',
    category: 'Luxury',
    material: 'Velvet'
  },
  {
    id: '4',
    name: 'Cotton Casual',
    description: 'Comfortable cotton curtains for everyday use',
    price: 45,
    image: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=400&h=400&fit=crop',
    category: 'Casual',
    material: 'Cotton'
  },
  {
    id: '5',
    name: 'Blackout Pro',
    description: 'Complete light blocking for perfect sleep',
    price: 75,
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=400&h=400&fit=crop',
    category: 'Functional',
    material: 'Polyester'
  },
  {
    id: '6',
    name: 'Sheer Whisper',
    description: 'Delicate sheer fabric for gentle light filtering',
    price: 55,
    image: 'https://images.unsplash.com/photo-1504194569949-b4979bb8acc1?w=400&h=400&fit=crop',
    category: 'Light',
    material: 'Chiffon'
  },
  {
    id: '7',
    name: 'Geometric Modern',
    description: 'Contemporary geometric patterns',
    price: 70,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=400&fit=crop',
    category: 'Modern',
    material: 'Cotton Blend'
  },
  {
    id: '8',
    name: 'Floral Garden',
    description: 'Beautiful floral prints for a fresh look',
    price: 60,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    category: 'Patterned',
    material: 'Cotton'
  }
];

const categories = ['All', 'Premium', 'Natural', 'Luxury', 'Casual', 'Functional', 'Light', 'Modern', 'Patterned'];

export function FabricGallery({ onFabricSelect }: FabricGalleryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const filteredFabrics = curtainFabrics
    .filter(fabric => {
      const matchesSearch = fabric.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          fabric.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          fabric.material.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || fabric.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-semibold">Choose Your Perfect Curtain</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover our curated collection of premium curtain fabrics. Each design is carefully selected 
          for quality, style, and durability. Try them in AR before you buy!
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex-1 relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search fabrics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Fabric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFabrics.map(fabric => (
          <Card key={fabric.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <ImageWithFallback
                  src={fabric.image}
                  alt={fabric.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3" variant="secondary">
                  {fabric.category}
                </Badge>
              </div>
              
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold">{fabric.name}</h3>
                  <p className="text-sm text-muted-foreground">{fabric.description}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-semibold">${fabric.price}</span>
                    <span className="text-sm text-muted-foreground">/meter</span>
                  </div>
                  <Badge variant="outline">{fabric.material}</Badge>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={() => onFabricSelect(fabric)}
                >
                  Try in AR
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFabrics.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No fabrics found matching your criteria.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}