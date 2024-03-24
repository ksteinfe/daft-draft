'use client'
import { useState } from 'react';
import { InitialTextSubmission } from './components/InitialTextSubmission'; // Adjust the path as necessary
import { Loading } from './components/Loading'; // Adjust the path as necessary
import styles from './page.module.css';

import { Segmentation } from '../types/Segment'; // Adjust the import path as necessary


export default function Home() {
  // State and event handling
  const [givenText, setGivenText] = useState<string>('');
  const [segData, setSegData] = useState<Segmentation | null>(null);
  const [segmentationReady, setSegmentationReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

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
    } else {
      alert('Error fetching segmentation');
    }
    setIsLoading(false);
  };


  function renderContent() {
    if (isLoading) { return <Loading />; }
    if (!segmentationReady) {
      return <InitialTextSubmission givenText={givenText} setGivenText={setGivenText} handleSubmit={handleSubmit} />;
    }
    if (!segData) { return "Something has gone wrong. I expected to find a segmentation response from the server."; }
    return (
      <div>
          {segData.map((segment, index) => (
            <span key={index}>
              {segment.txt} {' '}
            </span>
          ))}
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {renderContent()}
      </div>
    </main>
  );
}
