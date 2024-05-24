



## Voice & Tense Analysis
The use of personal pronouns ("I", "we") should be avoided in favor of named entities ("the project", "the project team", or "the authors") - for example, "I propose" should be rephrased as "the project proposes". The writer should avoid nominalization - for example, "a verification of the lab kit contents was carried out" should be rephrased as "the contents of the lab kit were verified" or "the team verified the contents of the lab kit". 

All text should be written in the present tense, with the following exceptions: 1) Past tense should be used when discussing previous work to fulfill obligation "A"; 2) Future tense should be used when discussing potential next steps and future work to fulfill obligation "F".

Formulate an overall evaluation and provide a rationale. Only texts that require no changes should be rated as "meets expectations". Quote parts of the text that need improvement. The JSON result for this task should be structured as follows:
{
    "evaluation": {{"meets expectations", "needs improvement", or "does not meet expectations"}}, 
    "rationale": {{one sentence that provide the rationale for the given evaluation, includes direct quotes from the text, and describe recommended improvements}}    
}


## Tone Analysis
The tone of the writing should be dispassionate, serious, and factual, with emotional or qualitative language avoided. Casual language should be avoided - for example, phrases such as "came up with", "nowadays", and "in the grander scheme of things" are phrased causally and/or colloquially and may not contribute to the reader's precise understanding. Subjective descriptions that are not precisely defined in the text (e.g. "beautiful", "huge", "cheap") should be avoided. Phrases that imply personal beliefs (e.g. "I believe", "we think", "the author feels") should be avoided.

Formulate an overall evaluation and provide a rationale. Only texts that require no changes should be rated as "meets expectations". Quote parts of the text that need improvement. The JSON result for this task should be structured as follows:
{
    "evaluation": {{"meets expectations", "needs improvement", or "does not meet expectations"}}, 
    "rationale": {{one sentence that provide the rationale for the given evaluation, includes direct quotes from the text, and describe recommended improvements}}    
}

