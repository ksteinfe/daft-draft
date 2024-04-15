'use client'
import { useState, useEffect } from 'react';
import { InitialTextEntry } from './components/InitialTextEntry'; // Adjust the path as necessary
import { Loading } from './components/Loading'; // Adjust the path as necessary
import styles from './page.module.css';

import { Segmentation } from '../types/Segment'; // Adjust the import path as necessary

import Layout from './components/Layout';
import Scene1 from './scenes/Scene1';

export default function Home() {
  // State and event handling
  const [givenText, setGivenText] = useState<string>('');
  const [segData, setSegData] = useState<Segmentation | null>(null);
  const [segmentationReady, setSegmentationReady] = useState<boolean>(false);
  const [segmentationIsLoading, setSegmentationIsLoading] = useState<boolean>(false);
  const [activeSegIndex, setActiveSegIndex] = useState<number>(-1);

  // scene number is -1 if segmentation is not ready; otherwise, it is the index of the current segment
  const [sceneNumber, setSceneNumber] = useState<number>(-1);


  // Keyboard event handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!segmentationReady || segmentationIsLoading || !segData) return;

      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          // Move to the previous segment or loop back to the last segment if at the start
          setActiveSegIndex((prevIndex) => prevIndex === -1 ? segData.length - 1 : Math.max(prevIndex - 1, -1));
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          // Move to the next segment or loop back to -1 if at the last segment
          setActiveSegIndex((prevIndex) => prevIndex === segData.length - 1 ? -1 : Math.min(prevIndex + 1, segData.length - 1));
          break;
        default:
          break;
      }

    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [segmentationReady, segmentationIsLoading, segData]);

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
      setSegmentationReady(true);
      setSceneNumber(0);
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
          centerTall={true}
        />
      );
    }
    if (!segData || sceneNumber < 0) {
      return "Something has gone wrong. I expected to find a segmentation response from the server, or for the scene to be set";
    }

    switch (sceneNumber) {
      case 0:
        return Scene1({ segData, activeSegIndex });
      case 1:
        break;
      
      default:
        return "Something has gone wrong. Strange scene number encountered."
    }

  }


  return (
    <main className={styles.main}>
      {renderContent()}
    </main>
  );
}
