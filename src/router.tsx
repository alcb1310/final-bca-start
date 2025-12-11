import { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { routeTree } from './routeTree.gen'

function getRouter() {
    const queryClient = new QueryClient()

    const router = createRouter({
        routeTree,
        scrollRestoration: true,
        defaultNotFoundComponent: () => <div>Not Found</div>,
        defaultPreload: 'intent',
        context: { queryClient },
    })

    setupRouterSsrQueryIntegration({
        router,
        queryClient,
    })

    return router
}

export { getRouter }
