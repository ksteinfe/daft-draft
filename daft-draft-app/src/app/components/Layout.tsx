// Layout.js or Layout.tsx if you're using TypeScript

import React, { ReactNode } from 'react';
import styles from './Layout.module.css'; // Adjust the import path as needed

interface LayoutProps {
    top: ReactNode;
    left: ReactNode;
    center: ReactNode;
    right: ReactNode;
    centerTall?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ top, left, center, right, centerTall=false }) => {
    
    const centerDiv = centerTall ? 
        <div className={`${styles['layout-center']} ${styles['layout-center-tall']}`}>{center}</div> : 
        <div className={`${styles['layout-center']} ${styles['layout-center-short']} ${styles['scrollable-div']}`}>{center}</div>;
    
    return (
        <div className={styles['layout-container']}>
            <div className={styles['layout-top']}>
                {top}
            </div>
            <div className={styles['layout-section']}>
                <div className={styles['layout-left']}>
                    {centerDiv}
                    {left}
                </div>
                <div className={styles['layout-right']}>
                    {right}
                </div>
            </div>
        </div>
    );
};

export default Layout;
