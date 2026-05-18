interface Props {
  youtubeId: string;
  title: string;
}

export default function VideoPlayer({ youtubeId, title }: Props) {
  return (
    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg bg-black">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}
