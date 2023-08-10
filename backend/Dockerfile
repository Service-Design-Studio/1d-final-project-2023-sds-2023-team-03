
# Use the official Ruby image.
# https://hub.docker.com/_/ruby
FROM ruby:2.7.8-buster

# Install production dependencies.
WORKDIR /usr/src/app
COPY Gemfile Gemfile.lock ./
ENV BUNDLE_FROZEN=true
RUN gem install bundler && bundle config set --local without 'test'

# Copy local code to the container image.
COPY . ./
COPY ./sds-group3-4af42db209f1.json ./
RUN bundle install

# Run the web service on container startup.
ENV SECRET_KEY_BASE=972de5d2021dc9c822308dcd24f212922b58aae89d662fa4a5a4acc3057d3d10d7600f956fb32097991dbe91b174595a098be8a270d1b4117772d07e1728f410
ENV GOOGLE_APPLICATION_CREDENTIALS=./sds-group3-4af42db209f1.json
EXPOSE 8080
RUN chmod u+x bin/rails
RUN bundle exec rake db:create
RUN bundle exec rake db:migrate
RUN bundle exec rake db:seed
CMD ["rails", "server", "-b", "0.0.0.0", "-p", "8080"]