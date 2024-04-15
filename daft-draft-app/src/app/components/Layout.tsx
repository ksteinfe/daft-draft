// Layout.js or Layout.tsx if you're using TypeScript

import React, { ReactNode } from 'react';
import styles from './Layout.module.css'; // Adjust the import path as needed

interface LayoutProps {
    top: ReactNode;
    left: ReactNode;
    center: ReactNode;
    right: ReactNode;
    style: string;
}

const Layout: React.FC<LayoutProps> = ({ top, left, center, right, style }) => {


    switch (style) {
        case "a":
            return (
                <div className={styles['layout-container']}>
                    <div className={styles['layout-top']}>
                        {top}
                    </div>
                    <div className={styles['layout-section']}>
                        <div className={styles['layout-a-left']}>
                        <div className={`${styles['layout-a-center']}`}>{center}</div>
                            {left}
                        </div>
                        <div className={styles['layout-a-right']}>
                            <div className={styles['layout-center-spacer']}></div>
                            <div className={styles['layout-center-ghost']}>{'\u00A0'}</div>
                            {right}
                        </div>
                    </div>
                </div>
            );
        case "b":
            return (
                <div className={styles['layout-container']}>
                    <div className={styles['layout-top']}>
                        {top}
                    </div>
                    <div className={styles['layout-section']}>
                        <div className={styles['layout-b-left']}>
                        <div className={`${styles['layout-b-center']} ${styles['scrollable-div']}`}>{center}</div>
                            {left}
                        </div>
                        <div className={styles['layout-b-right']}>
                            <div className={styles['layout-center-spacer']}></div>
                            <div className={styles['layout-center-ghost']}>{'\u00A0'}</div>
                            {right}
                        </div>
                    </div>
                </div>
            );
        
        default:
            return "Something has gone wrong. Strange layout style encountered : "  + style;
        }


};

export default Layout;
