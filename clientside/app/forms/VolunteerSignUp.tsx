import React, { useState } from 'react';
import { Card, CardContent} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const VolunteerSignUp = () => {
  const [loading, setLoading] = useState(false);

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

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <Accordion type="single" collapsible className="w-full">
          {/* Personal Information */}
          <AccordionItem value="personal">
            <AccordionTrigger className="text-lg font-semibold">
              Personal Information
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+254" required />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Location & Availability */}
          <AccordionItem value="location">
            <AccordionTrigger className="text-lg font-semibold">
              Location & Availability
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Preferred Counties</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select counties" />
                    </SelectTrigger>
                    <SelectContent>
                      {counties.map((county) => (
                        <SelectItem key={county} value={county.toLowerCase()}>
                          {county}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Time Commitment</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flexible">Flexible Schedule</SelectItem>
                      <SelectItem value="regular">Regular Schedule</SelectItem>
                      <SelectItem value="occasional">Occasional/Event-based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Time</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (8 AM - 12 PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                      <SelectItem value="evening">Evening (4 PM - 8 PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Interests & Skills */}
          <AccordionItem value="interests">
            <AccordionTrigger className="text-lg font-semibold">
              Interests & Skills
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Volunteer Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select volunteer type" />
                    </SelectTrigger>
                    <SelectContent>
                      {volunteerTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Skills & Experience</Label>
                  <Textarea 
                    id="skills" 
                    placeholder="Share your skills and experience..."
                    className="h-24"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-6">
          <Button className="w-full" size="lg" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
          <p className="text-sm text-center text-muted-foreground mt-2">
            By submitting, you agree to be contacted about opportunities.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VolunteerSignUp;