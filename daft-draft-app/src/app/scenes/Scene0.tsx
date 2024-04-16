
import Layout from '../components/Layout';
import { Segmentation, StructuralAnalysis, ObligationsStructuralAnalysis } from '../../types/Segmentation'; // Adjust the import path as necessary
import { obligationNameMap, ObligationKey } from '../../types/Obligation'

import styles from './Scene0.module.css';

type Scene0Props = {
  segData: Segmentation;
  overallStructuralAnalysis: StructuralAnalysis;
  obligationsStructuralAnalysis: ObligationsStructuralAnalysis;
  activeObligationKey: ObligationKey;
};

export const Scene0 = ({ segData, overallStructuralAnalysis, obligationsStructuralAnalysis, activeObligationKey }: Scene0Props) => {
  const topContent = <div>SCENE 0. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet</div>;
  const leftContent = <div> <strong>Overall, the structure of this text {overallStructuralAnalysis.evaluation}. </strong>{overallStructuralAnalysis.rationale} </div>;

  const countSegmentsPerObligation = () => {
    const counts: Record<ObligationKey, number> = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 };
    segData.forEach(segment => {
      segment.obgs.forEach(obg => {
        if (counts.hasOwnProperty(obg)) {
          counts[obg as ObligationKey]++;
        }
      });
    });
    return counts;
  };
  const obligationCounts = countSegmentsPerObligation();


  const obligationsEntries = Object.entries(obligationsStructuralAnalysis) as [ObligationKey, StructuralAnalysis][];
  const rightContent = (
    <div>
      <p>An abstract is a summary of the whole thesis, presenting the project in a condensed form, and gives the reader a clear picture of what to expect when examining the project more closely. An abstract must address the following six obligations: A. Diagnosis of the Context, which identifies the general field into which a project intervenes, and diagnosis a problem or opportunity. B. Problem Statement, which concisely defines a critical response to the diagnosis. C. Methods, which describes how the project is carried out. D. Limits, which articulates the bounds of the project. E. Significance, which describes the relevance of the project in relation to the larger problem. F. Future Work, which describes the natural "next steps" implied by the outcomes and limits of the project.</p>
      {obligationsEntries.map(([key, analysis]) => (
        <p key={key} className={key === activeObligationKey ? styles.activeObligation : styles.inactiveObligation}>
          <span><strong>Obligation {key.toUpperCase()} {analysis.evaluation}.{'\u00A0'}</strong></span>
          <br></br>
          <span>The "<strong>{obligationNameMap[key]}</strong>" obligation is addressed by {obligationCounts[key]} sentences.{'\u00A0'}</span>
          <span>{analysis.rationale}{'\u00A0'}</span>
        </p>
      ))}
      <br></br>
      <br></br>
      key: {activeObligationKey}
    </div>
  );

  const segments = (
    <div>
      {segData.map((segment, index) => (
        <span key={index} className={segment.obgs.includes(activeObligationKey) ? styles.activeSegment : ''}>
          {segment.txt}{'\u00A0'}
        </span>
      ))}
    </div>
  );

  return (
    <Layout
      top={topContent}
      left={leftContent}
      center={segments}
      right={rightContent}
      style={'a'}
    />
  );
};

export default Scene0;