interface IVideoTrainings {
  categories: string[];
  videos: IVideo[];
}
interface IVideo {
  id: number;
  title: string;
  category: string;
  details: VideoDetails;
}

type VideoDetails = {
  description: string;
  cal: number;
  rest: number;
  levels: number[];
  reps: string;
};

export type { IVideoTrainings, IVideo };
