import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, Image as ImageIcon, Volume2, VolumeX, Play, Pause, Square, 
  RotateCcw, Copy, Check, Download, Sparkles, Feather, Sliders, 
  Compass, Eye, BookOpen, AlertCircle, RefreshCw, Layers
} from 'lucide-react';

interface SceneAnalysis {
  visualFocalPoint: string;
  atmosphericMood: string;
  sensoryDetails: string[];
}

interface StoryResult {
  storyTitle: string;
  sceneAnalysis: SceneAnalysis;
  openingParagraph: string;
  moodBadge: string;
  suggestedProtagonistHook?: string;
}

// Sample inspiration scenes with high-resolution imagery
const SAMPLE_SCENES = [
  {
    id: 'sample-1',
    name: 'Ancient Sunlit Library',
    genre: 'Magical Realism',
    url: '/images/school-library-hall.jpg',
    description: 'Cathedral ceilings, towering mahogany shelves, drifting dust motes.'
  },
  {
    id: 'sample-2',
    name: 'Alchemical Laboratory',
    genre: 'Gothic Science',
    url: '/images/school-science-lab.jpg',
    description: 'Glass retorts, azure solutions, cold stainless steel surfaces.'
  },
  {
    id: 'sample-3',
    name: 'Morning Assembly Hall',
    genre: 'Literary Drama',
    url: '/images/hero-school-campus.jpg',
    description: 'Sunlight streaming through tall glass, murmuring crowd, waiting silence.'
  },
  {
    id: 'sample-4',
    name: 'Cybernetic Workshop',
    genre: 'Cyberpunk Noir',
    url: '/images/school-computer-lab.jpg',
    description: 'Glowing phosphor screens, entangled cabling, quiet algorithmic hum.'
  }
];

export const CreativeWritingStudio: React.FC = () => {
  // State for image
  const [selectedImage, setSelectedImage] = useState<string>(SAMPLE_SCENES[0].url);
  const [selectedSampleId, setSelectedSampleId] = useState<string>('sample-1');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Mood Slider State (0: Joyful -> 100: Melancholy)
  const [moodScore, setMoodScore] = useState<number>(50);
  const [genre, setGenre] = useState<string>('Literary Fiction');

  // Story generation state
  const [story, setStory] = useState<StoryResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  // Audio / Read Aloud state
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isPausedAudio, setIsPausedAudio] = useState<boolean>(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(0);
  const [currentSpokenWordIndex, setCurrentSpokenWordIndex] = useState<number>(-1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mood helper interpretations
  const getMoodConfig = (val: number) => {
    if (val <= 20) {
      return {
        label: 'Joyful & Jubilant',
        color: 'from-amber-400 to-emerald-400',
        badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
        quote: 'Laughter catches like sunlight on moving water; sorrow is an ancient, forgotten rumor.',
        speechPitch: 1.15,
        speechRate: 1.05,
      };
    } else if (val <= 40) {
      return {
        label: 'Whimsical & Uplifting',
        color: 'from-yellow-400 to-sky-400',
        badgeBg: 'bg-sky-50 text-sky-800 border-sky-300',
        quote: 'A light-footed breeze through open windows, carrying the promise of delightful surprises.',
        speechPitch: 1.08,
        speechRate: 1.0,
      };
    } else if (val <= 60) {
      return {
        label: 'Balanced & Contemplative',
        color: 'from-blue-500 to-indigo-600',
        badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-300',
        quote: 'Poised between light and shadow, where every quiet glance carries untold weight.',
        speechPitch: 1.0,
        speechRate: 0.95,
      };
    } else if (val <= 80) {
      return {
        label: 'Pensive & Bittersweet',
        color: 'from-indigo-600 to-violet-700',
        badgeBg: 'bg-violet-50 text-violet-800 border-violet-300',
        quote: 'Twilight echoes, holding tightly to the warmth of things that cannot stay.',
        speechPitch: 0.92,
        speechRate: 0.9,
      };
    } else {
      return {
        label: 'Melancholy & Elegiac',
        color: 'from-slate-700 to-slate-900',
        badgeBg: 'bg-slate-100 text-slate-800 border-slate-300',
        quote: 'Rain on cold slate; memories heavy as winter ballast in an empty room.',
        speechPitch: 0.85,
        speechRate: 0.85,
      };
    }
  };

  const currentMood = getMoodConfig(moodScore);

  // Initialize Speech Synthesis Voices
  useEffect(() => {
    const updateVoices = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          // Prioritize English expressive voices
          const englishVoices = voices.filter(v => v.lang.startsWith('en'));
          setAvailableVoices(englishVoices.length > 0 ? englishVoices : voices);
        }
      }
    };

    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Ghostwrite story generation function
  const generateStory = async (overrideMood?: number) => {
    const activeMood = typeof overrideMood === 'number' ? overrideMood : moodScore;
    setIsLoading(true);
    setErrorMessage(null);
    stopNarration();

    try {
      const response = await fetch('/api/ghostwrite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: selectedImage.startsWith('data:') ? selectedImage : undefined,
          imageUrl: selectedImage.startsWith('/') ? selectedImage : undefined,
          moodScore: activeMood,
          moodLabel: getMoodConfig(activeMood).label,
          genre,
        }),
      });

      const result = await response.json();
      if (result.success && result.data) {
        setStory(result.data);
      } else {
        throw new Error(result.error || 'Failed to generate opening paragraph');
      }
    } catch (err: any) {
      console.warn('API call failed or running in client mode, falling back to local generator:', err);
      // Fallback local generator with rich atmospheric prose
      const isLow = activeMood <= 35;
      const isHigh = activeMood >= 65;
      
      const fallbackStory: StoryResult = {
        storyTitle: isLow 
          ? "The Sunlit Cadence of Miracles" 
          : isHigh 
          ? "Echoes Along the Silent Sills" 
          : "The Cartography of Arrival",
        sceneAnalysis: {
          visualFocalPoint: "The luminous geometric balance of the depicted space",
          atmosphericMood: getMoodConfig(activeMood).label,
          sensoryDetails: isLow
            ? ["Warm honey-colored sunlight", "The lively chatter of distant bells", "Vibrant scents of cedar and rain"]
            : isHigh
            ? ["Cold damp slate seeping through wool", "The hollow ticking of a water clock", "Twilight settling like ash"]
            : ["Crisp afternoon air", "Rhythmic murmur of turning pages", "Polished mahogany and calm intent"]
        },
        openingParagraph: isLow
          ? "The morning didn't merely break across the courtyard; it cascaded in brilliant, buoyant waves of amber and glass. Every archway seemed to exhale the winter chill in one collective, delighted breath, while laughter from the colonnade carried higher than the sparrows darting between the rafters. Lyra stood motionless at the center of the hall, letting the golden warmth soak through her sleeves. For the first time in as long as she could recall, the world wasn't a puzzle to be endured, but a magnificent invitation waiting on the tip of a painter’s brush."
          : isHigh
          ? "The rain had abandoned the tall arched windows an hour before dusk, leaving only the cold, unsparing truth of the gray light pooling across the floorboards. In this hollow hall of departed footsteps, silence was not the simple absence of speech, but an old, unyielding weight pressing against the ribs. Julian kept his hands deep in his greatcoat pockets, staring at the empty lectern where dust motes drifted like discarded syllables. The letter in his breast pocket felt cold as slate, bearing news that could neither mend the hours gone by nor warm the long winter gathering outside the gates."
          : "At the exact hour when the shadows aligned with the meridian carved into the limestone floor, the library settled into its truest rhythm. Dust motes drifted in lazy, deliberated spirals through the shafts of pale autumn sun, each particle suspended like a thought half-formed. Kaelen reached out and traced the spine of the ledger, his fingers remembering the grain of calfskin long before his eyes confirmed the crest stamped upon it. Here, equidistant between the bustling harbor and the silent hills, every story held its breath, awaiting the traveler with patience enough to listen.",
        moodBadge: getMoodConfig(activeMood).label,
        suggestedProtagonistHook: isLow
          ? "Lyra picked up her satchel, eager to see what fortune was waiting around the turn."
          : isHigh
          ? "Julian counted the empty benches, wondering which year had quietly taken away his resolve."
          : "Kaelen turned the brass key, stepping across the threshold before the third chime ceased."
      };
      setStory(fallbackStory);
    } finally {
      setIsLoading(false);
    }
  };

  // Run generation on initial mount
  useEffect(() => {
    generateStory();
  }, []);

  // Handle custom image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setErrorMessage('Please select an image smaller than 8MB.');
        return;
      }
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setSelectedImage(base64);
        setSelectedSampleId('custom');
        setIsUploading(false);
        // Automatically analyze new image with current mood slider setting
        setTimeout(() => {
          generateStory();
        }, 100);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle sample scene selection
  const handleSelectSample = (sample: typeof SAMPLE_SCENES[0]) => {
    setSelectedImage(sample.url);
    setSelectedSampleId(sample.id);
    setGenre(sample.genre);
    setTimeout(() => {
      generateStory();
    }, 100);
  };

  // Handle Mood Slider Change
  const handleMoodSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setMoodScore(val);
  };

  // When user releases the slider (onMouseUp or onTouchEnd), trigger re-analysis!
  const handleSliderRelease = () => {
    generateStory(moodScore);
  };

  // Read Aloud / Text-to-Speech logic
  const handleToggleReadAloud = () => {
    if (!story || !('speechSynthesis' in window)) return;

    if (isPlayingAudio && !isPausedAudio) {
      window.speechSynthesis.pause();
      setIsPausedAudio(true);
      return;
    }

    if (isPlayingAudio && isPausedAudio) {
      window.speechSynthesis.resume();
      setIsPausedAudio(false);
      return;
    }

    // Start fresh narration
    window.speechSynthesis.cancel();
    const textToRead = `${story.storyTitle}. ${story.openingParagraph}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);

    // Apply mood-tailored expressive pitch and rate
    utterance.pitch = currentMood.speechPitch;
    utterance.rate = currentMood.speechRate;

    if (availableVoices.length > 0 && availableVoices[selectedVoiceIndex]) {
      utterance.voice = availableVoices[selectedVoiceIndex];
    }

    utterance.onstart = () => {
      setIsPlayingAudio(true);
      setIsPausedAudio(false);
    };

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        setCurrentSpokenWordIndex(event.charIndex);
      }
    };

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
      setCurrentSpokenWordIndex(-1);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
      setCurrentSpokenWordIndex(-1);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopNarration = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setIsPausedAudio(false);
    setCurrentSpokenWordIndex(-1);
  };

  // Copy to clipboard
  const handleCopyStory = () => {
    if (!story) return;
    const fullText = `"${story.storyTitle}"\nMood: ${story.moodBadge}\n\n${story.openingParagraph}`;
    navigator.clipboard.writeText(fullText);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  // Download story
  const handleDownloadStory = () => {
    if (!story) return;
    const content = `${story.storyTitle.toUpperCase()}\nMood Register: ${story.moodBadge} (${moodScore}/100)\nGenre: ${genre}\n\n` +
      `[SCENE ANALYSIS]\n- Focal Point: ${story.sceneAnalysis.visualFocalPoint}\n- Atmosphere: ${story.sceneAnalysis.atmosphericMood}\n- Sensory Cues: ${story.sceneAnalysis.sensoryDetails.join(', ')}\n\n` +
      `[OPENING PARAGRAPH]\n${story.openingParagraph}\n\n` +
      (story.suggestedProtagonistHook ? `[PROTAGONIST HOOK]\n${story.suggestedProtagonistHook}\n` : '');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${story.storyTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_opening.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-8 lg:py-12 bg-slate-900 text-slate-100 min-h-[calc(100vh-60px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Studio Top Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Feather className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Ghostwriter & Scene Visualizer</span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Visual Story Crafting & Mood Engine
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Upload any image to set the world. Fine-tune the <strong className="text-amber-300">Mood Slider</strong> from joyful exuberance to haunting melancholy to ghostwrite a bespoke opening chapter with expressive voice narration.
          </p>
        </div>

        {/* Studio Main Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image Canvas & Mood Slider Controls (Col 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Image Canvas Box */}
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 shadow-xl space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  Source Scene Image
                </span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Selected Image Display */}
              <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-slate-950 border border-slate-700/80 group">
                <img
                  src={selectedImage}
                  alt="Story inspiration scene"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/school-library-hall.jpg';
                  }}
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="bg-black/70 backdrop-blur-xs text-slate-200 px-2.5 py-1 rounded border border-white/10 font-medium truncate max-w-[200px]">
                    {selectedSampleId === 'custom' ? 'Custom Uploaded Photo' : SAMPLE_SCENES.find(s => s.id === selectedSampleId)?.name}
                  </span>
                  <span className="text-amber-300 text-[11px] font-semibold bg-black/60 px-2 py-1 rounded">
                    Active World
                  </span>
                </div>
              </div>

              {/* Sample Scene Inspiration Quick Selectors */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Or pick a sample scene:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {SAMPLE_SCENES.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => handleSelectSample(sample)}
                      className={`text-left p-2 rounded-lg border text-xs transition-all cursor-pointer ${
                        selectedSampleId === sample.id
                          ? 'border-amber-400 bg-amber-400/10 text-white font-bold'
                          : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:bg-slate-700/60 hover:text-slate-200'
                      }`}
                    >
                      <p className="truncate font-semibold">{sample.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{sample.genre}</p>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* MANDATORY FEATURE: Mood Slider (Joyful to Melancholy) */}
            <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-6 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">
                    Mood & Emotional Tone Slider
                  </h3>
                </div>
                <span className={`px-2.5 py-0.5 text-xs font-bold rounded border ${currentMood.badgeBg}`}>
                  {currentMood.label}
                </span>
              </div>

              <p className="text-xs text-slate-400">
                Slide between <strong className="text-emerald-400">Joyful</strong> and <strong className="text-indigo-400">Melancholy</strong>. Releasing the slider re-analyzes the image and regenerates the paragraph to match the vocabulary and atmosphere!
              </p>

              {/* Range Slider Control */}
              <div className="space-y-3">
                <div className="relative pt-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={moodScore}
                    onChange={handleMoodSliderChange}
                    onMouseUp={handleSliderRelease}
                    onTouchEnd={handleSliderRelease}
                    className="w-full h-3 bg-gradient-to-r from-emerald-500 via-amber-400 via-indigo-500 to-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                {/* Slider Scale Endpoints */}
                <div className="flex items-center justify-between text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      setMoodScore(0);
                      generateStory(0);
                    }}
                    className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>0% · Joyful</span>
                  </button>

                  <span className="text-slate-400 text-[11px] font-normal hidden sm:inline">
                    Current: {moodScore}/100
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setMoodScore(100);
                      generateStory(100);
                    }}
                    className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>100% · Melancholy</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Emotional Tone Manifestation */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/60 text-xs space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                  Atmospheric Resonance:
                </span>
                <p className="text-slate-300 italic font-serif leading-relaxed">
                  "{currentMood.quote}"
                </p>
              </div>

              {/* Literary Genre Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Story Genre:
                </label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="Literary Fiction">Literary Fiction</option>
                  <option value="Magical Realism">Magical Realism</option>
                  <option value="Gothic Mystery">Gothic Mystery</option>
                  <option value="Cyberpunk Noir">Cyberpunk Noir</option>
                  <option value="Epic Fantasy">Epic Fantasy</option>
                  <option value="Speculative Sci-Fi">Speculative Sci-Fi</option>
                  <option value="Historical Drama">Historical Drama</option>
                </select>
              </div>

              {/* Manual Re-Analyze & Ghostwrite Button */}
              <button
                type="button"
                onClick={() => generateStory()}
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-[#0f244a] bg-amber-400 hover:bg-amber-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Scene & Ghostwriting...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Re-Analyze Scene & Ghostwrite</span>
                  </>
                )}
              </button>

            </div>

          </div>

          {/* Right Column: Ghostwritten Output & Read Aloud Player (Col 6-12) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Story Presentation Box */}
            <div className="bg-slate-800/95 rounded-3xl border border-slate-700 p-6 sm:p-8 shadow-2xl relative">
              
              {isLoading && (
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs rounded-3xl z-20 flex flex-col items-center justify-center space-y-3">
                  <div className="w-10 h-10 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm font-semibold text-slate-200">
                    Composing with <span className="text-amber-400">{currentMood.label}</span> register...
                  </p>
                </div>
              )}

              {story ? (
                <div className="space-y-6">
                  
                  {/* Story Title & Mood Header */}
                  <div className="border-b border-slate-700 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                          {genre} · Opening Paragraph
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${currentMood.badgeBg}`}>
                          {story.moodBadge}
                        </span>
                      </div>
                      <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        {story.storyTitle}
                      </h2>
                    </div>

                    {/* Quick Utility Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handleCopyStory}
                        className="p-2 text-slate-400 hover:text-white bg-slate-700/60 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                        title="Copy to clipboard"
                      >
                        {hasCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={handleDownloadStory}
                        className="p-2 text-slate-400 hover:text-white bg-slate-700/60 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                        title="Download text file"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => generateStory()}
                        className="p-2 text-slate-400 hover:text-white bg-slate-700/60 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                        title="Regenerate with same mood"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Scene & Mood Analysis Card */}
                  <div className="bg-slate-900/80 rounded-2xl p-4 sm:p-5 border border-slate-700/70 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                      <Eye className="w-4 h-4" />
                      <span>AI Visual & Mood Decomposition</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block font-semibold mb-0.5">Visual Anchor:</span>
                        <p className="text-slate-200">{story.sceneAnalysis.visualFocalPoint}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-semibold mb-0.5">Atmospheric Mood:</span>
                        <p className="text-slate-200">{story.sceneAnalysis.atmosphericMood}</p>
                      </div>
                    </div>

                    {story.sceneAnalysis.sensoryDetails && story.sceneAnalysis.sensoryDetails.length > 0 && (
                      <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-semibold text-slate-400">Sensory Keys:</span>
                        {story.sceneAnalysis.sensoryDetails.map((det, idx) => (
                          <span key={idx} className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                            {det}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* The Ghostwritten Opening Paragraph */}
                  <div className="relative bg-slate-900/50 p-6 sm:p-8 rounded-2xl border border-slate-700/60">
                    <p className="font-serif-display text-lg sm:text-xl text-slate-100 leading-relaxed sm:leading-loose tracking-wide first-letter:text-5xl first-letter:font-serif-display first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-amber-400">
                      {story.openingParagraph}
                    </p>

                    {story.suggestedProtagonistHook && (
                      <div className="mt-5 pt-4 border-t border-slate-800 text-xs text-amber-200/80 italic">
                        <strong>Protagonist Hook:</strong> "{story.suggestedProtagonistHook}"
                      </div>
                    )}
                  </div>

                  {/* MANDATORY FEATURE: Expressive Read Aloud Player */}
                  <div className="bg-gradient-to-r from-blue-950/70 via-indigo-950/70 to-slate-900 rounded-2xl p-5 border border-blue-800/40 shadow-lg space-y-4">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all ${
                          isPlayingAudio ? 'bg-amber-400 text-[#0f244a] scale-105' : 'bg-slate-800 text-amber-400'
                        }`}>
                          <Volume2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white flex items-center gap-2">
                            <span>Read Aloud (Expressive AI Narration)</span>
                            {isPlayingAudio && !isPausedAudio && (
                              <span className="flex items-center gap-0.5">
                                <span className="w-1 h-3 bg-amber-400 animate-pulse" />
                                <span className="w-1 h-4 bg-amber-400 animate-pulse delay-75" />
                                <span className="w-1 h-2 bg-amber-400 animate-pulse delay-150" />
                              </span>
                            )}
                          </h4>
                          <p className="text-xs text-slate-400">
                            Cadence and pitch dynamically tuned to <strong className="text-amber-300">{currentMood.label}</strong>
                          </p>
                        </div>
                      </div>

                      {/* Playback Controls */}
                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={handleToggleReadAloud}
                          className="px-5 py-2.5 text-xs font-bold text-[#0f244a] bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          {isPlayingAudio && !isPausedAudio ? (
                            <>
                              <Pause className="w-4 h-4" />
                              <span>Pause</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 fill-[#0f244a]" />
                              <span>{isPausedAudio ? 'Resume' : 'Read Aloud'}</span>
                            </>
                          )}
                        </button>

                        {isPlayingAudio && (
                          <button
                            type="button"
                            onClick={stopNarration}
                            className="p-2.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                            title="Stop audio"
                          >
                            <Square className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Voice Selection & Expressive Pitch Settings */}
                    {availableVoices.length > 0 && (
                      <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                        <div className="flex items-center gap-2">
                          <span>Voice:</span>
                          <select
                            value={selectedVoiceIndex}
                            onChange={(e) => {
                              setSelectedVoiceIndex(parseInt(e.target.value, 10));
                              stopNarration();
                            }}
                            className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-300 text-xs focus:outline-none"
                          >
                            {availableVoices.slice(0, 8).map((v, i) => (
                              <option key={i} value={i}>
                                {v.name} ({v.lang})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="text-[11px] text-slate-400 flex items-center gap-3">
                          <span>Tempo: {currentMood.speechRate}x</span>
                          <span>·</span>
                          <span>Pitch: {currentMood.speechPitch}x</span>
                        </div>
                      </div>
                    )}

                  </div>

                </div>
              ) : (
                <div className="py-16 text-center text-slate-400 space-y-3">
                  <BookOpen className="w-10 h-10 mx-auto text-slate-600" />
                  <p className="text-sm">Click "Re-Analyze Scene & Ghostwrite" to generate your opening paragraph.</p>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
