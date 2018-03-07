import '../common/polyfill';
import render from './render';

const delivery = (opts = {}) => {
    var defaultOpts = {

    };

    var options = Object.assign(defaultOpts, opts)
    render(options);
}

export { delivery }
