if Rails.env === 'production' 
    Rails.application.config.session_store :cookie_store, {
        key: '_puma-back-end',
        same_site: :none,
        secure: true,
        httponly: false
    }
else
    Rails.application.config.session_store :cookie_store, {
        key: '_puma-back-end',
        same_site: :none,
        secure: true,
        httponly: false
    }
end
