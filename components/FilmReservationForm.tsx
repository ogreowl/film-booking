'use client';

import React, { useState } from 'react';
import { Calendar, Plus, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FilmEntry {
  filmTitle: string;
  format: string;
  startDate: string;
  endDate: string;
}

interface FormData {
  films: FilmEntry[];
  licensorName: string;
  venueName: string;
  city: string;
  state: string;
  email: string;
  territory: string;
  notes: string;
}

const FilmReservationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    films: [{
      filmTitle: '',
      format: '',
      startDate: '',
      endDate: '',
    }],
    licensorName: '',
    venueName: '',
    city: '',
    state: '',
    email: '',
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

  const handleFilmInputChange = (index: number, field: keyof FilmEntry, value: string) => {
    setFormData(prev => ({
      ...prev,
      films: prev.films.map((film, i) => 
        i === index ? { ...film, [field]: value } : film
      )
    }));
    setError('');
  };

  const addFilm = () => {
    setFormData(prev => ({
      ...prev,
      films: [...prev.films, { filmTitle: '', format: '', startDate: '', endDate: '' }]
    }));
  };

  const removeFilm = (index: number) => {
    if (formData.films.length > 1) {
      setFormData(prev => ({
        ...prev,
        films: prev.films.filter((_, i) => i !== index)
      }));
    }
  };

  const validateDates = (film: FilmEntry) => {
    const start = new Date(film.startDate);
    const end = new Date(film.endDate);
    return start < end;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all film dates
    const invalidDates = formData.films.some(film => !validateDates(film));
    if (invalidDates) {
      setError('End dates must be after start dates');
      return;
    }

    try {
      await fetch('https://script.google.com/macros/s/AKfycbz_wLOzGWw3es4YOATk0tOoB7aKioC-0ZcHz6AswiIjeb-ZJqV1XTPy6nrwet2fXouC/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(formData)
      });

      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error('Submission error:', err);
    }
  };

  if (submitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <Alert>
            <Calendar className="h-4 w-4" />
            <AlertDescription>
              Your booking request has been submitted. 
              We will review your request and get back to you within 48 hours.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Janus Booking Request</CardTitle>
        <CardDescription>
          Send booking request to Janus Films. If you don&apos;t hear back in 48 hours, feel free to send an email to booking@janusfilms.com
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {formData.films.map((film, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg relative">
              {formData.films.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => removeFilm(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`filmTitle-${index}`}>Film Title</Label>
                  <Input
                    id={`filmTitle-${index}`}
                    required
                    value={film.filmTitle}
                    onChange={(e) => handleFilmInputChange(index, 'filmTitle', e.target.value)}
                    placeholder="Enter film title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`format-${index}`}>Format</Label>
                  <Input
                    id={`format-${index}`}
                    required
                    value={film.format}
                    onChange={(e) => handleFilmInputChange(index, 'format', e.target.value)}
                    placeholder="e.g. DCP, 35mm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                    type="date"
                    required
                    value={film.startDate}
                    onChange={(e) => handleFilmInputChange(index, 'startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${index}`}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    type="date"
                    required
                    value={film.endDate}
                    onChange={(e) => handleFilmInputChange(index, 'endDate', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={addFilm}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Another Film
          </Button>

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
              <Label htmlFor="venueName">Venue Name</Label>
              <Input
                id="venueName"
                name="venueName"
                required
                value={formData.venueName}
                onChange={handleInputChange}
                placeholder="Enter venue name"
              />
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                required
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter city"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                required
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Enter state"
              />
            </div>
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
          Submit Booking Request
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FilmReservationForm;