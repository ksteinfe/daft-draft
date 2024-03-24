// models/Segment.ts

// a segment
export interface Segment {
    idx: number;
    txt: string;
    obgs: string[]; // Assuming 'Array of single chars' can be represented as string[]
    rmk?: string[]; // Array of strings
}

// a segmentation is an array of segments
export type Segmentation = Segment[];

// a SegmentationResponse is what we expect to get from ZeroWidth's API
export interface SegmentationResponse {
    segmentation: Segment[];
}

