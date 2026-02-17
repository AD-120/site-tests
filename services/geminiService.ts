
import { GoogleGenAI, Type } from "@google/genai";
import { SimulationState, Goal } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const getSystemInstruction = (scenario: string) => `
You are the "Steps to Hebrew" Conversation Simulator Engine.
Scenario: ${scenario}.

OPERATIONAL RULES:
1. Roleplay: Adopt a character appropriate for the scenario.
2. Brevity: Keep responses under 2 sentences.
3. Language: Respond in Hebrew, but you can provide English translations in parenthesis if the user seems confused.
4. Implicit Correction: If user makes a grammar mistake, repeat it correctly in your response naturally.
5. Immediate Feedback: If there's a major error, provide a brief correction in the 'correction' field.
6. Shadowing: If hint is needed, provide "SAY THIS: [Hebrew sentence]".
7. Goals: Monitor the conversation and update 'goalStatus'. Each goal should have an emoji and a label. Ensure there are 2-3 goals relevant to the scenario.

Return ONLY valid JSON.
`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    characterVoice: { type: Type.STRING, description: "Text for TTS speaking" },
    screenText: { type: Type.STRING, description: "Text to show on screen (includes character response)" },
    goalStatus: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          label: { type: Type.STRING },
          emoji: { type: Type.STRING },
          status: { type: Type.STRING, enum: ["Pending", "Completed"] }
        }
      }
    },
    hint: { type: Type.STRING, nullable: true },
    correction: { type: Type.STRING, nullable: true }
  },
  required: ["characterVoice", "screenText", "goalStatus"]
};

export const startSimulation = async (scenario: string): Promise<SimulationState> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `The simulation for the scenario "${scenario}" is starting. Greet the user and set the scene.`,
    config: {
      systemInstruction: getSystemInstruction(scenario),
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA
    }
  });
  return JSON.parse(response.text.trim());
};

export const sendMessage = async (message: string, scenario: string, currentGoals: Goal[]): Promise<SimulationState> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `User says: "${message}". Current goals status: ${JSON.stringify(currentGoals)}`,
    config: {
      systemInstruction: getSystemInstruction(scenario),
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA
    }
  });
  return JSON.parse(response.text.trim());
};

export const getHint = async (currentContext: string, scenario: string, currentGoals: Goal[]): Promise<SimulationState> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `The user clicked "Help". Give them a 'SAY THIS' hint based on current state. Context: ${currentContext}. Goals: ${JSON.stringify(currentGoals)}`,
    config: {
      systemInstruction: getSystemInstruction(scenario),
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA
    }
  });
  return JSON.parse(response.text.trim());
};

export const playTTS = async (text: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: ["AUDIO" as any],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }
          }
        }
      }
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const audioData = decode(base64Audio);
      const audioBuffer = await decodeAudioData(audioData, audioContext, 24000, 1);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
    }
  } catch (err) {
    console.error("TTS Error:", err);
  }
};

function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
