if Rails.env === 'production' 
    Rails.application.config.session_store :cookie_store, {
        key: '_puma-back-end',
        domain: 'puma-back-end-json-api',
        same_site: :none,
        secure: true,
    }
else
    Rails.application.config.session_store :cookie_store, {
        key: '_puma-back-end',
        same_site: :none,
        secure: true,
    }
end
