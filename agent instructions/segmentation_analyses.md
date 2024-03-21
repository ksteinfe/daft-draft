
# Segmentation Analyses


## Structural Analysis
Formulate an evaluation of the overall structure of the text based on the six obligations of an abstract. Determine if all six obligations are present and have been addressed. Note if the structure is in the correct order - Obligations A,B, and C must come first and be expressed in that order, while Obligations D,E, and F must come last but can be in any order. Assess the proportion of attention given to each obligation, and determine if it matches the number of words or percentages given in the guidelines. If any obligations are missing, incomplete, or not well attended-to, describe these deficiencies. Determine in overview if the aims of each obligation have been met. If extraneous text exists that does not address any of these obligations, take this into account. 

Formulate an overall evaluation and provide a rationale. Only texts that require no changes should be rated as "strong". Quote parts of the text that need improvement. The JSON result for this task should be structured as follows:
{
    "evaluation": {{"strong", "good", "needs improvement", or "weak"}}, 
    "rationale": {{three or four sentences that provide the rationale for the given evaluation, include direct quotes from the text, and describe recommended improvements}}    
}

## Voice & Tense Analysis
The use of personal pronouns ("I", "we") should be avoided in favor of named entities ("the project", "the project team", or "the authors") - for example, "I propose" should be rephrased as "the project proposes". The writer should avoid nominalization - for example, "a verification of the lab kit contents was carried out" should be rephrased as "the contents of the lab kit were verified" or "the team verified the contents of the lab kit". 

All text should be written in the present tense, with the following exceptions: 1) Past tense should be used when discussing previous work to fulfill obligation "A"; 2) Future tense should be used when discussing potential next steps and future work to fulfill obligation "F".

Formulate an overall evaluation and provide a rationale. Only texts that require no changes should be rated as "strong". Quote parts of the text that need improvement. The JSON result for this task should be structured as follows:
{
    "evaluation": {{"strong", "good", "needs improvement", or "weak"}}, 
    "rationale": {{one sentence that provide the rationale for the given evaluation, includes direct quotes from the text, and describe recommended improvements}}    
}


## Tone Analysis
The tone of the writing should be dispassionate, serious, and factual, with emotional or qualitative language avoided. Casual language should be avoided - for example, phrases such as "came up with", "nowadays", and "in the grander scheme of things" are phrased causally and/or colloquially and may not contribute to the reader's precise understanding. Subjective descriptions that are not precisely defined in the text (e.g. "beautiful", "huge", "cheap") should be avoided. Phrases that imply personal beliefs (e.g. "I believe", "we think", "the author feels") should be avoided.

Formulate an overall evaluation and provide a rationale. Only texts that require no changes should be rated as "strong". Quote parts of the text that need improvement. The JSON result for this task should be structured as follows:
{
    "evaluation": {{"strong", "good", "needs improvement", or "weak"}}, 
    "rationale": {{one sentence that provide the rationale for the given evaluation, includes direct quotes from the text, and describe recommended improvements}}    
}

