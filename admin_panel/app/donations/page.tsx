'use client'

import React, { useState, useCallback } from 'react';
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Download,
  MoreVertical,
  CheckCircle,
  Mail,
  Building2,
  Heart,
  RefreshCw,
  Filter
} from 'lucide-react';

const mockDonations = [
  {
    id: "1",
    name: "John Doe",
    amount: 5000,
    method: "MPESA",
    date: "2025-01-01",
    status: "pending",
    isProcessed: false,
    isCorporate: false,
    isRecurring: false,
    honoree: null,
    email: "john@example.com",
    phone: "+254712345678"
  },
  {
    id: "2",
    name: "Acme Corporation",
    amount: 20000,
    method: "Bank Transfer",
    date: "2025-01-10",
    status: "processed",
    isProcessed: true,
    isCorporate: true,
    isRecurring: true,
    honoree: null,
    email: "finance@acme.com",
    phone: null
  },
  {
    id: "3",
    name: "Paul Otieno",
    amount: 1500,
    method: "MPESA",
    date: "2025-01-15",
    status: "pending",
    isProcessed: false,
    isCorporate: false,
    isRecurring: false,
    honoree: "In memory of Mary Otieno",
    email: "paul@example.com",
    phone: "+254723456789"
  }
];

export default function DonationsManagement() {
  const [donations, setDonations] = useState(mockDonations);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const handleProcess = useCallback((id: string) => {
    setDonations(prev => prev.map(donation => 
      donation.id === id ? { ...donation, isProcessed: true, status: "processed" } : donation
    ));
  }, []);

  const handleDelete = useCallback((id: string) => {
    const confirmed = confirm("Are you sure you want to delete this donation?");
    if (confirmed) {
      setDonations(prev => prev.filter(donation => donation.id !== id));
    }
  }, []);

  const handleSendThankYou = useCallback((email: string) => {
    // Mock email sending
    alert(`Thank you email sent to ${email}`);
  }, []);

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === "all") return matchesSearch;
    if (filterType === "corporate") return matchesSearch && donation.isCorporate;
    if (filterType === "recurring") return matchesSearch && donation.isRecurring;
    if (filterType === "honoree") return matchesSearch && donation.honoree;
    if (filterType === "pending") return matchesSearch && !donation.isProcessed;
    
    return matchesSearch;
  });

  const exportData = () => {
    const csv = [
      ["Date", "Name", "Amount", "Method", "Status", "Type", "Email", "Phone"],
      ...filteredDonations.map(d => [
        format(new Date(d.date), "yyyy-MM-dd"),
        d.name,
        d.amount,
        d.method,
        d.status,
        d.isCorporate ? "Corporate" : "Individual",
        d.email,
        d.phone || ""
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", `donations-${format(new Date(), "yyyy-MM-dd")}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-green-700 text-white py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">Donations Management</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-gray-600">Total Donations</div>
              <div className="text-2xl font-bold">
                KSH {donations.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-gray-600">Pending Processing</div>
              <div className="text-2xl font-bold">
                {donations.filter(d => !d.isProcessed).length}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-gray-600">Corporate Donations</div>
              <div className="text-2xl font-bold">
                {donations.filter(d => d.isCorporate).length}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-gray-600">Recurring Donations</div>
              <div className="text-2xl font-bold">
                {donations.filter(d => d.isRecurring).length}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1 flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setFilterType("all")}>
                      All Donations
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("corporate")}>
                      Corporate Only
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("recurring")}>
                      Recurring Only
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("honoree")}>
                      With Honoree
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterType("pending")}>
                      Pending Processing
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Button onClick={exportData} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Donor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell>{format(new Date(donation.date), "dd MMM yyyy")}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{donation.name}</div>
                        <div className="text-sm text-gray-500">{donation.email}</div>
                        {donation.honoree && (
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {donation.honoree}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">KSH {donation.amount.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">{donation.method}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={donation.isProcessed ? "success" : "warning"}>
                        {donation.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {donation.isCorporate && (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            Corporate
                          </Badge>
                        )}
                        {donation.isRecurring && (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <RefreshCw className="h-3 w-3" />
                            Monthly
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {!donation.isProcessed && (
                            <DropdownMenuItem onClick={() => handleProcess(donation.id)}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark as Processed
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleSendThankYou(donation.email)}>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Thank You
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(donation.id)}
                            className="text-red-600"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
}