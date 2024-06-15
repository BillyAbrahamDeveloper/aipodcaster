'use client';

import EmptyState from '@/components/EmptyState';
import LoaderSpiner from '@/components/LoaderSpiner';
import PodcastCard from '@/components/PodcastCard';
import SearchBar from '@/components/SearchBar';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

const Discover = ({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) => {
  const podcastData = useQuery(api.podcasts.getPodcastBySearch, {
    search: search || '',
  });

  return (
    <div className='flex flex-col gap-9'>
      <SearchBar />
      <div className='flex flex-col gap-9'>
        <h1 className='text-white-1 font-bold text-20'>
          {!search ? (
            'Discover'
          ) : (
            <p>
              Searching result for:{' '}
              <span className=' text-orange-1'> {search}</span>{' '}
            </p>
          )}
        </h1>
        {podcastData ? (
          <>
            {podcastData.length > 0 ? (
              <div className='podcast_grid'>
                {podcastData?.map(
                  ({ _id, imageUrl, podcastDescription, podcastTitle }) => (
                    <PodcastCard
                      key={_id}
                      imgUrl={imageUrl!}
                      description={podcastDescription}
                      title={podcastTitle}
                      podcastId={_id}
                    />
                  )
                )}
              </div>
            ) : (
              <EmptyState title='No results found' />
            )}
          </>
        ) : (
          <LoaderSpiner />
        )}
      </div>
    </div>
  );
};

export default Discover;
