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

    // Relative URLs
    get kudosUrlRelative() {
      return "/api/kudos";
    },
    get kudosSearchUrlRelative() {
      return this.kudosUrlRelative + "/search";
    },

    // Absolute URLs
    get kudosUrlAbsolute() {
      return this.baseUrl + this.kudosUrlRelative;
    },
    get kudosSearchUrlAbsolute() {
      return this.baseUrl + this.kudosSearchUrlRelative;
    },
  };
}
