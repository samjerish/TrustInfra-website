'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  MessageSquare,
  Search,
  Plus,
  Phone,
  Video,
  MoreHorizontal,
  Send,
  Paperclip,
  Smile,
  Image as ImageIcon,
  Mic,
  Check,
  CheckCheck,
  Users,
  Hash,
  Lock,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const chatRooms = [
  {
    id: 1,
    name: 'Arun Verma',
    type: 'direct',
    lastMessage: 'Foundation inspection scheduled for tomorrow',
    time: '2m ago',
    unread: 2,
    online: true,
    avatar: 'AV',
  },
  {
    id: 2,
    name: 'Green Valley Team',
    type: 'group',
    lastMessage: 'Rajesh: Material delivery confirmed',
    time: '15m ago',
    unread: 5,
    members: 8,
    avatar: 'GV',
  },
  {
    id: 3,
    name: 'Sneha Patel',
    type: 'direct',
    lastMessage: 'Updated the 2nd floor plans',
    time: '1h ago',
    unread: 0,
    online: true,
    avatar: 'SP',
  },
  {
    id: 4,
    name: 'Lakeview Discussion',
    type: 'project',
    lastMessage: 'Quality check report uploaded',
    time: '2h ago',
    unread: 0,
    members: 12,
    avatar: 'LV',
  },
  {
    id: 5,
    name: 'ABC Steel Suppliers',
    type: 'direct',
    lastMessage: 'Quotation sent for TMT bars',
    time: '3h ago',
    unread: 1,
    online: false,
    avatar: 'AS',
  },
  {
    id: 6,
    name: 'Site Supervisors',
    type: 'group',
    lastMessage: 'Daily log submitted',
    time: '4h ago',
    unread: 0,
    members: 5,
    avatar: 'SS',
  },
];

const chatMessages = [
  {
    id: 1,
    sender: 'Arun Verma',
    avatar: 'AV',
    content: "Good morning! I've completed the foundation inspection for Block A.",
    time: '09:15 AM',
    isOwn: false,
    read: true,
  },
  {
    id: 2,
    sender: 'You',
    avatar: 'RK',
    content: 'Great! What are the findings?',
    time: '09:18 AM',
    isOwn: true,
    read: true,
  },
  {
    id: 3,
    sender: 'Arun Verma',
    avatar: 'AV',
    content:
      'Everything looks good. The soil bearing capacity matches our calculations. PCC work can begin tomorrow.',
    time: '09:20 AM',
    isOwn: false,
    read: true,
  },
  {
    id: 4,
    sender: 'Arun Verma',
    avatar: 'AV',
    content:
      "I've uploaded the inspection report to the project documents section. Please review and approve.",
    time: '09:21 AM',
    isOwn: false,
    read: true,
  },
  {
    id: 5,
    sender: 'You',
    avatar: 'RK',
    content:
      "Perfect. I'll review it today. Should I also approve the cement order for the PCC work?",
    time: '09:25 AM',
    isOwn: true,
    read: true,
  },
  {
    id: 6,
    sender: 'Arun Verma',
    avatar: 'AV',
    content:
      "Yes, please approve MR-001 for 200 bags of OPC 53 grade cement. I've already got 3 quotations from dealers. ABC Steel is the most competitive at ₹380/bag.",
    time: '09:28 AM',
    isOwn: false,
    read: true,
  },
  {
    id: 7,
    sender: 'You',
    avatar: 'RK',
    content: 'Approved! Also, can we schedule the column reinforcement inspection for next week?',
    time: '09:32 AM',
    isOwn: true,
    read: false,
  },
  {
    id: 8,
    sender: 'Arun Verma',
    avatar: 'AV',
    content:
      "Sure, I'll schedule it for Wednesday. The AI assistant suggested we do a load test as well — do you want me to arrange that?",
    time: '09:33 AM',
    isOwn: false,
    read: true,
  },
];

export default function ChatPage() {
  const [selectedRoom, setSelectedRoom] = useState(chatRooms[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl border border-surface-200 dark:border-surface-800">
        {/* Sidebar */}
        <div className="flex w-80 flex-col border-r border-surface-200 bg-white dark:border-surface-800 dark:bg-surface-900">
          {/* Header */}
          <div className="border-b border-surface-200 p-4 dark:border-surface-800">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-surface-900 dark:text-white">Messages</h2>
              <button className="rounded-lg p-1.5 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800">
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-surface-100 px-3 py-2 dark:bg-surface-800/60">
              <Search className="h-4 w-4 text-surface-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full bg-transparent text-sm text-surface-700 outline-none dark:text-surface-300"
              />
            </div>
          </div>

          {/* Room List */}
          <div className="custom-scrollbar flex-1 overflow-y-auto">
            {chatRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={cn(
                  'flex w-full items-center gap-3 p-3 text-left transition-colors',
                  selectedRoom.id === room.id
                    ? 'bg-brand-50 dark:bg-brand-500/10'
                    : 'hover:bg-surface-50 dark:hover:bg-surface-800/50'
                )}
              >
                <div className="relative flex-shrink-0">
                  <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white">
                    {room.avatar}
                  </div>
                  {room.type === 'direct' && room.online && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-surface-900" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-semibold text-surface-900 dark:text-white">
                      {room.name}
                    </p>
                    <span className="flex-shrink-0 text-2xs text-surface-400">{room.time}</span>
                  </div>
                  <div className="mt-0.5 flex items-center justify-between">
                    <p className="truncate text-xs text-surface-500 dark:text-surface-400">
                      {room.lastMessage}
                    </p>
                    {room.unread > 0 && (
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-500 text-2xs font-bold text-white">
                        {room.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex flex-1 flex-col bg-surface-50 dark:bg-surface-950">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-surface-200 bg-white px-5 py-3 dark:border-surface-800 dark:bg-surface-900">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="gradient-primary flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white">
                  {selectedRoom.avatar}
                </div>
                {selectedRoom.type === 'direct' && selectedRoom.online && (
                  <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-surface-900" />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-surface-900 dark:text-white">
                  {selectedRoom.name}
                </p>
                <p className="text-2xs text-surface-500">
                  {selectedRoom.type === 'direct'
                    ? selectedRoom.online
                      ? 'Online'
                      : 'Offline'
                    : `${selectedRoom.members} members`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="rounded-lg p-2 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800">
                <Phone className="h-4 w-4" />
              </button>
              <button className="rounded-lg p-2 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800">
                <Video className="h-4 w-4" />
              </button>
              <button className="rounded-lg p-2 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto p-5">
            <div className="text-center">
              <span className="rounded-full bg-surface-100 px-3 py-1 text-2xs text-surface-400 dark:bg-surface-800">
                Today
              </span>
            </div>
            {chatMessages.map((msg) => (
              <div key={msg.id} className={cn('flex gap-3', msg.isOwn && 'flex-row-reverse')}>
                {!msg.isOwn && (
                  <div className="gradient-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                    {msg.avatar}
                  </div>
                )}
                <div className={cn('max-w-[65%]', msg.isOwn && 'text-right')}>
                  {!msg.isOwn && (
                    <p className="mb-1 ml-1 text-2xs font-medium text-surface-500">{msg.sender}</p>
                  )}
                  <div
                    className={cn(
                      'inline-block rounded-2xl px-4 py-2.5 text-sm',
                      msg.isOwn
                        ? 'rounded-br-md bg-brand-500 text-white'
                        : 'rounded-bl-md bg-white text-surface-800 shadow-sm dark:bg-surface-800 dark:text-surface-200'
                    )}
                  >
                    {msg.content}
                  </div>
                  <div
                    className={cn('mt-1 flex items-center gap-1 px-1', msg.isOwn && 'justify-end')}
                  >
                    <span className="text-2xs text-surface-400">{msg.time}</span>
                    {msg.isOwn &&
                      (msg.read ? (
                        <CheckCheck className="h-3 w-3 text-brand-400" />
                      ) : (
                        <Check className="h-3 w-3 text-surface-400" />
                      ))}
                  </div>
                </div>
              </div>
            ))}
            {/* Typing Indicator */}
            <div className="flex gap-3">
              <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white">
                AV
              </div>
              <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm dark:bg-surface-800">
                <div className="flex gap-1">
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-surface-400" />
                  <div
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-surface-400"
                    style={{ animationDelay: '150ms' }}
                  />
                  <div
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-surface-400"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-surface-200 bg-white px-5 py-3 dark:border-surface-800 dark:bg-surface-900">
            <div className="flex items-end gap-2">
              <div className="flex items-center gap-1">
                <button className="rounded-lg p-2 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800">
                  <Paperclip className="h-4 w-4" />
                </button>
                <button className="rounded-lg p-2 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800">
                  <ImageIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="input-field"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setNewMessage('');
                  }}
                />
              </div>
              <div className="flex items-center gap-1">
                <button className="rounded-lg p-2 text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-800">
                  <Mic className="h-4 w-4" />
                </button>
                <button className="btn-primary p-2.5">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
