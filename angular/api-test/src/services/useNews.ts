import {NewsService} from "./news";
import {News} from "../resources/news";

export class UseNewsService {
  constructor(private newsService: NewsService) {
    "ngInject";
  }

  use(id: string): ng.IPromise<News> {
    return this.newsService.news.one(id).get<News>().then((news: News) => {
      console.log(`@@ ${news.output()}`);
      return news;
    });
  }
}