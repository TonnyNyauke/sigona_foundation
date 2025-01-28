'use client'

import React, { useState } from 'react';
import { 
  HandshakeIcon, 
  ArrowRight,
  CheckCircle2,
  Users
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const PartnerWithUs = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    organizationType: '',
    organizationName: '',
    industry: '',
    contactPerson: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStep(3);
    setLoading(false);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      {[1, 2].map((num) => (
        <div key={num} className="flex items-center">
          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${
            step >= num ? 'bg-green-700 text-white' : 'bg-gray-200'
          }`}>
            {num}
          </div>
          {num < 2 && (
            <div className={`h-1 w-16 mx-2 ${
              step > num ? 'bg-green-700' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {partnerBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                  {benefit.icon}
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Organization Type</Label>
                <Select 
                  onValueChange={(value) => 
                    setFormData(prev => ({...prev, organizationType: value}))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="ngo">NGO/Non-Profit</SelectItem>
                    <SelectItem value="academic">Academic Institution</SelectItem>
                    <SelectItem value="government">Government Agency</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Organization Name</Label>
                <Input 
                  value={formData.organizationName}
                  onChange={(e) => 
                    setFormData(prev => ({...prev, organizationName: e.target.value}))
                  }
                  placeholder="Your organization name"
                />
              </div>

              <div className="space-y-2">
                <Label>Primary Area of Interest</Label>
                <Select 
                  onValueChange={(value) => 
                    setFormData(prev => ({...prev, interest: value}))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select area of interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="funding">Program Funding</SelectItem>
                    <SelectItem value="technical">Technical Collaboration</SelectItem>
                    <SelectItem value="implementation">Program Implementation</SelectItem>
                    <SelectItem value="research">Research Partnership</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              className="w-full mt-6"
              onClick={() => setStep(2)}
              disabled={!formData.organizationType || !formData.organizationName || !formData.interest}
            >
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Contact Person</Label>
              <Input 
                value={formData.contactPerson}
                onChange={(e) => 
                  setFormData(prev => ({...prev, contactPerson: e.target.value}))
                }
                placeholder="Full name"
              />
            </div>

            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input 
                type="email"
                value={formData.email}
                onChange={(e) => 
                  setFormData(prev => ({...prev, email: e.target.value}))
                }
                placeholder="contact@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label>Message (Optional)</Label>
              <Textarea 
                value={formData.message}
                onChange={(e) => 
                  setFormData(prev => ({...prev, message: e.target.value}))
                }
                placeholder="Brief description of how you'd like to partner with us"
                className="h-24"
              />
            </div>

            <div className="flex space-x-4 mt-6">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                className="flex-1"
                onClick={handleSubmit}
                disabled={loading || !formData.email || !formData.contactPerson}
              >
                {loading ? 'Submitting...' : 'Submit Inquiry'}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6 py-8">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
            <div>
              <h3 className="text-2xl font-bold mb-2">Thank You for Your Interest!</h3>
              <p className="text-gray-600">
                We&apos;ll review your partnership inquiry and get back to you within 2 business days.
              </p>
            </div>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Submit Another Inquiry
            </Button>
          </div>
        );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Partner With Us</CardTitle>
        <CardDescription>
          Join our network of partners making a lasting impact across Kenya
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step < 3 && renderStepIndicator()}
        {renderContent()}
      </CardContent>
    </Card>
  );
};

const partnerBenefits = [
  {
    icon: <HandshakeIcon className="h-6 w-6 text-green-700" />,
    title: "Strategic Impact",
    description: "Create lasting change through collaborative projects and initiatives"
  },
  {
    icon: <Users className="h-6 w-6 text-green-700" />,
    title: "Community Access",
    description: "Connect with communities across 14 counties in Kenya"
  },
];

export default PartnerWithUs;