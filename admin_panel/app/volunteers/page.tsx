'use client'

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown, ChevronUp, Mail, Phone, MapPin, Calendar, Clock, AlertCircle } from 'lucide-react';
import { Volunteers } from './types';
import { getVolunteers } from './volunteer';
import { Alert, AlertDescription } from '@/components/ui/alert';

const VolunteerManagement = () => {
  // State management
  const [volunteers, setVolunteers] = useState<Volunteers[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    county: "",
    volunteerType: "",
    availability: ""
  });
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  // Fetch volunteers data
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        setIsLoading(true);
        const data = await getVolunteers();
        setVolunteers(data);
        setError(null);
      } catch (err) {
        setError('Failed to load volunteers. Please try again later.');
        console.error('Error fetching volunteers:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVolunteers();
  }, []); // Remove volunteers dependency to prevent infinite loop

  // Row expansion handler
  const toggleRow = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  // Volunteer management handlers
  const removeVolunteer = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to remove this volunteer?');
    if (confirmed) {
      try {
        // Here you would typically make an API call to delete the volunteer
        // await deleteVolunteer(id);
        setVolunteers(prev => prev.filter(volunteer => volunteer.id !== id));
      } catch (err) {
        console.error('Error removing volunteer:', err);
        alert('Failed to remove volunteer. Please try again.');
      }
    }
  };

  const updateVolunteerStatus = async (id: string, newStatus: 'Active' | 'On Leave' | 'Inactive') => {
    try {
      // Here you would typically make an API call to update the status
      // await updateVolunteer(id, { status: newStatus });
      setVolunteers(prev => prev.map(volunteer => 
        volunteer.id === id ? { ...volunteer, status: newStatus } : volunteer
      ));
    } catch (err) {
      console.error('Error updating volunteer status:', err);
      alert('Failed to update volunteer status. Please try again.');
    }
  };

  const sendMessage = (volunteerId: string) => {
    // Implementation for messaging functionality
    console.log(`Sending message to volunteer ${volunteerId}`);
    alert('Message functionality would be implemented here');
  };

  // Filter volunteers based on search and filters
  // const filteredVolunteers = volunteers.filter(volunteer => {
  //   const matchesSearch = volunteer?.name
  //     ? volunteer.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     : false;
      
  //   const matchesCounty = !filters.county || 
  //     (volunteer?.county && volunteer.county === filters.county);
      
  //   const matchesType = !filters.volunteerType || 
  //     (volunteer?.volunteerType && volunteer.volunteerType === filters.volunteerType);
      
  //   const matchesAvailability = !filters.availability || 
  //     (volunteer?.availability && volunteer.availability === filters.availability);
    
  //   return matchesSearch && matchesCounty && matchesType && matchesAvailability;
  // });
  console.log("Volunteers are: ",volunteers)
  // console.log("Filtered volunteers are: ", filteredVolunteers)

  // Extract unique values for filter options
  const counties = [...new Set(volunteers.map(v => v.preferred_county))];
  const volunteerTypes = [...new Set(volunteers.map(v => v.volunteer_type))];
  const availabilityOptions = [...new Set(volunteers.map(v => v.time_commitment))];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading volunteers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-2xl font-bold">Volunteer Management</h1>
          <p className="text-green-100">Managing {volunteers.length} volunteers</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end">
            <div className="flex-1">
              <Input
                placeholder="Search volunteers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Select 
                value={filters.county} 
                onValueChange={(value) => setFilters(prev => ({...prev, county: value}))}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by County" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Counties</SelectItem>
                  {counties.map(county => (
                    <SelectItem key={county} value={county}>{county}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={filters.volunteerType} 
                onValueChange={(value) => setFilters(prev => ({...prev, volunteerType: value}))}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {volunteerTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={filters.availability} 
                onValueChange={(value) => setFilters(prev => ({...prev, availability: value}))}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Availability</SelectItem>
                  {availabilityOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Volunteer List */}
        <div className="space-y-4">
          {volunteers.length === 0 ? (
            <Card className="p-8 text-center text-gray-500">
              No volunteers match your search criteria
            </Card>
          ) : (
            volunteers.map((volunteer) => (
              <Card key={volunteer.id} className="overflow-hidden">
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleRow(volunteer.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    </div>
                    <div>
                      <span className="text-green-700 font-semibold">
                        {volunteer.first_name}
                      </span>
                      <h3 className="font-semibold text-lg">{volunteer.last_name}</h3>
                      <p className="text-sm text-gray-600">{volunteer.email}</p>
                      <p className="text-sm text-gray-600">{volunteer.phone_number}</p>
                      <p className="text-sm text-gray-600">{volunteer.preferred_county}</p>
                      <p className="text-sm text-gray-600">{volunteer.time_commitment}</p>
                      <p className="text-sm text-gray-600">{volunteer.volunteer_type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Select
                      value={volunteer.status}
                      onValueChange={(value: 'Active' | 'On Leave' | 'Inactive') => 
                        updateVolunteerStatus(volunteer.id, value)
                      }
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="On Leave">On Leave</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    {expandedRows.includes(volunteer.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {expandedRows.includes(volunteer.id) && (
                  <div className="p-4 border-t bg-gray-50">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Contact Information</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span>{volunteer.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{volunteer.phone_number}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{volunteer.preferred_county}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">Availability & Skills</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{volunteer.time_commitment}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{volunteer.preferredTime}</span>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Skills & Experience:</h5>
                          <p className="text-gray-600">{volunteer.skills}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <Button 
                        variant="outline" 
                        className="text-green-700 border-green-700 hover:bg-green-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          sendMessage(volunteer.id);
                        }}
                      >
                        Send Message
                      </Button>
                      <Button 
                        variant="outline" 
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeVolunteer(volunteer.id);
                        }}
                      >
                        Remove Volunteer
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

const counties = [
  "Homa Bay", "Migori", "Kitui", "Kakamega", "Narok", 
  "Kilifi", "Kisumu", "Siaya", "Bomet", "Kisii", 
  "Nyamira", "Busia", "Vihiga", "Uasin Gishu"
];

const volunteerTypes = [
  { id: "community", label: "Community Projects" },
  { id: "events", label: "Event Support" },
  { id: "sponsorship", label: "Sponsorship" },
  { id: "education", label: "Educational Programs" },
  { id: "other", label: "Other" }
];

export default VolunteerManagement;