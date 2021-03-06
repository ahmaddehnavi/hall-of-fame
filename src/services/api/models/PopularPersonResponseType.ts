type KnownForType = {
    original_name: string;
    id: number;
    media_type: string;
    name: string;
    vote_count: number;
    vote_average: number;
    poster_path: string;
    first_air_date: string;
    popularity: number;
    genre_ids: number[];
    original_language: string;
    backdrop_path: string;
    overview: string;
    origin_country: string[];
    video?: boolean;
    title: string;
    original_title: string;
    adult?: boolean;
    release_date: string;
}

export type PopularPersonItemType = {
    popularity: number;
    id: number|string;
    profile_path: string;
    name: string;
    known_for: KnownForType[];
    adult: boolean;
}

export type PopularPersonResponseType = {
    page: number;
    total_results: number;
    total_pages: number;
    results: PopularPersonItemType[];
}