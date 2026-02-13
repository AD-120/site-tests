
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import { FeaturedCard, TopicCard, NewsSmallItem, RecentItem } from './components/ArticleCards';
import { CATEGORIES, FEATURED_ARTICLES, TOPIC_ARTICLES, NEWS_MAIN, NEWS_ITEMS, RECENT_ITEMS } from './constants';

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Beginner מתחילים');
  const [activeTab, setActiveTab] = useState('Articles');

  return (
    <div className="min-h-screen bg-[#f4f7f9] flex justify-center selection:bg-[#3b71fe]/30">
      {/* Mobile-style layout wrapper */}
      <div className="w-full max-w-[420px] bg-white min-h-screen relative shadow-2xl flex flex-col pb-24 overflow-x-hidden">
        
        {/* Header */}
        <header className="sticky top-0 bg-white/95 backdrop-blur-md z-[1000] border-bottom border-gray-100 px-5 py-4 flex justify-between items-center shadow-sm">
          <div className="w-24">
            <img src="https://i.ibb.co/3ykC6Wf/logo.png" alt="Steps to Hebrew" className="h-8 object-contain" />
          </div>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="flex flex-col gap-1.5 p-1 group active:scale-95 transition"
          >
            <span className="w-6 h-[2.5px] bg-[#1d2b4f] rounded-full group-hover:bg-[#3b71fe] transition"></span>
            <span className="w-6 h-[2.5px] bg-[#1d2b4f] rounded-full group-hover:bg-[#3b71fe] transition"></span>
            <span className="w-4 h-[2.5px] bg-[#1d2b4f] rounded-full group-hover:bg-[#3b71fe] transition self-end"></span>
          </button>
        </header>

        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Filter Bar */}
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-5 py-5 bg-white border-b border-gray-50">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-extrabold transition-all border ${
                activeFilter === cat 
                  ? 'bg-[#f0f4ff] border-[#3b71fe] text-[#3b71fe] shadow-sm' 
                  : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          
          {/* Featured Section */}
          <section className="py-6">
            <div className="px-5 mb-4">
              <h2 className="text-base font-extrabold text-[#1d2b4f]">
                Featured <span className="block text-[11px] text-[#3b71fe] font-bold">מומלצים</span>
              </h2>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar px-5 snap-x">
              {FEATURED_ARTICLES.map(article => (
                <div key={article.id} className="snap-start">
                  <FeaturedCard article={article} />
                </div>
              ))}
            </div>
          </section>

          {/* Topic Sections */}
          {Object.entries(TOPIC_ARTICLES).map(([title, articles]) => (
            <section key={title} className="py-4">
              <div className="px-5 mb-3 flex justify-between items-end">
                <h2 className="text-base font-extrabold text-[#1d2b4f]">
                  {title} <span className="block text-[11px] text-[#3b71fe] font-bold">{title === 'Food' ? 'אוכל' : 'תרבות ואמנות'}</span>
                </h2>
                <a href="#" className="text-[12px] font-bold text-[#3b71fe] hover:underline">See all</a>
              </div>
              <div className="flex gap-3.5 overflow-x-auto no-scrollbar px-5">
                {articles.map(article => (
                  <TopicCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          ))}

          {/* News Section */}
          <section className="py-6 px-5 bg-gradient-to-b from-white to-[#f4f7f9]">
            <div className="flex items-center gap-2 mb-4">
               <span className="w-2 h-6 bg-[#f4d361] rounded-sm"></span>
               <h2 className="text-xl font-extrabold text-[#1d2b4f]">News</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative rounded-3xl overflow-hidden shadow-lg h-64 md:h-auto cursor-pointer group">
                <img src={NEWS_MAIN.image} alt={NEWS_MAIN.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-[#f4d361] text-[#1d2b4f] text-[10px] font-extrabold px-2 py-1 rounded">NEWS</div>
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-bold">{NEWS_MAIN.hebrewTitle}</h3>
                  <p className="text-gray-300 text-xs">{NEWS_MAIN.title}</p>
                </div>
              </div>

              <div className="space-y-4">
                {NEWS_ITEMS.map(item => (
                  <NewsSmallItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </section>

          {/* Recent & Ad Section */}
          <section className="py-6 px-5 grid grid-cols-1 gap-6">
             <div>
                <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                   <h2 className="text-lg font-extrabold text-[#1d2b4f] font-['Assistant'] tracking-tight">לָאַחֲרוֹנָה <span className="text-[#3b71fe] font-sans ml-2 text-sm">Recent</span></h2>
                </div>
                <div className="space-y-3">
                   {RECENT_ITEMS.map(item => (
                     <RecentItem key={item.id} item={item} />
                   ))}
                </div>
             </div>

             <div className="rounded-2xl overflow-hidden shadow-lg border border-orange-100 bg-orange-50/30 p-1">
                <img src="https://picsum.photos/seed/ad/600/300" alt="Special Offer" className="w-full rounded-xl" />
                <div className="p-3">
                  <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wider mb-1">Coming Soon</p>
                  <h4 className="text-sm font-extrabold text-[#1d2b4f]">Premium Reading Course</h4>
                </div>
             </div>
          </section>

        </main>

        {/* Bottom Tab Bar */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white/90 backdrop-blur-lg border-t border-gray-100 flex justify-evenly pt-3 pb-8 z-[1000] shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
          <button 
            onClick={() => setActiveTab('Articles')}
            className={`flex flex-col items-center gap-1 flex-1 transition-all ${activeTab === 'Articles' ? 'text-[#3b71fe]' : 'text-gray-400'}`}
          >
            <i className={`fa-solid fa-file-lines text-lg ${activeTab === 'Articles' ? 'scale-110' : ''}`}></i>
            <span className="text-[10px] font-bold">Articles</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('Conversation')}
            className={`flex flex-col items-center gap-1 flex-1 transition-all ${activeTab === 'Conversation' ? 'text-[#3b71fe]' : 'text-gray-400'}`}
          >
            <i className={`fa-solid fa-comment-dots text-lg ${activeTab === 'Conversation' ? 'scale-110' : ''}`}></i>
            <span className="text-[10px] font-bold">Conversation</span>
          </button>

          <button 
            onClick={() => setActiveTab('Reading')}
            className={`flex flex-col items-center gap-1 flex-1 transition-all ${activeTab === 'Reading' ? 'text-[#3b71fe]' : 'text-gray-400'}`}
          >
            <i className={`fa-solid fa-book-open text-lg ${activeTab === 'Reading' ? 'scale-110' : ''}`}></i>
            <span className="text-[10px] font-bold">Reading</span>
          </button>

          <button 
            onClick={() => setActiveTab('Subscribe')}
            className={`flex flex-col items-center gap-1 flex-1 transition-all ${activeTab === 'Subscribe' ? 'text-[#3b71fe]' : 'text-[#3b71fe]/60'}`}
          >
            <div className="relative">
              <i className="fa-solid fa-star text-lg"></i>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </div>
            <span className="text-[10px] font-bold">Subscribe</span>
          </button>
        </nav>

        {/* Footer Area (Desktop style but inside mobile wrapper) */}
        <footer className="mt-auto px-6 py-10 bg-white border-t border-gray-100">
           <div className="mb-6">
              <img src="https://i.ibb.co/3ykC6Wf/logo.png" alt="Steps to Hebrew" className="h-10 mb-4" />
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Awaken your passion for Hebrew with an innovative and immersive method!
              </p>
           </div>
           
           <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-[#3b71fe]">
                <i className="fa-solid fa-phone text-xs"></i>
                <span className="text-xs font-bold text-gray-600">06.03.73.56.68</span>
              </div>
              <div className="flex items-center gap-3 text-[#3b71fe]">
                <i className="fa-solid fa-envelope text-xs"></i>
                <span className="text-xs font-bold text-gray-600">contact@steptohebrew.com</span>
              </div>
              <div className="flex items-center gap-3 text-[#3b71fe]">
                <i className="fa-solid fa-location-dot text-xs"></i>
                <span className="text-xs font-bold text-gray-600">Paris, France</span>
              </div>
           </div>

           <div className="flex gap-5 text-gray-400 mb-8">
              <i className="fa-brands fa-facebook hover:text-[#3b71fe] cursor-pointer transition"></i>
              <i className="fa-brands fa-instagram hover:text-[#3b71fe] cursor-pointer transition"></i>
              <i className="fa-brands fa-x-twitter hover:text-[#3b71fe] cursor-pointer transition"></i>
              <i className="fa-brands fa-youtube hover:text-[#3b71fe] cursor-pointer transition"></i>
           </div>

           <div className="pt-6 border-t border-gray-50 flex flex-col gap-2">
              <p className="text-[10px] text-gray-400 font-bold">© 2025 steptohebrew.com All rights reserved.</p>
           </div>
        </footer>

      </div>
    </div>
  );
};

export default App;
