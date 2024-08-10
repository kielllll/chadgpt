import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DUMMY = [
  {
    messageId: '1',
    conversationId: '1a',
    role: 'user',
    content: 'Hi there!',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    messageId: '2',
    conversationId: '1a',
    role: 'system',
    content: 'Hello! How may I help you?',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    messageId: '3',
    conversationId: '1a',
    role: 'user',
    content: 'Do you know where the moon is?',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    messageId: '4',
    conversationId: '1a',
    role: 'system',
    content: 'Certainly! The moon is in the sky.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    messageId: '5',
    conversationId: '1a',
    role: 'user',
    content: 'Thanks!',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    messageId: '6',
    conversationId: '1a',
    role: 'system',
    content: "You're welcome! Just let me know if you have any questions.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]
