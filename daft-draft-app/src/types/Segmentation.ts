// models/Segment.ts

import { ObligationKey } from './Obligation';

// a segment
export interface Segment {
    idx: number;
    txt: string;
    obgs: string[]; // Assuming 'Array of single chars' can be represented as string[]
    rmk?: string[]; // Array of strings
}

// a segmentation is an array of segments
export type Segmentation = Segment[];

// a structural analysis is an "evaluation" and a "rationale"
export interface StructuralAnalysis {
    evaluation: string; 
    rationale: string; 
}

// a segmentation is an array of segments
export interface ObligationsStructuralAnalysis extends Record<ObligationKey, StructuralAnalysis> {
    // This will automatically include:
    // a, b, c, d, e, f as keys of type StructuralAnalysis
}


// a SegmentationResponse is what we expect to get from ZeroWidth's API
export interface SegmentationResponse {
    segmentation: Segment[];
    obligations_structural_analysis: ObligationsStructuralAnalysis;
    overall_structural_analysis: StructuralAnalysis;
}
