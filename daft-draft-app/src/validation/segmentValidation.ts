// validation/segmentValidation.ts
import * as yup from 'yup';
import { SegmentationResponse } from '../types/Segmentation'; 

const segmentSchema = yup.object({
  idx: yup.number().required(),
  txt: yup.string().required(),
  obgs: yup.array().of(yup.string()).required(),
  rmk: yup.array().of(yup.string()), // Made optional by removing .required()
});

const obligationAnalysisSchema = yup.object({
  evaluation: yup.string().oneOf(["is well-formed", "meets expectations", "needs improvement", "is ill-formed"]).required(),
  rationale: yup.string().required()
});

const obligationsStructuralAnalysisSchema = yup.object({
  a: obligationAnalysisSchema.required(),
  b: obligationAnalysisSchema.required(),
  c: obligationAnalysisSchema.required(),
  d: obligationAnalysisSchema.required(),
  e: obligationAnalysisSchema.required(),
  f: obligationAnalysisSchema.required(),
});


const segmentationResponseSchema = yup.object({
  segmentation: yup.array().of(segmentSchema).required(),
  obligations_structural_analysis: obligationsStructuralAnalysisSchema.required(),
  overall_structural_analysis: obligationAnalysisSchema.required()
});

export const validateSegmentationResponse = async (data: any): Promise<SegmentationResponse> => {
  try {
    await segmentationResponseSchema.validate(data);
    return data; // data is validated and matches SegmentationResponse shape
  } catch (error) {
    throw new Error('Invalid segmentation response format');
  }
};
