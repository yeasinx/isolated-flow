import { http, HttpResponse } from "msw";

import emptyUserList from "../mocks/fixtures/empty-user-list.json";
import validUserListPage1 from "../mocks/fixtures/valid-user-list-p1.json";

export const handler = [
  http.get("/api/v1/users", ({ request }) => {
    const url = new URL(request.url);
    const pageString = url.searchParams.get("page");
    const page = pageString ? parseInt(pageString, 10) : 1;

    if (page < 1 || isNaN(page)) {
      return HttpResponse.json(
        { error: { code: "INVALID_PAGE", message: "Invalid page number" } },
        { status: 400 },
      );
    }

    if (page === 99) {
      return HttpResponse.json(emptyUserList);
    }

    if (page === 1) {
      return HttpResponse.json(validUserListPage1);
    }

    return HttpResponse.json(emptyUserList)
  }),
];
