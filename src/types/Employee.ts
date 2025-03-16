import { Episode } from "../components/ui/EpisodeUpload"

export interface Employee {
    id: number
    fullName: string
    position: string
}

export interface ProjectFormData {
    title: string
    description: string
    deadline: string
    budget: string
    status: string
    thumbnail: File | null
    director: string
    soundDirectors: string[]
    voiceActors: string[] // ovoz aktyorlarining ID'lari
    editor: string
    episodes: Episode[]
}