FROM python:3.11-alpine3.19
WORKDIR /app/backend
# RUN apk add --no-cache \
#     postgresql-dev \
#     gcc \
#     python3-dev \
#     musl-dev
COPY ./server/requirements.txt .
RUN pip install -r requirements.txt
COPY server/ .
COPY docker/backend/wsgi-entrypoint.sh /app/docker/backend/
RUN chmod +x /app/docker/backend/wsgi-entrypoint.sh