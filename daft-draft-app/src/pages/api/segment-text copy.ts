// pages/api/segment-text.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { text } = req.body;
    // Simulate text segmentation
    const segments = text.split('.').map((sentence: string, index: number) => ({
      id: index,
      text: sentence.trim(),
    }));

    // Simulate an asynchronous action, like calling an external API
    setTimeout(() => res.status(200).json({ segments }), 1000);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}



