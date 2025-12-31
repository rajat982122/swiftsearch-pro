import type { SearchResult } from '@/types/search';

export const mockApps: SearchResult[] = [
  { id: 'app-1', type: 'app', title: 'Visual Studio Code', subtitle: 'Application', path: 'C:\\Program Files\\VS Code' },
  { id: 'app-2', type: 'app', title: 'Google Chrome', subtitle: 'Application', path: 'C:\\Program Files\\Google\\Chrome' },
  { id: 'app-3', type: 'app', title: 'Microsoft Word', subtitle: 'Application', path: 'C:\\Program Files\\Microsoft Office' },
  { id: 'app-4', type: 'app', title: 'Microsoft Excel', subtitle: 'Application', path: 'C:\\Program Files\\Microsoft Office' },
  { id: 'app-5', type: 'app', title: 'Spotify', subtitle: 'Application', path: 'C:\\Users\\AppData\\Spotify' },
  { id: 'app-6', type: 'app', title: 'Discord', subtitle: 'Application', path: 'C:\\Users\\AppData\\Discord' },
  { id: 'app-7', type: 'app', title: 'Slack', subtitle: 'Application', path: 'C:\\Users\\AppData\\Slack' },
  { id: 'app-8', type: 'app', title: 'Notion', subtitle: 'Application', path: 'C:\\Users\\AppData\\Notion' },
  { id: 'app-9', type: 'app', title: 'Figma', subtitle: 'Application', path: 'C:\\Users\\AppData\\Figma' },
  { id: 'app-10', type: 'app', title: 'Terminal', subtitle: 'Application', path: 'C:\\Windows\\System32' },
  { id: 'app-11', type: 'app', title: 'Calculator', subtitle: 'Application', path: 'C:\\Windows\\System32' },
  { id: 'app-12', type: 'app', title: 'Settings', subtitle: 'Application', path: 'C:\\Windows\\System32' },
];

export const mockFiles: SearchResult[] = [
  { id: 'file-1', type: 'file', title: 'Project Proposal.docx', subtitle: 'Document', path: 'C:\\Users\\Documents' },
  { id: 'file-2', type: 'file', title: 'Budget 2024.xlsx', subtitle: 'Spreadsheet', path: 'C:\\Users\\Documents' },
  { id: 'file-3', type: 'file', title: 'Presentation.pptx', subtitle: 'Presentation', path: 'C:\\Users\\Documents' },
  { id: 'file-4', type: 'file', title: 'Resume.pdf', subtitle: 'PDF Document', path: 'C:\\Users\\Documents' },
  { id: 'file-5', type: 'file', title: 'meeting-notes.txt', subtitle: 'Text File', path: 'C:\\Users\\Documents' },
  { id: 'file-6', type: 'file', title: 'photo-001.jpg', subtitle: 'Image', path: 'C:\\Users\\Pictures' },
  { id: 'file-7', type: 'file', title: 'screenshot.png', subtitle: 'Image', path: 'C:\\Users\\Pictures' },
  { id: 'file-8', type: 'file', title: 'config.json', subtitle: 'JSON File', path: 'C:\\Users\\Projects' },
];

export const mockFolders: SearchResult[] = [
  { id: 'folder-1', type: 'folder', title: 'Documents', subtitle: 'Folder', path: 'C:\\Users' },
  { id: 'folder-2', type: 'folder', title: 'Downloads', subtitle: 'Folder', path: 'C:\\Users' },
  { id: 'folder-3', type: 'folder', title: 'Pictures', subtitle: 'Folder', path: 'C:\\Users' },
  { id: 'folder-4', type: 'folder', title: 'Desktop', subtitle: 'Folder', path: 'C:\\Users' },
  { id: 'folder-5', type: 'folder', title: 'Projects', subtitle: 'Folder', path: 'C:\\Users\\Documents' },
  { id: 'folder-6', type: 'folder', title: 'Music', subtitle: 'Folder', path: 'C:\\Users' },
  { id: 'folder-7', type: 'folder', title: 'Videos', subtitle: 'Folder', path: 'C:\\Users' },
];

export const allMockData: SearchResult[] = [...mockApps, ...mockFiles, ...mockFolders];
