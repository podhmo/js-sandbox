export class NewsService {
  public news: restangular.IElement;

  constructor(private Restangular: restangular.IService) {
    "ngInject";
    this.news = Restangular.all("news");
  }
}