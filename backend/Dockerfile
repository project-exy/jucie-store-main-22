FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y \
    ca-certificates \
    libc6 \
    libgcc1 \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 5000

COPY . ./main

CMD ["./main"]