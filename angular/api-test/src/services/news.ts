import {NewsJSONData} from '../resources/news';

export class NewsService {
  public news: restangular.IElementTyped<NewsJSONData>;
  public untyped: restangular.IElement;

  constructor(private Restangular: restangular.IService) {
    "ngInject";
    this.news = Restangular.all<NewsJSONData>("news");
    this.untyped = Restangular.all("news");
  }
}