import generateSearchParam from "./searchParam";

describe("generateSearchParam", () => {
  it("should return right parameters", () => {
    expect(
      generateSearchParam(
        "tage='angular'",
        "author='henry'",
        "keyword='good article'"
      )
    );
  });
});
