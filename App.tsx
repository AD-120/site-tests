
import React, { useState, useEffect, useCallback, useRef } from 'react';
import GoalTracker from './components/GoalTracker';
import Waveform from './components/Waveform';
import ActionChips from './components/ActionChips';
import { SimulationState, Goal, Scenario } from './types';
import { startSimulation, sendMessage, getHint, playTTS } from './services/geminiService';

const SCENARIOS: Scenario[] = [
  { id: 'cafe', title: 'Cafe', titleHe: 'בית קפה', emoji: '☕', description: 'Order your morning coffee and a pastry.', difficulty: 'Beginner' },
  { id: 'shop', title: 'Visiting a Shop', titleHe: 'ביקור בחנות', emoji: '🛍️', description: 'Try on clothes and negotiate the price.', difficulty: 'Intermediate' },
  { id: 'zoo', title: 'Visiting a Zoo', titleHe: 'ביקור בגן חיות', emoji: '🦁', description: 'Ask the zookeeper about the animals.', difficulty: 'Beginner' },
  { id: 'emergency', title: 'Emergency Surgery', titleHe: 'ניתוח חירום', emoji: '🏥', description: 'Critical situation. Communicate with the team.', difficulty: 'Advanced' },
  { id: 'insult', title: 'Insulting a Public Official', titleHe: 'העלבת עובד ציבור', emoji: '👮', description: 'A spicy encounter at the post office.', difficulty: 'Extreme' },
  { id: 'mother-in-law', title: 'Mother-in-law Argument', titleHe: 'מריבה עם החמות', emoji: '👵', description: 'Survival of the fittest. Maintain your dignity.', difficulty: 'Extreme' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'articles' | 'conversation' | 'reading' | 'subscribe'>('articles');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [simulationState, setSimulationState] = useState<SimulationState | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSTTSupported, setIsSTTSupported] = useState(true);
  const [isHintVisible, setIsHintVisible] = useState(false);
  const [hasUserKey, setHasUserKey] = useState(false);
  const [quotaError, setQuotaError] = useState(false);
  const [lastAction, setLastAction] = useState<(() => Promise<void>) | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('speechRecognition' in window)) {
      setIsSTTSupported(false);
    }
    
    const checkKey = async () => {
      if ((window as any).aistudio?.hasSelectedApiKey) {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        setHasUserKey(hasKey);
      }
    };
    checkKey();
  }, []);

  const handleConnectKey = async () => {
    if ((window as any).aistudio?.openSelectKey) {
      try {
        await (window as any).aistudio.openSelectKey();
        setHasUserKey(true);
        setQuotaError(false);
      } catch (e) {
        console.error("Failed to open key selector", e);
      }
    }
  };

  const handleRetry = async () => {
    if (lastAction) {
      setQuotaError(false);
      await lastAction();
    }
  };

  const handleStartScenario = async (scenario: Scenario) => {
    const action = async () => {
      setSelectedScenario(scenario);
      setIsLoading(true);
      setQuotaError(false);
      try {
        const initialState = await startSimulation(scenario.titleHe);
        setSimulationState(initialState);
        await playTTS(initialState.characterVoice);
      } catch (err: any) {
        console.error(err);
        if (err?.message?.includes("429") || err?.message?.includes("quota")) {
          setQuotaError(true);
          setLastAction(() => action);
        }
      } finally {
        setIsLoading(false);
      }
    };
    await action();
  };

  const handleSimResponse = useCallback(async (newState: SimulationState) => {
    setSimulationState(newState);
    setIsHintVisible(false);
    if (newState.characterVoice) {
      await playTTS(newState.characterVoice);
    }
  }, []);

  const processUserInput = async (text: string) => {
    if (!text.trim() || !selectedScenario) return;
    const action = async () => {
      setIsLoading(true);
      setQuotaError(false);
      try {
        const newState = await sendMessage(text, selectedScenario.titleHe, simulationState?.goalStatus || []);
        await handleSimResponse(newState);
      } catch (err: any) {
        console.error(err);
        if (err?.message?.includes("429") || err?.message?.includes("quota")) {
          setQuotaError(true);
          setLastAction(() => action);
        }
      } finally {
        setIsLoading(false);
      }
    };
    await action();
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'he-IL';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      processUserInput(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleToggleHint = async () => {
    if (isHintVisible) {
      setIsHintVisible(false);
      return;
    }
    if (simulationState?.hint) {
      setIsHintVisible(true);
    } else if (selectedScenario) {
      const action = async () => {
        setIsLoading(true);
        setQuotaError(false);
        try {
          const newState = await getHint(simulationState?.screenText || "", selectedScenario.titleHe, simulationState?.goalStatus || []);
          setSimulationState(newState);
          setIsHintVisible(true);
        } catch (err: any) {
          console.error(err);
          if (err?.message?.includes("429") || err?.message?.includes("quota")) {
            setQuotaError(true);
            setLastAction(() => action);
          }
        } finally {
          setIsLoading(false);
        }
      };
      await action();
    }
  };

  const renderArticlesView = () => (
    <main className="pb-24">
      <div className="flex gap-2.5 overflow-x-auto px-5 py-4 no-scrollbar">
        <div className="filter-pill active">Beginner מתחילים</div>
        <div className="filter-pill">Music</div>
        <div className="filter-pill">Food</div>
        <div className="filter-pill">Sport</div>
        <div className="filter-pill">Fashion</div>
      </div>

      <section className="py-4">
        <div className="flex justify-between items-center px-5 mb-3">
          <h2 className="text-base font-extrabold text-[#1d2b4f]">Featured <span className="block text-[11px] text-[#3b71fe] font-semibold">מומלצים</span></h2>
        </div>
        <div className="flex gap-4 overflow-x-auto px-5 no-scrollbar snap-x snap-mandatory">
          <div className="flex-none w-[280px] h-[300px] relative rounded-[20px] overflow-hidden bg-black snap-start">
            <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400" alt="Picnic" className="w-full h-full object-cover opacity-80" />
            <div className="absolute top-[15px] left-[15px] px-2.5 py-1 bg-[#e91e63] rounded-md text-[10px] font-extrabold text-white">BLOG</div>
            <div className="absolute bottom-0 p-5 text-white bg-gradient-to-t from-black/80 to-transparent w-full">
              <h3 className="text-lg font-bold">פיקניק בפארק</h3>
              <p className="text-sm">In the Park</p>
            </div>
          </div>
          <div className="flex-none w-[280px] h-[300px] relative rounded-[20px] overflow-hidden bg-black snap-start">
            <img src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=400" alt="Sport" className="w-full h-full object-cover opacity-80" />
            <div className="absolute top-[15px] left-[15px] px-2.5 py-1 bg-[#3b71fe] rounded-md text-[10px] font-extrabold text-white">SPORT</div>
            <div className="absolute bottom-0 p-5 text-white bg-gradient-to-t from-black/80 to-transparent w-full">
              <h3 className="text-lg font-bold">מכבי חיפה</h3>
              <p className="text-sm">Maccabi Haifa</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );

  const renderSceneSelection = () => (
    <main className="pb-24 animate-in slide-in-from-right duration-300">
      <div className="px-6 pt-8 pb-4">
        <h1 className="text-2xl font-extrabold text-[#1d2b4f]">Choose a Scene <span className="block text-sm text-[#3b71fe] mt-1">בחר סצנה לאימון</span></h1>
      </div>
      
      {quotaError && (
        <div className="mx-6 mb-6 p-5 bg-amber-50 border border-amber-200 rounded-[24px] shadow-sm">
          <p className="text-sm font-extrabold text-amber-700 mb-2 text-right">⏳ המכסה המשותפת מלאה</p>
          <p className="text-xs text-amber-600 mb-4 leading-relaxed text-right">
            השימוש באפליקציה בחינם! בגלל עומס משתמשים כרגע, המכסה הגיעה לגבול. ניתן להמתין דקה ולנסות שוב, או לחבר מפתח אישי אם יש לך כזה.
          </p>
          <div className="flex gap-2">
            <button 
              onClick={handleRetry}
              className="flex-1 py-3 bg-amber-600 text-white rounded-xl text-xs font-extrabold shadow-md hover:bg-amber-700 transition-all active:scale-95"
            >
              נסה שוב כעת
            </button>
            <button 
              onClick={handleConnectKey}
              className="px-4 py-3 bg-white border border-amber-200 text-amber-600 rounded-xl text-xs font-extrabold"
            >
              חבר מפתח
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 px-6">
        {SCENARIOS.map((scene) => (
          <button
            key={scene.id}
            onClick={() => handleStartScenario(scene)}
            className="group relative flex flex-col bg-white border border-gray-100 rounded-[24px] p-5 text-right transition-all hover:border-[#3b71fe] hover:shadow-lg active:scale-[0.98]"
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                scene.difficulty === 'Extreme' ? 'bg-red-50 text-red-500' : 
                scene.difficulty === 'Advanced' ? 'bg-orange-50 text-orange-500' :
                'bg-blue-50 text-blue-500'
              }`}>
                {scene.difficulty}
              </span>
              <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{scene.emoji}</span>
            </div>
            <h3 className="text-lg font-extrabold text-[#1d2b4f] mb-1">{scene.titleHe}</h3>
            <p className="text-xs text-gray-400 font-medium">{scene.description}</p>
          </button>
        ))}
      </div>
    </main>
  );

  const renderConversationView = () => {
    if (!selectedScenario) return renderSceneSelection();

    if (!simulationState) {
      if (quotaError) return renderSceneSelection();
      return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-160px)]">
          <div className="w-10 h-10 border-4 border-[#3b71fe] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-[#1d2b4f] font-extrabold text-sm uppercase tracking-widest">Preparing {selectedScenario.title}...</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-[calc(100vh-160px)] animate-in fade-in">
        <div className="flex items-center px-4 py-2 border-b border-gray-50">
           <button onClick={() => { setSelectedScenario(null); setSimulationState(null); setQuotaError(false); }} className="text-xs font-extrabold text-gray-400 hover:text-[#3b71fe]">
             ← Back to Scenes
           </button>
        </div>
        
        {quotaError && (
          <div className="bg-amber-500 text-white px-5 py-2.5 flex justify-between items-center animate-in slide-in-from-top">
            <span className="text-[11px] font-bold">המכסה מלאה. נסה שוב בעוד דקה.</span>
            <div className="flex gap-3">
              <button onClick={handleRetry} className="text-[11px] font-extrabold underline">נסה שוב</button>
              <button onClick={handleConnectKey} className="text-[11px] font-extrabold underline">חבר מפתח</button>
            </div>
          </div>
        )}

        <GoalTracker goals={simulationState.goalStatus} />
        
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="relative mb-8">
            <div className={`w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center transition-all duration-500 ${isLoading ? 'scale-90 opacity-50' : 'scale-100 shadow-lg'}`}>
              <span className="text-5xl">{selectedScenario.emoji}</span>
            </div>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full border-2 border-[#3b71fe] border-t-transparent rounded-full animate-spin opacity-40" />
              </div>
            )}
          </div>

          <div className="min-h-[140px] flex flex-col items-center gap-3">
            <h1 className="text-xl font-extrabold text-[#1d2b4f] leading-tight">
              {simulationState.screenText}
            </h1>
            
            {simulationState.correction && (
              <div className="bg-yellow-50 border border-yellow-100 px-4 py-1.5 rounded-full animate-bounce">
                <p className="text-[11px] font-bold text-yellow-700">💡 {simulationState.correction}</p>
              </div>
            )}

            <div className="flex flex-col items-center w-full">
              {!isHintVisible ? (
                <button 
                  onClick={handleToggleHint}
                  className="w-10 h-10 bg-blue-50 text-[#3b71fe] rounded-full flex items-center justify-center shadow-sm hover:bg-blue-100 transition-colors"
                  title="Show Hint"
                >
                  <span className="text-xl">💡</span>
                </button>
              ) : (
                <div 
                  className="bg-[#3b71fe] text-white px-4 py-2.5 rounded-2xl shadow-md cursor-pointer animate-in zoom-in-95 duration-200"
                  onClick={() => setIsHintVisible(false)}
                >
                  <p className="text-[9px] uppercase font-extrabold tracking-widest opacity-80 mb-0.5">SAY THIS:</p>
                  <p className="text-base font-bold">{simulationState.hint || '...שלוש, אני רוצה קפוצ׳ינו'}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 h-8">
             <Waveform isListening={isListening} />
          </div>
        </div>

        <div className="px-5 py-6 bg-white border-t border-gray-100 flex flex-col gap-4 items-center">
          <ActionChips onChipClick={processUserInput} />

          <div className="flex items-center justify-center w-full">
            <div className="w-12" />
            <button 
              onClick={toggleListening}
              disabled={isLoading}
              className={`relative flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 shadow-xl active:scale-95 ${
                isListening ? 'bg-[#e91e63] shadow-pink-100' : 'bg-[#3b71fe] shadow-blue-100'
              } ${isLoading ? 'opacity-50' : ''}`}
            >
               {isListening && <span className="absolute inset-0 rounded-full animate-ping bg-[#e91e63] opacity-20" />}
               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
               </svg>
            </button>
            <div className="w-12" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white shadow-2xl overflow-hidden relative">
      <header className="sticky top-0 bg-white z-[100] px-5 py-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="h-8">
            <img src="https://i.ibb.co/3ykC6Wf/logo.png" alt="Steps to Hebrew" className="h-full" />
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="flex flex-col gap-1.5 p-1">
            <span className="w-6 h-[2.5px] bg-[#1d2b4f] rounded-full" />
            <span className="w-6 h-[2.5px] bg-[#1d2b4f] rounded-full" />
            <span className="w-6 h-[2.5px] bg-[#1d2b4f] rounded-full" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {activeTab === 'articles' ? renderArticlesView() : renderConversationView()}
      </div>

      <nav className="fixed bottom-0 w-full max-w-[390px] bg-white border-t border-gray-100 flex justify-evenly items-end py-3 px-2 z-[1000] shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
        <button onClick={() => { setActiveTab('subscribe'); }} className={`flex flex-col items-center flex-1 gap-1 ${activeTab === 'subscribe' ? 'text-[#3b71fe]' : 'text-gray-300'}`}>
          <span className="text-xl">⭐</span>
          <span className="text-[10px] font-extrabold uppercase">Subscribe</span>
        </button>
        <button onClick={() => { setActiveTab('reading'); }} className={`flex flex-col items-center flex-1 gap-1 ${activeTab === 'reading' ? 'text-[#3b71fe]' : 'text-gray-300'}`}>
          <span className="text-xl">📚</span>
          <span className="text-[10px] font-extrabold uppercase">Reading</span>
        </button>
        <button onClick={() => { setActiveTab('conversation'); }} className={`flex flex-col items-center flex-1 gap-1 ${activeTab === 'conversation' ? 'text-[#3b71fe]' : 'text-gray-300'}`}>
          <span className="text-xl">💬</span>
          <span className="text-[10px] font-extrabold uppercase">Conversation</span>
        </button>
        <button onClick={() => { setActiveTab('articles'); }} className={`flex flex-col items-center flex-1 gap-1 ${activeTab === 'articles' ? 'text-[#3b71fe]' : 'text-gray-300'}`}>
          <span className="text-xl">📄</span>
          <span className="text-[10px] font-extrabold uppercase">Articles</span>
        </button>
      </nav>

      <div className={`fixed inset-0 z-[2000] bg-black/40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)}>
        <div className={`absolute top-0 right-0 h-full bg-white transition-transform duration-400 w-[85%] px-8 py-20 flex flex-col ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={e => e.stopPropagation()}>
          <button onClick={() => setIsSidebarOpen(false)} className="absolute top-5 right-5 text-4xl font-light">&times;</button>
          <div className="text-xl font-extrabold text-[#1d2b4f] mb-8 pb-4 border-b border-gray-100">👤 My Profile</div>
          <div className="flex flex-col gap-6 text-[#1d2b4f] font-bold text-base flex-1 text-right">
            <a href="#" className="hover:text-[#3b71fe]">החשבון שלי</a>
            <button onClick={handleConnectKey} className="text-right hover:text-[#3b71fe] flex items-center justify-between w-full">
               <span>הגדרות חיבור</span>
               {hasUserKey && <span className="text-[9px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase tracking-tighter">Connected</span>}
            </button>
            <div className="mt-4 p-4 bg-gray-50 rounded-2xl">
               <p className="text-[10px] text-gray-400 mb-1 font-extrabold uppercase">Connection Status</p>
               <p className="text-xs font-bold text-[#1d2b4f]">
                 {hasUserKey ? '✓ מפתח API אישי מחובר' : '• שימוש במכסה קהילתית (חינם)'}
               </p>
               {!hasUserKey && (
                 <p className="text-[10px] text-gray-500 mt-2 leading-relaxed text-right">
                   אתה משתמש במכסה המשותפת של הקהילה. השירות ניתן בחינם לגמרי! אם המערכת איטית, ניתן להמתין דקה.
                 </p>
               )}
            </div>
          </div>
          
          <div className="mt-auto pt-6 border-t border-gray-100">
            <div className="bg-blue-50 p-4 rounded-2xl mb-4">
              <p className="text-[10px] text-blue-700 mb-1 font-extrabold uppercase tracking-widest text-right">אופציונלי: מפתח אישי</p>
              <p className="text-[11px] text-blue-600 mb-3 leading-relaxed text-right">
                למשתמשים כבדים שרוצים להימנע ממגבלות עומס, ניתן לחבר מפתח אישי.
              </p>
              <button 
                onClick={handleConnectKey}
                className="w-full py-3 bg-[#3b71fe] text-white rounded-xl text-sm font-bold shadow-md active:scale-95 transition-all"
              >
                {hasUserKey ? 'החלף מפתח' : 'חיבור מפתח אישי'}
              </button>
            </div>
            
            <hr className="border-gray-50 mb-4" />
            <a href="#" className="text-[#e91e63] font-bold text-right block">התנתק</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
