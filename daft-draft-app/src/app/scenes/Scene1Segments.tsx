// Corrected import statement
import React, { useEffect, useState, RefObject } from 'react';
import { Segmentation } from '../../types/Segment'; 
import styles from './Scene1Segments.module.css';


interface Scene1SegmentsProps {
  segData: Segmentation;
  activeSegIndex: number;
}

const Scene1Segments: React.FC<Scene1SegmentsProps> = ({ segData, activeSegIndex }) => {
  // Initialize the refs state with an array of RefObjects
  const [refs, setRefs] = useState<RefObject<HTMLDivElement>[]>([]);

  useEffect(() => {
    // Dynamically adjust the refs array based on segData's length
    setRefs(segData.map((_, i) => refs[i] || React.createRef<HTMLDivElement>()));
  }, [segData]);

  useEffect(() => {
    //console.log(activeSegIndex); // Debug
    const targetIndex = activeSegIndex === -1 ? 0 : activeSegIndex;
    const activeRef = refs[targetIndex];
    if (activeRef?.current?.parentNode) {
      const scrollContainer = activeRef.current.parentNode.parentNode as HTMLElement; // Ensure this is your scroll container
  
      //console.log({scrollContainer, activeRef: activeRef.current}); // Debug
  
      if (scrollContainer) {
        const activeElementTop = activeRef.current.offsetTop;
        const activeElementHeight = activeRef.current.offsetHeight;
        const scrollContainerHeight = scrollContainer.clientHeight;
        const scrollTop = activeElementTop + (activeElementHeight * 0.5 ) - (scrollContainerHeight * 0.5 );
  
        //console.log({activeElementTop, activeElementHeight, scrollContainerHeight, scrollTop}); // Debug
  
        scrollContainer.scrollTo({
          top: scrollTop,
          behavior: 'smooth',
        });
      }
    }
  }, [activeSegIndex, refs]);
  
  
  

  return (
    <div>
      
      {segData.map((segment, index) => (
        <span
          key={index}
          ref={refs[index]}
          className={
            activeSegIndex === -1 ? styles.activeSegment : 
            index === activeSegIndex ? styles.activeSegment : styles.inactiveSegment
          }
        >
          {segment.txt}{'\u00A0'}
        </span>
      ))}
      
    </div>
  );
};

export default Scene1Segments;
