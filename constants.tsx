
import React from 'react';

export const CATEGORY_COLORS: Record<string, string> = {
  'Blog': '#a78bfa', // Violet
  'News': '#ca8a04', // Yellow/Gold
  'Cinema': '#f97316', // Orange
  'Songs': '#f59e0b', // Amber
  'Dialogue': '#84cc16', // Lime
  'Culture': '#2dd4bf', // Teal
  'History': '#dc2626', // Red
  'Economy': '#10b981', // Emerald
  'Health': '#3b82f6', // Blue
  'Fashion': '#f43f5e', // Rose
  'Travel': '#eab308', // Yellow
  'Sport': '#22c55e', // Green
  'Vocabulary': '#ec4899', // Pink
};

export const LEVEL_COLORS: Record<string, string> = {
  'Beginner': '#fde68a', // Yellowish
  'Intermediate': '#86efac', // Greenish
  'Advanced': '#3b82f6', // Bluish
};

export const Icons = {
  Login: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
    </svg>
  ),
  Star: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
};
