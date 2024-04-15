
import Layout from '../components/Layout';
import { Segmentation } from '../../types/Segment';


type Scene0Props = {
  segData: Segmentation;
};

export const Scene0 = ({ segData }: Scene0Props) => {
  const topContent = <div>SCENE 0. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet</div>;
  const leftContent = <div>LEFT. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at magna erat. In posuere, mauris sed sodales laoreet, dolor tellus vulputate lorem, a ullamcorper justo nibh in sapien. Aenean ornare, velit quis gravida pellentesque, quam diam lobortis orci, vel luctus quam purus eu nunc. Morbi accumsan placerat nulla non mollis. Aenean dolor augue, sodales nec tincidunt id.  </div>;
  const rightContent = <div>RIGHT. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at magna erat. In posuere, mauris sed sodales laoreet, dolor tellus vulputate lorem, a ullamcorper justo nibh in sapien. Aenean ornare, velit quis gravida pellentesque, quam diam lobortis orci, vel luctus quam purus eu nunc. Morbi accumsan placerat nulla non mollis. Aenean dolor augue, sodales nec tincidunt id, tempus sit amet arcu. Ut urna augue, fringilla nec mollis nec, fringilla a est. Mauris vitae ex placerat, scelerisque velit id, congue nunc. Donec erat tortor, iaculis nec finibus dignissim, rhoncus id risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at magna erat. In posuere, mauris sed sodales laoreet, dolor tellus vulputate lorem, a ullamcorper justo nibh in sapien. Aenean ornare, velit quis gravida pellentesque, quam diam lobortis orci, vel luctus quam purus eu nunc. In posuere, mauris sed sodales laoreet, dolor tellus vulputate lorem, a ullamcorper justo nibh in sapien. Aenean ornare, velit quis gravida pellentesque, quam diam lobortis orci, vel luctus quam purus eu nunc. Morbi accumsan placerat nulla non mollis. Aenean dolor augue, sodales nec tincidunt id, tempus sit amet arcu. Ut urna augue, fringilla nec mollis nec, fringilla a est. Mauris vitae ex placerat, scelerisque velit id, congue nunc. Morbi accumsan placerat nulla non mollis. Aenean dolor augue, sodales nec tincidunt id, tempus sit amet arcu. Ut urna augue, fringilla nec mollis nec, fringilla a est. Mauris vitae ex placerat, scelerisque velit id, congue nunc. Donec erat tortor, iaculis nec finibus dignissim, rhoncus id risus.</div>;


  const segments = (
    <div>
      {
        segData.map((segment, index) => (
          <span key={index}>
            {segment.txt}{'\u00A0'}
          </span>
        ))
      }
    </div >
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