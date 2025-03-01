import axios from 'axios';

const BASE_URL = 'https://your-api-url.com/api'; // API URL manzilini o'zgartiring

// Token bilan ishlash uchun interceptor
const api = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor - har bir so'rovga token qo'shish
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// User interfeysi
export interface TestUser extends User {
  password: string;
}

export interface User {
  id: number;
  username: string;
  role: "director" | "rejissor" | "ovoz-aktyori" | "sound-rejissor" | "tahrirchi";
  fullName: string;
}

class AuthService {
  private readonly TOKEN_KEY = "auth_token";
  private readonly USER_KEY = "user";

  login(username: string, password: string): boolean {
    // Test uchun foydalanuvchilar
    const testUsers: TestUser[] = [
      {
        id: 1,
        username: "director",
        password: "123",
        role: "director",
        fullName: "John Director"
      },
      {
        id: 2,
        username: "rejissor",
        password: "123",
        role: "rejissor",
        fullName: "Bob Rejissor"
      },
      {
        id: 3,
        username: "ovoz-aktyori",
        password: "123",
        role: "ovoz-aktyori",
        fullName: "Alice Voice"
      },
      {
        id: 4,
        username: "sound-rejissor",
        password: "123",
        role: "sound-rejissor",
        fullName: "Mike Sound"
      },
      {
        id: 5,
        username: "tahrirchi",
        password: "123",
        role: "tahrirchi",
        fullName: "Tom Editor"
      }
    ];

    const user = testUsers.find(u => 
      u.username === username && u.password === password
    );

    if (user) {
      // Parolni o'chirib tashlaymiz
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem(this.TOKEN_KEY, "test_token");
      localStorage.setItem(this.USER_KEY, JSON.stringify(userWithoutPassword));
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (!userStr) return null;
    return JSON.parse(userStr);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getRole(): string | null {
    const user = this.getCurrentUser();
    return user?.role || null;
  }
}

export const authService = new AuthService();

interface ProjectData {
  title: string
  description: string
  status: 'active' | 'completed' | 'pending'
  deadline: string
  // ... boshqa kerakli maydonlar
}

export interface ActorsData {
  actorId: number
  characterName: string
  episodes: number[]
}

interface ScriptData {
  content: string
  status: 'draft' | 'review' | 'approved'
  comments: string[]
  // ... boshqa kerakli maydonlar
}

interface ApiError {
  response?: {
    data: {
      message: string
      errors?: Record<string, string[]>
    }
    status: number
  }
  message: string
}

// Test ma'lumotlar
const testProjects = [
  {
    id: 1,
    title: "Anime dublyaj",
    status: "active",
    startDate: "2024-03-01",
    endDate: "2024-04-01",
    voiceActors: 5,
    rejissorId: 2
  },
  {
    id: 2,
    title: "Multfilm tarjima",
    status: "completed",
    startDate: "2024-02-01",
    endDate: "2024-03-01",
    voiceActors: 3,
    rejissorId: 2
  },
  {
    id: 3,
    title: "Yangi serial",
    status: "upcoming",
    startDate: "2024-04-01",
    endDate: "2024-05-01",
    voiceActors: 4,
    rejissorId: 2
  }
];

// Director uchun API funksiyalar
export const directorService = {
  getAllProjects: async () => {
    const response = await api.get('/director/projects');
    return response.data;
  },
  createProject: async (projectData: ProjectData) => {
    const response = await api.post('/director/projects', projectData);
    return response.data;
  },
  updateProject: async (projectId: string, projectData: Partial<ProjectData>) => {
    const response = await api.put(`/director/projects/${projectId}`, projectData);
    return response.data;
  },
};

// Ovoz aktyori uchun API funksiyalar
export const ovozAktyoriService = {
  getAssignedScripts: async () => {
    const response = await api.get('/ovoz-aktyori/scripts');
    return response.data;
  },
  submitVoiceRecord: async (scriptId: string, audioFile: File) => {
    const formData = new FormData();
    formData.append('audio', audioFile);
    const response = await api.post(`/ovoz-aktyori/scripts/${scriptId}/record`, formData);
    return response.data;
  },
};

// Rejissor uchun API funksiyalar
export const rejissorService = {
  getProjects: async () => {
    // Test uchun: faqat joriy rejissorning loyihalarini qaytarish
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return [];
    
    return testProjects.filter(project => project.rejissorId === currentUser.id);
  },
  getProjectById: async (projectId: string) => {
    const project = testProjects.find(p => p.id === Number(projectId));
    if (!project) throw new Error("Loyiha topilmadi");
    return project;
  },
  createProject: async (projectData: Partial<typeof testProjects[0]>) => {
    const newProject = {
      ...projectData,
      id: testProjects.length + 1,
      rejissorId: authService.getCurrentUser()?.id || 0
    };
    testProjects.push(newProject as typeof testProjects[0]);
    return newProject;
  },
  updateProject: async (projectId: string, projectData: Partial<typeof testProjects[0]>) => {
    const index = testProjects.findIndex(p => p.id === Number(projectId));
    if (index === -1) throw new Error("Loyiha topilmadi");
    
    testProjects[index] = {
      ...testProjects[index],
      ...projectData
    };
    return testProjects[index];
  },
  assignActors: async (projectId: string, actorsData: { actorIds: number[] }) => {
    const project = testProjects.find(p => p.id === Number(projectId));
    if (!project) throw new Error("Loyiha topilmadi");
    
    project.voiceActors = actorsData.actorIds.length;
    return project;
  }
};

// Sound rejissor uchun API funksiyalar
export const soundRejissorService = {
  getRecordings: async () => {
    const response = await api.get('/sound-rejissor/recordings');
    return response.data;
  },
  updateRecording: async (recordingId: string, editedAudio: File) => {
    const formData = new FormData();
    formData.append('audio', editedAudio);
    const response = await api.put(`/sound-rejissor/recordings/${recordingId}`, formData);
    return response.data;
  },
};

// Tahrirchi uchun API funksiyalar
export const tahrirchiService = {
  getScripts: async () => {
    const response = await api.get('/tahrirchi/scripts');
    return response.data;
  },
  editScript: async (scriptId: string, scriptData: ScriptData) => {
    const response = await api.put(`/tahrirchi/scripts/${scriptId}`, scriptData);
    return response.data;
  },
};

// Xatoliklarni qayta ishlash uchun umumiy funksiya
export const handleApiError = (error: ApiError) => {
  if (error.response) {
    console.error('Server xatosi:', error.response.data);
    return error.response.data.message;
  }
  console.error('Network xatosi:', error.message);
  return 'Tarmoq xatosi yuz berdi';
}; 