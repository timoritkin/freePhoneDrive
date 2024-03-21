exports.showError = (req, res, next) => {
    res.status(404).render('404/404', { pageTitle: 'Page Not Found' });
}
