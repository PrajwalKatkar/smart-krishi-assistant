import React, { useState } from 'react';
import { useFarmer } from '../../context/FarmerContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  User,
  ShoppingBag,
  Users,
  Video,
  Award,
  CreditCard,
  BarChart3,
  ThumbsUp,
  MessageSquare,
  MapPin,
  Calendar,
  CheckCircle2,
  PlusCircle,
  PhoneCall,
  ExternalLink
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const ProfileDashboard: React.FC = () => {
  const { profile, updateProfile } = useFarmer();
  const { speakText } = useLanguage();

  return (
    <div className="space-y-6 pb-12">
      {/* Profile Card Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-950 text-white rounded-2xl p-6 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-2xl font-black shadow-inner">
            👨‍🌾
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">{profile.name}</h1>
            <p className="text-slate-300 text-xs mt-0.5">
              {profile.category} Farmer • {profile.village}, {profile.district} ({profile.state})
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-yellow-400 text-gray-900 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                🏆 Eco Points: {profile.ecoPoints}
              </span>
              <span className="bg-emerald-800 text-emerald-200 text-[11px] font-bold px-2 py-0.5 rounded-full">
                {profile.landAcres} Acres Registered
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => speakText(`Profile for ${profile.name}, registered in ${profile.village}, holding ${profile.landAcres} acres`)}
          className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2 rounded-xl text-xs backdrop-blur-sm self-start md:self-auto"
        >
          🔊 Listen Profile Summary
        </button>
      </div>

      {/* Badges Earned Showcase */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-500" />
          <span>Earned Sustainable Farming Badges</span>
        </h3>

        <div className="flex flex-wrap gap-3">
          {profile.badges.map((badge, idx) => (
            <div key={idx} className="bg-amber-50 border border-amber-200 text-amber-950 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm">
              <span>🌟</span>
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Land & Soil Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Primary Crops Grown</span>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {profile.cropsGrown.map((c, i) => (
              <span key={i} className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-lg">
                🌾 {c}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Registered Soil Type</span>
          <div className="text-base font-black text-gray-900 mt-2">{profile.soilType}</div>
          <span className="text-[11px] text-gray-500 font-medium">Last Soil Health Test: June 2026</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Kisan Credit Card Status</span>
          <div className="text-base font-black text-emerald-700 mt-2">Active Limit: ₹1,60,000</div>
          <span className="text-[11px] text-emerald-600 font-bold">4% Subvention Interest</span>
        </div>
      </div>
    </div>
  );
};

export const CommunityForum: React.FC = () => {
  const [posts, setPosts] = useState([
    {
      id: 'p1',
      author: 'Suresh More',
      village: 'Satara',
      crop: 'Onion',
      question: 'Which bio-fungicide is best to prevent purple blotch in Rabi onions after unseasonal rain?',
      upvotes: 24,
      replies: [
        { author: 'Dr. Patil (KVK Agronomist)', role: 'Expert', text: 'Spray Trichoderma viride @ 5g/L mixed with sticky spreader.', time: '2 hours ago' }
      ],
      timestamp: 'Yesterday'
    },
    {
      id: 'p2',
      author: 'Gurpreet Singh',
      village: 'Ludhiana',
      crop: 'Wheat',
      question: 'Has anyone installed 5HP PM-KUSUM solar pumps? How much time does it take for state subsidy approval?',
      upvotes: 18,
      replies: [],
      timestamp: '3 days ago'
    }
  ]);

  const [newQuestion, setNewQuestion] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setPosts([
      {
        id: `p-${Date.now()}`,
        author: 'Ramesh Patil',
        village: 'Nashik',
        crop: 'Wheat',
        question: newQuestion,
        upvotes: 1,
        replies: [],
        timestamp: 'Just now'
      },
      ...posts
    ]);
    setNewQuestion('');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-gradient-to-r from-orange-800 to-orange-950 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-yellow-400" />
          <div>
            <h1 className="text-2xl font-extrabold">Farmer Community Forum (किसान चौपाल)</h1>
            <p className="text-orange-100 text-xs">Farmer-to-Farmer peer Q&A and KVK Agronomist answers</p>
          </div>
        </div>
      </div>

      {/* Post creation form */}
      <form onSubmit={handleCreatePost} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 space-y-3">
        <h3 className="font-bold text-sm text-gray-900">Ask a Question to the Farmer Community</h3>
        <textarea
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Type your question about pests, seeds, machinery, or subsidies..."
          className="w-full text-xs border border-gray-300 rounded-xl p-3 bg-gray-50 focus:ring-2 focus:ring-orange-500 h-20"
        />
        <button type="submit" className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition">
          Post Question ➔
        </button>
      </form>

      {/* Posts stream */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-bold text-gray-900 text-sm">{post.author}</span>
                <span className="text-xs text-gray-400 ml-2 font-medium">({post.village} • {post.crop})</span>
              </div>
              <span className="text-[11px] text-gray-400">{post.timestamp}</span>
            </div>

            <p className="text-xs text-gray-800 font-medium leading-relaxed">{post.question}</p>

            <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t">
              <button
                onClick={() => setPosts(posts.map(p => p.id === post.id ? { ...p, upvotes: p.upvotes + 1 } : p))}
                className="flex items-center gap-1 font-bold hover:text-orange-600"
              >
                <ThumbsUp className="w-4 h-4" /> {post.upvotes} Upvotes
              </button>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" /> {post.replies.length} Replies
              </span>
            </div>

            {/* Replies */}
            {post.replies.map((r, i) => (
              <div key={i} className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs space-y-1 mt-2">
                <div className="flex justify-between font-bold text-emerald-900">
                  <span>{r.author} <span className="bg-emerald-700 text-white text-[10px] px-1.5 py-0.5 rounded">{r.role}</span></span>
                  <span className="text-[10px] text-emerald-700">{r.time}</span>
                </div>
                <p className="text-emerald-950">{r.text}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const ExpertConnect: React.FC = () => {
  const [booked, setBooked] = useState(false);

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-gradient-to-r from-teal-800 to-teal-950 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <Video className="w-8 h-8 text-emerald-300" />
          <div>
            <h1 className="text-2xl font-extrabold">Krishi Vigyan Kendra (KVK) Expert Consultation</h1>
            <p className="text-teal-100 text-xs">Book 1-on-1 Video/Call slots with Government Agronomists</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 max-w-xl mx-auto space-y-4 text-xs">
        <h3 className="font-bold text-sm text-gray-900">Available Officers Today</h3>

        <div className="border p-4 rounded-2xl bg-gray-50 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Dr. Ashok Deshmukh</h4>
            <p className="text-gray-500">Senior Plant Pathologist, KVK Nashik</p>
            <span className="text-emerald-700 font-bold mt-1 block">Slot: Today 4:00 PM - 4:30 PM</span>
          </div>

          <button
            onClick={() => setBooked(true)}
            className={`font-bold px-4 py-2 rounded-xl text-xs transition ${
              booked ? 'bg-emerald-600 text-white' : 'bg-yellow-400 hover:bg-yellow-300 text-gray-900'
            }`}
          >
            {booked ? '✓ Video Call Booked' : 'Book Video Call'}
          </button>
        </div>

        {booked && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-900 space-y-1">
            <p className="font-bold">✓ Consultation Slot Confirmed!</p>
            <p>Meeting link sent via SMS to +91 98230 45678. Dr. Deshmukh will call at 4:00 PM.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const MarketplaceModule: React.FC = () => {
  const items = [
    { id: 'm1', title: 'Certified HD-2967 Wheat Seeds (40 kg Bag)', price: 1850, seller: 'Mahabeej Certified Seeds', location: 'Nashik', category: 'Seeds' },
    { id: 'm2', title: 'Neem Bio-Fungicide Solution (1 Liter)', price: 450, seller: 'Green Earth Bio-Tech', location: 'Pune', category: 'Fertilizers' },
    { id: 'm3', title: 'Mahindra 45HP Tractor Daily Rental', price: 1200, seller: 'Patil Machinery Hire', location: 'Pimplegaon', category: 'Equipment' }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-gradient-to-r from-teal-800 to-emerald-900 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-teal-300" />
          <div>
            <h1 className="text-2xl font-extrabold">Krishi Marketplace & Equipment Rental</h1>
            <p className="text-teal-100 text-xs">Buy certified seeds, organic fertilizers, or rent tractors directly</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded uppercase">
                {item.category}
              </span>
              <h4 className="font-bold text-gray-900 text-sm mt-2">{item.title}</h4>
              <p className="text-xs text-gray-500 mt-1">Seller: {item.seller} ({item.location})</p>
              <div className="text-xl font-black text-gray-900 mt-3">₹{item.price.toLocaleString()}</div>
            </div>

            <button className="mt-4 w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2 rounded-xl text-xs transition">
              Contact Seller / Rent ➔
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AnalyticsDashboard: React.FC = () => {
  const yieldData = [
    { season: 'Kharif 2024', yield: 18, profit: 45000 },
    { season: 'Rabi 2024', yield: 22, profit: 62000 },
    { season: 'Kharif 2025', yield: 20, profit: 54000 },
    { season: 'Rabi 2025', yield: 24, profit: 71000 },
    { season: 'Rabi 2026', yield: 25, profit: 78000 }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4">
      <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-emerald-600" />
        <span>Multi-Season Crop Yield & Net Profit Performance</span>
      </h3>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={yieldData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="season" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" orientation="left" stroke="#059669" />
            <YAxis yAxisId="right" orientation="right" stroke="#d97706" />
            <Tooltip />
            <Bar yAxisId="left" dataKey="yield" fill="#059669" name="Yield (Qtl/Acre)" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="profit" fill="#d97706" name="Net Profit (₹)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
