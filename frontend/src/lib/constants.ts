export const CHECK_URL = "/api/check"
export const POSTS_URL = "/api/posts"
export const CREATE_POST_URL = "/api/post"
export const DOWNLOAD_POST_URL = (post: string) => "/api/static/posts/" + post
export const DELETE_POST_URL = (post: string) => "/api/posts/" + post
export const COVERAGES_URL = "/api/coverages"
export const DOWNLAOD_COVERAGE_URL = (coverage: string) => "/api/static/coverages/" + coverage
export const DELETE_COVERAGE_URL = (coverage: string) => "/api/coverages/" + coverage
export const ADD_COVERAGE_URL = "/api/coverage"
export const OUTPUT_DOWNLOAD = "/api/coverage-last"
export const CREATE_COVERAGE = "/api/coverages"
export const UPLOAD_COMMNETS = "/api/sender/comments"
export const UPLOAD_INPUT = "/api/sender/input"
export const UPLOAD_ORDER = "/api/sender/order"
export const UPLOAD_SETTINGS = "/api/sender/settings"
export const SENDER_WS_URL =  "ws://" + location.host + "/api/sender/run"
export const SENDER_LOGS_URL = "/api/static/logs/sender"