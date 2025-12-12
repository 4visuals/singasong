export class SongApi {
    resolveUri(uri: string): string {
        const songPath = import.meta.env.VITE_SONG_PATH || '';
        const fullPath = songPath + uri;
        console.log('path resolved:', fullPath);
        return fullPath;
    }
}