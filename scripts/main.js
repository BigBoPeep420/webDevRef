async function navigate(page){
    const content = document.getElementById('main');
    try{
        const resp = await fetch(`./pages/${page}.html`);
        const html = await resp.text();
        content.innerHTML = html;
        window.history.pushState({}, '', page);
    }catch (err) {
        content.innerHTML = '<h1> !!-- 404: Page Not Found --!! </h1>' +
            `<p>Could not find ./pages/${page}.html</p>`;
    };
    try{
        const script = await import(`./scripts/pages/${page}.js`);
        if(script.init) {script.init();};
    }catch (err) {
        content.innerHTML = `<h1> !!-- 420: No JS file found for ${page} --!! </h1>` +
            `<p>Could not find ./scripts/pages/${page}.js</p>`;
    }
}
window.onpopstate = () => {
    const page = window.location.pathname.split('/').pop();
    navigate(page || 'home');
}