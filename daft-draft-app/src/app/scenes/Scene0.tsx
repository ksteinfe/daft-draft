import Layout from '../components/Layout';
import { Segmentation, StructuralAnalysis, ObligationsStructuralAnalysis } from '../../types/Segmentation'; // Adjust the import path as necessary
import { obligationNameMap, ObligationKey } from '../../types/Obligation';

import styles from './Scene0.module.css';

type Scene0Props = {
  segData: Segmentation;
  overallStructuralAnalysis: StructuralAnalysis;
  obligationsStructuralAnalysis: ObligationsStructuralAnalysis;
  activeObligationKey: ObligationKey;
};

export const Scene0 = ({ segData, overallStructuralAnalysis, obligationsStructuralAnalysis, activeObligationKey }: Scene0Props) => {
  const topContent = <div>SCENE 0. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet</div>;

  const countSegmentsPerObligation = () => {
    const counts: Record<ObligationKey, number> = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 };
    segData.forEach(segment => {
      const obg = segment.obg;
      if (counts.hasOwnProperty(obg)) {
        counts[obg as ObligationKey]++;
      }
    });
    return counts;
  };
  const obligationCounts = countSegmentsPerObligation();
  

  function evalToIconName(status: number): string {
    const iconMap: { [key: number]: string } = {
      3: "done_all",
      2: "check",
      1: "warning",
      0: "error"
    };
    return iconMap[status] || "help_outline";
  }
  function evalToText(status: number): string {
    const iconMap: { [key: number]: string } = {
      3: "is well-formed",
      2: "meets expectations",
      1: "needs improvement",
      0: "is ill-formed"
    };
    return iconMap[status] || "is unknown";
  }

  const leftContent = <div className={styles[`overallRecommendation`]}><strong>How might this be better?</strong> {overallStructuralAnalysis.recommendation}</div>;

  const obligationsEntries = Object.entries(obligationsStructuralAnalysis) as [ObligationKey, StructuralAnalysis][];
  const rightContent = (
    <div>
      <div className={styles[`overallEvaluation`]}>Overall, the structure of this text {evalToText(overallStructuralAnalysis.evaluation)}.</div>
      <div className={styles[`overallRationale`]}>{overallStructuralAnalysis.rationale}</div>
      {obligationsEntries.map(([key, analysis]) => {

        const iconName = evalToIconName(analysis.evaluation);
        const iconClass = `material-icons ${styles[`icon-${key}`]}`;
        const headerClass = key === activeObligationKey ? `${styles[`header-active-obg-${key}`]}` : `${styles[`header-obg-${key}`]}`;

        return (
          <div key={key} className={key === activeObligationKey ? styles.activeObligation : styles.inactiveObligation}>
            <div className={styles[`header-obg-wrapper`]}>
              <span className={iconClass}>{iconName}</span>
              <div className={headerClass}>
                <span>The "{obligationNameMap[key]}" obligation</span>
                <br></br>
                <span>{evalToText(analysis.evaluation)}.</span>              
              </div>
            </div>
            <div>
              <span>{analysis.rationale}{'\u00A0'}</span>
              <span>This obligation is addressed by {obligationCounts[key]} sentences.</span>              
            </div>
          </div>
        );
      })}
      <br />
      <br />
      key: {activeObligationKey}
    </div>
  );

  const segments = (
    <div>
      {segData.map(segment => {
        const isActive = (segment.obg == activeObligationKey);
        const dynamicStyleKey = isActive ? `activeSegment-${segment.obg}` : `inactiveSegment-${segment.obg}`;
        const segStyle = styles[dynamicStyleKey];

        return (
          <span key={segment.idx} className={segStyle}>
            {segment.txt}{'\u00A0'}
          </span>
        );
      })}
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
