import React, { useState } from 'react';
import { 
  Phone, Building2, Heart, ArrowRight, 
  CheckCircle2, Shield, Receipt
} from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

// Types and Interfaces
type DonationType = 'oneTime' | 'monthly';
type PaymentMethod = 'mpesa' | 'bank' | null;
type Step = 1 | 2 | 3 | 4;

interface SuggestedAmount {
  value: number;
  impact: string;
}

interface TrustIndicator {
  icon: React.ReactNode;
  text: string;
}

interface StepInfo {
  number: Step;
  title: string;
}

interface HonoreeDetails {
  name: string;
  email: string;
}

interface DonationFlowProps {
  onDonationComplete?: (data: DonationData) => void;
  initialAmount?: number;
}

interface DonationData {
  amount: number;
  donationType: DonationType;
  paymentMethod: PaymentMethod;
  isRecurring: boolean;
  isCorporate: boolean;
  honoreeDetails?: HonoreeDetails;
  phoneNumber?: string;
}

const DonationFlow: React.FC<DonationFlowProps> = ({ 
  onDonationComplete,
  initialAmount 
}) => {
  // State management with TypeScript
  const [step, setStep] = useState<Step>(1);
  const [donationType, setDonationType] = useState<DonationType>('oneTime');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(initialAmount || null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isOnBehalfOf, setIsOnBehalfOf] = useState<boolean>(false);
  const [honoreeDetails, setHonoreeDetails] = useState<HonoreeDetails>({ name: '', email: '' });
  const [isCorporate, setIsCorporate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDonate = async (): Promise<void> => {
    try {
      setLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const donationData: DonationData = {
        amount: selectedAmount || Number(customAmount),
        donationType,
        paymentMethod,
        isRecurring: donationType === 'monthly',
        isCorporate,
        ...(isOnBehalfOf && { honoreeDetails }),
        ...(paymentMethod === 'mpesa' && { phoneNumber })
      };

      onDonationComplete?.(donationData);
      setStep(4);
    } catch (error) {
      // Handle error state
      console.error('Donation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const validatePhoneNumber = (phone: string): boolean => {
    // Basic Kenyan phone number validation
    const phoneRegex = /^(?:\+254|0)[17]\d{8}$/;
    return phoneRegex.test(phone);
  };

  const isStepValid = (): boolean => {
    switch (step) {
      case 1:
        return !!(selectedAmount || (customAmount && Number(customAmount) > 0));
      case 2:
        if (isOnBehalfOf) {
          return !!honoreeDetails.name;
        }
        if (paymentMethod === 'mpesa') {
          return validatePhoneNumber(phoneNumber);
        }
        return !!paymentMethod;
      default:
        return true;
    }
  };

  const getStepContent = (): React.ReactNode => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <RadioGroup 
                defaultValue="oneTime" 
                onValueChange={(value: DonationType) => setDonationType(value)}
                className="grid grid-cols-2 gap-4"
              >
                <div className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${
                  donationType === 'oneTime' ? 'border-green-600 bg-green-50' : 'border-gray-200'
                }`}>
                  <RadioGroupItem value="oneTime" className="sr-only" />
                  <Label className="cursor-pointer">
                    <div className="font-semibold mb-1">One-time Donation</div>
                    <div className="text-sm text-gray-600">Make a single contribution</div>
                  </Label>
                </div>
                <div className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${
                  donationType === 'monthly' ? 'border-green-600 bg-green-50' : 'border-gray-200'
                }`}>
                  <RadioGroupItem value="monthly" className="sr-only" />
                  <Label className="cursor-pointer">
                    <div className="font-semibold mb-1">Monthly Giving</div>
                    <div className="text-sm text-gray-600">Make a recurring impact</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {suggestedAmounts.map((amount) => (
                <button
                  key={amount.value}
                  onClick={() => setSelectedAmount(amount.value)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedAmount === amount.value
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-green-600'
                  }`}
                >
                  <div className="text-xl font-bold text-gray-800">
                    KSH {amount.value.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">{amount.impact}</div>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <Label>Custom Amount (KSH)</Label>
              <Input
                type="number"
                value={customAmount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                placeholder="Enter custom amount"
                className="text-lg"
                min="0"
              />
            </div>

            <div className="flex items-center space-x-2 pt-4">
              <Switch
                id="corporate"
                checked={isCorporate}
                onCheckedChange={setIsCorporate}
              />
              <Label htmlFor="corporate">This is a corporate donation</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="behalf"
                checked={isOnBehalfOf}
                onCheckedChange={setIsOnBehalfOf}
              />
              <Label htmlFor="behalf">Donate in honor/memory of someone</Label>
            </div>

            {isStepValid() && (
              <Button 
                className="w-full"
                size="lg"
                onClick={() => setStep(2)}
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        );

      case 2:
        return isOnBehalfOf ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Honoree&apos;s Name</Label>
                <Input
                  value={honoreeDetails.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setHonoreeDetails({...honoreeDetails, name: e.target.value})}
                  placeholder="Enter their name"
                />
              </div>
              <div className="space-y-2">
                <Label>Honoree&apos;s Email (Optional)</Label>
                <Input
                  type="email"
                  value={honoreeDetails.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setHonoreeDetails({...honoreeDetails, email: e.target.value})}
                  placeholder="They'll receive a notification"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button 
                className="flex-1" 
                onClick={() => setStep(3)}
                disabled={!isStepValid()}
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentMethod('mpesa')}
                className={`relative rounded-lg border-2 p-6 text-left transition-all ${
                  paymentMethod === 'mpesa' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-600'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-bold">M-PESA</h3>
                    <p className="text-sm text-gray-600">Pay via mobile money</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('bank')}
                className={`relative rounded-lg border-2 p-6 text-left transition-all ${
                  paymentMethod === 'bank' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-600'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <Building2 className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-bold">Bank Transfer</h3>
                    <p className="text-sm text-gray-600">Direct bank payment</p>
                  </div>
                </div>
              </button>
            </div>

            {paymentMethod === 'mpesa' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>M-PESA Phone Number</Label>
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                      setPhoneNumber(e.target.value)}
                    placeholder="Enter your M-PESA number"
                    className="text-lg"
                  />
                  {phoneNumber && !validatePhoneNumber(phoneNumber) && (
                    <p className="text-sm text-red-500">
                      Please enter a valid Kenyan phone number
                    </p>
                  )}
                </div>
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className="space-y-4">
                <Alert>
                  <AlertDescription>
                    You&apos;ll be redirected to your bank&apos;s secure payment page
                  </AlertDescription>
                </Alert>
              </div>
            )}

            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              {paymentMethod && (
                <Button 
                  className="flex-1" 
                  onClick={handleDonate}
                  disabled={loading || !isStepValid()}
                >
                  {loading ? 'Processing...' : 'Complete Donation'} 
                  {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle2 className="w-16 h-16 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Thank You for Your Donation!</h3>
              <p className="text-gray-600">
                Your contribution of KSH {selectedAmount || customAmount} will make a real difference.
              </p>
            </div>
            <div className="space-y-4">
              <Button className="w-full" onClick={() => window.location.reload()}>
                Make Another Donation
              </Button>
              <Button variant="outline" className="w-full">
                Share Your Impact
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {step < 4 && (
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((s) => (
              <div
                key={s.number}
                className={`flex items-center ${
                  step >= s.number ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                  ${step >= s.number ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}
                >
                  {step > s.number ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    s.number
                  )}
                </div>
                <div className="hidden md:block ml-2">{s.title}</div>
              </div>
            ))}
          </div>
          <div className="relative mb-8">
            <div className="absolute top-0 left-0 h-1 bg-green-600" 
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }} 
            />
            <div className="h-1 bg-gray-200" />
          {/* Previous code remains the same until the progress bar section */}
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 4 ? 'Donation Complete' : 'Make a Donation'}
          </CardTitle>
          {step === 1 && (
            <CardDescription>
              Your support helps us create lasting change
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {getStepContent()}
        </CardContent>
      </Card>

      {step === 1 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="flex items-center space-x-3 text-sm text-gray-600">
              {indicator.icon}
              <span>{indicator.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Constants with proper typing
const steps: StepInfo[] = [
  { number: 1, title: 'Amount' },
  { number: 2, title: 'Details' },
  { number: 3, title: 'Payment' }
];

const suggestedAmounts: SuggestedAmount[] = [
  { value: 1000, impact: "Feeds a family for a week" },
  { value: 2500, impact: "Provides school supplies" },
  { value: 5000, impact: "Supports medical care" },
  { value: 10000, impact: "Funds community project" }
];

const trustIndicators: TrustIndicator[] = [
  {
    icon: <Shield className="w-4 h-4 text-green-600" />,
    text: "Secure Payment"
  },
  {
    icon: <Receipt className="w-4 h-4 text-green-600" />,
    text: "Tax Deductible"
  },
  {
    icon: <Heart className="w-4 h-4 text-green-600" />,
    text: "90% to Programs"
  }
];

// Optional: Add error types for better error handling
type DonationError = {
  code: string;
  message: string;
  field?: string;
};

// Export the component with its props type
export default DonationFlow;