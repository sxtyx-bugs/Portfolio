import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Book, PenTool, Users, MessageCircle, RotateCcw, Palette } from 'lucide-react';
import type { GuestbookEntry, InsertGuestbookEntry } from '@shared/schema';

interface GuestbookProps {
  className?: string;
}

export default function Guestbook({ className = '' }: GuestbookProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<InsertGuestbookEntry>({
    name: '',
    message: '',
    signature: ''
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Fetch guestbook entries
  const { data: entries = [], isLoading } = useQuery<GuestbookEntry[]>({
    queryKey: ['/api/guestbook'],
  });

  // Create guestbook entry mutation
  const createEntryMutation = useMutation({
    mutationFn: async (data: InsertGuestbookEntry) => {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to create guestbook entry');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/guestbook'] });
      setFormData({
        name: '',
        message: '',
        signature: ''
      });
      clearCanvas();
      setShowForm(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.message.trim()) {
      const canvas = canvasRef.current;
      const signatureData = canvas ? canvas.toDataURL() : undefined;
      createEntryMutation.mutate({
        ...formData,
        signature: signatureData,
      });
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Add a subtle background
        ctx.fillStyle = '#fafafa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Add guidelines
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.75);
        ctx.lineTo(canvas.width, canvas.height * 0.75);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Touch events for mobile
  const startTouchDrawing = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const touchDraw = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;
    
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
  };

  const stopTouchDrawing = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(false);
  };

  // Initialize canvas when form is shown
  useState(() => {
    if (showForm) {
      setTimeout(() => clearCanvas(), 100);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className={`py-32 bg-white dark:bg-gray-900 transition-colors duration-300 ${className}`} data-testid="guestbook-section">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <h2 className="font-handwritten text-6xl font-bold mb-8 text-gray-900 dark:text-gray-100 relative" data-testid="guestbook-title">
            Visitor Guestbook
            <div className="absolute -top-6 -right-16 text-3xl animate-float">📝</div>
          </h2>
          <p className="font-sketch text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Leave your mark with a sketch-style signature! Share your thoughts and connect with fellow visitors.
          </p>
          
          {/* Sign Guestbook Button */}
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-8 py-4 font-handwritten text-xl sketch-border hover:bg-gray-700 dark:hover:bg-gray-300 transition-all duration-300 flex items-center mx-auto space-x-3 creative-glow"
              data-testid="sign-guestbook-btn"
            >
              <PenTool className="w-5 h-5" />
              <span>Sign Guestbook</span>
            </button>
          )}
        </div>

        {/* Guestbook Form */}
        {showForm && (
          <div className="max-w-2xl mx-auto mb-16" data-testid="guestbook-form">
            <div className="bg-white dark:bg-gray-800 p-8 sketch-card relative">
              <div className="absolute -top-3 -left-3 text-2xl opacity-30">✏️</div>
              <div className="absolute -bottom-2 -right-2 text-xl opacity-20">📋</div>
              
              <h3 className="font-handwritten text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
                Leave Your Sketch Signature
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="font-handwritten text-lg text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    required
                    className="w-full p-3 sketch-border bg-transparent font-sketch text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    placeholder="Your artistic name..."
                    data-testid="guestbook-name-input"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-handwritten text-lg text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>Message *</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message || ''}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full p-3 sketch-border bg-transparent font-sketch text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
                    placeholder="Leave your creative thoughts and sketch-style message here..."
                    data-testid="guestbook-message-input"
                  />
                </div>

                {/* Hand-drawn Signature Canvas */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-handwritten text-lg text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                      <Palette className="w-4 h-4" />
                      <span>Draw Your Signature</span>
                    </label>
                    <button
                      type="button"
                      onClick={clearCanvas}
                      className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 sketch-border bg-transparent transition-colors"
                      data-testid="clear-signature-btn"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  </div>
                  <div className="relative">
                    <canvas
                      ref={canvasRef}
                      width={400}
                      height={120}
                      className="w-full h-auto sketch-border cursor-crosshair bg-gray-50 dark:bg-gray-700"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startTouchDrawing}
                      onTouchMove={touchDraw}
                      onTouchEnd={stopTouchDrawing}
                      data-testid="signature-canvas"
                    />
                    <div className="absolute bottom-1 right-2 text-xs text-gray-400 font-sketch pointer-events-none">
                      Draw with mouse or finger
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 font-handwritten text-lg text-gray-600 dark:text-gray-400 sketch-border bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                    data-testid="guestbook-cancel-btn"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createEntryMutation.isPending || !formData.name.trim() || !formData.message.trim()}
                    className="px-8 py-3 font-handwritten text-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 sketch-border hover:bg-gray-700 dark:hover:bg-gray-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed creative-glow"
                    data-testid="guestbook-submit-btn"
                  >
                    {createEntryMutation.isPending ? 'Signing...' : 'Sign Guestbook'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Guestbook Entries */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-3">
              <Book className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              <h3 className="font-handwritten text-3xl font-bold text-gray-900 dark:text-gray-100">
                Visitor Signatures ({entries.length})
              </h3>
              <Book className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-16">
              <div className="animate-spin w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full mx-auto mb-4"></div>
              <p className="font-sketch text-gray-600 dark:text-gray-400">Loading signatures...</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4 opacity-30">📝</div>
              <p className="font-handwritten text-2xl text-gray-600 dark:text-gray-400 mb-4">
                Be the first to sign the guestbook!
              </p>
              <p className="font-sketch text-gray-500 dark:text-gray-500">
                Your creative signature will appear here with a hand-drawn style.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {entries.map((entry, index) => (
                <div 
                  key={entry.id} 
                  className={`bg-white dark:bg-gray-800 p-6 sketch-card hover:shadow-lg transition-all duration-300 ${
                    index % 2 === 0 ? 'transform rotate-1' : 'transform -rotate-1'
                  }`}
                  data-testid={`guestbook-entry-${entry.id}`}
                >
                  <div className="relative">
                    {/* Doodle decorations */}
                    <div className="absolute -top-2 -left-2 text-lg opacity-20">✨</div>
                    <div className="absolute -bottom-1 -right-1 text-sm opacity-15">🎨</div>
                    
                    {/* Entry Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-handwritten text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                          {entry.name}
                        </h4>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500 font-sketch">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-none border-l-4 border-gray-300 dark:border-gray-600 relative mb-4">
                      <p className="font-sketch text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                        {entry.message}
                      </p>
                    </div>

                    {/* Hand-drawn Signature */}
                    {entry.signature && (
                      <div className="mt-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <PenTool className="w-3 h-3 text-gray-500" />
                          <span className="text-xs text-gray-500 dark:text-gray-400 font-sketch">Hand-drawn signature:</span>
                        </div>
                        <div className="bg-white dark:bg-gray-600 p-2 sketch-border">
                          <img 
                            src={entry.signature} 
                            alt={`${entry.name}'s signature`}
                            className="max-w-full h-auto"
                            style={{ maxHeight: '80px' }}
                            data-testid={`signature-${entry.id}`}
                          />
                        </div>
                      </div>
                    )}

                    {/* Traditional signature line for entries without drawing */}
                    {!entry.signature && (
                      <div className="mt-4 flex justify-end">
                        <div className="w-32 h-0.5 bg-gray-400 dark:bg-gray-500 relative">
                          <div className="absolute -right-1 -top-1 w-2 h-2 border border-gray-400 dark:border-gray-500 transform rotate-45"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}