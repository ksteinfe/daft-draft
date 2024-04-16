export type ObligationKey = 'a' | 'b' | 'c' | 'd' | 'e' | 'f';

export const AllObligationKeys: ObligationKey[] = ['a', 'b', 'c', 'd', 'e', 'f'];


export const obligationNameMap: Record<ObligationKey, string> = {
    a: 'Diagnosis of the Context',
    b: 'Problem Statement',
    c: 'Methods',
    d: 'Limits',
    e: 'Significance',
    f: 'Future Work'
};
