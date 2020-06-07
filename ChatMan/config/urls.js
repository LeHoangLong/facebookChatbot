const ROUTER_PREFIX = '/chatman';

module.exports.urls = {
    BASE_URL: 'https://tunnel.mysuperawesomeweb.co.uk',
    ROUTER_PREFIX: ROUTER_PREFIX,
    STATIC_FILE_URL: `${ROUTER_PREFIX}/static`,
    JS_SCRIPT_URL: `${ROUTER_PREFIX}/static/js`,
    FACEBOOK_POST_COMMENT_EVENT_CALLBACK_URL: `${ROUTER_PREFIX}/webhook`
}