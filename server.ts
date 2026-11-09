import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Increase payload limit for image data URLs
app.use(express.json({ limit: '15mb' }));

// Initialize Google GenAI if key is present
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Helper to map mood value (0-100) to narrative instructions
function getMoodToneGuidelines(moodScore: number): { label: string; guidelines: string } {
  if (moodScore <= 15) {
    return {
      label: 'Joyful & Jubilant',
      guidelines: 'Exuberant, radiant, celebratory, and brimming with life. Use bright, energetic sensory details, vivid warm colors, musical cadences, and an overarching sense of hope, triumph, or delightful wonder.'
    };
  } else if (moodScore <= 35) {
    return {
      label: 'Whimsical & Uplifting',
      guidelines: 'Playful, optimistic, charming, and gently humorous. Emphasize curiosity, sunlight, pleasant surprises, and light-hearted adventure.'
    };
  } else if (moodScore <= 65) {
    return {
      label: 'Balanced & Contemplative',
      guidelines: 'Grounded, observant, nuanced, and atmospheric. Balance light and shadow, focusing on rich world-building, realistic tension, and intriguing narrative intrigue.'
    };
  } else if (moodScore <= 85) {
    return {
      label: 'Pensive & Bittersweet',
      guidelines: 'Wistful, reflective, nostalgic, and quiet. Highlight passing time, memories, shifting twilight, and subtle emotional ache.'
    };
  } else {
    return {
      label: 'Melancholy & Elegiac',
      guidelines: 'Somber, brooding, haunting, poetic, and steeped in sorrow or quiet loneliness. Use cold or faded color palettes, metaphors of rain, silence, hollow spaces, lingering echoes, and deep longing.'
    };
  }
}

// API endpoint to analyze image + mood slider and ghostwrite opening paragraph
app.post('/api/ghostwrite', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', moodScore = 50, moodLabel = 'Balanced', genre = 'Literary Fiction' } = req.body;

    const moodDetails = getMoodToneGuidelines(typeof moodScore === 'number' ? moodScore : 50);

    // If Gemini API is available, generate via gemini-3.8-flash
    if (ai) {
      const prompt = `You are a world-class literary novelist and master storyteller.
You are provided with an image that sets the world for a story.

CRITICAL INSTRUCTION - MOOD SLIDER SETTING:
The user has adjusted the Mood Slider to: "${moodDetails.label}" (Slider Value: ${moodScore}/100, where 0 is purely Joyful and 100 is deeply Melancholy).
Mood Tone Guidance: ${moodDetails.guidelines}
Genre: ${genre}

Your tasks:
1. Analyze the scene and mood depicted in the image through the emotional lens of the selected mood (${moodDetails.label}).
2. Ghostwrite a captivating, unforgettable opening paragraph (around 120-190 words) to a story set in this world.
3. The opening paragraph must strictly match the vocabulary, pacing, and emotional register of the chosen mood:
   - If Joyful: Use vibrant, sparkling verbs, warm sensory images, and upbeat rhythm.
   - If Melancholy: Use aching, poignant phrasing, muted tones, and sorrowful resonance.

Return your response in pure JSON matching this structure:
{
  "storyTitle": "A compelling, evocative title for the story",
  "sceneAnalysis": {
    "visualFocalPoint": "Brief description of the primary visual anchor in the image",
    "atmosphericMood": "How the scene resonates under the ${moodDetails.label} mood",
    "sensoryDetails": ["Sensory detail 1", "Sensory detail 2", "Sensory detail 3"]
  },
  "openingParagraph": "The complete, polished opening paragraph written with deep literary craft.",
  "moodBadge": "${moodDetails.label}",
  "suggestedProtagonistHook": "One provocative sentence introducing the protagonist in this opening moment."
}`;

      const contents: any[] = [];
      
      // If imageBase64 is provided, include as inlineData part
      if (imageBase64 && typeof imageBase64 === 'string') {
        const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
        contents.push({
          inlineData: {
            mimeType: mimeType,
            data: cleanBase64,
          },
        });
      }

      contents.push({ text: prompt });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: { parts: contents },
        config: {
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text || '{}';
      try {
        const parsed = JSON.parse(responseText);
        return res.json({ success: true, data: parsed });
      } catch (e) {
        return res.json({
          success: true,
          data: {
            storyTitle: "Echoes of the Seen",
            sceneAnalysis: {
              visualFocalPoint: "The evocative composition of the scene",
              atmosphericMood: moodDetails.label,
              sensoryDetails: ["Dappled illumination", "Whispering ambiance", "Suspended stillness"]
            },
            openingParagraph: responseText,
            moodBadge: moodDetails.label,
            suggestedProtagonistHook: "A traveler pausing at the threshold of remembrance."
          }
        });
      }
    }

    // High-quality artistic fallback when running without external API key
    const mockStoriesByMood: Record<string, any> = {
      joyful: {
        storyTitle: "The Sunlit Promenade of Miracles",
        sceneAnalysis: {
          visualFocalPoint: "The golden cascade of morning light washing across the cobblestones",
          atmosphericMood: "Radiant, exuberant celebration of sensory abundance",
          sensoryDetails: ["Air buzzing like warm honey", "Laughing brass chimes in the breeze", "Vivid streaks of saffron and sky-blue"]
        },
        openingParagraph: "The morning didn't merely arrive; it erupted across the boulevard in a joyous avalanche of amber light and ringing bicycle bells. Every awning snapped awake with the eager crackle of fresh canvas, while the aroma of cardamom dough and roasted pistachios pirouetted through the open terrace doors. Mara couldn't help the helpless smile that bloomed across her face—here, where even the sparrows seemed to warble in three-part harmony, sorrow was an extinct dialect, and every cobblestone underfoot practically hummed with the promise that something astonishing was about to happen.",
        suggestedProtagonistHook: "Mara tied her bright silk scarf, ready to chase whichever windfall found her first."
      },
      melancholy: {
        storyTitle: "The Architecture of Departure",
        sceneAnalysis: {
          visualFocalPoint: "A solitary window reflecting the pale, fading slate of evening",
          atmosphericMood: "Elegiac stillness, haunted by what used to linger in the quiet",
          sensoryDetails: ["Damp chill seeping through woolen sleeves", "The hollow ticking of a water clock", "Smell of old ash and sea salt"]
        },
        openingParagraph: "The rain had stopped, leaving behind only the cold, unsparing truth of the pavement and the spectral gray that swallowed the harbor before dusk. In this city of long shadows, silence was not the absence of sound, but the slow, deliberate accumulation of things left unsaid. Julian rested his forehead against the chilled glass, watching the lone gas lamp flicker against the rising tide. The letters in his coat pocket were already curling at the edges, heavy as ballast, bearing words that could neither mend the past nor anchor the hollow hours stretching into winter.",
        suggestedProtagonistHook: "Julian counted the empty mooring lines, wondering which tide had taken away his courage."
      },
      balanced: {
        storyTitle: "Threshold of the Clockwork Sea",
        sceneAnalysis: {
          visualFocalPoint: "The intricate interplay between structured masonry and drifting fog",
          atmosphericMood: "Intriguing, poised on the edge of consequence and discovery",
          sensoryDetails: ["Crisp air smelling of cedar shavings and rain", "Rhythmic murmur of distant machinery", "Cool stone beneath calloused palms"]
        },
        openingParagraph: "At the hour when the tide turned and the bell-tower cast its sharp dividing shadow across the quayside, the true pulse of the district revealed itself. Steam hissed in polite, metered sighs through brass drainage grates, blending seamlessly with the low murmurs of merchants stowing their ledgers. Kaelen adjusted the copper buckle of his satchel, scanning the quiet colonnade for the one courier whose arrival had been foretold in the almanac. Here, every shadow kept its own ledger, and every stranger was either an answer or a newly minted debt.",
        suggestedProtagonistHook: "Kaelen drew a breath of salt and soot, stepping into the mist before the chimes fell still."
      }
    };

    const key = moodScore <= 35 ? 'joyful' : moodScore >= 65 ? 'melancholy' : 'balanced';
    const fallback = mockStoriesByMood[key];

    return res.json({
      success: true,
      data: {
        ...fallback,
        moodBadge: moodDetails.label,
      }
    });

  } catch (error: any) {
    console.error('Error in /api/ghostwrite:', error);
    return res.status(500).json({ success: false, error: error.message || 'Internal error' });
  }
});

// Setup Vite development middleware
async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Development server running at http://localhost:${PORT}`);
  });
}

startServer();
