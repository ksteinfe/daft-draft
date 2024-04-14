'use client'
import { useState, useEffect } from 'react';
import { InitialTextEntry } from './components/InitialTextEntry'; // Adjust the path as necessary
import { Loading } from './components/Loading'; // Adjust the path as necessary
import styles from './page.module.css';

import { Segmentation } from '../types/Segment'; // Adjust the import path as necessary

import Layout from './components/Layout';
import SegmentDisplay from './components/SegmentDisplay';


export default function Home() {
  // State and event handling
  const [givenText, setGivenText] = useState<string>('');
  const [segData, setSegData] = useState<Segmentation | null>(null);
  const [segmentationReady, setSegmentationReady] = useState<boolean>(false);
  const [segmentationIsLoading, setSegmentationIsLoading] = useState<boolean>(false);
  const [activeSegIndex, setActiveSegIndex] = useState<number>(-1);


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
          center={<InitialTextEntry givenText={givenText} setGivenText={setGivenText} handleSubmit={handleSubmit} /> }
          right={
            <button type="submit" form="initTextForm">Submit</button>
          }
          centerTall={true}
        />
      );
    }
    if (!segData) {
      return "Something has gone wrong. I expected to find a segmentation response from the server.";
    }

    const topContent = <div>TOP. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at magna erat. In posuere, mauris sed sodales laoreet, dolor tellus vulputate lorem, a ullamcorper justo nibh in sapien. Aenean ornare, velit quis gravida pellentesque, quam diam lobortis orci, vel luctus quam purus eu nunc. Morbi accumsan placerat nulla non mollis. Aenean dolor augue, sodales nec tincidunt id, tempus sit amet arcu. Ut urna augue, fringilla nec mollis nec, fringilla a est. Mauris vitae ex placerat, scelerisque velit id, congue nunc. Donec erat tortor, iaculis nec finibus dignissim, rhoncus id risus.</div>;
    const leftContent = <div>LEFT. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at magna erat. In posuere, mauris sed sodales laoreet, dolor tellus vulputate lorem, a ullamcorper justo nibh in sapien. Aenean ornare, velit quis gravida pellentesque, quam diam lobortis orci, vel luctus quam purus eu nunc. Morbi accumsan placerat nulla non mollis. Aenean dolor augue, sodales nec tincidunt id, tempus sit amet arcu. Ut urna augue, fringilla nec mollis nec, fringilla a est. Mauris vitae ex placerat, scelerisque velit id, congue nunc. Donec erat tortor, iaculis nec finibus dignissim, rhoncus id risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at magna erat. In posuere, mauris sed sodales laoreet, dolor tellus vulputate lorem, a ullamcorper justo nibh in sapien. Aenean ornare, velit quis gravida pellentesque, quam diam lobortis orci, vel luctus quam purus eu nunc. Morbi accumsan placerat nulla non mollis. Aenean dolor augue, sodales nec tincidunt id, tempus sit amet arcu. Ut urna augue, fringilla nec mollis nec, fringilla a est. Mauris vitae ex placerat, scelerisque velit id, congue nunc. Donec erat tortor, iaculis nec finibus dignissim, rhoncus id risus.</div>;
    const rightContent = <div>RIGHT. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at magna erat. In posuere, mauris sed sodales laoreet, dolor tellus vulputate lorem, a ullamcorper justo nibh in sapien. Aenean ornare, velit quis gravida pellentesque, quam diam lobortis orci, vel luctus quam purus eu nunc. Morbi accumsan placerat nulla non mollis. Aenean dolor augue, sodales nec tincidunt id, tempus sit amet arcu. Ut urna augue, fringilla nec mollis nec, fringilla a est. Mauris vitae ex placerat, scelerisque velit id, congue nunc. Donec erat tortor, iaculis nec finibus dignissim, rhoncus id risus.</div>;
    return (
      <Layout
        top={topContent}
        left={leftContent}
        center={<SegmentDisplay segData={segData} activeSegIndex={activeSegIndex} />}
        right={rightContent}
        centerTall={false}
      />
    );

  }


  return (
    <main className={styles.main}>
      {renderContent()}
    </main>
  );
}
