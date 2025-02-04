'use client'

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown, ChevronUp, Mail, Phone, Building2, ClipboardList } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Define a type for the possible status values
type PartnerStatus = 'pending' | 'accepted' | 'rejected';

const PartnerManagement = () => {
  const [partners, setPartners] = useState(mockPartners);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    interest: ""
  });
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleRow = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.organization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filters.type ? partner.organizationType === filters.type : true;
    const matchesStatus = filters.status ? partner.status === filters.status : true;
    const matchesInterest = filters.interest ? partner.interest === filters.interest : true;
    
    return matchesSearch && matchesType && matchesStatus && matchesInterest;
  });

  const handleStatusChange = (id: string, status: string) => {
    setPartners(partners.map(partner => 
      partner.id === id ? { ...partner, status } : partner
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-2xl font-bold">Partner Management</h1>
          <p className="text-green-100">Managing {partners.length} partnership proposals</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-6 mb-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end">
            <div className="flex-1">
              <Input
                placeholder="Search organizations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Select 
                value={filters.type} 
                onValueChange={(value) => setFilters(prev => ({...prev, type: value}))}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Organization Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="ngo">NGO/Non-Profit</SelectItem>
                  <SelectItem value="academic">Academic Institution</SelectItem>
                  <SelectItem value="government">Government Agency</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={filters.interest} 
                onValueChange={(value) => setFilters(prev => ({...prev, interest: value}))}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Area of Interest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  <SelectItem value="funding">Program Funding</SelectItem>
                  <SelectItem value="technical">Technical Collaboration</SelectItem>
                  <SelectItem value="implementation">Program Implementation</SelectItem>
                  <SelectItem value="research">Research Partnership</SelectItem>
                </SelectContent>
              </Select>

              <Select 
                value={filters.status} 
                onValueChange={(value) => setFilters(prev => ({...prev, status: value}))}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {filteredPartners.map((partner) => (
            <Card key={partner.id} className="overflow-hidden">
              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => toggleRow(partner.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{partner.organization}</h3>
                    <p className="text-sm text-gray-600">{partner.organizationType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className='bg-green-700'>
                    {partner.status.charAt(0).toUpperCase() + partner.status.slice(1)}
                  </Badge>
                  {expandedRows.includes(partner.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {expandedRows.includes(partner.id) && (
                <div className="p-4 border-t bg-gray-50">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{partner.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{partner.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <ClipboardList className="w-4 h-4" />
                          <span>Area of Interest: {partner.interest}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Partnership Details</h4>
                      <div className="space-y-2">
                        <p className="text-gray-600">{partner.details}</p>
                        {partner.message && (
                          <div className="mt-4">
                            <h5 className="font-medium mb-2">Additional Message:</h5>
                            <p className="text-gray-600">{partner.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <div className="flex-1">
                      <Select 
                        value={partner.status} 
                        onValueChange={(value) => handleStatusChange(partner.id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Mark as Pending</SelectItem>
                          <SelectItem value="accepted">Accept Proposal</SelectItem>
                          <SelectItem value="rejected">Reject Proposal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="outline" className="text-green-700 border-green-700 hover:bg-green-50">
                      Contact Partner
                    </Button>
                    <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                      Remove Proposal
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

const mockPartners = [
  {
    id: "1",
    organization: "Green Planet Initiative",
    organizationType: "ngo",
    contactPerson: "John Doe",
    email: "john.doe@example.com",
    phone: "+254 700 123 456",
    details: "Looking to partner on tree-planting campaigns in Nairobi.",
    interest: "implementation",
    message: "We have experience running similar programs in Uganda and Tanzania.",
    status: "pending",
  },
  {
    id: "2",
    organization: "EcoFuture Kenya",
    organizationType: "corporate",
    contactPerson: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+254 701 987 654",
    details: "Proposal for collaboration on climate action workshops.",
    interest: "technical",
    message: "Our team has developed innovative climate education materials.",
    status: "accepted",
  },
  {
    id: "3",
    organization: "AgriYouth Foundation",
    organizationType: "ngo",
    contactPerson: "Paul Otieno",
    email: "paul.otieno@example.com",
    phone: "+254 702 555 333",
    details: "Interested in joining efforts for the 4K Club mentorship program.",
    interest: "implementation",
    status: "pending",
  }
];

export default PartnerManagement;