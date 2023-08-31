export type Screenshot = {
    id: number;
    image: string;
}

export interface Game {
    id: number;
    title: string;
    release_date: string;
    publisher: string;
    developer: string;
    genre: string;
    thumbnail: string;
    minimum_system_requirements: Record<string, string>;
    screenshots: Screenshot[];
}