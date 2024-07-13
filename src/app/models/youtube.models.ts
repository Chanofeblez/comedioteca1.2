export interface YoutubeResponse {
    kind:     string;
    etag:     string;
    items:    VideoResponse[];
    pageInfo: PageInfo;
}

export interface VideoResponse {
    kind:    string;
    etag:    string;
    id:      string;
    snippet: Video;
}

export interface Video {
    publishedAt:          Date;
    channelId:            string;
    title:                string;
    description:          string;
    thumbnails:           Thumbnails;
    channelTitle:         string;
    tags:                 string[];
    categoryId:           string;
    liveBroadcastContent: string;
    defaultLanguage:      string;
    localized:            Localized;
    defaultAudioLanguage: string;
}

export interface Localized {
    title:       string;
    description: string;
}

export interface Thumbnails {
    default:  Default;
    medium:   Default;
    high:     Default;
    standard: Default;
    maxres:   Default;
}

export interface Default {
    url:    string;
    width:  number;
    height: number;
}

export interface PageInfo {
    totalResults:   number;
    resultsPerPage: number;
}

export interface Comediantes {
    name?:   string;
    country?:   string;
    description?:   string;
    image?:   string;
    imagecorta?:   string;
    id?:   string;
}

