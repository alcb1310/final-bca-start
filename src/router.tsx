import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

function getRouter() {
    const router = createRouter({
        routeTree,
        scrollRestoration: true,
        defaultNotFoundComponent: () => <div>Not Found</div>,
        defaultPreload: 'intent',
    })

    return router
}

export { getRouter }
