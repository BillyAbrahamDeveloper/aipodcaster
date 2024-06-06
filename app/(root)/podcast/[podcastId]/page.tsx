const PodCastDetails = ({ params }: { params: { podcastId: string } }) => {
  return (
    <div>
      <h1 className='text-white-1 font-bold text-20'>{params.podcastId}</h1>;
    </div>
  );
};

export default PodCastDetails;
