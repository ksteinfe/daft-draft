
import Layout from '../components/Layout';
import { Segmentation } from '../../types/Segmentation'; 
import Scene1Segments from './Scene1Segments';

type Scene1Props = {
    segData: Segmentation;
    activeSegIndex: number;
};

export const Scene1 = ({ segData, activeSegIndex }: Scene1Props) => {
    const topContent = <div>SCENE 1. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet</div>;
    const leftContent = <div>LEFT. Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at magna erat. In posuere, mauris sed sodales laoreet, dolor tellus vulputate lorem, a ullamcorper justo nibh in sapien. Aenean ornare, velit quis gravida pellentesque, quam diam lobortis orci, vel luctus quam purus eu nunc. Morbi accumsan placerat nulla non mollis. Aenean dolor augue, sodales nec tincidunt id, tempus sit amet arcu. Ut urna augue, fringilla nec mollis nec, fringilla a est. Mauris vitae ex placerat, scelerisque velit id, congue nunc. Donec erat tortor, iaculis nec finibus dignissim, rhoncus id risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at magna erat. In posuere, mauris sed sodales laoreet, dolor tellus vulputate lorem, a ullamcorper justo nibh in sapien. Aenean ornare, velit quis gravida pellentesque, quam diam lobortis orci, vel luctus quam purus eu nunc. Morbi accumsan placerat nulla non mollis. Aenean dolor augue, sodales nec tincidunt id, tempus sit amet arcu. Ut urna augue, fringilla nec mollis nec, fringilla a est. Mauris vitae ex placerat, scelerisque velit id, congue nunc. Donec erat tortor, iaculis nec finibus dignissim, rhoncus id risus.</div>;
    const rightContent = <div>RIGHT. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at magna erat. In posuere, mauris sed sodales laoreet, dolor tellus vulputate lorem, a ullamcorper justo nibh in sapien. Aenean ornare, velit quis gravida pellentesque, quam diam lobortis orci, vel luctus quam purus eu nunc. Morbi accumsan placerat nulla non mollis. Aenean dolor augue, sodales nec tincidunt id, tempus sit amet arcu. Ut urna augue, fringilla nec mollis nec, fringilla a est. Mauris vitae ex placerat, scelerisque velit id, congue nunc. Donec erat tortor, iaculis nec finibus dignissim, rhoncus id risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at magna erat. In posuere, mauris sed sodales laoreet, dolor tellus vulputate lorem, a ullamcorper justo nibh in sapien. Aenean ornare, velit quis gravida pellentesque, quam diam lobortis orci, vel luctus quam purus eu nunc. Morbi accumsan placerat nulla non mollis. Aenean dolor augue, sodales nec tincidunt id, tempus sit amet arcu. Ut urna augue, fringilla nec mollis nec, fringilla a est. Mauris vitae ex placerat, scelerisque velit id, congue nunc. Donec erat tortor, iaculis nec finibus dignissim, rhoncus id risus.</div>;
    return (
      <Layout
        top={topContent}
        left={leftContent}
        center={<Scene1Segments segData={segData} activeSegIndex={activeSegIndex} />}
        right={rightContent}
        style={'b'}
      />
    );
};

export default Scene1;