# Stage 1: Build stage
FROM mcr.microsoft.com/devcontainers/go:1-1.23-bookworm AS builder

WORKDIR /app

# Kopiujemy pliki zarządzania zależnościami, aby pobrać zależności
COPY go.mod go.sum ./
RUN go mod download

# Kopiujemy resztę aplikacji do folderu roboczego
COPY . .

# Budujemy binarkę
RUN CGO_ENABLED=1 GOOS=linux go build -o main .

# Stage 2: Final stage
FROM debian:bookworm-slim

# Instalujemy niezbędne zależności systemowe
RUN apt-get update && apt-get install -y \
    ca-certificates \
    libc6 \
    libgcc1 \
    && rm -rf /var/lib/apt/lists/*

# Ustawiamy folder roboczy w kontenerze docelowym
WORKDIR /app

# Kopiujemy skompilowaną binarkę z pierwszego etapu
COPY --from=builder /app/main .

# Dodajemy dodatkowe pliki konfiguracyjne, jeśli istnieją (np. .env)
# COPY --from=builder /app/.env .    # odkomentuj, jeśli plik .env istnieje

# Otwieramy port 5000 dla aplikacji
EXPOSE 5000

# Ustawiamy domyślną komendę uruchamiającą aplikację
CMD ["./main"]
