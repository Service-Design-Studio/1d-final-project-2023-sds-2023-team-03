if Rails.env === 'production' 
    Rails.application.config.session_store :cookie_store, key: '_puma-back-end', domain: 'puma-back-end-json-api'
else
    Rails.application.config.session_store :cookie_store, key: '_puma-back-end'
end
