/* The theme dims many elements in night mode with `filter: brightness(...)`,
   applied to both a container and the image or icon inside it. Safari does not
   repaint such nested filters: the avatar stays black until hovered, the social
   icons disappear, and stale fragments of the avatar show up. Turn them off. */
hexo.extend.injector.register('head_end', `<style id="night-filter-fix">
.night #index_hot_div, .night #index_hot_div .item, .night #post-calendar canvas,
.night .button.is-large, .night .button.is-light, .night .button.is-marginless .fab,
.night .button:not(.is-white), .night .fa-envelope, .night .fas, .night .g-ads-x,
.night .g-ads-y, .night .g-emoji, .night .google-auto-placed, .night .gt-btn,
.night .gt-comment-body pre, .night .is-current, .night .level-item.tag.is-danger,
.night .meplayer-control-play, .night .social-share, .night .time-axis-main,
.night .waifu canvas, .night .widget .tags .tag:first-child, .night figure,
.night img, .night input, .night strong { filter: none !important; }
</style>`);
