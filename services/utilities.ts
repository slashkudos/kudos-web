export class Utilities {
  public static classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  public static API = {
    get baseUrl() {
      var location = window.location;
      var baseUrl = location.protocol + "//" + location.host;
      return baseUrl;
    },
    kudosUrlRelative: "/api/kudos",
    get kudosUrlAbsolute() {
      return this.baseUrl + this.kudosUrlRelative;
    },
    get kudosSearchUrl() {
      return this.kudosUrlAbsolute + "/search";
    },
  };
}
