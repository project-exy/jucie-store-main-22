package data

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

// it's useless now
type Session struct {
	Id     int
	Token  string
	Expiry time.Time
}

func (s Session) CreateSession() *Session {
	return &Session{
		Token:  uuid.NewString(),
		Expiry: time.Now().Add(12 * time.Hour),
	}
}

func (s Session) Add(db *sql.DB, ss *Session) error {
	newToken := uuid.NewString()
	expiresAt := time.Now().Add(12 * time.Hour)
	query := `
    INSERT INTO sessions (token, expiry)
    VALUES (?, ?)
    `
	_, err := db.Exec(query, newToken, expiresAt)
	return err
}

func (ss Session) GetByToken(db *sql.DB, token string) (*Session, error) {
	query := `
    SELECT id, token, expiry
    FROM sessions
    WHERE token = ?
    `
	var s Session
	err := db.QueryRow(query, token).Scan(&s.Id, &s.Token, &s.Expiry)
	if err != nil {
		return nil, err
	}
	return &s, nil
}

func (s Session) Update(db *sql.DB) error {
	query := `
    UPDATE sessions
    SET token = ?, expiry = ?
    WHERE id = ?
    `
	_, err := db.Exec(query, s.Token, s.Expiry, s.Id)
	return err
}

func (s Session) Delete(db *sql.DB) error {
	query := `
    DELETE FROM sessions
    WHERE id = ?
    `
	_, err := db.Exec(query, s.Id)
	return err
}

func (s Session) DeleteExpired(db *sql.DB) error {
	query := `
    DELETE FROM sessions
    WHERE expiry < ?
    `
	_, err := db.Exec(query, time.Now())
	return err
}
