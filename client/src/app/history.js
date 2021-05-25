import { createBrowserHistory } from 'history'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-191719099-1')

const history = createBrowserHistory();

history.listen((location) => {
  ReactGA.pageview(location.pathname)
})

// workaround for initial visit
if (window.performance && (performance.navigation.type === performance.navigation.TYPE_NAVIGATE)) {
  ReactGA.pageview('/')
}

export default history
