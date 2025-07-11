
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  fromAddress: string;
  toAddress: string;
  moveDate: string;
  message: string | null;
  createdAt: string;
  status?: 'NEW' | 'CONTACTED' | 'QUOTED' | 'BOOKED' | 'COMPLETED' | 'CANCELLED';
}

interface Admin {
  id: string;
  email: string;
  fullName: string;
  status: string;
}

interface QuoteStats {
  total: number;
  new: number;
  contacted: number;
  quoted: number;
  booked: number;
  completed: number;
}

export default function AdminDashboard() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [pendingAdmins, setPendingAdmins] = useState<Admin[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [quoteStats, setQuoteStats] = useState<QuoteStats>({
    total: 0,
    new: 0,
    contacted: 0,
    quoted: 0,
    booked: 0,
    completed: 0
  });
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    filterQuotes();
  }, [quotes, searchTerm, statusFilter]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/me');
      if (response.ok) {
        const adminData = await response.json();
        setAdmin(adminData);
        fetchQuotes();
        fetchPendingAdmins();
      } else {
        router.push('/admin');
      }
    } catch (error) {
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  };

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/admin/quotes');
      if (response.ok) {
        const data = await response.json();
        setQuotes(data);
        calculateStats(data);
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  const calculateStats = (quotesData: Quote[]) => {
    const stats = {
      total: quotesData.length,
      new: quotesData.filter(q => !q.status || q.status === 'NEW').length,
      contacted: quotesData.filter(q => q.status === 'CONTACTED').length,
      quoted: quotesData.filter(q => q.status === 'QUOTED').length,
      booked: quotesData.filter(q => q.status === 'BOOKED').length,
      completed: quotesData.filter(q => q.status === 'COMPLETED').length,
    };
    setQuoteStats(stats);
  };

  const filterQuotes = () => {
    let filtered = quotes;

    if (searchTerm) {
      filtered = filtered.filter(quote =>
        quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.phone.includes(searchTerm)
      );
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(quote => 
        statusFilter === 'NEW' ? (!quote.status || quote.status === 'NEW') : quote.status === statusFilter
      );
    }

    setFilteredQuotes(filtered);
  };

  const fetchPendingAdmins = async () => {
    try {
      const response = await fetch('/api/admin/pending-admins');
      if (response.ok) {
        const data = await response.json();
        setPendingAdmins(data);
      }
    } catch (error) {
      console.error('Error fetching pending admins:', error);
    }
  };

  const updateQuoteStatus = async (quoteId: string, status: string) => {
    try {
      const response = await fetch('/api/admin/update-quote-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quoteId, status }),
      });

      if (response.ok) {
        fetchQuotes();
      }
    } catch (error) {
      console.error('Error updating quote status:', error);
    }
  };

  const approveAdmin = async (adminId: string) => {
    try {
      const response = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminId }),
      });

      if (response.ok) {
        fetchPendingAdmins();
      }
    } catch (error) {
      console.error('Error approving admin:', error);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'CONTACTED': return 'bg-blue-100 text-blue-800';
      case 'QUOTED': return 'bg-yellow-100 text-yellow-800';
      case 'BOOKED': return 'bg-purple-100 text-purple-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Prime Move CRM</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {admin?.fullName}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="bg-white w-64 min-h-screen shadow">
          <div className="p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left px-4 py-2 rounded ${
                    activeTab === 'dashboard'
                      ? 'bg-orange-100 text-orange-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  📊 Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('quotes')}
                  className={`w-full text-left px-4 py-2 rounded ${
                    activeTab === 'quotes'
                      ? 'bg-orange-100 text-orange-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  📋 Quote Requests
                  {quoteStats.new > 0 && (
                    <span className="ml-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                      {quoteStats.new}
                    </span>
                  )}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('admins')}
                  className={`w-full text-left px-4 py-2 rounded ${
                    activeTab === 'admins'
                      ? 'bg-orange-100 text-orange-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  👥 Admin Management
                  {pendingAdmins.length > 0 && (
                    <span className="ml-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
                      {pendingAdmins.length}
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-2xl font-bold text-gray-900">{quoteStats.total}</div>
                  <div className="text-sm text-gray-600">Total Quotes</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-2xl font-bold text-orange-600">{quoteStats.new}</div>
                  <div className="text-sm text-gray-600">New Quotes</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-2xl font-bold text-blue-600">{quoteStats.contacted}</div>
                  <div className="text-sm text-gray-600">Contacted</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-2xl font-bold text-yellow-600">{quoteStats.quoted}</div>
                  <div className="text-sm text-gray-600">Quoted</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-2xl font-bold text-purple-600">{quoteStats.booked}</div>
                  <div className="text-sm text-gray-600">Booked</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="text-2xl font-bold text-green-600">{quoteStats.completed}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
              </div>

              {/* Recent Quotes */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Quote Requests</h3>
                </div>
                <div className="p-6">
                  {quotes.slice(0, 5).map((quote) => (
                    <div key={quote.id} className="flex items-center justify-between py-3 border-b last:border-b-0">
                      <div>
                        <div className="font-medium text-gray-900">{quote.name}</div>
                        <div className="text-sm text-gray-500">{quote.email}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-900">
                          {new Date(quote.moveDate).toLocaleDateString()}
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(quote.status)}`}>
                          {quote.status || 'NEW'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quotes' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Quote Requests</h2>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Search quotes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="ALL">All Status</option>
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="QUOTED">Quoted</option>
                    <option value="BOOKED">Booked</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {filteredQuotes.map((quote) => (
                    <li key={quote.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{quote.name}</p>
                            <div className="ml-2 flex-shrink-0 flex space-x-2">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(quote.status)}`}>
                                {quote.status || 'NEW'}
                              </span>
                              <select
                                value={quote.status || 'NEW'}
                                onChange={(e) => updateQuoteStatus(quote.id, e.target.value)}
                                className="text-xs border border-gray-300 rounded px-2 py-1"
                              >
                                <option value="NEW">New</option>
                                <option value="CONTACTED">Contacted</option>
                                <option value="QUOTED">Quoted</option>
                                <option value="BOOKED">Booked</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                              </select>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                📧 {quote.email}
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                📞 {quote.phone}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <p>Move Date: {new Date(quote.moveDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                          {(quote.fromAddress || quote.toAddress) && (
                            <div className="mt-2 text-sm text-gray-600">
                              <p>📍 From: {quote.fromAddress}</p>
                              <p>📍 To: {quote.toAddress}</p>
                            </div>
                          )}
                          {quote.message && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">{quote.message}</p>
                            </div>
                          )}
                          <div className="mt-2">
                            <p className="text-xs text-gray-400">
                              Submitted: {new Date(quote.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'admins' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Management</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {pendingAdmins.map((pendingAdmin) => (
                    <li key={pendingAdmin.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{pendingAdmin.fullName}</p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                Pending
                              </p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="flex items-center text-sm text-gray-500">
                              📧 {pendingAdmin.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => approveAdmin(pendingAdmin.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
                          >
                            Approve
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {pendingAdmins.length === 0 && (
                  <div className="px-6 py-4 text-center text-gray-500">
                    No pending admin approvals
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
