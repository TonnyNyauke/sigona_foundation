'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '../firebase';
import Link from 'next/link';
import { 
  AlertCircle, 
  Edit3, 
  Users, 
  DollarSign, 
  ChevronUp, 
  ChevronDown, 
  Search,
  LayoutDashboard,
  Calendar,
  FileText,
  Settings,
  Menu,
  X,
  Handshake
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface DashboardStats {
  totalDonations: number;
  blogPosts: number;
  volunteerSignups: number;
  partnerProposals: number;
  blogDrafts: number;
  pendingPartnerships: number;
  stats: {
    percentage: number;
    trend: 'up' | 'down';
  };
}

interface RecentActivity {
  id: string;
  type: 'blog' | 'partner' | 'donation' | 'volunteer';
  title: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'draft';
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  userRole?: 'writer' | 'chairperson' | 'it';
}

const Dashboard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  //const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigation: NavItem[] = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      name: 'Blog Posts', 
      href: '/blogs', 
      icon: <FileText className="h-5 w-5" />,
      userRole: 'writer'
    },
    { 
      name: 'Partners', 
      href: '/partners', 
      icon: <Handshake className="h-5 w-5" />,
      userRole: 'chairperson'
    },
    { 
      name: 'Donations', 
      href: '/donations', 
      icon: <DollarSign className="h-5 w-5" /> 
    },
    { 
      name: 'Volunteers', 
      href: '/volunteers', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      name: 'Events', 
      href: '/events', 
      icon: <Calendar className="h-5 w-5" /> 
    },
    { 
      name: 'Settings', 
      href: '/settings', 
      icon: <Settings className="h-5 w-5" />,
      userRole: 'it'
    }
  ];

  const [stats, setStats] = useState<DashboardStats>({
    totalDonations: 0,
    blogPosts: 0,
    volunteerSignups: 0,
    partnerProposals: 0,
    blogDrafts: 2,
    pendingPartnerships: 3,
    stats: {
      percentage: 12,
      trend: 'up'
    }
  });

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'blog',
      title: 'New Blog Draft: Community Outreach',
      timestamp: '2 hours ago',
      status: 'draft'
    },
    {
      id: '2',
      type: 'partner',
      title: 'Partnership Proposal from TechCorp',
      timestamp: '1 day ago',
      status: 'pending'
    }
  ]);

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      router.push('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">STF Admin</h1>
          <Button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="mt-6 px-4">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm rounded-lg ${
                    isActive
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 w-full">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              {/* Search Bar */}
              <div className="flex-1 max-w-lg mx-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search across all content..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50"
                >
                  Logout
                </button>
              </div> */}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Priority Alert */}
              {stats.pendingPartnerships > 0 && (
                <Alert className="mb-6 bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription>
                    {stats.pendingPartnerships} new partnership proposal{stats.pendingPartnerships > 1 ? 's' : ''} pending review
                  </AlertDescription>
                </Alert>
              )}

              {/* Primary Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Blog Posts - Primary Focus */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Edit3 className="h-5 w-5 text-green-700 mr-2" />
                      <h3 className="font-medium text-gray-900">Blog Posts</h3>
                    </div>
                    <Link href="/blogs" className="text-sm text-green-600 hover:text-green-700">Manage</Link>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <p className="text-3xl font-bold text-gray-900">{stats.blogPosts}</p>
                    <div className="flex items-center">
                      {stats.blogDrafts > 0 && (
                        <span className="text-sm text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                          {stats.blogDrafts} draft{stats.blogDrafts > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rest of the metrics cards remain the same... */}
                {/* Partners */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Handshake className="h-5 w-5 text-green-700 mr-2" />
                      <h3 className="font-medium text-gray-900">Partners</h3>
                    </div>
                    <Link href="/partners" className="text-sm text-green-600 hover:text-green-700">Manage</Link>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <p className="text-3xl font-bold text-gray-900">{stats.partnerProposals}</p>
                    {stats.stats.trend === 'up' ? (
                      <div className="flex items-center text-green-600">
                        <ChevronUp className="h-4 w-4" />
                        <span className="text-sm">{stats.stats.percentage}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <ChevronDown className="h-4 w-4" />
                        <span className="text-sm">{stats.stats.percentage}%</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Donations */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-green-700 mr-2" />
                      <h3 className="font-medium text-gray-900">Donations</h3>
                    </div>
                    <Link href="/donations" className="text-sm text-green-600 hover:text-green-700">View</Link>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">
                    Ksh {stats.totalDonations.toLocaleString()}
                  </p>
                </div>

                {/* Volunteers */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-green-700 mr-2" />
                      <h3 className="font-medium text-gray-900">Volunteers</h3>
                    </div>
                    <Link href="/volunteers" className="text-sm text-green-600 hover:text-green-700">View</Link>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{stats.volunteerSignups}</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                        <p className="text-sm text-gray-500">{activity.timestamp}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        activity.status === 'completed' ? 'bg-green-100 text-green-700' :
                        activity.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard