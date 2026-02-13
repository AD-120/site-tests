
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import { FeaturedCard, TopicCard, NewsSmallItem, RecentItem } from './components/ArticleCards';
import { CATEGORY_DEFS, FEATURED_ARTICLES, TOPIC_ARTICLES, NEWS_MAIN, NEWS_ITEMS, RECENT_ITEMS } from './constants';
import { Difficulty } from './types';

const LEVELS = [
  { label: 'Beginner | מַתְחִילִים', value: Difficulty.Beginner },
  { label: 'Intermediate | בֵּינוֹנִיִּים', value: Difficulty.Intermediate },
  { label: 'Advanced | מִתְקַדְּמִים', value: Difficulty.Advanced }
];

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('Reading'); // Defaulting to Reading to match screenshot highlight if needed
  const [selectedLevel, setSelectedLevel] = useState(LEVELS[0]);
  const [isLevelDropdownOpen, setIsLevelDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f7f9] flex justify-center selection:bg-[#3b71fe]/30">
      {/* Mobile-style layout wrapper */}
      <div className="w-full max-w-[420px] bg-white min-h-screen relative shadow-2xl flex flex-col pb-24 overflow-x-hidden">
        
        {/* Header */}
        <header className="sticky top-0 bg-white z-[1000] border-b border-gray-100 px-5 py-5 flex justify-between items-center">
          <div className="w-24">
            <img src="https://i.ibb.co/3ykC6Wf/logo.png" alt="Steps to Hebrew" className="h-8 object-contain" />
          </div>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="flex flex-col gap-1.5 p-1 group"
          >
            <span className="w-6 h-[2.5px] bg-[#1d2b4f] rounded-full"></span>
            <span className="w-6 h-[2.5px] bg-[#1d2b4f] rounded-full"></span>
            <span className="w-6 h-[2.5px] bg-[#1d2b4f] rounded-full"></span>
          </button>
        </header>

        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Filter Bar with New Styling */}
        <div className="flex items-center bg-white border-b border-gray-100 sticky top-[72px] z-[900] px-3 py-4">
          <div className="flex items-center w-full bg-white">
            {/* Level Dropdown Button (Static Style) */}
            <div className="relative pr-3 border-r border-gray-200">
              <button 
                onClick={() => setIsLevelDropdownOpen(!isLevelDropdownOpen)}
                className="flex items-center gap-4 bg-gray-200 text-[#1d2b4f] px-4 py-2.5 rounded-xl text-[12px] font-bold whitespace-nowrap transition-colors"
              >
                {selectedLevel.label}
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 text-gray-600 transition-transform ${isLevelDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isLevelDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsLevelDropdownOpen(false)}></div>
                  <div className="absolute top-[110%] left-0 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 py-2 overflow-hidden">
                    {LEVELS.map((level) => (
                      <button
                        key={level.value}
                        className={`w-full text-left px-4 py-3 text-[12px] font-bold hover:bg-gray-50 transition-colors ${selectedLevel.value === level.value ? 'text-[#3b71fe] bg-blue-50/50' : 'text-gray-700'}`}
                        onClick={() => {
                          setSelectedLevel(level);
                          setIsLevelDropdownOpen(false);
                        }}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Scrollable Categories with Colored Bars */}
            <div className="flex flex-1 gap-2.5 overflow-x-auto no-scrollbar pl-3 py-1">
              {CATEGORY_DEFS.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.label)}
                  className={`flex items-center gap-2 whitespace-nowrap px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all border ${
                    activeFilter === cat.label 
                      ? 'bg-white border-gray-400 text-[#1d2b4f]' 
                      : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <span 
                    className="w-1 h-3 rounded-full" 
                    style={{ backgroundColor: cat.color }}
                  ></span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          
          {/* Featured Section */}
          <section className="py-6">
            <div className="px-5 mb-5">
              <h2 className="text-[18px] font-extrabold text-[#1d2b4f] leading-tight">
                Featured
                <span className="block text-[12px] text-[#3b71fe] font-bold mt-0.5">מומלצים</span>
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
                <a href="#" className="text-[12px] font-bold text-[#3b71fe]">See all</a>
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
            
            <div className="grid grid-cols-1 gap-6">
              <div className="relative rounded-3xl overflow-hidden shadow-lg h-64 cursor-pointer group">
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

          {/* Recent Section */}
          <section className="py-6 px-5">
             <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                <h2 className="text-lg font-extrabold text-[#1d2b4f] font-['Assistant'] tracking-tight">לָאַחֲרוֹנָה <span className="text-[#3b71fe] font-sans ml-2 text-sm">Recent</span></h2>
             </div>
             <div className="space-y-3">
                {RECENT_ITEMS.map(item => (
                  <RecentItem key={item.id} item={item} />
                ))}
             </div>
          </section>

        </main>

        {/* Bottom Tab Bar */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white/95 backdrop-blur-lg border-t border-gray-100 flex justify-evenly pt-4 pb-8 z-[1000] shadow-[0_-5px_15px_rgba(0,0,0,0.03)]">
          <button onClick={() => setActiveTab('Articles')} className={`flex flex-col items-center gap-1 flex-1 ${activeTab === 'Articles' ? 'text-[#3b71fe]' : 'text-gray-400'}`}>
            <i className="fa-solid fa-file-lines text-xl"></i>
            <span className="text-[10px] font-extrabold">Articles</span>
          </button>
          
          <button onClick={() => setActiveTab('Conversation')} className={`flex flex-col items-center gap-1 flex-1 ${activeTab === 'Conversation' ? 'text-[#3b71fe]' : 'text-gray-400'}`}>
            <i className="fa-solid fa-comment-dots text-xl"></i>
            <span className="text-[10px] font-extrabold">Conversation</span>
          </button>

          <button onClick={() => setActiveTab('Reading')} className={`flex flex-col items-center gap-1 flex-1 ${activeTab === 'Reading' ? 'text-[#3b71fe]' : 'text-gray-400'}`}>
            <i className="fa-solid fa-book-open text-xl"></i>
            <span className="text-[10px] font-extrabold whitespace-nowrap">Reading course</span>
          </button>

          <button onClick={() => setActiveTab('Subscribe')} className={`flex flex-col items-center gap-1 flex-1 ${activeTab === 'Subscribe' ? 'text-[#3b71fe]' : 'text-[#3b71fe]/60'}`}>
            <div className="relative">
              <i className="fa-solid fa-star text-xl"></i>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#e91e63] rounded-full border-2 border-white"></span>
            </div>
            <span className="text-[10px] font-extrabold">Subscribe</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default App;
