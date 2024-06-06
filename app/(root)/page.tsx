import PodcastCard from '@/components/PodcastCard';
import { Button } from '@/components/ui/button';
import { podcastData } from '@/constants';

const Home = () => {
  return (
    <div className=' mt-9  '>
      <section className=' flex flex-col gap-5'>
        <h1 className=' text-20 font-bold text-white-1'>Trending Podcasts</h1>
        <div className='podcast_grid'>
          {podcastData.map(({ id, imgURL, description, title }) => (
            <PodcastCard
              key={id}
              imgURL={imgURL}
              description={description}
              title={title}
              podcastId={id}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
