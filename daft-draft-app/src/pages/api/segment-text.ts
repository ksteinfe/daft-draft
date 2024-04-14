// pages/api/segment-text.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { validateSegmentationResponse } from '../../validation/segmentValidation';

const util = require('util');

const API_KEY = process.env.ZW_ENDPOINT_API_KEY;
const API_URL = "https://api.zerowidth.ai/beta/process/KlLtnmz5sSSE57zY0P2e/9LbyePkZk5L258nNuZa9"
const FAKE_USER_ID = "me";
const FAKE_SESSION_ID = "fake-session-id";

// Import the fake response (adjust the path as necessary)
import fakeResponse from '../../../public/fakeSegmentationResponse.json';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // If returning fake data
    if (process.env.FAKE_THE_API_CALL === 'true') {
        console.log('Using fake API response');
        return res.status(200).json(fakeResponse); // Directly return the fake response
    }

    if (req.method === 'POST') {
        const { text } = req.body;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`, // Use the environment variable
                },
                body: JSON.stringify({
                    user_id: FAKE_USER_ID,
                    session_id: FAKE_SESSION_ID,
                    data: {
                        variables: {
                            USER_TEXT: text, // Pass the given text to the USER_TEXT variable
                        }
                    }
                }),
            });

            if (!response.ok) {
                console.error(response.statusText);
                throw new Error('Failed to fetch segmentation data');
            }

            // post and wait for a reply
            const data = await response.json();

            // Check for 'output_data' and 'content' keys in the response
            if (!data['output_data'] || !data['output_data']['content']) {
                throw new Error("'output_data' or 'content' key is missing in the response.");
            }

            let zwResponseContent;
            try {
                // Clean up the string by removing unwanted whitespace and newline characters
                // This removes line breaks, tabs, and extra spaces
                const cleanedContent = data['output_data']['content'].replace(/\s+/g, ' ').trim();

                // Attempt to parse the cleaned JSON string
                zwResponseContent = JSON.parse(cleanedContent);
            } catch (error) {
                console.log("!!!!! JSON PARSE ERROR !!!!!");                
                console.log("Original content:", data['output_data']['content']); // Log the original content for debugging purposes
                if (error instanceof Error) {
                    console.log("Error during parsing:", error.message);
                    throw new Error(`Failed to parse 'zwResponseContent' into a JSON object: ${error.message}`);
                } else {
                    // Handle the case where the error is not an Error object
                    console.log("An unknown error occurred");
                    throw new Error("Failed to parse 'zwResponseContent' into a JSON object and the error type is unknown");
                }
            }


            try {
                const validatedData = await validateSegmentationResponse(zwResponseContent);
                console.log('Segmentation success! Everything looks right.');
                //console.log(validatedData);
                res.status(200).json(validatedData);
            } catch (error) {
                console.log("!!!!! DATA VALIDATION ERROR !!!!!"); 
                console.error(error);
                console.log('Segmentation failed. Response from ZeroWidth API:');
                console.log(util.inspect(zwResponseContent, { showHidden: false, depth: null, colors: true }));
                res.status(400).json({ error: "Invalid segmentation response format" });
            }


        } catch (error) {
            // Handle errors
            console.error(error);
            res.status(500).json({ message: 'Error processing request' });
        }
    } else {
        // catch improper HTTP methods
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
    }
}
