import React, { useState } from 'react';
import { Send, Sparkles, AlertCircle } from 'lucide-react';

const T6XPoster = () => {
  const [topic, setTopic] = useState('');
  const [generatedPost, setGeneratedPost] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const generateT6Post = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic first');
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedPost('');

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `Generate a post about "${topic}" using the T6 Framework. The T6 Framework is a philosophical journey through six tiers:

T1: Curiosity - Begin with raw wonder and questions, exploring what pulls us into this topic
T2: Analogy - Use metaphors to bridge abstract to tangible, weaving in relevant data
T3: Insight - Let patterns surface naturally, building on data's pulse
T4: Truth - Ground in what stands solid in reality, backed by evidence. CRITICAL: Include specific data points, studies, numbers, or concrete evidence. Don't just reference "recent studies"—cite actual findings, measurements, or verifiable facts that anchor the exploration. This tier must provide tangible proof that stands up to reality's test.
T5: Groundbreaking Ideas - Uncover bold leaps that emerge from the data. CRITICAL: This must present genuinely disruptive ideas that "break ground on their own"—not just restatements of T3/T4. Push beyond comfortable implications to ideas that challenge fundamental assumptions. What surprising, even uncomfortable conclusion emerges unbidden from the evidence? This tier should make readers pause and reconsider.
T6: Paradigm Shifts - Zoom out to fundamental reweavings that could redefine existence

Key principles:
- Release possession of outcomes (not self), embrace organic growth
- Use data as stepping stones that anchor AND propel—facts catalyze rather than confine
- Ethics emerges naturally from what sustains, tested by reality's weight
- This is a rhythm to ride, not a framework to wield
- Flow through tiers with philosophical surrender to what emerges

STRUCTURE REQUIREMENTS:
- Give T4 its own dedicated space with concrete evidence (specific numbers, studies, measurements)
- Give T5 its own dedicated space with a genuinely bold leap that feels risky or uncomfortable
- Don't rush through T4 and T5 to get to T6
- Make the flow natural but ensure each tier gets substantive treatment

Format the post as a cohesive exploration that flows through these tiers naturally. Make it insightful, thought-provoking, and suitable for X (Twitter). Aim for 4-6 paragraphs that give proper weight to T4 (evidence) and T5 (bold ideas) while maintaining engaging flow.`
          }]
        })
      });

      const data = await response.json();
      
      if (data.content && data.content[0]) {
        setGeneratedPost(data.content[0].text);
      } else {
        setError('Failed to generate post. Please try again.');
      }
    } catch (err) {
      setError('Error connecting to AI. Please check your connection and try again.');
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-purple-300" />
            <h1 className="text-3xl font-bold text-white">T6 Framework Post Generator</h1>
          </div>
          
          <p className="text-purple-200 mb-8">
            Generate X posts that flow through curiosity, analogy, insight, truth, groundbreaking ideas, 
            and paradigm shifts—building on data as stepping stones to transformation.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">
                Enter Your Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., artificial intelligence, climate change, human consciousness..."
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                onKeyPress={(e) => e.key === 'Enter' && generateT6Post()}
              />
            </div>

            <button
              onClick={generateT6Post}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating T6 Post...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Generate T6 Post
                </>
              )}
            </button>

            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
                <p className="text-red-200">{error}</p>
              </div>
            )}

            {generatedPost && (
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/20 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Your T6 Post</h3>
                  <div className="text-purple-100 whitespace-pre-wrap leading-relaxed">
                    {generatedPost}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 border border-white/30"
                  >
                    Copy to Clipboard
                  </button>
                  <button
                    onClick={() => setGeneratedPost('')}
                    className="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 border border-white/30"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <h3 className="text-lg font-semibold text-white mb-3">The T6 Framework Journey</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-white/5 p-3 rounded-lg">
                <span className="text-purple-300 font-semibold">T1: Curiosity</span>
                <p className="text-purple-200 text-xs mt-1">Raw wonder and questions</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <span className="text-purple-300 font-semibold">T2: Analogy</span>
                <p className="text-purple-200 text-xs mt-1">Metaphors bridge understanding</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <span className="text-purple-300 font-semibold">T3: Insight</span>
                <p className="text-purple-200 text-xs mt-1">Patterns surface naturally</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <span className="text-purple-300 font-semibold">T4: Truth</span>
                <p className="text-purple-200 text-xs mt-1">Grounded in evidence</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <span className="text-purple-300 font-semibold">T5: Ideas</span>
                <p className="text-purple-200 text-xs mt-1">Bold leaps emerge</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <span className="text-purple-300 font-semibold">T6: Paradigm Shifts</span>
                <p className="text-purple-200 text-xs mt-1">Fundamental reweavings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default T6XPoster;
