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
    createdAt: '2024-08-11T06:20:57.351Z',
    updatedAt: '2024-08-11T06:20:57.351Z',
  },
  {
    messageId: '2',
    conversationId: '1a',
    role: 'system',
    content: 'Hello! How may I help you?',
    createdAt: '2024-08-11T06:20:57.351Z',
    updatedAt: '2024-08-11T06:20:57.351Z',
  },
  {
    messageId: '3',
    conversationId: '1a',
    role: 'user',
    content: 'Do you know where the moon is?',
    createdAt: '2024-08-11T06:20:57.351Z',
    updatedAt: '2024-08-11T06:20:57.351Z',
  },
  {
    messageId: '4',
    conversationId: '1a',
    role: 'system',
    content: 'Certainly! The moon is in the sky.',
    createdAt: '2024-08-11T06:20:57.351Z',
    updatedAt: '2024-08-11T06:20:57.351Z',
  },
  {
    messageId: '5',
    conversationId: '1a',
    role: 'user',
    content: 'Thanks!',
    createdAt: '2024-08-11T06:20:57.351Z',
    updatedAt: '2024-08-11T06:20:57.351Z',
  },
  {
    messageId: '6',
    conversationId: '1a',
    role: 'system',
    content: "You're welcome! Just let me know if you have any questions.",
    createdAt: '2024-08-11T06:20:57.351Z',
    updatedAt: '2024-08-11T06:20:57.351Z',
  },
]
