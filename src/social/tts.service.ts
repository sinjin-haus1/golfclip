import { Injectable } from '@nestjs/common';
import axios from 'axios';

export enum TTSProvider {
  OPENAI = 'openai',
  ELEVENLABS = 'elevenlabs',
}

export interface TrendingHook {
  id: string;
  style: string;
  hooks: string[];
}

@Injectable()
export class TtsService {
  private readonly openAiKey = process.env.OPENAI_API_KEY;
  private readonly elevenLabsKey = process.env.ELEVENLABS_API_KEY;
  private readonly elevenLabsVoiceId = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikYAM';

  // Trending hooks for golf niche
  private readonly golfHooks: TrendingHook[] = [
    {
      id: 'swing_transform',
      style: 'SWING_TRANSFORM',
      hooks: [
        'This single change transformed my student\'s swing in just 2 weeks',
        'The difference between these two swings will blow your mind',
        'Most amateur golfers make this mistake — here\'s how to fix it',
        'Before and after: Watch this swing technique change everything',
        'The secret that pro golfers don\'t want you to know',
      ],
    },
    {
      id: 'putting_master',
      style: 'PUTTING_MASTER',
      hooks: [
        'Stop 3-putting with this one simple technique',
        'Your putting stance is costing you strokes — here\'s the fix',
        'The 10-foot putt drill every golfer needs to master',
        'Why your putter face is open (and how to square it up)',
        'This putting grip change took my students\' scores down fast',
      ],
    },
    {
      id: 'drill_demo',
      style: 'DRILL_DEMO',
      hooks: [
        'Do this drill every day and watch your swing transform',
        'The easiest drill to improve your contact immediately',
        'This 5-minute drill will fix your slice for good',
        'If you only do one drill this season, make it this one',
        'The drill that helped me break 80 for the first time',
      ],
    },
    {
      id: 'course_strategy',
      style: 'COURSE_STRATEGY',
      hooks: [
        'Most golfers play the wrong club on this shot — here\'s why',
        'The course management secret that will save you 3 strokes per round',
        'Why laying up is actually the smart play (and when to go for it)',
        'The strategy most pros use that amateur golfers ignore',
        'Playing smarter golf: The shot selection most golfers miss',
      ],
    },
    {
      id: 'lesson_highlight',
      style: 'LESSON_HIGHLIGHT',
      hooks: [
        'This student came to me struggling with their driver — watch what happened',
        'In just one lesson, we fixed the swing issue that was costing them 15 yards',
        'The most common swing flaw I see (and how to correct it)',
        'What this student learned in 30 minutes changed their game forever',
        'The breakthrough moment every golfer is looking for',
      ],
    },
  ];

  /**
   * Generate TTS audio from text using OpenAI
   */
  async textToSpeechOpenAI(text: string, voice = 'onyx'): Promise<Buffer> {
    const response = await axios.post(
      'https://api.openai.com/v1/audio/speech',
      { model: 'gpt-4o-mini', voice, input: text, response_format: 'mp3' },
      { headers: { Authorization: `Bearer ${this.openAiKey}`, 'Content-Type': 'application/json' } },
    );
    return Buffer.from(response.data);
  }

  /**
   * Generate TTS audio from text using ElevenLabs
   */
  async textToSpeechElevenLabs(text: string, voiceId?: string): Promise<Buffer> {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId || this.elevenLabsVoiceId}`,
      { text, model_id: 'eleven_monolingual_v1', voice_settings: { stability: 0.5, similarity_boost: 0.8 } },
      { headers: { 'xi-api-key': this.elevenLabsKey, 'Content-Type': 'application/json' }, responseType: 'arraybuffer' },
    );
    return Buffer.from(response.data);
  }

  /**
   * Generate TTS audio (auto-selects provider based on available API key)
   */
  async textToSpeech(text: string, provider?: TTSProvider): Promise<Buffer> {
    const p = provider || (this.openAiKey ? TTSProvider.OPENAI : TTSProvider.ELEVENLABS);
    if (p === TTSProvider.ELEVENLABS) {
      if (!this.elevenLabsKey) throw new Error('No ElevenLabs API key configured');
      return this.textToSpeechElevenLabs(text);
    }
    if (!this.openAiKey) throw new Error('No OpenAI API key configured');
    return this.textToSpeechOpenAI(text);
  }

  /**
   * Get a random trending hook for a given video style
   */
  getRandomHook(style: string): string {
    const hookGroup = this.golfHooks.find(h => h.style === style);
    if (!hookGroup) return 'Transform your golf game with this one tip';
    const hooks = hookGroup.hooks;
    return hooks[Math.floor(Math.random() * hooks.length)];
  }

  /**
   * Generate a full narration script for a golf video
   */
  generateScript(style: string, studentName?: string, specificTip?: string): string {
    const hook = this.getRandomHook(style);
    const name = studentName || 'my student';

    const templates: Record<string, string[]> = {
      SWING_TRANSFORM: [
        `${hook}. Let me show you what we worked on this week. Watch the before — inconsistent contact, steep angle. Now look at the after — smooth transition, proper sequencing. The change? We focused on weight transfer and hip rotation. Give this drill a try and watch your swing level up. Subscribe for more golf tips!`,
        `${hook}. I showed ${name} this one adjustment and their compression improved instantly. Notice the before swing — casting, early release. The after? Full extension, lag, power from the ground up. Try this in your next range session and let me know the results. Follow for weekly golf transformations!`,
      ],
      PUTTING_MASTER: [
        `${hook}. Let's break down the putting setup that changed everything. Alignment, ball position, and this grip adjustment — it all adds up. Watch how we restructured the stroke from takeaway to follow-through. Master this and you'll never three-putt from 15 feet again. Like and follow for more putting mastery!`,
        `${hook}. If you struggle with distance control, this is for you. We changed ${name}'s putting routine in just one session. The results? More consistent rolls, more made putts. Watch the technique breakdown and try it yourself. Hit follow if you want weekly putting drills!`,
      ],
      DRILL_DEMO: [
        `${hook}. Grab a club and try this drill with me. We're building muscle memory for a better swing. Step one — proper takeaway. Step two — hip trigger. Step three — full rotation through. Do this five minutes a day and you'll see the difference on the course. Subscribe and let's get better together!`,
        `${hook}. This drill is the one I recommend to every golfer who wants instant results. No more slices, no more topped shots. We're building the correct swing plane from scratch. Watch, try it, and let me know your results. Follow for daily golf drills!`,
      ],
      COURSE_STRATEGY: [
        `${hook}. Course management is what separates single-digit handicaps from everyone else. Today we're breaking down when to lay up, when to go for it, and how to read each shot. ${name} learned this framework and dropped three strokes immediately. Play smarter, score lower. Follow for more course strategy!`,
        `${hook}. Most amateurs play too many shots. The pros think two shots ahead. Let me show you the strategy that will change how you approach every hole. Club selection, risk assessment, when to be aggressive — we cover it all. Subscribe and start playing smarter golf today!`,
      ],
      LESSON_HIGHLIGHT: [
        `${hook}. Every golfer deserves to feel this kind of confidence. Today I worked with ${name} on their biggest struggle — and look at the transformation. From frustration to flush contact, from lost balls to fairway finds. This is what proper instruction looks like. Follow for more lesson highlights!`,
        `${hook}. The breakthrough moment is what I live for. This student came in struggling with their irons — inconsistent bottoming, fat shots. After one session of focused correction, everything clicked. Watch the full breakdown and see if you recognize these swing faults in your own game. Subscribe for weekly lessons!`,
      ],
    };

    const lines = templates[style] || templates['LESSON_HIGHLIGHT'];
    return lines[Math.floor(Math.random() * lines.length)];
  }

  getGolfHooks(): TrendingHook[] {
    return this.golfHooks;
  }
}
