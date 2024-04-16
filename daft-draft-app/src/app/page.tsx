'use client'
import { useState, useEffect } from 'react';
import { InitialTextEntry } from './components/InitialTextEntry'; // Adjust the path as necessary
import { Loading } from './components/Loading'; // Adjust the path as necessary
import styles from './page.module.css';

import { Segmentation, StructuralAnalysis, ObligationsStructuralAnalysis } from '../types/Segmentation';
import { ObligationKey, AllObligationKeys } from '../types/Obligation';


import Layout from './components/Layout';
import Scene0 from './scenes/Scene0';
import Scene1 from './scenes/Scene1';

export default function Home() {
  // State and event handling
  const [givenText, setGivenText] = useState<string>('');
  const [segmentationReady, setSegmentationReady] = useState<boolean>(false);
  const [segmentationIsLoading, setSegmentationIsLoading] = useState<boolean>(false);

  const [segData, setSegData] = useState<Segmentation | null>(null);
  const [overallStructuralAnalysis, setOverallStructuralAnalysis] = useState<StructuralAnalysis | null>(null);
  const [obligationsStructuralAnalysis, setObligationsStructuralAnalysis] = useState<ObligationsStructuralAnalysis | null>(null);

  const [activeSegIndex, setActiveSegIndex] = useState<number>(0);   // scene number is -1 if segmentation is not ready; otherwise, it is the index of the current segment
  const [activeObligationKey, setActiveObligationKey] = useState<ObligationKey>('a');   // 
  const [activeSceneNumber, setActiveSceneNumber] = useState<number>(-1);
  const maxScene = 1;


  // Keyboard event handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!segmentationReady || segmentationIsLoading || !segData) return;

      switch (event.key) {
        case 'ArrowUp':
          switch (activeSceneNumber) {
            case 0:
              // Move to the previous obligation a-f or loop back to the last obligation if at the start
              setActiveObligationKey(prevObligationKey => {
                const currentIndex = AllObligationKeys.indexOf(prevObligationKey);
                const newIndex = currentIndex === 0 ? AllObligationKeys.length - 1 : currentIndex - 1;
                return AllObligationKeys[newIndex] as ObligationKey;
              });
              break;
            case 1:
              // Move to the previous segment or loop back to the last segment if at the start
              setActiveSegIndex((prevIndex) => prevIndex === 0 ? segData.length - 1 : Math.max(prevIndex - 1, 0));
            default:
              return "Something has gone wrong. Strange scene number encountered: " + activeSceneNumber;
          }
          break;
        case 'ArrowDown':
          switch (activeSceneNumber) {
            case 0:
              // Move to the next obligation a-f or loop back to the first obligation if at the end
              setActiveObligationKey(prevObligationKey => {
                const currentIndex = AllObligationKeys.indexOf(prevObligationKey);
                const newIndex = currentIndex === AllObligationKeys.length - 1 ? 0 : currentIndex + 1;
                return AllObligationKeys[newIndex] as ObligationKey;
              });              
              break;
            case 1:
              // Move to the next segment or loop back to -1 if at the last segment
              setActiveSegIndex((prevIndex) => prevIndex === segData.length - 1 ? 0 : Math.min(prevIndex + 1, segData.length - 1));
            default:
              return "Something has gone wrong. Strange scene number encountered: " + activeSceneNumber;
          }
          break;


        case 'ArrowLeft':
          // Move to the previous scene or loop back to the last scene if at the start
          setActiveSceneNumber((prevNum) => prevNum === 0 ? maxScene : Math.max(prevNum - 1, 0));
          break;
        case 'ArrowRight':
          // Move to the next scene or loop back to the first scene if at the end
          setActiveSceneNumber((prevNum) => prevNum === maxScene ? 0 : Math.min(prevNum + 1, maxScene));
          break;
        default:
          break;
      }

    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [segmentationReady, segmentationIsLoading, segData, activeSceneNumber, activeObligationKey]);

  // Inital Text Form Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSegmentationIsLoading(true);

    // Segmentation API call logic
    const response = await fetch('/api/segment-text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: givenText }),
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      setSegData(jsonResponse.segmentation);
      setOverallStructuralAnalysis(jsonResponse.overall_structural_analysis);
      setObligationsStructuralAnalysis(jsonResponse.obligations_structural_analysis);
      setSegmentationReady(true);
      setActiveSceneNumber(0);
    } else {
      alert('Error fetching segmentation');
    }
    setSegmentationIsLoading(false);
  };


  function renderContent() {
    if (segmentationIsLoading) {
      return <Loading />;
    }
    if (!segmentationReady) {
      return (
        <Layout
          top={null}
          left="some instructions here..."
          center={<InitialTextEntry givenText={givenText} setGivenText={setGivenText} handleSubmit={handleSubmit} />}
          right={
            <button type="submit" form="initTextForm">Submit</button>
          }
          style={'a'}
        />
      );
    }
    if (!segData || !overallStructuralAnalysis || !obligationsStructuralAnalysis || activeSceneNumber < 0) {
      return "Something has gone wrong. I expected to find a segmentation response from the server, or for the scene to be set";
    }

    switch (activeSceneNumber) {
      case 0:
        return Scene0({ segData, overallStructuralAnalysis, obligationsStructuralAnalysis, activeObligationKey });
      case 1:
        return Scene1({ segData, activeSegIndex });

      default:
        return "Something has gone wrong. Strange scene number encountered: " + activeSceneNumber;
    }

  }


  return (
    <main className={styles.main}>
      {renderContent()}
    </main>
  );
}
