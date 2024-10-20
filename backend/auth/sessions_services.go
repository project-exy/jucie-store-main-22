package auth

import (
	"log"
	"sync"
	"time"

	"github.com/pecet3/my-api/data"
)

const (
	typeAdmin = "admin"
	typeAuth  = "auth"
)

type Session struct {
	Expiry            time.Time
	Token             string
	ActivateCode      string
	UserIp            string
	Type              string
	PostSuspendExpiry time.Time
}

type SessionStore struct {
	AuthSessions  AuthSessions
	sMu           sync.RWMutex
	AdminSessions AdminSessions
	eMu           sync.RWMutex
	Password      string
	pMu           sync.RWMutex
	data          data.Data
}

func NewSessionStore(d data.Data) *SessionStore {
	return &SessionStore{
		AuthSessions:  make(AuthSessions),
		AdminSessions: make(AdminSessions),
		data:          d,
		Password:      generatePassword(),
	}
}

func cleanUpExpiredSessionsLoop(ss *SessionStore) {
	for {
		time.Sleep(12 * time.Hour)
		cleanedAuthSessions := 0
		ss.sMu.Lock()
		for token, session := range ss.AuthSessions {
			if time.Now().After(session.Expiry) {
				delete(ss.AuthSessions, token)
				cleanedAuthSessions++
			}
		}
		ss.sMu.Unlock()

		cleanedAdminSessions := 0
		ss.eMu.Lock()
		for token, session := range ss.AdminSessions {
			if time.Now().After(session.Expiry) {
				delete(ss.AdminSessions, token)
				cleanedAdminSessions++
			}
		}
		ss.eMu.Unlock()
		log.Printf("<Auth> Cleaned Expired Sessions, auth: %d, admin: %d", cleanedAuthSessions, cleanedAdminSessions)
	}
}
