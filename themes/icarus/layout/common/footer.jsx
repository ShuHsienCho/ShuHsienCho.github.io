const { Component } = require('inferno');
const { cacheComponent } = require('../util/cache');

class Footer extends Component {
    render() {
        const {
            logo,
            logoUrl,
            siteUrl,
            siteTitle,
            siteYear,
            author,
            links,
            showVisitorCounter,
            visitorCounterTitle,
            url_for
        } = this.props;

        return <footer class="footer">
            <div class="container">
                <div class="level">
                    <div class="level-start">

                        <p class="size-small">
                            <span dangerouslySetInnerHTML={{ __html: `&copy; ${siteYear} ${author || siteTitle}` }}></span>
                            &nbsp;&nbsp;Powered by <a href="https://hexo.io/" target="_blank">Hexo</a> & <a
                                href="https://github.com/ppoffice/hexo-theme-icarus" target="_blank">Icarus</a>,Modify by <a href="https://github.com/removeif" target="_blank">removeif</a>&nbsp;
                   <br />
                            {showVisitorCounter ? <div class="size-small"><span id="busuanzi_container_site_uv">
                                ❤️Thanks to<strong>&nbsp;<span id="busuanzi_value_site_uv">99+</span>&nbsp;</strong>
                            </span> visitors for
                                <strong>&nbsp;<span id="busuanzi_value_site_pv">99+</span>&nbsp;</strong> views，<a href="https://github.com/removeif/hexo-theme-amazing" target="_blank">Source code</a>！❤️</div> : null}
                        </p>
                    </div>
                    <div class="level-end">
                        {Object.keys(links).length ? <div class="field has-addons">
                            {Object.keys(links).map(name => {
                                const link = links[name];
                                return <p class="control">
                                    <a class={`button is-transparent ${link.icon ? 'is-large' : ''}`} target="_blank" rel="noopener" title={name} href={link.url}>
                                        {link.icon ? <i class={link.icon}></i> : name}
                                    </a>
                                </p>;
                            })}
                        </div> : null}
                    </div>
                </div>
            </div>
        </footer>;
    }
}

module.exports = cacheComponent(Footer, 'common.footer', props => {
    const { config, helper } = props;
    const { url_for, _p, date } = helper;
    const { logo, title, author, footer, plugins } = config;

    const links = {};
    if (footer && footer.links) {
        Object.keys(footer.links).forEach(name => {
            const link = footer.links[name];
            links[name] = {
                url: url_for(typeof link === 'string' ? link : link.url),
                icon: link.icon
            };
        });
    }

    return {
        url_for: url_for,
        logo,
        logoUrl: url_for(logo),
        siteUrl: url_for('/'),
        siteTitle: title,
        siteYear: date(new Date(), 'YYYY'),
        author,
        links,
        showVisitorCounter: plugins && plugins.busuanzi === true,
        visitorCounterTitle: _p('plugin.visitor', '<span id="busuanzi_value_site_uv">0</span>')
    };
});
