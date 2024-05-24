// validation/segmentValidation.ts
import * as yup from 'yup';
import { SegmentationResponse } from '../types/Segmentation'; 

const segmentSchema = yup.object({
  idx: yup.number().required(),
  txt: yup.string().required(),
  obg: yup.string().required(),
  rmk: yup.array().of(yup.string()), // Made optional by removing .required()
});

const obligationAnalysisSchema = yup.object({
  evaluation: yup.number().oneOf([0,1,2,3]).required(),
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


const overallAnalysisSchema = yup.object({
  evaluation: yup.number().oneOf([0,1,2,3]).required(),
  rationale: yup.string().required(),
  recommendation: yup.string().required()
});
const segmentationResponseSchema = yup.object({
  segmentation: yup.array().of(segmentSchema).required(),
  obligations_structural_analysis: obligationsStructuralAnalysisSchema.required(),
  overall_structural_analysis: overallAnalysisSchema.required()
});

export const validateSegmentationResponse = async (data: any): Promise<SegmentationResponse> => {
  try {
    await segmentationResponseSchema.validate(data);
    return data; // data is validated and matches SegmentationResponse shape
  } catch (error) {
    throw new Error('Invalid segmentation response format');
  }
};
