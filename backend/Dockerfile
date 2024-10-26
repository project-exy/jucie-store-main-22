FROM mcr.microsoft.com/devcontainers/go:1-1.23-bookworm AS builder

WORKDIR /app

COPY . .

RUN go mod download

RUN CGO_ENABLED=1 GOOS=linux go build -o main .

FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y \
    ca-certificates \
    libc6 \
    libgcc1 \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 5000


CMD ["./main"]