import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

function getRouter() {
    const router = createRouter({
        routeTree,
        scrollRestoration: true,
    })

    return router
}

export { getRouter }
