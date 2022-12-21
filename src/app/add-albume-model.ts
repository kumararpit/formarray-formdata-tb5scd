export interface AddAlbumeModel {
    name: string;
    gener: string;
    signer: string;
    albumeProfile:any;
    albumPoster:any;
    tracks:TrackMode[];
}

export interface TrackMode {
    trackNumber: number;
    trackName: string;
    trackProfile: any;
    trackPoster:any;
    trackFile: any;
}
