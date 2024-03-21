export const CHECK_URL = "/api/check"
export const POSTS_URL = "/api/posts"
export const CREATE_POST_URL = "/api/post"
export const DOWNLOAD_POST_URL = (post: string) => "/api/static/posts/" + post
export const DELETE_POST_URL = (post: string) => "/api/posts/" + post
export const COVERAGES_URL = "/api/coverages"
export const DOWNLAOD_COVERAGE_URL = (coverage: string) => "/api/static/coverages/" + coverage
export const DELETE_COVERAGE_URL = (coverage: string) => "/api/coverages/" + coverage