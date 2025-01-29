'use client'

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown, ChevronUp, Mail, Phone, MapPin, Calendar, Clock } from 'lucide-react';

const VolunteerManagement = () => {
  const [volunteers, setVolunteers] = useState(mockVolunteers);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    county: "",
    volunteerType: "",
    availability: ""
  });
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleRow = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const removeVolunteer = (id: string) => {
    const confirmed = window.confirm('Are you sure you want to remove this volunteer?');
    if (confirmed) {
      setVolunteers(prev => prev.filter(volunteer => volunteer.id !== id));
    }
  };

  const updateVolunteerStatus = (id: string, newStatus: 'Active' | 'On Leave' | 'Inactive') => {
    setVolunteers(prev => prev.map(volunteer => 
      volunteer.id === id ? { ...volunteer, status: newStatus } : volunteer
    ));
  };

  const sendMessage = (volunteerId: string) => {
    // In a real app, this would open a modal or navigate to a messaging interface
    console.log(`Sending message to volunteer ${volunteerId}`);
    alert('Message functionality would be implemented here');
  };

  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCounty = filters.county ? volunteer.county === filters.county : true;
    const matchesType = filters.volunteerType ? volunteer.volunteerType === filters.volunteerType : true;
    const matchesAvailability = filters.availability ? volunteer.availability === filters.availability : true;
    
    return matchesSearch && matchesCounty && matchesType && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-2xl font-bold">Volunteer Management</h1>
          <p className="text-green-100">Managing {volunteers.length} volunteers</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
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
                    <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
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
                  <SelectItem value="flexible">Flexible Schedule</SelectItem>
                  <SelectItem value="regular">Regular Schedule</SelectItem>
                  <SelectItem value="occasional">Occasional/Event-based</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {filteredVolunteers.map((volunteer) => (
            <Card key={volunteer.id} className="overflow-hidden">
              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => toggleRow(volunteer.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-700 font-semibold">
                      {volunteer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{volunteer.name}</h3>
                    <p className="text-sm text-gray-600">{volunteer.volunteerType}</p>
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
                          <span>{volunteer.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{volunteer.county}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Availability & Skills</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{volunteer.availability}</span>
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
          ))}
        </div>
      </main>
    </div>
  );
};

const mockVolunteers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+254 700 123 456",
    county: "Narok",
    volunteerType: "community",
    skills: "Community Outreach, Event Planning, Public Speaking. Experience working with youth groups and organizing community clean-up drives.",
    availability: "flexible",
    preferredTime: "Morning (8 AM - 12 PM)",
    status: "Active",
    date: "2025-01-15"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+254 701 987 654",
    county: "Kisumu",
    volunteerType: "education",
    skills: "Teaching, Curriculum Development, Mentorship. 5 years experience as a primary school teacher.",
    availability: "regular",
    preferredTime: "Afternoon (12 PM - 4 PM)",
    status: "Active",
    date: "2025-01-20"
  },
  {
    id: "3",
    name: "Paul Otieno",
    email: "paul.otieno@example.com",
    phone: "+254 702 555 333",
    county: "Kilifi",
    volunteerType: "events",
    skills: "Event Management, Photography, Social Media Management. Organized multiple charity events.",
    availability: "occasional",
    preferredTime: "Evening (4 PM - 8 PM)",
    status: "On Leave",
    date: "2025-01-25"
  }
];

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