//该文件废弃 参考https://www.jianshu.com/p/677d97e617ca
export default function({ route, redirect, store }) {
    if (process.client) {
        // const token = sessionStorage.getItem('token');
        const token = store.state.token;
        if (!token && route.path !== '/login') {
            // redirect('/login');
            redirect({ path: '/login', query: { redirect: route.path } });
        }
    }
}