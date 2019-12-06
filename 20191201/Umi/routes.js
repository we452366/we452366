export default [
    {
        path: '/',
        component: require('../layouts/index.js').default,
        routes: [
            {
                path: '/',
                exact: true,
                component: require('../pages/index.js').default,
            },
            {
                path: '/login',
                exact: true,
                component: require('../pages/login.js').default,
            },
            {
                path: '/profile',
                exact: true,
                component: require('../pages/profile.js').default,
                title: '个人中心',
                Routes: require('../PrivateRoute.js').default,
            },
            {
                path: '/user',
                exact: false,
                component: require('../pages/user/_layout.js').default,
                routes: [
                    {
                        path: '/user/add',
                        exact: true,
                        component: require('../pages/user/add.js').default,
                    },
                    {
                        path: '/user/detail/:id',
                        exact: true,
                        component: require('../pages/user/detail/$id.js').default,
                    },
                    {
                        path: '/user/list',
                        exact: true,
                        component: require('../pages/user/list.js').default,
                    }
                ],
            }
        ],
    }
];