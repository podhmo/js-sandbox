import {NewsService} from "./news";
import {News, NewsJSONData} from "../resources/news";
import {Person} from "../resources/person";

export class UseNewsService {
  constructor(private newsService: NewsService) {
    "ngInject";
  }

  use(id: string): ng.IPromise<News> {
    return this.newsService.news.one(id).get().then((data) => {
      const news = new News(data);
      console.log(`@@ ${news.output()}`);
      return news;
    });
  }
}