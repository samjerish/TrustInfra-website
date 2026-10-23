'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuthStore } from '@/stores';
import { ROLE_LABELS } from '@/lib/constants';
import type { UserRole } from '@/types';
import {
  Camera, Heart, MessageSquare, Send, FileText, CheckCircle2,
  MapPin, Eye, Plus, Sparkles, X, Download, Share2,
  UserPlus, Check, Image as ImageIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock initial stories (live sites)
const initialStories = [
  { id: 1, name: 'Block A Pour', project: 'Green Valley', active: true, avatar: '🏗️' },
  { id: 2, name: 'Steel Check', project: 'Sunrise Plaza', active: true, avatar: '📐' },
  { id: 3, name: 'Slab Curing', project: 'Lakeview Apts', active: false, avatar: '💧' },
  { id: 4, name: 'Plumbing test', project: 'Metro Park', active: false, avatar: '🚰' },
  { id: 5, name: 'Glass facade', project: 'Infinity Tower', active: true, avatar: '🏢' },
];

// Pre-set mockup images representing gorgeous construction results/work
const MOCK_PHOTOS = [
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop', // concrete / structural
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop', // modern house architecture
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop', // scaffolding / engineer
  'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=600&auto=format&fit=crop', // cad blueprint on screen
  'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=600&auto=format&fit=crop', // brick masonry
];

// Mock Initial social posts
const initialPosts = [
  {
    id: 1,
    author: {
      name: 'Priya Sharma',
      role: 'architect',
      avatar: '📐',
      fullName: 'Priya Sharma (Principal Architect)',
    },
    location: 'DesignHub Studio, Bengaluru',
    content: 'Just finalized the structural layout & floor plan revisions for the Green Valley Lakeside Villa. We optimized natural light vectors by shifting the dining atrium 2.4 meters west. Swipe to view the floor plans and CAD file details attached below!',
    image: MOCK_PHOTOS[1],
    likes: 42,
    hasLiked: false,
    comments: [
      { author: 'Arun Verma', role: 'engineer', content: 'Looks great! The load transfer on the west column group is much better with this cantilever.', time: '1h ago' },
      { author: 'Rajesh Kumar', role: 'customer', content: 'Incredible design, Priya! I really love how the master bedroom opens to the pool deck.', time: '30m ago' }
    ],
    pdfAttachment: {
      name: 'Lakeside_Villa_FloorPlan_v4.pdf',
      size: '4.8 MB',
      type: 'floor_plan',
      description: 'Complete 2D floor layout including electrical conduit guidelines and structural masonry spacing.'
    },
    tags: ['architecture', 'cadrender', 'sustainabledesign'],
    createdAt: '2 hours ago'
  },
  {
    id: 2,
    author: {
      name: 'Arun Verma',
      role: 'engineer',
      avatar: '👷',
      fullName: 'Arun Verma (Lead Civil Engineer)',
    },
    location: 'Green Valley Site, Block B',
    content: 'Compresive strength testing is complete for the concrete foundation pour (Grade M25). Verified at 28.5 N/mm² after 28 days of curing - exceeding standard thresholds. Full geotechnical lab certificate attached.',
    image: MOCK_PHOTOS[0],
    likes: 31,
    hasLiked: false,
    comments: [
      { author: 'Deepak Singh', role: 'supervisor', content: 'Excellent curation by the crew. The water-cement ratio was tightly maintained.', time: '3h ago' }
    ],
    pdfAttachment: {
      name: 'Foundation_M25_LabReport.pdf',
      size: '1.8 MB',
      type: 'survey_report',
      description: 'Compressive test results, slump testing sheets, and supplier cement quality certificates.'
    },
    tags: ['civilengineering', 'concretecuring', 'geotechnical'],
    createdAt: '5 hours ago'
  },
  {
    id: 3,
    author: {
      name: 'Deepak Singh',
      role: 'supervisor',
      avatar: '📋',
      fullName: 'Deepak Singh (Site Supervisor)',
    },
    location: 'Sunrise Commercial Plaza',
    content: 'Reinforced the scaffolding grids on the south facade. All safety harness lines double-locked. Ready for plastering crews tomorrow morning. Safe sites are productive sites!',
    image: MOCK_PHOTOS[2],
    likes: 18,
    hasLiked: false,
    comments: [],
    pdfAttachment: null,
    tags: ['safetystandards', 'scaffolding', 'supervision'],
    createdAt: '1 day ago'
  },
  {
    id: 4,
    author: {
      name: 'Ram Singh',
      role: 'worker',
      avatar: '🧱',
      fullName: 'Ram Singh (Master Mason)',
    },
    location: 'Lakeview Residential Block A',
    content: 'Completed the double-arch brick doorway today. Took four days of manual leveling, but the mortar symmetry is perfect. Hand-finished with structural clay bricks.',
    image: MOCK_PHOTOS[4],
    likes: 56,
    hasLiked: true,
    comments: [
      { author: 'Priya Sharma', role: 'architect', content: 'Stunning craftsmanship, Ram! This is exactly what I envisioned for the entrance.', time: '12h ago' },
      { author: 'Arun Verma', role: 'engineer', content: 'Solid load distribution on the arch apex. Top notch workmanship.', time: '10h ago' }
    ],
    pdfAttachment: null,
    tags: ['masonry', 'brickwork', 'craftsmanship'],
    createdAt: '2 days ago'
  }
];

// Sidebar recommended professionals
const recommendedUsers = [
  { name: 'Sanjay Rawat', role: 'engineer', avatar: '👷', rate: '₹4,500/day', rating: '4.9 (45 jobs)' },
  { name: 'Kavita Nair', role: 'architect', avatar: '📐', rate: '₹6,000/day', rating: '5.0 (28 jobs)' },
  { name: 'Gurpreet Singh', role: 'supervisor', avatar: '📋', rate: '₹3,500/day', rating: '4.8 (52 jobs)' },
  { name: 'Mohammad Ali', role: 'worker', avatar: '🧱', rate: '₹1,800/day', rating: '4.7 (89 jobs)' },
];

export default function FeedPage() {
  const { user } = useAuthStore();
  const [posts, setPosts] = useState(initialPosts);
  
  // Post Creator State
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [caption, setCaption] = useState('');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [location, setLocation] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [attachPdf, setAttachPdf] = useState(false);
  const [pdfName, setPdfName] = useState('');
  const [pdfType, setPdfType] = useState('floor_plan');
  
  // Interaction State
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  
  // PDF Preview State
  const [previewPdf, setPreviewPdf] = useState<any | null>(null);
  
  // Stories site check State
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

  // Like handler
  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
          hasLiked: !post.hasLiked
        };
      }
      return post;
    }));
  };

  // Comment input text handler
  const handleCommentTextChange = (postId: number, text: string) => {
    setCommentInputs({
      ...commentInputs,
      [postId]: text
    });
  };

  // Submit comment handler
  const handleAddComment = (e: React.FormEvent, postId: number) => {
    e.preventDefault();
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              author: user?.fullName || 'Rajesh Kumar',
              role: user?.role || 'customer',
              content: commentText,
              time: 'Just now'
            }
          ]
        };
      }
      return post;
    }));

    // Reset input
    setCommentInputs({
      ...commentInputs,
      [postId]: ''
    });
  };

  // Create post submit handler
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) return;

    const tagsArray = tagsInput
      .split(',')
      .map(tag => tag.trim().toLowerCase().replace('#', ''))
      .filter(tag => tag.length > 0);

    const newPost = {
      id: Date.now(),
      author: {
        name: user?.fullName || 'Rajesh Kumar',
        role: user?.role || 'customer',
        avatar: user?.role === 'architect' ? '📐' : user?.role === 'engineer' ? '👷' : user?.role === 'supervisor' ? '📋' : '🧱',
        fullName: `${user?.fullName || 'Rajesh Kumar'} (${ROLE_LABELS[user?.role || 'customer']})`
      },
      location: location || 'Construction HQ',
      content: caption,
      image: MOCK_PHOTOS[selectedPhotoIndex],
      likes: 0,
      hasLiked: false,
      comments: [],
      pdfAttachment: attachPdf ? {
        name: pdfName || 'Site_Document.pdf',
        size: '2.5 MB',
        type: pdfType,
        description: 'Uploaded construction documentation and specifications.'
      } : null,
      tags: tagsArray.length > 0 ? tagsArray : ['construction', 'progress'],
      createdAt: 'Just now'
    };

    setPosts([newPost, ...posts]);
    
    // Reset Form & Close Modal
    setCaption('');
    setSelectedPhotoIndex(0);
    setLocation('');
    setTagsInput('');
    setAttachPdf(false);
    setPdfName('');
    setIsPostModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
        
        {/* ==============================================
           LEFT COLUMN: Stories + Feed
           ============================================== */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Stories section (Active Sites) */}
          <div className="premium-card p-4 overflow-x-auto flex gap-4 scrollbar-none animate-fade-in">
            <div className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0" onClick={() => setIsPostModalOpen(true)}>
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-surface-300 dark:border-surface-700 flex items-center justify-center bg-surface-50 dark:bg-surface-900 text-surface-500 hover:text-brand-500 hover:border-brand-500 transition-colors">
                <Plus className="w-6 h-6" />
              </div>
              <span className="text-2xs font-medium text-surface-600 dark:text-surface-400">Post Work</span>
            </div>
            
            {initialStories.map((story) => (
              <div 
                key={story.id} 
                className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0"
                onClick={() => setActiveStoryIndex(story.id)}
              >
                <div className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all",
                  story.active 
                    ? "ring-2 ring-brand-500 ring-offset-2 ring-offset-white dark:ring-offset-surface-950 bg-gradient-to-tr from-brand-500 to-purple-600 text-white" 
                    : "bg-surface-100 dark:bg-surface-800 border border-surface-300 dark:border-surface-700 text-surface-600"
                )}>
                  {story.avatar}
                </div>
                <span className="text-2xs font-medium text-surface-600 dark:text-surface-400 truncate max-w-[70px]">{story.name}</span>
              </div>
            ))}
          </div>

          {/* Social Instagram Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.id} className="premium-card overflow-hidden animate-fade-in group">
                
                {/* Post Header */}
                <div className="flex items-center justify-between p-4 border-b border-surface-200 dark:border-surface-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-xl border border-surface-200 dark:border-surface-800">
                      {post.author.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-surface-900 dark:text-white hover:text-brand-500 transition-colors cursor-pointer">
                          {post.author.name}
                        </span>
                        <span className="text-2xs uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 font-semibold font-mono">
                          {ROLE_LABELS[post.author.role as UserRole]}
                        </span>
                      </div>
                      <p className="text-2xs text-surface-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-surface-400" /> {post.location}
                      </p>
                    </div>
                  </div>
                  
                  {/* Option / Hire Button */}
                  {user?.role === 'customer' && post.author.role !== 'customer' && (
                    <a 
                      href={`/team-builder?hire=${encodeURIComponent(post.author.name)}&role=${post.author.role}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-2xs font-semibold shadow-glow transition-all"
                    >
                      <UserPlus className="w-3.5 h-3.5" /> Select for Team
                    </a>
                  )}
                </div>

                {/* Post Body (Caption Text) */}
                <div className="p-4 pt-3 pb-3">
                  <p className="text-xs text-surface-800 dark:text-surface-200 leading-relaxed">
                    {post.content}
                  </p>
                  
                  {/* Tag List */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-2xs text-brand-500 font-medium hover:underline cursor-pointer">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Post Media (Image) */}
                {post.image && (
                  <div className="relative aspect-[4/3] bg-surface-100 dark:bg-surface-900 border-y border-surface-200 dark:border-surface-800 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={post.image} 
                      alt="Construction site highlight" 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                    />
                  </div>
                )}

                {/* PDF Blueprint Attachment (If any) */}
                {post.pdfAttachment && (
                  <div className="mx-4 my-3 p-3 rounded-xl border border-surface-200 dark:border-surface-800/80 bg-surface-50 dark:bg-surface-900/60 flex items-center justify-between gap-4 group/pdf hover:border-brand-500/50 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center flex-shrink-0 font-bold border border-red-500/20">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-surface-900 dark:text-white truncate">
                          {post.pdfAttachment.name}
                        </p>
                        <p className="text-2xs text-surface-400 mt-0.5">
                          PDF Portfolio • {post.pdfAttachment.size} • <span className="capitalize">{post.pdfAttachment.type.replace('_', ' ')}</span>
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setPreviewPdf(post.pdfAttachment)}
                      className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-surface-800 text-2xs font-medium border border-surface-200 dark:border-surface-700 hover:border-brand-500/50 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> View PDF
                    </button>
                  </div>
                )}

                {/* Interactive Bar (Likes / Comments) */}
                <div className="p-4 py-3 flex items-center justify-between border-t border-surface-200 dark:border-surface-800">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1.5 text-xs font-medium text-surface-500 hover:text-red-500 dark:hover:text-red-400 transition-colors group/like"
                    >
                      <Heart className={cn(
                        "w-5 h-5 transition-transform group-active/like:scale-125",
                        post.hasLiked ? "fill-red-500 text-red-500" : "text-surface-400 dark:text-surface-500"
                      )} />
                      <span>{post.likes} Likes</span>
                    </button>
                    
                    <div className="flex items-center gap-1.5 text-xs font-medium text-surface-500">
                      <MessageSquare className="w-5 h-5 text-surface-400 dark:text-surface-500" />
                      <span>{post.comments.length} Comments</span>
                    </div>
                  </div>

                  <button className="text-surface-400 hover:text-brand-500 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Comments Thread */}
                {post.comments.length > 0 && (
                  <div className="px-4 pb-3 space-y-2 border-t border-surface-100 dark:border-surface-800/40 pt-3 bg-surface-50/50 dark:bg-surface-900/10">
                    {post.comments.map((comment, index) => (
                      <div key={index} className="text-xs">
                        <div className="flex items-start gap-1">
                          <span className="font-semibold text-surface-900 dark:text-white mr-1 cursor-pointer">
                            {comment.author}
                          </span>
                          <span className="text-2xs font-mono uppercase tracking-wider text-surface-400 px-1 py-0.2 rounded bg-surface-200 dark:bg-surface-800 text-[9px] mr-1.5">
                            {comment.role}
                          </span>
                          <span className="text-surface-700 dark:text-surface-300 leading-relaxed flex-1">
                            {comment.content}
                          </span>
                        </div>
                        <span className="text-3xs text-surface-400 block mt-0.5 ml-1">{comment.time}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Comment Input */}
                <form 
                  onSubmit={(e) => handleAddComment(e, post.id)}
                  className="flex items-center border-t border-surface-200 dark:border-surface-800 p-2"
                >
                  <input
                    type="text"
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => handleCommentTextChange(post.id, e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 bg-transparent border-0 outline-none text-xs text-surface-700 dark:text-surface-300 px-3 placeholder:text-surface-400"
                  />
                  <button 
                    type="submit"
                    disabled={!commentInputs[post.id]?.trim()}
                    className="p-1.5 rounded-lg text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-500/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

              </article>
            ))}
          </div>

        </div>

        {/* ==============================================
           RIGHT COLUMN: Sidebar Info / Professionals Spot
           ============================================== */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* User Profile Card */}
          <div className="premium-card p-5 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-brand-50 dark:bg-brand-500/10 border border-surface-200 dark:border-surface-800 flex items-center justify-center text-3xl mb-3 shadow-sm">
              {user?.role === 'customer' ? '🏠' : user?.role === 'architect' ? '📐' : user?.role === 'engineer' ? '👷' : '🧱'}
            </div>
            <h3 className="font-bold text-sm text-surface-900 dark:text-white">
              {user?.fullName || 'Rajesh Kumar'}
            </h3>
            <span className="text-3xs font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 font-semibold mt-1 inline-block">
              {ROLE_LABELS[user?.role || 'customer']}
            </span>
            
            <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-surface-200 dark:border-surface-800">
              <div>
                <p className="text-2xs text-surface-400">Total Posts</p>
                <p className="text-sm font-bold text-surface-900 dark:text-white mt-0.5">8</p>
              </div>
              <div>
                <p className="text-2xs text-surface-400">Collaborations</p>
                <p className="text-sm font-bold text-surface-900 dark:text-white mt-0.5">14</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsPostModalOpen(true)}
              className="w-full mt-6 btn-primary text-xs py-2.5 flex items-center justify-center gap-1.5"
            >
              <Camera className="w-4 h-4" /> Post Your Work
            </button>
          </div>

          {/* Who to hire spotlight */}
          <div className="premium-card">
            <div className="flex items-center justify-between p-5 border-b border-surface-200 dark:border-surface-800">
              <h3 className="font-bold text-sm text-surface-900 dark:text-white">Top Pro Builders</h3>
              <span className="text-3xs text-brand-500 font-bold uppercase tracking-wider hover:underline cursor-pointer">View All</span>
            </div>
            <div className="p-4 space-y-4">
              {recommendedUsers.map((rec) => (
                <div key={rec.name} className="flex items-center justify-between gap-3 group/rec">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-surface-50 dark:bg-surface-900 flex items-center justify-center border border-surface-200 dark:border-surface-800 text-lg">
                      {rec.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-surface-900 dark:text-white group-hover/rec:text-brand-500 transition-colors">
                        {rec.name}
                      </p>
                      <p className="text-3xs text-surface-400 capitalize mt-0.5">
                        {rec.role} • {rec.rating}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xs font-bold text-surface-700 dark:text-surface-300 block">{rec.rate}</span>
                    {user?.role === 'customer' && (
                      <a 
                        href={`/team-builder?hire=${encodeURIComponent(rec.name)}&role=${rec.role}`}
                        className="text-[10px] text-brand-500 font-semibold hover:underline block cursor-pointer"
                      >
                        Hire/Add
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Community Tags */}
          <div className="premium-card p-5">
            <h3 className="font-bold text-sm text-surface-900 dark:text-white mb-4">Trending Community Topics</h3>
            <div className="space-y-3">
              {[
                { tag: 'M25FoundationMix', count: '1.2k posts', icon: '🏗️' },
                { tag: 'AutoCADLayoutPlanners', count: '942 posts', icon: '📐' },
                { tag: 'EarthquakeSafeStructure', count: '820 posts', icon: '🛡️' },
                { tag: 'BambooReinforcedBuild', count: '412 posts', icon: '🌿' },
              ].map(topic => (
                <div key={topic.tag} className="flex items-center justify-between text-xs cursor-pointer hover:bg-surface-50 dark:hover:bg-surface-900/60 p-1.5 rounded-lg transition-colors">
                  <span className="text-surface-700 dark:text-surface-300 font-medium">
                    {topic.icon} #{topic.tag}
                  </span>
                  <span className="text-2xs text-surface-400">{topic.count}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ==============================================
         MODAL: CREATE INSTAGRAM POST
         ============================================== */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsPostModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-xl p-6 shadow-glass-lg animate-scale-in max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-surface-200 dark:border-surface-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-500" />
                <h3 className="font-bold text-base text-surface-900 dark:text-white">Showcase Your Work</h3>
              </div>
              <button onClick={() => setIsPostModalOpen(false)} className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <form onSubmit={handleCreatePost} className="space-y-4">
              
              {/* Caption text */}
              <div>
                <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1.5">Caption & Description</label>
                <textarea
                  required
                  rows={3}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Describe your construction progress, structural choices, or architectural details..."
                  className="input-field min-h-[80px]"
                />
              </div>

              {/* Photo Selector */}
              <div>
                <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1.5">Select Project Image</label>
                <div className="grid grid-cols-5 gap-2">
                  {MOCK_PHOTOS.map((ph, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPhotoIndex(idx)}
                      className={cn(
                        "aspect-[4/3] rounded-lg overflow-hidden border-2 relative transition-all",
                        selectedPhotoIndex === idx ? "border-brand-500 ring-2 ring-brand-500/20" : "border-transparent"
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={ph} alt="Selection option" className="w-full h-full object-cover" />
                      {selectedPhotoIndex === idx && (
                        <div className="absolute inset-0 bg-brand-500/20 flex items-center justify-center text-white">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location & Tags */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1.5">Site Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Block B, Mumbai Site"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-surface-600 dark:text-surface-400 mb-1.5">Topic Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="masonry, blueprint, concrete"
                    className="input-field"
                  />
                </div>
              </div>

              {/* Attach PDF Toggle */}
              <div className="p-4 rounded-xl border border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900/40">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={attachPdf}
                    onChange={(e) => setAttachPdf(e.target.checked)}
                    className="w-4 h-4 rounded border-surface-300 text-brand-500"
                  />
                  <span className="text-xs font-semibold text-surface-700 dark:text-surface-300">
                    Attach CAD / Blueprint PDF Portfolio
                  </span>
                </label>
                
                {attachPdf && (
                  <div className="mt-3 space-y-3 pl-6 border-l-2 border-brand-500/20">
                    <div>
                      <label className="block text-2xs font-semibold text-surface-600 dark:text-surface-400 mb-1">Document Name (PDF)</label>
                      <input
                        type="text"
                        required={attachPdf}
                        value={pdfName}
                        onChange={(e) => setPdfName(e.target.value)}
                        placeholder="e.g., Level_2_Wiring_Schematic.pdf"
                        className="input-field py-1 px-3 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-2xs font-semibold text-surface-600 dark:text-surface-400 mb-1">Document Classification</label>
                      <select
                        value={pdfType}
                        onChange={(e) => setPdfType(e.target.value)}
                        className="input-field py-1 px-2 text-xs bg-white dark:bg-surface-800"
                      >
                        <option value="floor_plan">Floor Plan Drawing</option>
                        <option value="government_doc">Government Approvals / License</option>
                        <option value="survey_report">Site Survey & Geotechnical Report</option>
                        <option value="land_document">Deed / Land Certificates</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-2 border-t border-surface-200 dark:border-surface-800">
                <button 
                  type="button" 
                  onClick={() => setIsPostModalOpen(false)} 
                  className="btn-secondary text-xs py-2"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary text-xs py-2 px-6"
                >
                  Share to Community
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ==============================================
         MODAL: PDF VISUAL PREVIEW / BLUEPRINT VIEWER
         ============================================== */}
      {previewPdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/75 backdrop-blur-md" onClick={() => setPreviewPdf(null)} />
          <div className="relative w-full max-w-4xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-xl overflow-hidden shadow-glass-lg animate-scale-in h-[85vh] flex flex-col">
            
            {/* PDF Header */}
            <div className="flex items-center justify-between p-4 bg-surface-50 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center font-bold">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-surface-900 dark:text-white">{previewPdf.name}</h3>
                  <p className="text-3xs text-surface-500 capitalize">
                    {previewPdf.type.replace('_', ' ')} • {previewPdf.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-surface-100 hover:bg-surface-200 dark:bg-surface-850 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-300 transition-colors flex items-center gap-1.5 text-2xs font-semibold">
                  <Download className="w-3.5 h-3.5" /> Download Blueprint
                </button>
                <button onClick={() => setPreviewPdf(null)} className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-400">
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Simulated PDF Rendering Content */}
            <div className="flex-1 bg-surface-100 dark:bg-surface-950 p-6 overflow-y-auto flex justify-center items-start custom-scrollbar">
              <div className="w-full max-w-2xl bg-white dark:bg-surface-900 shadow-md border border-surface-200 dark:border-surface-800 rounded-xl p-8 min-h-[600px] flex flex-col justify-between">
                
                {/* Title Block */}
                <div>
                  <div className="flex justify-between items-start pb-4 border-b border-surface-200 dark:border-surface-850">
                    <div>
                      <h1 className="text-xl font-bold text-surface-900 dark:text-white font-mono tracking-tight uppercase">
                        {previewPdf.name.replace('.pdf', '')}
                      </h1>
                      <p className="text-xs text-surface-500 font-mono mt-1">CAD SPECIFICATION / SHEET 01 OF 01</p>
                    </div>
                    <div className="text-right font-mono text-2xs text-surface-400">
                      <p>TRUST INFRA VERIFIED</p>
                      <p className="text-emerald-500 flex items-center gap-1 mt-0.5 justify-end">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> SECURE BLOCKCHAIN HASH
                      </p>
                    </div>
                  </div>

                  {/* Summary / Metadata */}
                  <div className="grid grid-cols-2 gap-4 my-6 p-4 rounded-xl bg-surface-50 dark:bg-surface-850/50 border border-surface-200 dark:border-surface-800/50">
                    <div>
                      <span className="text-3xs uppercase font-mono tracking-wider text-surface-400">Classification</span>
                      <p className="text-xs font-semibold text-surface-800 dark:text-surface-200 capitalize mt-0.5">
                        {previewPdf.type.replace('_', ' ')}
                      </p>
                    </div>
                    <div>
                      <span className="text-3xs uppercase font-mono tracking-wider text-surface-400">Document Size</span>
                      <p className="text-xs font-semibold text-surface-800 dark:text-surface-200 mt-0.5">
                        {previewPdf.size}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-3xs uppercase font-mono tracking-wider text-surface-400">Scope Description</span>
                      <p className="text-xs text-surface-700 dark:text-surface-300 leading-relaxed mt-0.5">
                        {previewPdf.description}
                      </p>
                    </div>
                  </div>

                  {/* Simulated blueprints/CAD visualization */}
                  <div className="relative border border-brand-500/20 bg-brand-950/5 dark:bg-brand-950/20 rounded-xl aspect-[1.4/1] p-4 flex flex-col justify-center items-center overflow-hidden">
                    
                    {/* Grid background lines to look like CAD blueprint */}
                    <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-0 opacity-15 pointer-events-none">
                      {Array.from({ length: 144 }).map((_, i) => (
                        <div key={i} className="border-b border-r border-brand-500" />
                      ))}
                    </div>

                    <div className="relative text-center space-y-3 z-10">
                      <div className="w-12 h-12 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto animate-pulse">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <p className="text-xs font-semibold text-brand-500 uppercase tracking-widest font-mono">
                        CAD Vector Grid Rendering
                      </p>
                      <p className="text-2xs text-surface-500 dark:text-surface-400 max-w-sm mx-auto leading-relaxed">
                        Vector rendering is active. Floor plan walls, dimension guidelines, and spatial overlays have been cryptographically compiled.
                      </p>
                    </div>

                    {/* Cute structural outline drawing using CSS layout to mimic blueprints */}
                    <div className="absolute bottom-4 right-4 p-2 bg-black/40 border border-brand-500/30 rounded font-mono text-[9px] text-brand-400 text-left">
                      <p>X-COORD: 104.22</p>
                      <p>Y-COORD: 852.19</p>
                      <p>Z-ELEV: +12.4m</p>
                    </div>

                  </div>
                </div>

                {/* PDF Sign-off Footer */}
                <div className="border-t border-surface-200 dark:border-surface-850 pt-4 flex items-center justify-between text-2xs text-surface-400 font-mono">
                  <span>Compiled: 2026-07-21</span>
                  <span>Trust Infra CAD Engine v2.0</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==============================================
         MODAL: ACTIVE STORY PLAY / LIVE FEED
         ============================================== */}
      {activeStoryIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md" onClick={() => setActiveStoryIndex(null)} />
          <div className="relative w-full max-w-md aspect-[9/16] bg-surface-950 border border-surface-850 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between p-4">
            
            {/* Story Progress Bar */}
            <div className="flex gap-1">
              {initialStories.map((st) => (
                <div 
                  key={st.id} 
                  className={cn(
                    "flex-1 h-1 rounded-full",
                    st.id === activeStoryIndex ? "bg-brand-500" : st.id < activeStoryIndex ? "bg-brand-500/50" : "bg-surface-800"
                  )} 
                />
              ))}
            </div>

            {/* Story Top Info */}
            <div className="flex items-center justify-between mt-3 z-10 text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-sm font-bold">
                  {initialStories.find(st => st.id === activeStoryIndex)?.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold">
                    {initialStories.find(st => st.id === activeStoryIndex)?.name}
                  </h4>
                  <p className="text-[10px] text-surface-400">
                    Live from {initialStories.find(st => st.id === activeStoryIndex)?.project}
                  </p>
                </div>
              </div>
              <button onClick={() => setActiveStoryIndex(null)} className="p-1 rounded-full hover:bg-white/10 text-surface-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Story Image / Live Simulation Area */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 bg-gradient-to-b from-black/50 via-black/20 to-black/80">
              
              {/* Grid meshes in center for video simulation */}
              <div className="w-20 h-20 rounded-full border-4 border-brand-500 flex items-center justify-center bg-black/40 text-brand-500 mb-4 animate-pulse">
                <Camera className="w-8 h-8" />
              </div>
              <p className="text-xs font-semibold text-white uppercase tracking-wider">
                Live Stream Active
              </p>
              <p className="text-2xs text-surface-300 mt-2 max-w-xs leading-relaxed">
                Checking site foundation metrics in real-time. Camera resolution: 4K UHD. Frames synced with project dashboard.
              </p>
            </div>

            {/* Story Footer Controls */}
            <div className="z-10 text-center pb-4 text-white">
              <span className="text-[10px] font-mono tracking-widest text-brand-400 bg-brand-500/10 px-2 py-0.8 rounded-full border border-brand-500/20">
                🔴 LIVE STREAM FEED
              </span>
              
              <div className="flex justify-between items-center mt-6 px-4">
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={() => setActiveStoryIndex(activeStoryIndex < initialStories.length ? activeStoryIndex + 1 : 1)}
                  className="px-4 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-2xs font-semibold"
                >
                  Next Site
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </DashboardLayout>
  );
}
