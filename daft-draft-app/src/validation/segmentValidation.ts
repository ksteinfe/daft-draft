// validation/segmentValidation.ts
import * as yup from 'yup';

import { SegmentationResponse } from '../types/Segment'; // Adjust the import path as necessary

const segmentSchema = yup.object({
  idx: yup.number().required(),
  txt: yup.string().required(),
  obgs: yup.array().of(yup.string()).required(),
  rmk: yup.array().of(yup.string()), // Made optional by removing .required()
});

const segmentationResponseSchema = yup.object({
  segmentation: yup.array().of(segmentSchema).required(),
});

export const validateSegmentationResponse = async (data: any): Promise<SegmentationResponse> => {
  try {
    await segmentationResponseSchema.validate(data);
    return data; // data is validated and matches SegmentationResponse shape
  } catch (error) {
    throw new Error('Invalid segmentation response format');
  }
};
