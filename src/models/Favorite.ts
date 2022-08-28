interface IFavorite {
  videoTrainings: number[];
  trainings: number[];
}

enum FavoritePath {
  videos = 'favorite/video-trainings'
}

export { FavoritePath };
export type { IFavorite };
