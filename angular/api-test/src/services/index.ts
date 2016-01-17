import {NewsService} from "./news";
import {UseNewsService} from "./useNews";

export default function setup(app: ng.IModule) {
  app.service("newsService", NewsService);
  app.service("useNewsService", UseNewsService);
}