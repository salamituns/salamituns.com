FROM nginxinc/nginx-unprivileged:1.30.6-alpine@sha256:f5116ed4606f3eb015dd4a8e28cb9b351476dc0ad4bc6e9f93b19cec130cdf03

# The upstream tag lags Alpine security fixes (musl, zlib, ... had fixed versions
# the 1.30.6-alpine image did not carry yet), and the release workflow fails on
# any fixable HIGH/CRITICAL. Upgrade OS packages at build time, then drop root.
USER root
RUN apk upgrade --no-cache

COPY nginx.conf /etc/nginx/nginx.conf

# Allowlist what gets served: top-level pages and assets plus the two asset folders.
# A blanket "COPY ." would also publish nginx.conf and anything else left in the repo.
COPY *.html *.css *.js *.txt *.xml *.png *.ico *.svg /usr/share/nginx/html/
COPY fonts/ /usr/share/nginx/html/fonts/
COPY images/ /usr/share/nginx/html/images/

USER 101
EXPOSE 8080
