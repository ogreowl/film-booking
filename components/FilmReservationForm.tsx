'use client';

import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormData {
  filmTitle: string;
  licensorName: string;
  company: string;
  email: string;
  startDate: string;
  endDate: string;
  territory: string;
  notes: string;
}

const FilmReservationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    filmTitle: '',
    licensorName: '',
    company: '',
    email: '',
    startDate: '',
    endDate: '',
    territory: '',
    notes: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateDates = () => {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    return start < end;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateDates()) {
      setError('End date must be after start date');
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <Alert>
            <Calendar className="h-4 w-4" />
            <AlertDescription>
              Your reservation request for &quot;{formData.filmTitle}&quot; has been submitted. 
              We will review your request and get back to you within 24 hours.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Film License Reservation</CardTitle>
        <CardDescription>
          Reserve screening rights for your territory
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="filmTitle">Film Title</Label>
              <Input
                id="filmTitle"
                name="filmTitle"
                required
                value={formData.filmTitle}
                onChange={handleInputChange}
                placeholder="Enter film title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="territory">Territory</Label>
              <Input
                id="territory"
                name="territory"
                required
                value={formData.territory}
                onChange={handleInputChange}
                placeholder="e.g. North America"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                required
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                required
                value={formData.endDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="licensorName">Your Name</Label>
              <Input
                id="licensorName"
                name="licensorName"
                required
                value={formData.licensorName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                required
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Your company name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Input
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Any special requirements or notes"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit}
          className="w-full"
        >
          Submit Reservation Request
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FilmReservationForm;