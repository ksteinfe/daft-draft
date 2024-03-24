'use client'
import { useState } from 'react';
import { InitialTextSubmission } from './components/InitialTextSubmission'; // Adjust the path as necessary
import { Loading } from './components/Loading'; // Adjust the path as necessary
import styles from './page.module.css';

export default function Home() {
  // State and event handling
  const [givenText, setGivenText] = useState<string>('');
  const [segmentedText, setSegmentedText] = useState<string | null>(null);
  const [segmentationReady, setSegmentationReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Segmentation API call logic
    const response = await fetch('/api/segment-text', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ text: givenText }),
    });

    if (response.ok) {
      const { segments } = await response.json();
      setSegmentedText(segments.map((seg: any) => seg.text).join("\n"));
      setSegmentationReady(true);
    } else {
      alert('Error fetching segmentation');
    }
    setIsLoading(false);
  };


  function renderContent() {
    console.log('segmentationReady', segmentationReady);
    console.log('givenText', givenText);
    if (isLoading) { return <Loading />; }
    if (!segmentationReady) {
      return <InitialTextSubmission givenText={givenText} setGivenText={setGivenText} handleSubmit={handleSubmit} />;
    }    
    return <div><pre>{segmentedText}</pre></div>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {renderContent()}
      </div>
    </main>
  );
}
