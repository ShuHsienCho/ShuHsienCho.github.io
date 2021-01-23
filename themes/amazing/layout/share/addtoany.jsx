const { Component, Fragment } = require('inferno');
const { cacheComponent } = require('../util/cache');

class AddToAny extends Component {
    render() {
        return <Fragment>
            <div class="a2a_kit a2a_kit_size_32 a2a_default_style">
                <a class="a2a_dd" href="https://www.addtoany.com/share"></a>
                <a class="a2a_button_facebook"></a>
                <a class="a2a_button_twitter"></a>
                <a class="a2a_button_email"></a>
                <a class="a2a_button_linkedin"></a>
                <a class="a2a_button_facebook_messenger"></a>
                <a class="a2a_button_line"></a>
                <a class="a2a_button_wechat"></a>
                <a class="a2a_button_telegram"></a>
                <a class="a2a_button_google_gmail"></a>
            </div>
        <script async src="https://static.addtoany.com/menu/page.js"></script>
        </Fragment>;
    }
}

module.exports = cacheComponent(AddToAny, 'share.addtoany', props => {
    return {};
});
