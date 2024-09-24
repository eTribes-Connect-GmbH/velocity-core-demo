import '@hotwired/turbo';
import 'bundle:tailwind.css';
import './base.css';
import './webcomponents/x-dispatch';
import './webcomponents/x-toggle';

import initLiveReload from './utilities/liveReload';

if (process.env.NODE_ENV === 'development') {
  initLiveReload();
}
