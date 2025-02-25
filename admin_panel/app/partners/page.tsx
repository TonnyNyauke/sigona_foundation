'use client'

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  Building2, 
  ClipboardList, 
  Download, 
  History,
  Trash,
  Send
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getPartnershiInterest } from './partners';
import { Partners } from './types';

interface ActivityLog {
  id: string;
  partnerId: string;
  action: string;
  date: string;
  user: string;
}

const PartnerManagement = () => {
  const [partners, setPartners] = useState<Partners[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    type: "all",
    status: "all",
    interest: "all"
  });
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [selectedPartners, setSelectedPartners] = useState<string[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleRow = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const retrievePartners = async () => {
      try {
        setLoading(true);
        const data = await getPartnershiInterest();
        setPartners(data);
      } catch (error) {
        console.error('Error fetching partners:', error);
      } finally {
        setLoading(false);
      }
    };

    retrievePartners();
  }, []); // Removed partners dependency to prevent infinite loop

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = 
      partner.organization_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.contact_person?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filters.type === "all" ? true : partner.organization_type === filters.type;
    //const matchesStatus = filters.status === "all" ? true : partner.status === filters.status;
    const matchesInterest = filters.interest === "all" ? true : partner.interest === filters.interest;
    
    return matchesSearch && matchesType && matchesInterest;
  });

  const handleStatusChange = async (id: string, status: string) => {
    try {
      // Update partner status
      setPartners(partners.map(partner => 
        partner.id === id ? { ...partner, status } : partner
      ));

      // Log activity
      const newActivity = {
        id: Date.now().toString(),
        partnerId: id,
        action: `Status updated to ${status}`,
        date: new Date().toISOString(),
        user: 'Admin' // Replace with actual user info
      };
      setActivityLogs(prev => [...prev, newActivity]);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleBulkAction = async (action: 'accept' | 'reject' | 'delete') => {
    if (!selectedPartners.length) return;
    
    try {
      switch (action) {
        case 'accept':
          setPartners(partners.map(partner => 
            selectedPartners.includes(partner.id) 
              ? { ...partner, status: 'accepted' } 
              : partner
          ));
          break;
        case 'reject':
          setPartners(partners.map(partner => 
            selectedPartners.includes(partner.id) 
              ? { ...partner, status: 'rejected' } 
              : partner
          ));
          break;
        case 'delete':
          setPartners(partners.filter(partner => 
            !selectedPartners.includes(partner.id)
          ));
          break;
      }
      setSelectedPartners([]);
    } catch (error) {
      console.error('Error performing bulk action:', error);
    }
  };

  const exportPartnerData = () => {
    const dataToExport = partners.map(({ 
      organization_name, 
      organization_type, 
      contact_person, 
      email, 
      phone, 
      interest, 
    }) => ({
      organization_name,
      organization_type,
      contact_person,
      email,
      phone,
      interest,
      status
    }));

    const csvContent = "data:text/csv;charset=utf-8," + 
      Object.keys(dataToExport[0]).join(",") + "\n" +
      dataToExport.map(row => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "partner_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Partner Management</h1>
              <p className="text-green-100">Managing {partners.length} partnership proposals</p>
            </div>
            <Button 
              onClick={exportPartnerData}
              className="bg-green-600 hover:bg-green-500"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Card className="p-6 mb-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end">
            <div className="flex-1">
              <Input
                placeholder="Search by organization, contact person, or email..."
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

          {selectedPartners.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {selectedPartners.length} partners selected
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('accept')}
                  className="text-green-700 border-green-700 hover:bg-green-50"
                >
                  Accept Selected
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('reject')}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Reject Selected
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('delete')}
                  className="text-gray-600 border-gray-600 hover:bg-gray-50"
                >
                  Delete Selected
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="space-y-4">
          {loading ? (
            <Card className="p-8 text-center text-gray-600">Loading partners...</Card>
          ) : filteredPartners.length === 0 ? (
            <Card className="p-8 text-center text-gray-600">No partners found matching your criteria</Card>
          ) : (
            filteredPartners.map((partner) => (
              <Card key={partner.id} className="overflow-hidden">
                <div className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={selectedPartners.includes(partner.id)}
                      onCheckedChange={(checked) => {
                        setSelectedPartners(prev => 
                          checked 
                            ? [...prev, partner.id]
                            : prev.filter(id => id !== partner.id)
                        );
                      }}
                    />
                    <div 
                      className="flex items-center gap-4 cursor-pointer"
                      onClick={() => toggleRow(partner.id)}
                    >
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-green-700" />
                      </div>
                      <div>
                        <h3 className="font-medium">{partner.organization_name}</h3>
                        <p className="text-sm text-gray-600">{partner.organization_type}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge 
                      className={
                        'bg-yellow-100 text-yellow-800'
                      }
                    >
                      {partner.organization_name?.charAt(0).toUpperCase() + partner.organization_name?.slice(1)}
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
                    <div className="grid md:grid-cols-3 gap-6">
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
                          <p className="text-gray-600">{partner.interest}</p>
                          {partner.message && (
                            <div className="mt-4">
                              <h5 className="font-medium mb-2">Additional Message:</h5>
                              <p className="text-gray-600">{partner.message}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold">Activity History</h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {activityLogs
                            .filter(log => log.partnerId === partner.id)
                            .map(log => (
                              <div key={log.id} className="text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <History className="w-4 h-4" />
                                  <span>{log.action}</span>
                                </div>
                                <div className="ml-6 text-gray-400">
                                  {new Date(log.date).toLocaleDateString()} by {log.user}
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <div className="flex-1">
                      <Select 
                          value={partner.organization_name} 
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
                      <Button 
                        variant="outline" 
                        className="text-green-700 border-green-700 hover:bg-green-50"
                        onClick={() => {
                          // Log email activity
                          const newActivity = {
                            id: Date.now().toString(),
                            partnerId: partner.id,
                            action: 'Contacted via email',
                            date: new Date().toISOString(),
                            user: 'Admin'
                          };
                          setActivityLogs(prev => [...prev, newActivity]);
                        }}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Contact Partner
                      </Button>
                      <Button 
                        variant="outline" 
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() => {
                          setPartners(prev => prev.filter(p => p.id !== partner.id));
                          setExpandedRows(prev => prev.filter(id => id !== partner.id));
                          setSelectedPartners(prev => prev.filter(id => id !== partner.id));
                        }}
                      >
                        <Trash className="w-4 h-4 mr-2" />
                        Remove Proposal
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

export default PartnerManagement;